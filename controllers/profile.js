const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})  // it's a shorthand that tells if id equals to the given id 
    .then(user => {
      if (user.length) {  // in case it returns an array having atleast one element then only we proceed, as an empty array is considered 'true' in JS
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
  handleProfileGet
}