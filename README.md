# Project Name

Server Side Calculator

# Description

For this project, I built a simple server side calculator that can add, subtract, multiply and divide with two numbers. To start, I created the calculator input and buttons in HTML. I gave the number buttons a class of number, and the operator buttons a class of operator. In the function onReady, there are click listeners and functions the number buttons, operator buttons, and the clear button. 

The first functions I created in the JS file were the onSubmit button function (which runs when the user clicks the equal button on the calculator) and the displayButtons function. The displayButton function gets the value of each button clicked on the calculator so that I can then display them on the calculator screen and store them in an object later in the onSubmit function. In the displayButtons function, I created a global variable that would store the value of which button was clicked on and add that to the value of the previous button clicked. I then set the value of the input (the calculator screen) to the values of the buttons that had been clicked to get them to display on the DOM. In the onSubmit function, I began by creating an object to send in my POST request. The object stores two numbers and the operator from each calculation. To get the operator used in each calculation, I created an if/else chain to determine which operator had been clicked in each calculation, and saved that to the variable called 'operator'. I then added the two numbers and the operator as 3 separate properties inside of an object called itemToSend. This is the data that was sent to the server in the POST request. At the end of the onSubmit function, I emptied the text input field and set the value of charactersToDisplay to an empty string so that it would refresh the next time someone typed in an operation and not concatenate them on the DOM. I also added a clearButton function that clears the input when the user clicks the C button on the calculator.

 Next, I set up the server and created an app.post statement that saved the object sent from the client into a new variable called inputsReceived. Within that post endpoint, I created an if/else chain to determine what the math operator of each input was by calling the object properties, and gave instructions for how to do the calculation for each of the four math operators. I saved the calculations in a new variable and created a new object that included the two number inputs, the operator, and the total/calculation. After that, I pushed the object into a global array called calculationHistory to save the history of inputs on the server side. I also sent back a status code from the server.


Back on the client side, I made a GET request within a function called loadHistory. The purpose of this function is to retrieve the updated array from the server and pass it to the render function. This function also gets called in the onReady function when the page first loads, as well as within the POST request function after the .then() statement. On the server side, I create an app.get statement and instructed the server to send the updated array called calculationHistory to the client. Once the array is received by the client, it is saved in another global array on the client side so that it can be called in other functions.

Finally, the render function is called once the GET request/loadHistory function has received a response from the server and saved it to a global variable on the client side. The render function loops through the array that was sent from the server and appends properties of the objects in the array to the DOM so that users can see their calculation history. Before the calculation history is appended, it is emptied each time so that only the newly updated array will be displayed on the DOM. 
 


# Acknowledgements
I would like to thank Prime Digital Academy for giving me support with this project!
