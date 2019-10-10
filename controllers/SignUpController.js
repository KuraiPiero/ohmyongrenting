const crypto = require("crypto-random-string");
const { sendVerificationEmail } = require("./SendGridEmailHelper");

const SignUpController = (req, res, next) => {
  return models.Usuario.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body
  })
    .spread((usuario, created) => {
      // if user email already exists
      if (!created) {
        return res.status(409).json("User with email address already exists");
      } else {
        return models.VerificationToken.create({
          userId: usuario.id,
          token: crypto(16)
        })
          .then(result => {
            sendVerificationEmail(usuario.email, result.token);
            return res
              .status(200)
              .json(`${usuario.email} account created successfully`);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    });
};

module.exports = SignUpController;
