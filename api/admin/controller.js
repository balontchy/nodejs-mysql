const {
    get,
    getById,
    getByEmail,
    create,
    update,
    remove
}
 = require('../admin/services')
const {genSaltSync,hashSync, compareSync} = require('bcrypt')
const {sign} = require('jsonwebtoken')
require('dotenv').config()

 module.exports = {
    get:(req,res) => get((err,result) => 
    err? console.log(err) 
    : res.json({
      success:true,
      data:result
    })),
    getById:(req,res) => {
      const id = req.params.id
      getById(id,(err,result) => err? console.log(err) : result=='' ? res.json({
        success:false,
        data:'admin not found!'
      }):res.json({
        success:true,
        data:result
      }))
    },
    create:((req,res) =>{
      const body = req.body
      const salt = genSaltSync(10);
      body.password = hashSync(body.password,salt)
      create(body,(err,result) => 
          err ? res.status(500).json({success:false,Error:`${err}`}) : res.json({
            success:true,
            message:"data inserted with successfully :) "
          })
          )
    }),
    login: (req, res) => {
      let body = req.body;
      getByEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: false,
            data: "Email not found?"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results },process.env.KEY, {
            expiresIn: "1h"
          });
          return res.json({
            success: true,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: 0,
            data: "Password incorrect?"
          });
        }
      });
    },
    update: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      update(body, (err, results) => {
        err 
        ? res.json({  success:false, message:err })
        : res.json({ success:true,message:"Update with successfully"})


      })
    },
    remove:(req,res) =>{
      const body = req.body
      remove(body,(err,result) => err 
      ? res.json({success:false,message:err})
      : res.json({success:true,message:"removed with successfully"}))
    }

 }