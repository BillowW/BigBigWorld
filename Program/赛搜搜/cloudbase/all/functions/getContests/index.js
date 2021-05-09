const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

const MAX_LIMIT = 100
//数据
var start = new Date()
var end = new Date()
var type = []
var level = []
//云函数入口
exports.main = async (event, context) => {
  //初始化
  init(event)

  try {
    const countResult = await db.collection('contests').count()
    // 先取出集合记录总数
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('contests').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
        '比赛开始时间': _.gt(start).and(_.lt(end)),
        'type': _.in(type),
        'level': _.in(level)
      }).get()
      tasks.push(promise)
    }
    return ((await Promise.all(tasks))[0].data)
  } catch (e) {
    return e.errMsg
  }
  // 等待所有

}

function init(event) {
  start = parseMonth(event.mon)[0]
  end = parseMonth(event.mon)[1]
  type = parseType(event.type)
  level = parseLevel(event.level)
}

function parseMonth(mon) {
  if (mon > 0 && mon <= 12) {
    var start = new Date(2021, mon - 1, 1)
    var end = new Date(2021 + (mon / 12), mon % 12, 1)
  } else {
    var start = new Date("1969-01-01T00:00:00+08:00")
    var end = new Date("2070-01-01T00:00:00+08:00")
  }
  return [start, end]
}

function parseType(type) {
  const typeList = ['数学建模', '程序设计', '机器人', '工程机械', '土木建筑', '大数据', '交通车辆', '航空航天', '船舶海洋', '环境能源', '计算机&信息技术', '材料高分子', '电子&自动化', '工业&创意设计', '外语', '演讲主持&辩论', '模特', '歌舞书画&摄影', '体育', '科技文化艺术节', 'UI设计', '服装设计', '电子竞技', '数学', '物理', '化学化工', '健康生命&医学', '力学', '职业技能', '挑战杯', '环保公益', '社会综合', '创业', '商业', '创青春']
  if (typeof (type) === "undefined") {
    return typeList
  } else {
    return [type]
  }
}

function parseLevel(level) {
  const levelList = ["校级", "市级", "省级", "全国性", "全球性", "自由"]
  if (typeof (level) === "undefined") {
    return levelList
  } else {
    return [level]
  }
}