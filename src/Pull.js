import EventEmitter from 'wolfy87-eventemitter'

export default class Pull extends EventEmitter {
  constructor(options) {
    super()

    this.target = options.target
    // 摩擦力
    this.friction = options.friction || 1
    this.isAnimating = false
    this.isPulling = false
    // 起始点
    this.startP = null
    this.lastP = null
    this.progress = 0

    this.downHandler = this.downHandler.bind(this)
    this.upHandler = this.upHandler.bind(this)
    this.moveHandler = this.moveHandler.bind(this)
  }

  start() {
    this.target.addEventListener('mousedown', this.downHandler)
    
    return this
  }

  downHandler(e) {
    this.isPulling = true
    this.startP = {
      x: e.clientX,
      y: e.clientY
    }
    this.lastP = this.startP

    window.addEventListener('mousemove', this.moveHandler)
    window.addEventListener('mouseup', this.upHandler)
  }

  moveHandler(e) {
    if (this.isPulling) {
      const deltaX = e.clientX - this.lastP.x
      const velocity = this.friction * deltaX

      this.progress += velocity
      this.target.style.transform = `translateX(${this.progress}px)`

      this.lastP = {
        x: e.clientX,
        y: e.clientY
      }
    }
  }

  upHandler() {
    this.isPulling = false
    this.progress = 0

    window.removeEventListener('mousemove', this.moveHandler)
    window.removeEventListener('mouseup', this.upHandler)

    this.emit('end', {
      startX: this.startP.x,
      startY: this.startP.y,
      endX: this.lastP.x,
      endY: this.lastP.y
    })
  }
}

