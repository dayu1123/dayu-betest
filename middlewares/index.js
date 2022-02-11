

function errorHandler(err, req, res, next){
  if(err.name === 'idNotFound'){
    res.status(404).json({
      msg: 'id not found in database'
    })
  }
  // if(eee)
}

module.exports = errorHandler