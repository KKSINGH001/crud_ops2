const express = require('express');
const mongoose = require('mongoose');


const app = express();

const emprouter = require("./routes/emp");

app.listen(9000, () => { 
    console.log("listening 9000");
});

app.use('/employee' , emprouter);
