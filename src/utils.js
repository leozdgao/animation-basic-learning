export function radianToDegree(radian) {
  return radian * 180 / Math.PI
}

export function degreeToRadian(degree) {
  return degree * Math.PI / 180
}

// 勾股定理
export function pythagorean(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  return Math.sqrt(dx * dx + dy * dy)
}

export function toHexColor(r, g, b) {
  return '#' + (r << 16 | g << 8 | b).toString('16')
}

function extractPrimaryColor(color) {
  if (color[0] === '#') {
    color = color.slice(1)
  }

  color = parseInt(color, 16)

  return {
    red: color >> 16 & 0xFF,
    green: color >> 8 & 0xFF,
    blue: color & 0xFF
  }
}

export function colorToRGB(color, alpha) {
  const p = extractPrimaryColor(color)

  if (alpha != null) {
    alpha = alpha <= 1 ? alpha : 1

    return `rgba(${p.red}, ${p.green}, ${p.blue}, ${alpha})`
  } else {
    return `rgb(${p.red}, ${p.green}, ${p.blue})`
  }
}

export function rectCollision(rect0, rect1) {
  return !(
    (rect0.x + rect0.width) < rect1.x ||
    (rect0.y + rect0.height) < rect1.y ||
    (rect1.x + rect1.width) < rect0.x ||
    (rect1.y + rect1.height) < rect0.y
  )
}

export function radiusCollision(ball0, ball1) {
  // 圆心的距离
  const dist = pythagorean(ball0, ball1)
  
  return dist < (ball0.radius + ball1.radius)
}

export function createSVGElement(tagName) {
  return document.createElementNS('http://www.w3.org/2000/svg', tagName)
}

export function isTypeOf(obj, type) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}