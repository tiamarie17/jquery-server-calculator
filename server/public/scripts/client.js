let characterToDisplay = "";
let calculationHistory = [];
let calculation = ''


console.log('in client.js');

$(document).ready(onReady);


function onReady() {
  console.log("in onReady!")
  
  $('.equals').on('click', onSubmit);
  $('.operator').on('click', displayButtons);
  $('.number').on('click', displayButtons);
  $('.clear').on('click', clearButton);
  $('.deleteButton').on('click', onDelete);

  //Making it so that the history exists even after refreshing the page
  loadHistory();
  
}

function onSubmit(){
    console.log('in onSubmit');

    //let error;

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
    let operator = ""
    if((characterToDisplay.indexOf("+") !== -1)){
       operator = "+"
    }else if((characterToDisplay.indexOf("*") !== -1)){
        operator = "*"
    }else if((characterToDisplay.indexOf("-") !== -1)){
        operator = "-"
    }else if((characterToDisplay.indexOf("/") !== -1)){
        operator = "/"
    }
       
       /*
else if {
          alert('Error: Missing input!');
          return error;
          
        }
        else if if (characterToDisplay == operator){
          alert('Error: Numbers missing!');
          return error;
        } else {

          */

    //taking the input from the form and separating it by the operator

     characterToDisplay = characterToDisplay.split(operator);

     //If characterToDisplay only has an operator and no numbers, don't run POST
     console.log(characterToDisplay)
     console.log(operator)
  

        console.log(characterToDisplay);
      
          let objectToSend = {
              input1: characterToDisplay[0],
              operator: operator,
              input2: characterToDisplay[1]
          }
          console.log(objectToSend)

                  $.ajax({
                  url: '/math/',
                  method: 'POST',
                  data: objectToSend 
              })

                  .then((response)=>{
                  console.log('POST inputs', response);
                  loadHistory();
                  })

                  .catch((err)=>{
                  console.log('POST player guesses error');
                  })
              
                  //Emptying the text input field and setting value of characterToDisplay to empty string so that they reset after data is taken from it
                  $(':text').val('');

                  characterToDisplay = '';
      }

          

function loadHistory (){
    console.log('in loadHistory');

    $.ajax({
        url: '/math/',
        method: 'GET',
      })
          .then((response)=>{
            console.log('in GET loadHistory');
            calculationHistory = response;
            console.log(calculationHistory);

            loadAnswer();
    
          })
      
    }

  function loadAnswer(){
    console.log('in loadAnswer');
     
      $.ajax({
        url: '/math/calculation/',
        method: 'GET'
      })

        .then((response)=>{
          console.log('in GET answer');
          calculation = response.calculation;
          console.log(calculation);

          render();
        })
        

        .catch( function(error) {
          alert('Error in GET answer');
        })
        
  }


//Create a function to display the value of the buttons clicked on the calculator screen
function displayButtons(){
   console.log('in displayButtons');
 
   characterToDisplay =  characterToDisplay + ($(this).val());

   console.log(characterToDisplay);
   $(":text").val(characterToDisplay);

}

function clearButton(){
    console.log('in clearButton');
    $(':text').val('');

}
//I wasn't able to get the data-id to work without breaking the program, so I left it out of the render function. Any hints would be appreciated! Thanks!
function onDelete(){
    console.log('in onDelete');

        $.ajax({
          method: 'DELETE',
          url: '/math/'
        })
        .then(function(response){
          console.log('Deleted it!');

          loadHistory();
        })
        .catch( function(error) {
          alert('Unable to delete, try again later!');
        })
      }

function render() {
    console.log('in render');

   //empty answer div when server reloads
   $('.answer').empty();

   //append calculation to the DOm
   $('.answer').append(`
   <h2>${calculation}</h2>
   `)

    //empty page when server reloads
    $('.calcList').empty();

    //append calculation history to the DOM
    
    for (let i = 0; i<calculationHistory.length; i++){
        $('.calcList').append(` 
        
        <h3>${calculationHistory[i].input1} ${calculationHistory[i].operation} ${calculationHistory[i].input2} = ${calculationHistory[i].calculation.toFixed(3)}
        </h3>
        
        
        `)
    }
}

