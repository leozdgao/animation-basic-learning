const canvas = document.getElementById('playground')
const context = canvas.getContext('2d')

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
const x0 = 100, y0 = 200, x2 = 300, y2 = 200

canvas.addEventListener('mousemove', () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.beginPath()
  context.moveTo(x0, y0)
  context.quadraticCurveTo(mouse.x * 2 - (x0 + x2) / 2, mouse.y * 2 - (y0 + y2) / 2, x2, y2)
  context.stroke()
})
