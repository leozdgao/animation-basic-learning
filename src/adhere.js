import { radianToDegree, degreeToRadian } from './utils'

// 获取两个点之间的中点
const getCenterOfTwoPoints = (p0, p1) => {
  return {
    x: (p1.x + p0.x) / 2,
    y: (p1.y + p0.y) / 2
  }
}
export const adhereTwoCircle = (circle0, circle1, arc) => {
  const centerP0 = circle0.center
  const centerP1 = circle1.center
  // 把两个圆心的中点作为贝塞尔曲线的控制点
  const controlP = getCenterOfTwoPoints(centerP0, centerP1)
  // 连接两个圆心的向量的角度
  const angleBetweenBalls = circle0.degreeTo(circle1.center)
  // 得到 4 个切点
  const contactP0ForBall0 = circle0.getContactPoint(angleBetweenBalls - 90)
  const contactP1ForBall0 = circle0.getContactPoint(angleBetweenBalls + 90)
  const contactP0ForBall1 = circle1.getContactPoint(angleBetweenBalls - 90)
  const contactP1ForBall1 = circle1.getContactPoint(angleBetweenBalls + 90)
  
  const pathD = [
    `M ${contactP0ForBall0.x} ${contactP0ForBall0.y}`,
    arc ? `Q ${controlP.x} ${controlP.y} ${contactP0ForBall1.x} ${contactP0ForBall1.y}`
        : `L ${contactP0ForBall1.x} ${contactP0ForBall1.y}`,
    `L ${contactP1ForBall1.x} ${contactP1ForBall1.y}`,
    arc ? `Q ${controlP.x} ${controlP.y} ${contactP1ForBall0.x} ${contactP1ForBall0.y}`
        : `L ${contactP1ForBall0.x} ${contactP1ForBall0.y}`,
    'Z'
  ].join(' ')

  return pathD
}
