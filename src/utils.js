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
