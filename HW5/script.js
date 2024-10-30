
// IT121 HW5 by Shiro Ishii 10/27/2024 
// JavaScript arrays, functions, and objects to create a simple card-dealing program that can generate 5-card combinations (hands).


  // define the array of values and suites *JUST ARRAY* 
  const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];

  // define Card object
  //function Card(suit, value, image, backimage) {
  function Card(suit, value) {
    this.suit = suit;
    this.value = value;
  //  this.image = image;           image location for the future personal card game
  //  this.backimage = backimage;   image location for the future personal card game :-)
  }

  // define empty "deck" *JUST ARRAY* 
  const deck = [];

  // populate the deck *Card OBJECT to "deck" array*
  for (let suit of suits) {
    for (let value of values) {
        deck.push(new Card(suit, value));
        //deck.push(new Card(suit, value, image, backimage));
    }
}

  const dealHand = () => {

    /* code to deal a card hand goes here */
    //empty array for the hand * just STRING array *
    var hand = ["empty", "empty", "empty", "empty", "empty"];

    var i = 0;  //counts cards for the hand

    while (hand[4] == "empty"){   //draw till 3 cards are dealt

      // pick a card *random number*
      var picked = Math.floor(Math.random()*52);

      //check for duplications, then deal
      if (deck[picked] != "dealt") {
        hand[i] = deck[picked];
        deck[picked] = "dealt";
        i++;
        }  // if body
    } // while body

// Use innerHTML to display the deck
//  let output = "<h2>Deck of Cards:</h2>";
//  deck.forEach(card => {
//    output += `${card.value} of ${card.suit}<br>`;
//  });
  
  //document.getElementById("card_hand").innerHTML = output;

    // update 'card_hand' DIV with appropriate information
    //$("#card_hand").html("Button clicked");
    //document.getElementById("card_hand").innerHTML += "<p>Button clicked</p>";
    //document.write(hand.toString());
    //const dealtCards = hand.map(card => `${card.value} of ${card.suit}`).join(', ');
    //document.getElementById("card_hand").innerHTML = `<p>Button clicked: ${hand[1]}</p>`;
    document.getElementById("card_hand").innerHTML = `
      <p>Button clicked: <p>
      ${hand[0].value} of ${hand[0].suit}<br>
      ${hand[1].value} of ${hand[1].suit}<br>
      ${hand[2].value} of ${hand[2].suit}<br>
      ${hand[3].value} of ${hand[3].suit}<br>
      ${hand[4].value} of ${hand[4].suit}</p>`;

    return false; // prevent page reload
  }

