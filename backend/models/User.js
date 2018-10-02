import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        unique:true,
        required:true
    },
    name:{
      type: String,
      required: true
    }
});


export default mongoose.model('User', User);
