import EventEmitter from 'wolfy87-eventemitter'

export const spring = {
  noWobble: { stiffness: 170, damping: 26 },
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 210, damping: 20 }
}
const DEFAULT_SPRING_FORCE = spring.wobbly
const SECOND_PER_FRAME = 1 / 60

// TODO: 采样 For css spring

export default class Spring extends EventEmitter {
  constructor(options) {
    super()

    this.target = options.target
    // 目标点
    this.destP = options.dest
    // 起始点
    this.startP = options.start
    // 精度
    this.precision = options.precision || 0.01
    // 质量
    this.mass = options.mass || 1
    // 阻尼
    this.damping = options.damping || DEFAULT_SPRING_FORCE.damping
    // 劲度系数
    this.stiffness = options.stiffness || DEFAULT_SPRING_FORCE.stiffness
    // 速度
    this.velocityX = 0
    this.velocityY = 0

    this.progressX = 0
    this.progressY = 0
  }

  start() {
    this.animationId = this._doAnimation()

    return this
  }

  _doAnimation() {
    return window.requestAnimationFrame((timestamp) => {
      const currentX = this.startP.x + this.progressX
      const currentY = this.startP.y + this.progressY
      // 弹力
      const stringForceX = - this.stiffness * (currentX - this.destP.x)
      const stringForceY = - this.stiffness * (currentY - this.destP.y)
      // 摩擦力
      const frictionX = - this.damping * this.velocityX
      const frictionY = - this.damping * this.velocityY
      // 加速度
      const aX = (stringForceX + frictionX) / this.mass
      const aY = (stringForceY + frictionY) / this.mass

      const deltaVX = aX * SECOND_PER_FRAME
      const deltaVY = aY * SECOND_PER_FRAME

      this.velocityX += deltaVX
      this.velocityY += deltaVY

      const deltaSX = this.velocityX * SECOND_PER_FRAME
      const deltaSY = this.velocityY * SECOND_PER_FRAME

      this.progressX += deltaSX
      this.progressY += deltaSY

      this.emit('update', {
        startX: this.startP.x,
        startY: this.startP.y,
        progressX: this.progressX,
        progressY: this.progressY
      })

      if (Math.abs(deltaVX) < this.precision && Math.abs(deltaSX) < this.precision) {
        this.emit('end')
      } else {
        this._doAnimation()
      }
    })
  }
}
