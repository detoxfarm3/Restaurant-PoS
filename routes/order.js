const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const receipts = models.Receipts;


router.get('/', (req, res, next) => {
    console.log("GET ALL RECEIPTS")
    receipts.find()
        .then(results => {
            console.log(results);
            res.json(results)
        })
        .catch(error => {
            console.log(error);
            res.json(error)
        })
})

router.get('/paid', (req, res, next) => {
    console.log("GET PAID RECEIPTS")
    receipts.find().where('paid').equals(true)
        .then(results => {
            console.log(results);
            res.json(results)
        })
        .catch(error => {
            console.log(error);
            res.json(error)
        })
})

router.get('/unpaid', (req, res, next) => {

    console.log("GET UNPAID RECEIPTS")
    receipts.find().where("paid").equals(false)
        .then(results => {
            console.log(results);
            res.json(results)
        })
        .catch(error => {
            console.log(error);
            res.json(error)
        })

})

//add order to receipt
router.put('/:id', (req, res, next) => {
    receipts.update({_id: req.params.id}, {
        'items': req.body.bill.items,
        'total': req.body.bill.total,
        'paid': req.body.paid,
    })
        .then(result => {
            res.json(result)
        })
        .catch(error => res.json("error" + error));
});

module.exports = router;