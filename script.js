const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');

// to generate the password we are going to use the ASCII codes for different characters.
const lowerCaseCharCodes = arrayFromLowToHigh(97, 122);
const upperCaseCharCodes = arrayFromLowToHigh(65, 90);
const numberCharCodes = arrayFromLowToHigh(48,57);
const symbolCharCodes = arrayFromLowToHigh(33,47)
        .concat(arrayFromLowToHigh(58,64))
        .concat(arrayFromLowToHigh(91, 96))
        .concat(arrayFromLowToHigh(123, 126));
//symbols in ASCII characters are dispersed in a number of ranges so we used the .concat method to append all the symbols to a single array

characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

//this .addEventListener is used for the password generator div  which takes the input from the checkboxes and the button
form.addEventListener('submit', event => {
    event.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    passwordDisplay.innerText = password;
});

function generatePassword(characterAmount, includeUppercase, includeNumbers,includeSymbols) {
    let charCodes = lowerCaseCharCodes;//this assigns the charCodes to the lowercase default values
    if(includeUppercase) {//returns true if the checkbox is checked
        charCodes = charCodes.concat(upperCaseCharCodes);
    }
    if(includeSymbols) {//returns true if the checkbox is checked
        charCodes = charCodes.concat(symbolCharCodes);
    }
    if(includeNumbers) {//returns true if the checkbox is checked
        charCodes = charCodes.concat(numberCharCodes);
    }
    const passwordCharacters =[];
    //for loop to add the charCodes to the passwordCharacter array after generating them randomly
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}

function arrayFromLowToHigh(low, high) {
    const array = [];
    for(let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}

