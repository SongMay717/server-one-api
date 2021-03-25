
const express = require('express');
const router = express.Router();
const Business = require('./models.js');


/*
    Integrate API with Map functionality
*/


router.get('/', (req, res) => {
    Business.find({})
        .then(data => {
            let resData = {
                results: data.length,
                data: Array
            }

            resData.data = data; 
            res.json(resData);
        })
        .catch(err => console.log(err));
})



router.get('/:st', (req, res) => {

    const state = req.params.st;
    
    Business.find({
        state: state
    })
    .then(data => {
        resData = {
            result: data.length,
            data: Array
        }

        resData.data = data;
        res.json(resData);
    })
    .catch(err => console.log(err));

});



// router.get('/filter', (req, res) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     Business.find({})
//         .then(data => {
//             let resData = {
//                 results: data.length,
//                 count: limit,
//                 data: Array
//             };

//             resData.data = data.slice(startIndex, endIndex);
//             res.json(resData)
//         })
//         .catch(err => console.log(err));
// });


router.get('/filter/critical', (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    Business.find({}).sort({
        loan_size_rank_by_state: -1
    })
    .then(data => {
        resData = {
            results: data.length,
            count: limit,
            data: Array
        }

        resData.data = data.slice(startIndex, endIndex);
        res.json(resData)
    })
    .catch(err => console.log(err));

})


router.get('/filter/uncritical', (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    Business.find({}).sort({
        loan_size_rank_by_state: 1
    })
    .then(data => {
        resData = {
            results: data.length,
            count: limit,
            data: Array
        }

        resData.data = data.slice(startIndex, endIndex);
        res.json(resData)
    })
    .catch(err => console.log(err));

})


router.get('/filter/:id', (req, res) => {
    const id = req.params.id;

    Business.find({ _id: id})
        .then(data => {
            res.json(data[0]);
        })
        .catch(err => console.log(err));
});


router.get('/filter/type/:tpe', (req, res) => {
    const type = req.params.tpe;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    Business.find({ 
        business_type: type
    })
    .then(data => {
        let resData = {
            results: data.length,
            count: limit,
            data: Array
        };

        resData.data = data.slice(startIndex, endIndex);
        res.json(resData)
    })
    .catch(err => console.log(err));

});


module.exports = router;

