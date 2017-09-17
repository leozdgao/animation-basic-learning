const canvas = document.getElementById('playground')
const context = canvas.getContext('2d')

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
}

const ball = new Ball()
const bouncing = 1
const friction = 0.97
let vx = Math.random() * 10 - 5
let vy = Math.random() * 10 - 5

ball.x = canvas.width / 2
ball.y = canvas.height / 2

;(function drawFrame() {
  requestAnimationFrame(drawFrame, canvas)
  context.clearRect(0, 0, canvas.width, canvas.height)

  const left = 0, top = 0, right = canvas.width, bottom = canvas.height

  // let speed = Math.sqrt(vx * vx + vy * vy)
  // const angle = Math.atan2(vy, vx)

  // speed -= 0.1

  // vx = Math.cos(angle) * speed
  // vy = Math.sin(angle) * speed

  vx *= friction
  vy *= friction

  // 应用速度
  ball.x += vx
  ball.y += vy

  if (ball.x + ball.radius > right) {
    ball.x = right - ball.radius
    vx *= - bouncing
  } else if (ball.x - ball.radius < left) {
    ball.x = left + ball.radius
    vx *= - bouncing
  }

  if (ball.y + ball.radius > bottom) {
    ball.y = bottom - ball.radius
    vy *= - bouncing
  } else if (ball.y - ball.radius < top) {
    ball.y = top + ball.radius
    vy *= - bouncing
  }

  ball.draw(context)
})()

