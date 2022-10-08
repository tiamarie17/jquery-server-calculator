//Global variables
let equation;

let calculation = '';

let calculationHistory = [];


console.log('in server.js');

// Require express - gives us a function
const express = require('express');

// Require body-parser
const bodyParser = require('body-parser');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 5000;

// express static file serving - public is the folder name
app.use(express.static('server/public'));

//Running body-parser

app.use(bodyParser.urlencoded({extended: true}));

// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});


app.post('/math/', (req, res)=> {
    console.log('in POST math');
    
    let inputsReceived = req.body;
    console.log(inputsReceived);

    if (req.body.operator == '+') {
        calculation = parseFloat(req.body.input1) + parseFloat(req.body.input2);
            
    }else if (req.body.operator == '-') {
        calculation = parseFloat(req.body.input1) - parseFloat(req.body.input2);
       
    }else if (req.body.operator == "*"){
        calculation = parseFloat(req.body.input1) * parseFloat(req.body.input2);
               
    } else if (req.body.operator == '/'){
        calculation = parseFloat(req.body.input1) / parseFloat(req.body.input2);
    }
    
     //Saving inputs and calculation into object
     equation = {
        input1: inputsReceived.input1,
        operation: inputsReceived.operator,
        input2: inputsReceived.input2,
        calculation: calculation
    }
    console.log(equation);

    //Pushing object into array
    calculationHistory.push(equation);
    console.log(calculationHistory);
        res.sendStatus(201);
  })
   

  app.get('/math/calculation/', (req, res) =>{
    //Getting actual calculation--not sure if I did this part right
    //res.send(calculation);
    
    res.send({ calculation: calculation});

})

  app.get('/math/', (req, res) =>{
        //Sending array of objects to the client
        res.send(calculationHistory);

  })

  app.delete('/math/', (req, res) => {
    console.log('in DELETE calcList'); 

    calculationHistory= [];
    res.send(calculationHistory);
  })

