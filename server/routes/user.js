const express = require('express')
const User = require('../model/user')
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();


app.get('/user', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    User.find({ status: true }, 'name email role status')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            User.count({ status: true }, (err, count) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: count
                })
            })

        })

})

app.post('/user', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    })

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            usuario: userDB
        })
    })

})

app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'status', 'role']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            user: userDB
        })

    })


})

app.delete('/user/:id', function(req, res) {
    let id = req.params.id;

    let cambiarStatus = {
        status: false

    }
    User.findByIdAndUpdate(id, cambiarStatus, { new: true }, (err, userDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!userDelete) {
            return res.json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        }

        res.json({
            ok: true,
            usuario: userDelete
        })
    })
})

module.exports = app;