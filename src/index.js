import Circle from './Circle'
import Pull from './Pull'
import Spring, { spring } from './Spring'
import { adhereTwoCircle } from './adhere'
import { createSVGElement } from './utils'

const svg = document.getElementById('test')
const fixedBall = new Circle(document.getElementById('fixed'))
const draggableBall = new Circle(document.getElementById('draggable'))

const createOrUpdatePath = (function() {
  let path = null

  return (container, d) => {
    if (path) {
      path.setAttribute('d', d)
    } else {
      path = createSVGElement('path')
      path.setAttribute('d', d)
      container.appendChild(path)
    }

    return path
  }
})()

const getPoint = function(target) {
  const rect = target.getBoundingClientRect()

  return {
    x: rect.left,
    y: rect.top
  }
}

// 动画前的起始点
const startP = getPoint(draggableBall._node)
let startCenterP = null, startRadius = null
const pullEngine = new Pull({
  target: draggableBall._node
}).start()
const updateAdhere = () => {
  const pathD = adhereTwoCircle(fixedBall, draggableBall, true)
  const path = createOrUpdatePath(svg, pathD)
  path.setAttribute('stroke', 'red')
  path.setAttribute('fill', 'red')
}

pullEngine.on('start', () => {
  startCenterP = draggableBall.center
  startRadius = fixedBall.radius
})
pullEngine.on('update', (e) => {
  const { progressX, progressY } = e
  const nextX = startCenterP.x + progressX
  const nextY = startCenterP.y + progressY
  const dist = Math.sqrt(nextX * nextX + nextY * nextY)

  // draggableBall.style.transform = `translate(${progressX}px, ${progressY}px)`
  draggableBall.setAttribute({
    cx: nextX,
    cy: nextY
  })

  const nextRaius = startRadius - dist * 0.05
  if (nextRaius > 0) {
    fixedBall.setAttribute('r', nextRaius)
  }

  updateAdhere()
})
pullEngine.on('end', e => {
  const springEngine = new Spring({
    target: draggableBall._node,
    start: getPoint(draggableBall._node),
    dest: startP,
    ...spring.wobbly
  }).start()
  const center = draggableBall.center

  springEngine.on('update', (e) => {
    const { startX, startY, progressX, progressY } = e
    // draggableBall.style.transform = `translate(${startX + progressX - startP.x}px, ${startY + progressY - startP.y}px)`
    draggableBall.setAttribute({
      cx: center.x + progressX,
      cy: center.y + progressY
    })

    updateAdhere()
  })
  springEngine.on('end', () => {
    fixedBall.setAttribute({
      r: startRadius
    })
    console.log('end')
  })
})
