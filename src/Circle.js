import { isTypeOf, degreeToRadian, radianToDegree } from './utils'

const getBaseValFromSVGLength = (prop) => {
  return prop.baseVal.value
}

export default class Circle {
  constructor(circle) {
    if (!isTypeOf(circle, 'SVGCircleElement')) {
      throw new TypeError('SVGCircleElement is required')
    }

    this._node = circle
  }

  get radius() {
    return getBaseValFromSVGLength(this._node.r)
  }

  get center() {
    return {
      x: getBaseValFromSVGLength(this._node.cx),
      y: getBaseValFromSVGLength(this._node.cy)
    }
  }

  getContactPoint(degree) {
    const radian = degreeToRadian(degree)
  
    return {
      x: Math.cos(radian) * this.radius + this.center.x,
      y: Math.sin(radian) * this.radius + this.center.y
    }
  }

  setAttribute(obj) {
    if (typeof obj === 'string') {
      this._node.setAttribute(obj, arguments[1])
      return
    }

    Object.keys(obj).forEach((key) => {
      const val = obj[key]
      this._node.setAttribute(key, val)
    })
  }

  distanceTo(p) {
    const center = this.center
    const distX = p.x - center.x
    const distY = p.y - center.y

    return Math.sqrt(distX * distX + distY * distY)
  }

  degreeTo(p) {
    const center = this.center
    return radianToDegree(Math.atan2(p.y - center.y, p.x - center.x))
  }
}
