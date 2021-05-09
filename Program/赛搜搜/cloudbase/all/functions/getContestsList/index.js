const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100

//云函数入口
exports.main = async (event, context) => {
  // 先取出集合记录总数
  try {
    const countResult = await db.collection('contests').count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('contests').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    return ((await Promise.all(tasks))[0].data)
  } catch (e) {
    return e.errMsg
  }
  // 等待所有

}