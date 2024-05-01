const express = require('express');
const cors = require('cors')
// importar el esquema de models
const userSchema = require('../models/user');

const router = express.Router();
// Middleware
router.use(cors());
// Rutas
// Agregar user
router.post('/users',cors(),(req, res)=>{
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) =>res.json({message: error}))
})
// Recuperar todos los users
router.get('/users',cors(),(req, res)=>{
   userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) =>res.json({message: error}))
})

// Recuperar user por id
router.get('/users/:id',cors(),(req, res)=>{
    const { id } = req.params;
    userSchema
         .findById(id)
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })
//Buscar por email
router.get('/users/byemail/:email',cors(),async(req, res)=>{
    const { email } = req.params;
    await userSchema
          .findOne({email:email})
          .then(data => res.json(data))
          .catch(error => res.json(error))  
    });

 // Actualizar user por id
router.put('/users/:id',cors(),(req, res)=>{
    const { id } = req.params;
    const {username,fullname, age, email,password, role} = req.body;
    userSchema
         .updateOne({_id:id},{$set: {username,fullname, age, email,password, role}})
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })

  // Eliminar user por id
router.delete('/users/:id',cors(),(req, res)=>{
    const { id } = req.params;
    userSchema
         .deleteOne({_id:id})
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })


module.exports = router;
