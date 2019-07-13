const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido'
}

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    status: {
        type: String,
        default: true
    },
    img: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    },
    facebook: {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser único' })
module.exports = mongoose.model('User', userSchema);