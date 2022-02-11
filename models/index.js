
   
const { getDatabase } = require('../config/mongodb')

class UserModels{
  static async find(){
    return getDatabase().collection('Users').find().toArray()
  }
  static async findOne(id){
    return getDatabase().collection('Users').find(id).toArray()
  }
  static async create(newSeries){
    return await getDatabase().collection('Users').insertOne(newSeries)
  }
  static async update(id, replacement){
    return await getDatabase().collection('Users').findOneAndUpdate(id, replacement, {returnOriginal: false})
  }
  static async delete(id){
    return await getDatabase().collection('Users').findOneAndDelete(id)
  }
}

module.exports= UserModels