import { isTypeOf, degreeToRadian } from './utils'

const getBaseValFromSVGLength = (prop) => {
  return prop.baseVal.value
}

export default class Circle {
  static distanceTo(c0, c1) {
    
  }

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
}
