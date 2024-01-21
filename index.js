/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(game => { 
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");
        // add the class game-card to the list
        gameCard.classList.add("game-card");
            
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img"/>
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
      `;

        // append the game to the games-container
        document.getElementById("games-container").appendChild(gameCard);
    });

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const IndividualContributions = GAMES_JSON.reduce(
    (accumulator, currentValue) => accumulator + currentValue.backers,
    0,
  );

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = IndividualContributions.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raisedCardTotal = GAMES_JSON.reduce(
    (accumulator, currentValue) => accumulator + currentValue.pledged,
    0,
  );

// set inner HTML using template literal
raisedCard.innerHTML = `$${raisedCardTotal.toLocaleString('en-US')}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGamesCard = GAMES_JSON.length;

// set inner HTML using template literal
gamesCard.innerHTML = totalGamesCard;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal    
    let games = GAMES_JSON.filter(game => game.goal > game.pledged);

    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games)

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let games = GAMES_JSON.filter(game => game.goal <= game.pledged)


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(games)

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.reduce((count, game) => (
    game.pledged < game.goal ? count + 1 : count
  ), 0);
  console.log(numberOfUnfundedGames)


// create a string that explains the number of unfunded games using the ternary operator
  const statement = `A total of $${raisedCardTotal.toLocaleString('en-US')} has been  raised for ${
    GAMES_JSON.length} games. Currently, ${numberOfUnfundedGames === 1 ? '1 game' : ` ${numberOfUnfundedGames} games`
    } remain unfunded. We need your help to fund these amazing games!`;
    console.log(statement)
// create a new DOM element containing the template string and append it to the description container

const paragrap = document.createElement("p");
paragrap.innerHTML = statement;
descriptionContainer.appendChild(paragrap);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

firstGameContainer.classList.add("top-game-container");
secondGameContainer.classList.add("top-game-container");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...remainingGames] = sortedGames;
console.log(firstGame.name)
console.log(secondGame.name)

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement('p');
firstGameElement.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement)

// do the same for the runner up item
const secondGameGameElement = document.createElement('p');
secondGameGameElement.textContent = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameGameElement)


/************************************************************************************
 * Customisation */
const searchInput = document.getElementById("searchInput");

// show only games that do not yet have enough funding
function searchGames() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal    
    let games = GAMES_JSON.filter(game => 
       // game.name.toLowerCase().includes(searchInput));

        game.name.includes(searchInput.value));
        
    console.log(games)
    console.log(searchInput.value)
    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games)

}


// Add an event listener to handle input changes
searchInput.addEventListener("input", searchGames);

