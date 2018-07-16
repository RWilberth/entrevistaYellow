
	let asciDiferenceCapitalLetters = 55;
	let asciDiferenceLetters = 61;
	let mapBase10NumToBase62 = function(base10Number){
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
	}
}