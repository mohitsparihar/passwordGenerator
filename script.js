(function () {
    const app = {
        init: function () {
            this.cacheElements();
            this.bindElements();
        },
        cacheElements: function () {
            this.characterAmountRange = document.getElementById('characterAmountRange');
            this.characterAmountNumber = document.getElementById('characterAmountNumber');
            this.includeUppercaseElement = document.getElementById('includeUppercase');
            this.includeNumbersElement = document.getElementById('includeNumbers');
            this.includeSymbolsElement = document.getElementById('includeSymbols');
            this.form = document.getElementById('passwordGeneratorForm');
            this.passwordDisplay = document.getElementById('passwordDisplay');

            this.lowerCaseCharCodes = this.range(97, 122);
            this.upperCaseCharCodes = this.range(65, 90);
            this.numberCharCodes = this.range(48, 57);
            this.symbolCharCodes = this.range(33, 47)
                .concat(this.range(58, 64))
                .concat(this.range(91, 96))
                .concat(this.range(123, 126));
        },
        bindElements: function () {
            this.characterAmountNumber.addEventListener('input', this.syncCharacterAmount.bind(this));
            this.characterAmountRange.addEventListener('input', this.syncCharacterAmount.bind(this));

            //this .addEventListener is used for the password generator div  which takes the input from the checkboxes and the button
            this.form.addEventListener('submit', event => {
                event.preventDefault();
                const characterAmount = this.characterAmountNumber.value;
                const includeUppercase = this.includeUppercaseElement.checked;
                const includeNumbers = this.includeNumbersElement.checked;
                const includeSymbols = this.includeSymbolsElement.checked;
                const password = this.generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
                this.passwordDisplay.innerText = password;
            });

        },

        generatePassword: function (characterAmount, includeUppercase, includeNumbers, includeSymbols) {
            const charCodesArray = [this.lowerCaseCharCodes]

            // let charCodes = this.lowerCaseCharCodes;//this assigns the charCodes to the lowercase default values
            if (includeUppercase) {//returns true if the checkbox is checked
                charCodesArray.push(this.upperCaseCharCodes);
            }
            if (includeSymbols) {//returns true if the checkbox is checked
                charCodesArray.push(this.symbolCharCodes);
            }
            if (includeNumbers) {//returns true if the checkbox is checked
                charCodesArray.push(this.numberCharCodes);
            }


            const passwordCharacters = [];
            //for loop to add the charCodes to the passwordCharacter array after generating them randomly
            for (let i = 0, j = 0; i < characterAmount; i++) {
                const characterCode = charCodesArray[j][Math.floor(Math.random() * charCodesArray[j].length)];
                j++;
                if (j >= charCodesArray.length) {
                    j = 0;
                }
                passwordCharacters.push(String.fromCharCode(characterCode));
            }
            return _.shuffle(passwordCharacters).join('');
        },

        range: function (s,e) {
            return _.range(s,e+1);
        },

        syncCharacterAmount: function (e) {
            const value = e.target.value;
            this.characterAmountNumber.value = value;
            this.characterAmountRange.value = value;
        }
    }

    app.init();
}());


