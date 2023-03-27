document = {};
window = {}; 

console.log(document);
window.onload = function(){

var formHandle = document.forms.myForm;

console.log(formHandle);

formHandle.onsubmit = processForm;

function processForm() {

  alert("Form sent");

  // var inputValue = formHandle.userInput.value;

   var inputValue = "";

  if( inputValue === "" ){ 
    //CHECKING FOR AN EMPTY STRING.
  //LET'S HELP OUR USER OUT.  THE FOLLOWING CODE WILL HELP THE USER KNOW WHERE THEY MADE AN ERROR AND WHAT'S EXPECTED.
      console.log("no input");
      inputMsg.style.background = "purple"; //SET BACKGROUND COLOUR.
      inputMsg.innerHTML = "Please enter your thoughts, feelings, or question."; //ADD HELPER TEXT.
      inputMsg.style.color = "yellow";//MAKE FONT MORE READABLE.
      inputValue.focus(); //THIS METHOD PUTS THE FOCUS BACK ON THE ELEMENT (see below).
      return false;//STOPS THE SCRIPT FROM GOING ANY FURTHER.
};
module.exports = {
  inputValue
 }
};
};

