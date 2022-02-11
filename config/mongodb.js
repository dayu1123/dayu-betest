const { MongoClient } = require('mongodb')

let database = null
async function connect () {
  try{
    const uri = 'mongodb://127.0.0.1:27017'
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db('Users')
    database = db
    return database
  }
  catch(err){
    console.log(err)
  }
}

module.exports = {
  connect,
  getDatabase(){
    return database
  }
} 