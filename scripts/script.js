'use strict';

window.addEventListener('load', () => {

    initPage();
    //Här kickar ni igång ert program
});



function initPage() {

    document.querySelector('#gameArea').classList.add('d-none')
    users.forEach(user => { // Changed variable name to avoid confusion with array name
        console.log(user);
    });

    const loginBtn = document.querySelector('#spela');
    
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (validateForm()) {
            //toggleDisplay(3); 
            //initContent();
            prepGame();       
        }
    }); // Added missing closing parenthesis
}


function validateForm(){
    console.log('validate loginform');

    try{
        const username = document.querySelector('#username')
        const password = document.querySelector('#password')
        //const users = getUsers();
        let user = {}


        if(!users.some(user => user.username === username.value)) {
            throw {
                'nodeRef' : username,
                'msg' : 'Ogiltigt användarnamn'
            }
        } else {
            user = users.find(user => user.username === username.value);

            if(user.password !== password.value) {
                throw {
                    'nodeRef' : password,
                    'msg' : 'Felaktigt lösenord'
                }
            }
        }


        if (!question.checked) {
            throw {
                'nodeRef': question,
                'msg': 'Du måste bekräfta att du inte är rädd för spöken'
            }
        }

        const errorMsg = document.querySelector('#errorMsg');
        errorMsg.textContent = '';

        
        //setUser(user.id);




        return true;


    } catch(error){
        console.log(error);


        const errorMsg = document.querySelector('#errorMsg');
        errorMsg.textContent = error.msg;

        return false; // Return false if any validation fails
    }
   
};


function prepGame(){
    //Ta bort formulär och visa spelplan
    document.querySelector('#formDiv').classList.add('d-none')
    document.querySelector('#gameArea').classList.remove('d-none')
    console.log('formulär borttaget, visa spelplan');

}







/*psuedokod

Globalt game data objekt{

}




Sidan laddas in:
Inloggnings formulär. Input sparas till globala objektet.
Try/catch för felhantering gällande user input i formuläret.



If(userInput === true)
    prepGame()
else errorMsg






define prepGame(){
    display none add på formulär
    display none add på errorMsg
    display none remove på spelplan
    generateGhosts()
    gameTime()
}






define generateGhosts(){
    //använd jespers kod som slumpar kordinater för img-element
    slumpa 10-15 ghosts
}







define gameTime(){
    if (ghost mouseover){
        display none add på ghost
        display none remove på spöknät (förutsatt att man har två img sources på samma element varav alltid bara ena visas vid ett tillfälle)
    }

    if (spöknät mouseover) {
        display none add på spöknät
        display none remove på ghost
    }

    checkIfGameOver()
}






define checkIfGameOver(){
    if (livingGhosts = 0){
        gameOver()
    } 
}






define gameOver(){
    display none add på spelplan
    display none remove på formulär
    display none remove på vinstMsg
}











Chatgpt hjälp:

ghost/net counter and src handler

function toggleGhostNet(event) {
  const element = event.target;
  if (element.src === "ghost-image-url") {
    element.src = "net-image-url"; // Replace "net-image-url" with actual URL
    gameData.livingGhosts--; // Decrease livingGhosts counter when a ghost is caught
  } else {
    element.src = "ghost-image-url"; // Replace "ghost-image-url" with actual URL
    gameData.livingGhosts++; // Increase livingGhosts counter when a net is hovered over
  }
  checkIfGameOver();
}

*/