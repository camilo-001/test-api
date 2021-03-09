

AJUSTES PARA LA EJECUCIÓN DE LA API 

1. En la carpeta " db " se encuentra el script de la base de datos realizada en MySQL con volcado de datos en las tablas usuarios y libros. Necesario ejecutar para el funcionamiento de la API

2. En la " ruta test/src/database.js " se encuentra la conexión con la base de datos en el archivo se encuentran las variables por defecto para la conexión, cambiar dichas variables según las credenciales de su base de datos

3. en la ruta " test/src/index.js " en los ajustes para la inicializción del servidor se encuentra por defecto el puerto donde este será escuchado, cambiar dicho valor si require utilizar otro puerto.

DEPENDENCIAS 

1. express --> npm install express
2. mysql --> npm install mysql
3. nodemon --> npm install nodemon (actualmente en el archivo package.json se encuentra el script "npm run dev" para inciar la ejecución de nodemon)

RUTAS // PRUEBAS
A continuación las rutas de la Api se muestran ejemplos de como realizar las inserciónes.

Usuarios.

- Consultar todos los usuarios --> http://localhost:3000/usuarios
- Consultar usuario por id --> http://localhost:3000/usuarios/id
- Añadir un usuario --> http://localhost:3000/usuarios/add

    {
        "nombre" : "";
    }

- Actualizar un usuario --> http://localhost:3000/usuarios/update/id
- Eliminar un usuario --> http://localhost:3000/usuarios/delete/id

Libros.

- Consultar todos los libros --> http://localhost:3000/libros
- Consultar libro por id --> http://localhost:3000/libros/id
- Añadir un libro por --> http://localhost:3000/libros/add

{
    "nombre" :"",
    "cantidad": "";
}
- Actualizar un libro -->http://localhost:3000/libros/update/id
- Eliminar un libro --> http://localhost:3000/libros/delete/id

Prestamos 

- Consultar todos los prestamos generales --> http://localhost:3000/prestamos
- Consultar todos los prestamos de un libro por su id --> http://localhost:3000/prestamos/libro/id
- Consultar todos los prestamos de un usuario por su id --> http://localhost:3000/prestamos/usuario/id
- Solicitar prestamo de un libro --> http://localhost:3000/prestamos/add
{
    "usuario_id": "",
    "libro_id: "";
}

--- si llega a ser requerido ---


- Actualizar un prestamo --> http://localhost:3000/prestamos/update/id_prestamo
- Eliminar eun prestamo -- > http://localhost:3000/prestamos/delete/id_prestamo
