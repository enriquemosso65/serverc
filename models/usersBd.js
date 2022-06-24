import mongoose from "mongoose";
const Schema =  mongoose.Schema;
const usersSchema = new Schema({
    UserID:{
        type:Number, required:[true, 'Escribe un id']
    },
    UserName:{
        type:String, required:[true, 'Escribe un nombre']
    },
    Date:{
        type:String, required: [true, 'Inserta una fecha']
    },
    PunchIn:{
        type:String, required: [true, 'Inserta una hora']
    },
    PunchOut:{
        type:String, required: [true, 'Inserta una hora']
    }
});

const usersBd = mongoose.model('usersBd', usersSchema);
export default usersBd;