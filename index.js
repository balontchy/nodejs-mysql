const express = require('express')
const users = require('./api/admin/route')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use('/users',users)

const PORT = process.env.PORT 
app.get('/',(req,res) => res.json({'server side':'api'}))

app.listen(PORT,() => console.log(`server listen to port ${PORT}`))