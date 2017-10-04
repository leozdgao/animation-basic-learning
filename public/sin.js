// 从最左边的中心点开始绘制
let xPos = 0 // x 的位置并不代表角度，仅代表横坐标分布的密集程度
let yPos = canvas.height / 2
const range = 50
const xSpeed = 1
const ySpeed = 0.05 // y 指代表角度递增速率
let angle = 0
// 波形绘制
;(function drawFrame() {
  requestAnimationFrame(drawFrame, canvas)

  xPos += xSpeed
  angle += ySpeed
  yPos = canvas.height / 2 + range * Math.sin(angle)
  context.lineTo(xPos, yPos)
  context.stroke()
})()
