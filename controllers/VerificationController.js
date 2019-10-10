const VerificationController = (req, res) => {
  return models.Usuario.find({
    where: { email: req.query.email }
  })
    .then(usuario => {
      if (usuario.isVerified) {
        return res.status(202).json(`Email Already Verified`);
      } else {
        return models.VerificationToken.find({
          where: { token: req.query.verificationToken }
        })
          .then(foundToken => {
            if (foundToken) {
              return usuario
                .update({ estado: true })
                .then(updatedUser => {
                  return res
                    .status(403)
                    .json(`User with ${usuario.email} has been verified`);
                })
                .catch(reason => {
                  return res.status(403).json(`Verification failed`);
                });
            } else {
              return res.status(404).json(`Token expired`);
            }
          })
          .catch(reason => {
            return res.status(404).json(`Token expired`);
          });
      }
    })
    .catch(reason => {
      return res.status(404).json(`Email not found`);
    });
};
module.exports = VerificationController;
