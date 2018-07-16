
	var asciDiferenceCapitalLetters = 55;
	var asciDiferenceLetters = 61;
	var mapBase10NumToBase62 = function(base10Number){
		var asciiNumber = base10Number;
		if(base10Number >= 10 && base10Number <= 35){
			asciiNumber = base10Number + asciDiferenceCapitalLetters;
		}else if(base10Number >= 36 && base10Number <= 61){
			asciiNumber = base10Number + asciDiferenceLetters;
		}else{
			return base10Number;
		}
		return String.fromCharCode(asciiNumber);
	}
	var mapBase62NumToBase10 = function(base62Number){
		var asciiNumber = base62Number.charCodeAt(0);
		var numberBase10 = base62Number;
		if(asciiNumber >= 65 && asciiNumber <= 90){
			numberBase10 = asciiNumber - asciDiferenceCapitalLetters;
		}
		else if(asciiNumber >= 97 && asciiNumber <= 122){
			numberBase10 = asciiNumber - asciDiferenceLetters;
		}
		return parseInt(numberBase10);
	}
module.exports = {
	convertBase10ToBase62: function(number){
		var base = 62;
		var resultBase = [];
		if(number > 0){
			do{
				var res = number % base;
				var base62 = mapBase10NumToBase62(res);
				resultBase.push(base62);
				number = Math.trunc(number / base);
			}while(number > 0);	
			return resultBase.reverse().join('');
		}
	},
	convertBase62ToBase10: function(number){
		var arrayNumber = number.split('').reverse();
		var base = 62;
		var numberResult = 0;
		for(var i = 0; i < arrayNumber.length; i++){
			var currentNumberBase62 = arrayNumber[i];
			var numberBase10 = mapBase62NumToBase10(currentNumberBase62);
			numberBase10 = numberBase10 * Math.pow(base, i);
			numberResult = numberResult + numberBase10;
		}
		return numberResult;
	}
}