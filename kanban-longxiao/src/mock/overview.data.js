import avatar from '../assets/img/home/image 30.png'

const persons = [
  { name: '夏天', title: '副总经理', photo: avatar, status: 8, msg: '体温过高', position: [345, 440] },
  { name: '冬天', title: '副总经理', photo: avatar, status: 1, msg: '权限不足', position: [407, 144] },
  { name: '秋天', title: '副总经理', photo: avatar, status: 0, msg: '体温过高', position: [882, 69] },
]

const doors = [
  { status: 0, title: '正在出库', typeName: '出库', orderCode: '20200424002', count: 18, unit: '箱', position: [680, 350] },
  { status: 1, title: '出库异常', typeName: '出库', orderCode: '20200424002', count: 18, unit: '箱', position: [1107, 218] },
]

export const getStaffs = () => ({
  online: 156,
  visitor: 12,
})

export const getMapData = () => {
  return {
    doors,
    persons,
  }
}
