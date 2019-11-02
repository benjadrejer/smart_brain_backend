const Clarifai = require('clarifai');

const KEY = 'YOUR API KEY HERE';

const app = new Clarifai.App({
  apiKey: KEY,
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to function with API'))
}

const getProfile = (req, res, db) => {
  const { id } = req.params;
  db('users').select('*').where({ id }).then(user => {
    if (user.length < 1) {
      res.status(400).json('no such user');
    }
    res.json(user[0])
  }).catch(err => {
    res.status(400).json('Bad request');
  })
};

const getEntries = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => {
      res.status(400).json('unable to get entries');
    })
}

module.exports = {
  getProfile: getProfile,
  getEntries: getEntries,
  handleApiCall: handleApiCall,
}