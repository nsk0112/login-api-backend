const express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();


router.get('api/account/:id', (req, res) => {
    // const { id } = req.params;

    // models.user.findOne({ where: { 'id': id } })
    //     .then(user => {
    //         if (err) throw err;

    //         res.status(200).json({
    //             err: null,
    //             note: data.rows[0],
    //         });
    //         console.log(note);
    //     }).catch


    try {
        const { id } = req.params.id;
        res.json({
            "id": id
        })
    }
    catch (error) {
        res.status(500).json({
            err: err.message,
            note: null,
        });
    }

})





module.exports = router;
