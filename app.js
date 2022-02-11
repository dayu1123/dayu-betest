const express = require("express");
const {connect} = require('./config/mongodb')
const errorHandler = require('./middlewares')
const app = express()
const router = require('./routers')
const PORT = 4002

app.use(express.urlencoded({extended: false}))
app.use(express.json())


// app.get('/', (req, res) => {
  //   res.send('wew')
  // })
connect().then(async (database) => {
  console.log('keneksi monggo berhasil')
  app.use(router)
  app.use(errorHandler)
  app.listen(PORT, () => console.log(`i love you ${PORT}`))
})
.catch(err => console.log(err))