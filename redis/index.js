const Redis = require('ioredis')
const redis = new Redis()


function getRedisData(key){
  return redis.get(key)
}
function setRedisData(key, value){
  return redis.set(key, value)
}
function delRedisData(key){
  return redis.del(key)
}



module.exports ={
  getRedisData,
  setRedisData,
  delRedisData
}