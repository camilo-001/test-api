// requires
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

// Consultar usuarios
router.get('/usuarios', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {    
            console.log(err);
        }
    });
});

// Consultar usuarios by id 
router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM usuarios WHERE usuario_id = ?', [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Añadir ususario
router.post('/usuarios/add', (req, res) => {
    const sql = 'INSERT INTO usuarios SET ?';

    const usuarioObj = {
        nombre_usuario: req.body.nombre
    };
    mysqlConnection.query(sql, usuarioObj, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('Usuario creado')
        }
    });
});

// actualizar usuarios
router.put('/usuarios/update/:id', (req, res) => {
    let { id } = req.params;
    const { nombre } = req.body;

    let sql = `UPDATE usuarios SET nombre_usuario = '${nombre}' WHERE usuario_id = ${id}`;

    mysqlConnection.query(sql, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('Usuario Actualizado')
        }
    });
});

router.delete('/usuarios/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM usuarios WHERE usuario_id = ${id}`
    mysqlConnection.query(sql, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('Usuario Eliminado')
        }
    });
})
module.exports = router;