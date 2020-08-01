const express = require('express');
const router = express.Router();

//import data model
const Item = require('../../models/Item.js');

//@route:  GET api/items
//@desc:   Get all items from Mongo
//@access: Public
router.get('/', (req, res) => {
    Item.find()
     .sort({ date: -1 })
     .then(items => res.json(items))
});


//@route:  POST api/items
//@desc:   Post a new item
//@access: Public
router.post('/', (req,res) => {
    const newItem = new Item({
        name: req.body.name,
    })

    newItem.save().then(item => res.json(item));
})

//@route:  PUT api/items
//@desc:   Update/Edit an item
//@access: Public
router.put('/:id', (req, res, next) => {
  Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err,post) => {
          if(err) {
              res.json(err)
          } else {
              res.json({ "msg": "Success! "})
          }
      }
  )
})


//@route:  DELETE api/items
//@desc:   Delete an entry
//@access: Public
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id)
	 .then(item => item.remove().then(() => res.json({success: true})))
	 .catch(err => res.status(404).json({success: false}))
})

module.exports = router;