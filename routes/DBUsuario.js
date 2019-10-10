const express = require("express");
const router = express.Router();

const mysqlConnection = require("../db");

var sql = `
     CREATE TABLE Usuarios (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombres varchar(255) DEFAULT NULL,
    apellidos varchar(255) DEFAULT NULL,
    email  varchar(255) DEFAULT NULL,
    password varchar(255) DEFAULT NULL,
    rol int(11) DEFAULT NULL,
    celular varchar(255) DEFAULT NULL,
    ciudad varchar(255) DEFAULT NULL,
    direccion  varchar(255) DEFAULT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp(),
    ultima_sesion timestamp NOT NULL DEFAULT current_timestamp()
    estado tinyint(1) DEFAULT 0,    
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;
mysqlConnection.query(sql, function(err, result) {
  if (err) throw err;
  console.log("Table created");
  res.send("created!");
});

router.get("/db/usuarios", (req, res) => {
  mysqlConnection.query("SELECT * FROM Usuarios", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/db/usuarios/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM Usuarios WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/db/usuarios", (req, res) => {
  const {
    nombres,
    apellido,
    email,
    password,
    rol,
    celular,
    ciudad,
    direccion,
    fecha_creacion,
    ultima_sesion,
    estado
  } = req.body;

  let usuario = [
    nombres,
    apellido,
    email,
    password,
    rol,
    celular,
    ciudad,
    direccion,
    fecha_creacion,
    ultima_sesion,
    estado
  ];
  let insertData = `INSERT INTO usuario(nombres,
    apellido,
    email,
    password,
    rol,
    celular,
    ciudad,
    direccion,
    fecha_creacion,
    ultima_sesion,
    estado)
            VALUES(?,?,?,?,?,?,?,?,?,?)`;

  mysqlConnection.query(insertData, usuario, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Usuario matriculado` });
  });
});

router.put("/db/usuarios/:id", (req, res) => {
  const {
    apellido,
    email,
    password,
    rol,
    celular,
    ciudad,
    direccion,
    fecha_creacion,
    ultima_sesion,
    estado
  } = req.body;
  const { id } = req.params;

  mysqlConnection.query(
    "UPDATE alumnos SET nombre = ?, apellido = ?, password = ?,rol = ?,celular = ?,ciudad = ?,fecha_creacion = ?, ultima_sesion = ?,estado = ?, WHERE id = ?",
    [
      apellido,
      email,
      password,
      rol,
      celular,
      ciudad,
      direccion,
      fecha_creacion,
      ultima_sesion,
      estado,
      id
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Usuario actualizado" });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete("/db/usuarios/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM Usuarios WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Usuario eliminado!" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
