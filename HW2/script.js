// IT121 HW2 by Shiro 10/6/2024
// This is a simple web page that translates a phrase into pig latin.

// get the phrase from the user
let phrase = prompt("Enter a phrase");
document.write("You entered: " + phrase + "<br>");

// if a word begins with a vowel, add "way" to the end
if (phrase.charAt(0) === "a" || 
    phrase.charAt(0) === "e" || 
    phrase.charAt(0) === "i" || 
    phrase.charAt(0) === "o" || 
    phrase.charAt(0) === "u" || 
    phrase.charAt(0) === "A" || 
    phrase.charAt(0) === "E" || 
    phrase.charAt(0) === "I" || 
    phrase.charAt(0) === "O" || 
    phrase.charAt(0) === "U") {
    document.write(phrase + "way");
// if no word
} else if (phrase.trim() === '') {
    document.write("Please enter a word");
// if a word begins with one consonant, move that letter to the end and append 'ay
} else {
    // if a word begins with one consonant and a vowel, move both to the end and append 'ay'
    if (phrase.charAt(1) === "a" || 
        phrase.charAt(1) === "e" || 
        phrase.charAt(1) === "i" || 
        phrase.charAt(1) === "o" || 
        phrase.charAt(1) === "u" || 
        phrase.charAt(1) === "A" || 
        phrase.charAt(1) === "E" || 
        phrase.charAt(1) === "I" || 
        phrase.charAt(1) === "O" || 
        phrase.charAt(1) === "U") {
        document.write(phrase.substring(1) + phrase.charAt(0) + "ay");
    }
    //if a word begins with two consonants, move both letters to the end and append 'ay':
    else
    document.write(phrase.substring(2) + phrase.charAt(0) + phrase.charAt(1) +"ay");
};