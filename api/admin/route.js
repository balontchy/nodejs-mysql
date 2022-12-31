const {get,getById,create,login,update, remove} = require('./controller');
const {checkToken} = require('../../authentication/token_validation');
const route = require('express').Router()


route.get('/',checkToken,get);
route.get('/:id',checkToken,getById)
route.post('/',checkToken,create)
route.patch('/',checkToken,update)
route.delete('/',checkToken,remove)
route.post('/login',login)

module.exports = route