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






// Denna funktionen slumpar fram ett heltal mellan min och max som vi sedan sätter nedan i prepGame()
function randomNumberOfGhosts(min, max) {
    console.log('Slumpar antal spöken');
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}



// I funtionen randomPosition() tilldelar vi x och y resultatet av Math.round(Math.random) osv 
// för att få slumpade x och y kordinater inom fönstrets bredd och höjd.
function randomPosition() {
    const x = oGameData.left();
    const y = oGameData.top();
    return { 
                left : x,  
                top : y    
            };
}




// Denna funktionen tar två argument min och max och och använder sig av randomNumberOfGhosts()
// för att få fram ett slumpat antal spöken
function generateGhosts(min, max) {
    const numberOfGhosts = randomNumberOfGhosts(min, max);
    console.log("Number of ghosts:", numberOfGhosts); // Log number of ghosts
    const gameArea = document.querySelector('#gameArea');
    const ghostImages = [];

    for(let i = 0; i < numberOfGhosts; i++) {
        const ghostImg = document.createElement('img');
        ghostImg.src = '/resources/ghost.png';
        ghostImages.push(ghostImg);

        const randomlyPositionedGhost = randomPosition();
        ghostImg.style.left = `${randomlyPositionedGhost.left}px`;
        ghostImg.style.top = `${randomlyPositionedGhost.top}px`;


        // Add event listener to toggle ghost image on mouseover
        ghostImg.addEventListener('mouseover', toggleGhostImage);


        console.log("Ghost position:", randomlyPositionedGhost); // Log ghost positions
    }

    console.log("Ghost images:", ghostImages); // Log ghost images array

    ghostImages.forEach(ghostImg => {
        gameArea.appendChild(ghostImg);
    });
}



/*Code for changing the img source when an mouseover event is executed on any img element. 
This will toggle the source back and forth from ghost.png to net.png each time the mouseover event is triggered*/

function toggleGhostImage(event) {
    const element = event.target;
    console.log("Mouseover event triggered"); // Log to see if the function is being called
    if (element.src.endsWith('ghost.png')) {
        element.src = 'resources/net.png'; // Change to the other ghost image
        console.log("Ghost image changed to net"); // Log to see if the image source is updated
        checkIfGameOver();
    } else {
        element.src = 'resources/ghost.png'; // Change back to the original ghost image
        console.log("Ghost image changed back to original"); // Log to see if the image source is updated
    }
}





/*Checks if game is over. 
Initially sets caughtGhost to 0 every time checkIfGameOver is called and increases the caughtGhost by 1 for every caughtGhost.
In this way, caughtGhosts wont grow in value in an unintended way*/

function checkIfGameOver() {
    const ghostImages = document.querySelectorAll('#gameArea img');
    const totalGhosts = ghostImages.length;
    let caughtGhosts = 0;

    ghostImages.forEach(ghostImg => {
        if (ghostImg.src.endsWith('net.png')) {
            caughtGhosts++;
        }
    });

    console.log("Caught ghosts:", caughtGhosts); // Log the value of caughtGhosts

    if (caughtGhosts === totalGhosts) {
        console.log("Game over");

        document.querySelector('#gameArea').innerHTML = ''; //Removes all elements within the game area so another game can be played right after with a fresh game area
        document.querySelector('#formDiv').classList.remove('d-none');
        document.querySelector('#gameArea').classList.add('d-none');
        document.querySelector('#errorMsg').innerHTML = 'Grattis! Du vann :D :D :D'
        // You can add any additional game over logic here
    }
}



/*Prepares the game. Form is hidden and gamefield shown. Ghosts are generated by calling the generateGhosts function.
CheckIfGameOver is called inside the generateGhost function*/

function prepGame(){
    //Ta bort formulär och visa spelplan
    document.querySelector('#formDiv').classList.add('d-none');
    document.querySelector('#gameArea').classList.remove('d-none');
    console.log('formulär borttaget, visa spelplan');
    generateGhosts(10, 15);
    
    
}



