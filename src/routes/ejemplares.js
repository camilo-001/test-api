// requires
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

// Consultar libros
router.get('/libros', (req, res) => {
    mysqlConnection.query('SELECT * FROM libros', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Consultar libros by id 
router.get('/libros/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM libros WHERE libros_id = ?', [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//Añadir libro
router.post('/libros/add', (req, res) => {
    const sql = 'INSERT INTO libros SET ?';

    const libroObj = {
        nombre_libro: req.body.nombre,
        cantidad_libro: req.body.cantidad
    };

    mysqlConnection.query(sql, libroObj, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('libro creado')
        }
    });
});

// actualizar libros
router.put('/libros/update/:id', (req, res) => {
    let { id } = req.params;
    const { nombre, cantidad } = req.body;
    let sql = '';
    // confirmando campos a actualizar
    if (nombre == undefined) {
        sql = `UPDATE libros set cantidad_libro ='${cantidad}' WHERE libros_id = ${id}`
    } else if (cantidad == undefined) {
        sql = `UPDATE libros set nombre_libro ='${nombre}' WHERE libros_id = ${id}`
    } else if (nombre != undefined && cantidad != undefined) {
        sql = `UPDATE libros SET nombre_libro = '${nombre}', cantidad_libro = ${cantidad} WHERE libros_id = ${id}`;
    }
    mysqlConnection.query(sql, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('libro Actualizado')
        }
    });
});
// Eliminar libro
router.delete('/libros/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM libros WHERE libros_id = ${id}`
    mysqlConnection.query(sql, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('libro Eliminado')
        }
    });
})
module.exports = router;