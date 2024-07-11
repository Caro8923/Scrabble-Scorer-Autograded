// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


let ans = ""; 
function initialPrompt() {
   ans = input.question("Let's play some scrabble! Enter a word: ");
   /*console.log(oldScrabbleScorer(ans));*/
   return ans;
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let key in oldPointStructure) {
      let arrayValue = oldPointStructure[key];

      for (i=0; i < arrayValue.length; i++) {
         let newKey = arrayValue[i].toLowerCase();
         newPointStructure[newKey] = Number(key);
      }
   }
    return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   let letterPoints = word.length;
   return letterPoints;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (i=0; i < word.length; i++) {
      let vowels = "AEIOUY"
      if (vowels.includes(word[i])) {
         letterPoints = letterPoints + 3
      } else {
         letterPoints = letterPoints + 1
      };
   };
   return letterPoints;
};


let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (i=0; i<word.length; i++) {
      for (let letter in newPointStructure) {
         if (word[i] === letter) {
         letterPoints += newPointStructure[letter];
         }
      }
   }
   return letterPoints;
};



const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },
   
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   },
   
]; 

function scorerPrompt() {
   let choice = input.question("Which scoring option would you like to choose? \n0 = Simple Scorer: One point per character \n1 = Vowel Bonus Scorer: Vowels are worth 3 points \n2 = Scrabble Scorer: Uses scrabble point system \nEnter 0, 1, or 2: ")
   console.log("Scoring Option:", scoringAlgorithms[choice].name);
   console.log(`Points for "${ans}": `, scoringAlgorithms[choice].scorerFunction(ans));
   return choice;
}


function runProgram() {
   initialPrompt();
   scorerPrompt();  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
