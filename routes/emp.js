const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// const { Readable } = require("stream");
// const { json } = require('body-parser');

let data=[];
let data1 = '';

router.use(function( req, res, next ) {
    var data = '';
    req.on('data', function( chunk ) {
      data += chunk;
    });
    req.on('end', function() {
      req.rawBody = data;
      console.log( 'on end: ', data )
      if (data && data.indexOf('{') > -1 ) {
        req.body = JSON.parse(data);
      }
      next();
    });
  });


// const cb = function( req, res, next ) {
//     var data = '';
//     req.on('data', function( chunk ) {
//       data += chunk;
//     });
//     req.on('end', function() {
//       req.rawBody = data;
//       console.log( 'on end: ', data )
//       if (data && data.indexOf('{') > -1 ) {
//         req.body = JSON.parse(data);
//       }
//       next();
//     });
//   }

router.get('/', (req,res) => { 
    
    console.log("Get request....");
    console.log(req);
    res.send(data);
});

router.put('/:id',(req,res) =>
{
    id=req.params.id;
    const index = data.findIndex((x)=>{return(x.id==id)});
    console.log(index);
    if(index>=0)
    {
        const emp = data[index];
        emp.name = req.body.name;
        emp.phone_number = req.body.number;
        res.send("success");
    }
    else
    {
        res.send(" index not found");
    }

});

router.post('/', (req,res) =>
{
    console.log("post request");
    
    let a={
        name: req.body.name,
        id : req.body.id,
        phone_number : req.body.number
    };
    data.push(a);
    console.log(a);
    res.send('post request');
});

router.get('/:id', (req,res) => { 
    console.log("get by id");
    const employee = findbyid(req.params.id);
    res.send(employee);

});

router.delete('/:id', (req,res) => {
   
        console.log(req.params.id);
        deletebyid(req.params.id);
        res.send("success");
    
});

function deletebyid(id)
{

    data=data.filter((x)=>{x.id!==id});
    
}


  function findbyid(id)
  {
      console.log("id");
      var ans;
      for (let i of data)
      {
          if(i.id==id)
            ans=i;
      }
    return ans;
  }

module.exports = router