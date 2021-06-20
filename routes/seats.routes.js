const express = require('express');
const router = express.Router();
const db = require('./../db');

const seats = db.seats;

router.route('/seats').get((req, res) => {
  res.json(seats);
});

router.route('/seats/random').get( (req, res) => {
  const random = Math.floor(Math.random() * ((seats.length-1) - 0 + 1)) + 0;
  res.json(seats[random]);
});

router.route('/seats/:id').get((req, res) => {
  res.json(seats[req.params.id-1]);
});

router.route('/seats').post((req, res) => {
  const { author, text } = req.body;
  
  const testObj = {};
  testObj.id = parseInt(Math.random()*10000);;
  testObj.author = author + testObj.id;
  testObj.text = text;
  
  seats.push(testObj);
  res.sendStatus(200);
});

router.route('/seats/:idtest').put((req, res) => {
  const newauthor = 'changed_' + seats.find(x => x.id == req.params.idtest).author + '_'+req.params.idtest;
  const newtext = 'changed_' + seats.find(x => x.id == req.params.idtest).text + '_'+req.params.idtest;
    
  seats.find(x => x.id == req.params.idtest).author = newauthor;
  seats.find(x => x.id == req.params.idtest).text = newtext;
  
  res.sendStatus(200);
});

router.route('/seats/:idtest').delete((req, res) => {
  const index = seats.findIndex(x => x.id == req.params.idtest);
  seats.splice(index,1);  

  res.sendStatus(200);
});


module.exports = router;

