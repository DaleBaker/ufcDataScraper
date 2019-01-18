var express = require('express');
var router = express.Router();
const pool = require('./../postgres').pool;


router.get('/returnAllFights', async (req, res) => {
    try {

        const client = await pool.connect()

        const result = await client.query('SELECT * FROM Fights');
       	client.release();

       	res.send(result.rows);


    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }

});

module.exports = router;
