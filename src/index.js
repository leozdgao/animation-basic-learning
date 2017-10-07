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
let path = null
let startCenterP = null, startRadius = null, isTooFar = false, isStartPull = false, noAdhere = false

const updateAdhere = () => {
  const pathD = adhereTwoCircle(fixedBall, draggableBall, true)
  path = createOrUpdatePath(svg, pathD)
  path.setAttribute('stroke', 'red')
  path.setAttribute('fill', 'red')
}

const pullEngine = new Pull({
  target: draggableBall._node
}).start()

pullEngine.on('start', () => {
  startCenterP = draggableBall.center
  startRadius = fixedBall.radius
})
pullEngine.on('update', (e) => {
  const { progressX, progressY } = e
  const nextX = startCenterP.x + progressX
  const nextY = startCenterP.y + progressY

  // draggableBall.style.transform = `translate(${progressX}px, ${progressY}px)`
  draggableBall.setAttribute({
    cx: nextX,
    cy: nextY
  })

  const dist = fixedBall.distanceTo({
    x: nextX,
    y: nextY
  })
  const nextRaius = startRadius - dist * 0.1

  if (nextRaius < 3) {
    isTooFar = true

    if (!isStartPull) {
      isStartPull = true
      fixedBall.setAttribute('r', 1)

      // 拉太远了，拽过来
      const springEngine = new Spring({
        target: fixedBall._node,
        start: fixedBall.center,
        dest: draggableBall.center,
        stiffness: 370,
        damping: 50
      }).start()
      const center = fixedBall.center

      springEngine.on('update', (e) => {
        const { startX, startY, progressX, progressY } = e
        const nextX = center.x + progressX
        const nextY = center.y + progressY
    
        fixedBall.setAttribute({
          cx: nextX,
          cy: nextY
        });

        springEngine.destP = draggableBall.center

        updateAdhere()
      })
      springEngine.on('end', () => {
        // 到位置后把自己删了
        fixedBall._node.parentNode.removeChild(fixedBall._node)
        path.parentNode.removeChild(path)

        noAdhere = true
      })
    }
  } else {
    if (!isTooFar) {
      fixedBall.setAttribute('r', nextRaius)
    }
  }

  if (!noAdhere) {
    updateAdhere()
  }
})
pullEngine.on('end', e => {
  // 没有拉太远，弹回来
  if (!isTooFar) {
    const springEngine = new Spring({
      target: draggableBall._node,
      start: draggableBall.center,
      dest: fixedBall.center,
      ...spring.wobbly
    }).start()
    const center = draggableBall.center
  
    springEngine.on('update', (e) => {
      const { startX, startY, progressX, progressY } = e
      // draggableBall.style.transform = `translate(${startX + progressX - startP.x}px, ${startY + progressY - startP.y}px)`
      const nextX = center.x + progressX
      const nextY = center.y + progressY
  
      draggableBall.setAttribute({
        cx: nextX,
        cy: nextY
      })
  
      const dist = fixedBall.distanceTo({
        x: nextX,
        y: nextY
      })
      const nextRaius = startRadius - dist * 0.1
    
      if (nextRaius > 0) {
        fixedBall.setAttribute('r', nextRaius)
      }
  
      updateAdhere()
    })
    springEngine.on('end', () => {
      fixedBall.setAttribute({
        r: startRadius
      })
      console.log('end')
    })
  }
})
