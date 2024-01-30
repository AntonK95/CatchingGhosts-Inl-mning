'use strict';

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
});












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