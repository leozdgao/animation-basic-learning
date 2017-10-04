const canvas = document.getElementById('playground')
const context = canvas.getContext('2d')

class Ball {
  constructor(radius, color) {
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.radius = radius || 40
    this.rotation = 0
    this.scaleX = 1
    this.scaleY = 1
    this.color = color || '#FF0000'
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
}

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

const ball = new Ball()
const ball1 = new Ball()
const ball2 = new Ball()

const spring = 0.1
const targetX = canvas.width / 2
const targetY = canvas.height / 2
let vx = 0, vy = 0
const friction = 0.95
const gravity = 2

const mouse = captureMouse(canvas)

function move(ball, targetX, targetY) {
  ball.vx += (targetX - ball.x) * spring
  ball.vy += (targetY - ball.y) * spring

  ball.vy += gravity

  ball.vx *= friction
  ball.vy *= friction
  
  ball.x += ball.vx
  ball.y += ball.vy
}

;(function drawFrame() {
  requestAnimationFrame(drawFrame, canvas)
  context.clearRect(0, 0, canvas.width, canvas.height)

  move(ball, mouse.x, mouse.y)
  move(ball1, ball.x, ball.y)
  move(ball2, ball1.x, ball1.y)

  context.beginPath()
  context.moveTo(ball.x, ball.y)
  context.lineTo(mouse.x, mouse.y)
  context.stroke()

  ball.draw(context)
  ball1.draw(context)
  ball2.draw(context)
})()




