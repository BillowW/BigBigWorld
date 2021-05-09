const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100

//云函数入口函数
exports.main = async(event, context) => {
  try {
    // 承载所有读操作的 promise 的数组
    const tasks = []

    const promise = db.collection('contests').where({
      _id: event.id
    }).get()
    tasks.push(promise)
    return ((await Promise.all(tasks))[0].data[0])
  } catch (e) {
    return e.errMsg
  }
  // 等待所有

}