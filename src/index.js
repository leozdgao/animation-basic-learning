import Pull from './Pull'
import Spring from './Spring'

const box = document.getElementById('box')
const getPoint = function(target) {
  const rect = target.getBoundingClientRect()

  return {
    x: rect.left,
    y: rect.top
  }
}

const startP = getPoint(box)

new Pull({
  target: box,
  friction: 0.8
}).start().on('end', (e) => {
  const p = getPoint(box)

  new Spring({
    target: box,
    dest: {
      x: startP.x,
      y: startP.y
    },
    start: {
      x: p.x,
      y: p.y
    }
  }).start()
})
