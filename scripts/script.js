'use strict';

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
    
    initPage();
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
    }); 
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
   
}

// Denna funktionen slumpar fram ett heltal mellan min och max som vi sedan sätter nedan i prepGame()
function randomNumberOfGhosts(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

/* Pseudokod för att räkna aktiva spöken
    if(randomNumberOfGhosts !== 0) {
        kör spelet
    } else {
        gameOver()
        Grattis du har fångat alla spöken!!
        document.querySelector('#gameArea').classList.add('d-none')
        document.querySelector('.winnerMsg').classList.remove('d-none')
    }
} */


// I funtionen randomPosition() tilldelar vi x och y resultatet av Math.round(Math.random) osv 
// för att få slumpade x och y kordinater inom fönstrets bredd och höjd.
function randomPosition() {
    const x = Math.round(Math.random() * (window.innerWidth - 300)) +1;
    const y = Math.round(Math.random() * (window.innerHeight - 300)) +1;
    return { 
                left : x,  // Vi returnerar dessa koordinater som ett objekt med
                top : y    //'left' och 'top' egenskaper.
            };
}

// Denna funktionen tar två argument min och max och och använder sig av randomNumberOfGhosts()
// för att få fram ett slumpat antal spöken
function generateGhosts(min, max) {
    const numberOfGhosts = randomNumberOfGhosts(min, max);
    const gameArea = document.querySelector('#gameArea');
    const ghostImages = []; // Tom array för att lagra spöken

    // Vi använder en for loop för att så länge som i är mindre än numberOfGhosts
    // så skapar vi ett img element som vi döper till ghostImg och pushar in ghostImg in i vår ghostImages array
    for(let i = 0; i < numberOfGhosts; i++) {
        const ghostImg = document.createElement('img');
        ghostImg.src = '/resources/ghost.png'; // Här sätter vi sökvägen till bilden med src
        ghostImages.push(ghostImg);
        
        // Samtidigt som vi skapar ett img element så skall varje img slumpas ut på skärmen
        // Den position som slumpas fram i randomPosition() tilldelas de nya img elementen
        // De nya img elementen sätter vi sedan style.left och style.top på för att komma åt den slumpade positionen
        const randomlyPositionedGhost = randomPosition();
        ghostImg.style.left = `${randomlyPositionedGhost.left}px`;
        ghostImg.style.top = `${randomlyPositionedGhost.top}px`;
        
        console.log(numberOfGhosts);
    }

    // Här loopar vi vår ghostImages array och lägger till varje spöke i gameArea
    ghostImages.forEach(images => {
        gameArea.appendChild(images);
    });
    

}


function prepGame(){
    //Dölj formulär och visa spelplanen
    document.querySelector('#formDiv').classList.add('d-none')
    document.querySelector('#gameArea').classList.remove('d-none')
    console.log('formulär borttaget, visa spelplan');
    
    // Här anropar vi vår funktion med argumenten 10 och 15 
    // för att slumpa fram ett antal spöken (mellan 10 och 15) som skall visas i gameArea
    generateGhosts(10, 15); 

    
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
}*/