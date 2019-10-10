const express = require("express");
const router = express.Router();
const VerificationController = require("../controllers/VerificationController");
const mysqlConnection = require("../db");
var sql = `CREATE TABLE verificacionToken (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario_id integer(11) NOT NULL,
    token varchar(255) NOT NULL)ENGINE=InnoDB DEFAULT CHARSET=utf8`;
mysqlConnection.query(sql, function(err, result) {
  if (err) throw err;
  console.log("Table created");
  res.send("created!");
});

router.get("/db/token", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM verificacionToken",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/db/token/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM verificacionToken WHERE id = ?",
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

router.put("/db/token/:id", (req, res) => {
  const { usuario_id, token } = req.body;
  const { id } = req.params;

  mysqlConnection.query(
    "UPDATE alumnos SET verificationtoken = ?, token = ?,  WHERE id = ?",
    [usuario_id, token, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "token actualizado" });
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/db/token", (req, res) => {
  const { usuario_id, token } = req.body;

  let verificacionToken = [usuario_id, token];
  let insertData = `INSERT INTO verificationtoken(usuario_id, token)
            VALUES(?,?)`;

  mysqlConnection.query(
    insertData,
    verificationtoken,
    (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      res.json({ message: `token registrado` });
    }
  );
});
router.delete("/db/token/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "DELETE FROM verificationtoken WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "token eliminado!" });
      } else {
        console.log(err);
      }
    }
  );
});
router.post("/db/token/verification", VerificationController);

module.exports = router;
