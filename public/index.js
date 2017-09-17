function radianToDegree(radian) {
  return radian * 180 / Math.PI
}

function degreeToRadian(degree) {
  return degree * Math.PI / 180
}

// 勾股定理
function pythagorean(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  return Math.sqrt(dx * dx + dy * dy)
}

function toHexColor(r, g, b) {
  return '#' + (r << 16 | g << 8 | b).toString('16')
}

function extractPrimaryColor(color) {
  if (color[0] === '#') {
    color = color.slice(1)
  }

  color = parseInt(color, 16)

  return {
    red: color >> 16 & 0xFF,
    green: color >> 8 & 0xFF,
    blue: color & 0xFF
  }
}

function colorToRGB(color, alpha) {
  const p = extractPrimaryColor(color)

  if (alpha != null) {
    alpha = alpha <= 1 ? alpha : 1

    return `rgba(${p.red}, ${p.green}, ${p.blue}, ${alpha})`
  } else {
    return `rgb(${p.red}, ${p.green}, ${p.blue})`
  }
}

console.log('toHexColor', toHexColor(255, 200, 255))
console.log('colorToRGB', colorToRGB('#18F92E', 0.9))

console.log('1 弧度等于多少角度', radianToDegree(1))
console.log('360 度等于多少弧度', degreeToRadian(360))
console.log('30 度正弦', Math.sin(degreeToRadian(30)))

class Arrow {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
    this.color = '#ff0'
    this.rotation = 0
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rotation)
    context.lineWidth = 2
    context.fillStyle = this.color
    context.beginPath()
    context.moveTo(-50, -25)
    context.lineTo(0, -25)
    context.lineTo(0, -50)
    context.lineTo(50, 0)
    context.lineTo(0, 50)
    context.lineTo(0, 25)
    context.lineTo(-50, 25)
    context.lineTo(-50, -25)
    context.closePath()
    context.fill()
    context.stroke()
    context.restore()
  }
}

class Ball {
  constructor(radius, color) {
    this.x = 0
    this.y = 0
    this.radius = radius || 40
    this.rotation = 0
    this.scaleX = 1
    this.scaleY = 1
    this.color = color || '#f00'
    this.lineWidth = 1
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rotation)
    context.scale(this.scaleX, this.scaleY)
    context.lineWidth = this.lineWidth
    context.fillStyle = this.color
    context.beginPath()
    // 画圆弧
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true)
    context.closePath()
    context.fill()

    if (this.lineWidth > 0) {
      context.stroke()
    }
    context.restore()
  }

  setPosition(x, y) {
    ball.x = x
    ball.y = y
  }
}

const canvas = document.getElementById('playground')
const context = canvas.getContext('2d')
const arrow = new Arrow(canvas.width / 2, canvas.height / 2)
const captureMouse = function(canvas) {
  let x = 0, y = 0
  const handler = e => {
    x = e.offsetX
    y = e.offsetY
  }
  const obj = {
    dispose() {
      canvas.removeEventListener('mousemove', handler)
    },
    get x() { return x },
    get y() { return y }
  }
  canvas.addEventListener('mousemove', handler)

  return obj
}
const mouse = captureMouse(canvas)

const ball = new Ball()
ball.setPosition(canvas.width / 2, canvas.height - ball.radius)

// y 轴加速度
// let ay = 0
// let vy = 0
// 重力加速度
// const gravity = 1

// addEventListener('keydown', e => {
//   if (e.keyCode === 38) {
//     // 向上升，匀加速
//     ay = -1.2
//   }
// })
// addEventListener('keyup', e => {
//   ay = 0
// })

let angle = 0, angleX = 0, angleY = 0
const xSpeed = 1
const speed = 0.05
const radius = 100
const radiusX = 100
const radiusY = 150
let vx = 0, vy = 0

;(function drawFrame() {
  requestAnimationFrame(drawFrame, canvas)

  context.clearRect(0, 0, canvas.width, canvas.height)

  // 旋转动画
  const dx = Math.floor(mouse.x - arrow.x)
  const dy = Math.floor(mouse.y - arrow.y)
  const radian = Math.atan2(dy, dx)
  
  const ax = Math.cos(radian) * speed
  const ay = Math.sin(radian) * speed
  vx += ax
  vy += ay

  arrow.rotation = radian
  arrow.x += vx
  arrow.y += vy
  arrow.draw(context)

  // 线性动画 + 正弦
  // ball.x = (ball.x + xSpeed) % canvas.width
  // ball.y = canvas.height / 2 + Math.sin(angle) * 50
  // angle += 0.1
  // ball.draw(context)

  // 脉冲动画
  // ball.x = canvas.width / 2
  // ball.y = canvas.height / 2
  // ball.scaleX = ball.scaleY = 1 + Math.sin(angle) * 0.5
  // angle += 0.05
  // ball.draw(context)

  // 两个角产生波
  // ball.x = canvas.width / 2 + Math.sin(angleX) * 50
  // ball.y = canvas.height / 2 + Math.sin(angleY) * 50
  // angleX += 0.07
  // angleY += 0.11
  // ball.draw(context)

  // 加速度公式：vt = v0 + at
  // vy += ay
  // console.log(vy)

  // if (ball.y < canvas.height - ball.radius) {
  //   vy += gravity
  // }
// console.log(vy)
  // ball.y += vy

  // if (ball.y > canvas.height - ball.radius) {
  //   ball.y = canvas.height - ball.radius
  //   vy = 0
  // }
  // if (ball.y < ball.radius) {
  //   ball.y = ball.radius
  // }

  // angle += speed
  // ball.draw(context)
})()