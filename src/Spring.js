import EventEmitter from 'wolfy87-eventemitter'

const spring = {
  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 210, damping: 20 }
}
const DEFAULT_SPRING_FORCE = spring.wobbly
const SECOND_PER_FRAME = 1 / 60

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
    this.velocity = 0

    this.progress = 0
  }

  start() {
    this.animationId = this._doAnimation()
  }

  _doAnimation() {
    return window.requestAnimationFrame((timestamp) => {
      const currentX = this.startP.x + this.progress
      // 弹力
      const stringForce = - this.stiffness * (currentX - this.destP.x)
      // 摩擦力
      const friction = - this.damping * this.velocity
      // 加速度
      const a = (stringForce + friction) / this.mass

      const deltaV = a * SECOND_PER_FRAME
      this.velocity += deltaV

      const deltaS = this.velocity * SECOND_PER_FRAME
      this.progress += deltaS

      this.target.style.transform = `translateX(${this.startP.x + this.progress}px)`

      if (Math.abs(deltaV) < this.precision && Math.abs(deltaS) < this.precision) {
        this.emit('end')
      } else {
        this._doAnimation()
      }
    })
  }
}
