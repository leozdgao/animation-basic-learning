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

const ball = new Ball()
const spring = 0.1
const targetX = canvas.width / 2
const targetY = canvas.height / 2
let vx = 0, vy = 0
const friction = 0.95

;(function drawFrame() {
  requestAnimationFrame(drawFrame, canvas)
  context.clearRect(0, 0, canvas.width, canvas.height)

  const dx = targetX - ball.x
  const dy = targetY - ball.y
  const ax = dx * spring
  const ay = dy * spring

  vx += ax
  vy += ay

  vx *= friction
  vy *= friction
  
  ball.x += vx
  ball.y += vy

  ball.draw(context)
})()




