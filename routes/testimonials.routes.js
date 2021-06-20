const express = require('express');
const router = express.Router();
const db = require('./../db');

const testimonials = db.testimonials;

router.route('/testimonials').get((req, res) => {
  res.json(testimonials);
});

router.route('/testimonials/random').get( (req, res) => {
  const random = Math.floor(Math.random() * ((testimonials.length-1) - 0 + 1)) + 0;
  res.json(testimonials[random]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(testimonials[req.params.id-1]);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  
  const testObj = {};
  testObj.id = parseInt(Math.random()*10000);;
  testObj.author = author + testObj.id;
  testObj.text = text;
  
  testimonials.push(testObj);
  res.sendStatus(200);
});

router.route('/testimonials/:idtest').put((req, res) => {
  const newauthor = 'changed_' + testimonials.find(x => x.id == req.params.idtest).author + '_'+req.params.idtest;
  const newtext = 'changed_' + testimonials.find(x => x.id == req.params.idtest).text + '_'+req.params.idtest;
    
  testimonials.find(x => x.id == req.params.idtest).author = newauthor;
  testimonials.find(x => x.id == req.params.idtest).text = newtext;
  
  res.sendStatus(200);
});

router.route('/testimonials/:idtest').delete((req, res) => {
  const index = testimonials.findIndex(x => x.id == req.params.idtest);
  testimonials.splice(index,1);  

  res.sendStatus(200);
});


module.exports = router;

