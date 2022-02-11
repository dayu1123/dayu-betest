const UserModels = require('../models')
const {ObjectId} = require('mongodb')
const { delRedisData, getRedisData, setRedisData } = require('../redis')

class UserControllers {
  static async findUserById(req, res, next){
    console.warn(req.params.id, '<<<< idddd')
    try {
      await delRedisData('service:users:data')
      const id = {
        _id: ObjectId(req.params.id)
      }
      const users = await UserModels.findOne(id)
      console.log(users)
      res.status(200).json(users[0])
    }
    catch(error) {
      console.log(error)
    }
  }
  static async findAllUser(req, res, next) {
    try {
      const dataUsers = await getRedisData('service:users:data')
      if(dataUsers){
        res.status(200).json(JSON.parse(dataUsers))
      }
      else {
        const users = await UserModels.find()
        setRedisData('service:users:data', JSON.stringify(users))
        res.status(200).json(users)
      }
    } catch (error) {
      console.log(error)
    }
  }
  static async editUserById(req, res, next) {
    try {
      await delRedisData('service:users:data')
      const id = {
        _id: ObjectId(req.params.id)
      }
      const replacement = req.body
      const users = await UserModels.update(id, {$set: replacement})
      if(users.lastErrorObject.n <= 0){
        throw {
          name: 'idNotFound',
          status: 404
        }
      }
      else{
        res.status(200).json(users.value)
      }
    } catch (error) {
      next(error)
      // console.warn(error)
    }
  }
  static async addUser(req, res, next) {
    // if(req.id) {
    // }
    try {
      await delRedisData('service:user:data')
      // const userNew = {
      //   ...req.body,
      // }
      const newUserData = await UserModels.create(req.body)
      res.status(201).json(newUserData)
    } catch (error) {
      console.warn(error)
    }
  }
  static async deleteUserById(req, res, next) {
    try {
      await delRedisData('service:users:data')
      const id = {
        _id: ObjectId(req.params.id)
      }
      const users = await UserModels.delete(id)
      if(users.lastErrorObject.n <= 0){
        throw {
          name: 'idNotFound',
          status: 404
        }
      }
      else{
        res.status(200).json(users.value)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserControllers