import express from 'express';
const router = express.Router();
const csvtojson = require("csvtojson");

//import model
import UsersBd from '../models/usersBd';
//add reg

router.post('/nuevo-registro', async(req, res)=>{
    const body = req.body;
    try {
        const UsersDB = await UsersBd.create(body);
        res.status(200).json(UsersDB)
    } catch (error) {
        return res.status(500).json({
            mensaje:'ocurrio algo inesperado',
            error
        })
    }
});
//GET
router.get('/buscarTodo', async(req,res)=>{
    try {
        const UsersDb = await UsersBd.find();
        res.json(UsersDb);
    } catch (error) {
        return res.status(400).json({
            mensaje:'Error: No se pudo realizar la busqueda',
            error
        })
        
    }

});
//GET with par
router.get('/buscarParametro/:id', async(req,res)=>{
    const _id = req.params.id;
    try {
        const UsersDb = await UsersBd.findOne({_id});
        res.json(UsersDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error en la busqueda del id",
            error
        })
        
    }
});
//Delete user

router.delete('/eliminarParametro/:id', async(req,res)=>{
    const _id = req.params.id;

    try {
        const UsersDb = await UsersBd.findOneAndDelete({_id});
        if(!UsersDb){
            return res.status(400).json({
                mensaje:'No se encontro al usuario',
                error
            })
        }
        res.json(UsersDb)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al borrar'
        })
        
    }
});
//UPDATE user

router.put('/actualizar/:id', async(req, res)=>{
    const _id = req.params.id;
    const body = req.body;

    try {
        const UsersDB = await UsersBd.findByIdAndUpdate(
            _id,
            body, {new:true}
        );
        res.json(UsersDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en la actualización',
            error
        })
    }
});
router.post('/add', async(req,res)=>{
    csvtojson()
        .fromFile("./csv/posts.csv")
        .then(csvData =>{
            console.log(csvData);
            UsersBd.insertMany(csvData).then(function(){
                console.log("data inserted")
                res.json({success:'success'});

            }) .catch(function(error){
                console.log(error)
            });
        });
});


//export express confi
module.exports = router;