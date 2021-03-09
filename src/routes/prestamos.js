// requires
const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

// Consultar prestamos generales
router.get('/prestamos', (req, res) => {
    mysqlConnection.query('SELECT * FROM prestamos', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Consultar prestamo by usuario 
router.get('/prestamos/usuario/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM prestamos WHERE usuario_id = ?', [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})
// Consultar prestamo by libro
router.get('/prestamos/libro/:id', (req, res) => {
    const { id } = req.params;

    mysqlConnection.query('SELECT * FROM prestamos WHERE libro_id = ?', [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

//realizar  prestamo
router.post('/prestamos/add', (req, res) => {
    // Conusltando existencia del libro
    const idLibro = req.body.libro;
    const sqlLibros = ` SELECT cantidad_libro FROM libros WHERE libros_id = ${idLibro}`
    mysqlConnection.query(sqlLibros, (err, rows) => {
        if (err) {
            console.log(err);
            res.send('No existe ese libro')
        } else {
            const sql = 'INSERT INTO prestamos SET ?';
            const [RowDataPacket] = rows;
            const cantidad = (RowDataPacket.cantidad_libro);
            // consultando cantidad de ejemplares del libro
            if (cantidad > 0) {
                const prestamoObj = {
                    usuario_id: req.body.usuario,
                    libro_id: req.body.libro
                };
                mysqlConnection.query(sql, prestamoObj, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send('Prestamo Exitoso')
                    }
                });
                // actulizando la cantidad de ejemplares del libro
                const sqlUpdateLibros = `UPDATE libros SET cantidad_libro = ${cantidad - 1} WHERE libros_id = ${idLibro}`
                mysqlConnection.query(sqlUpdateLibros, err => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('cantidad actualizada')
                    }
                });
            } else {
                res.send('No hay ejemplares disponibles')
            };
        };
    });
});

// actualizar prestamo 
router.put('/prestamos/update/:id', (req, res) => {
    let { id } = req.params;
    const { libro, usuario } = req.body;
    let sql = '';
// confirmando que actualización se realiza
    if (libro == undefined) {
        sql = `UPDATE prestamos SET usuario_id ='${usuario}' WHERE prestamos_id = ${id}`;
    } else if (usuario == undefined) {
        sql = `UPDATE prestamos SET libro_id ='${libro}' WHERE prestamos_id = ${id}`;
    } else if (libro != undefined && usuario != undefined) {
        sql = `UPDATE prestamos SET libro_id = '${libro}', usuario_id = ${usuario}WHERE prestamos_id = ${id}`;
    }
    mysqlConnection.query(sql, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('Prestamo Actualizado')
        }
    });
});

// eliminando prestamo
router.delete('/prestamos/delete/:id', (req, res) => {
    
    const { id } = req.params;
    const sql = `DELETE FROM prestamos WHERE prestamos_id = ${id}`;
    mysqlConnection.query(sql, err => {
        if (err) {
            console.log(err);
        } else {
            res.send('Prestamo Eliminado')
        }
    });
});

module.exports = router;