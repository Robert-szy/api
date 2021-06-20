const express = require('express');
const router = express.Router();
const db = require('./../db');

const concerts = db.concerts;

router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

router.route('/concerts/random').get( (req, res) => {
  const random = Math.floor(Math.random() * ((concerts.length-1) - 0 + 1)) + 0;
  res.json(concerts[random]);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(concerts[req.params.id-1]);
});

router.route('/concerts').post((req, res) => {
  const { author, text } = req.body;
  
  const testObj = {};
  testObj.id = parseInt(Math.random()*10000);;
  testObj.author = author + testObj.id;
  testObj.text = text;
  
  concerts.push(testObj);
  res.sendStatus(200);
});

router.route('/concerts/:idtest').put((req, res) => {
  const newauthor = 'changed_' + concerts.find(x => x.id == req.params.idtest).author + '_'+req.params.idtest;
  const newtext = 'changed_' + concerts.find(x => x.id == req.params.idtest).text + '_'+req.params.idtest;
    
  concerts.find(x => x.id == req.params.idtest).author = newauthor;
  concerts.find(x => x.id == req.params.idtest).text = newtext;
  
  res.sendStatus(200);
});

router.route('/concerts/:idtest').delete((req, res) => {
  const index = concerts.findIndex(x => x.id == req.params.idtest);
  concerts.splice(index,1);  

  res.sendStatus(200);
});


module.exports = router;

