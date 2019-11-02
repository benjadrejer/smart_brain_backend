const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  // bcrypt.hash(password, null, null, function(err, hash) {
  //   console.log(hash);
  // });
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash,
      email,
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        name: name,
        email: loginEmail[0],
        joined: new Date(),
      }).then(user => {
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  }).catch(err => res.status(400).json('Unable to register'));
}

module.exports = {
  handleRegister: handleRegister,
}