function showView(viewIndex) {
	$(".view").hide();
	$(".view" + viewIndex).show();		
};


function getTimer() {
	return window.time;
}
	
function setTimer(id) {
	window.time = id;
}

function isTimerNull() {
	return !getTimer();
}


function getSeconds(min, sec) { //cconvert?
	return 60 * min + sec;
}

function getTime(seconds) { //convert?
	var min = Math.floor(seconds / 60);
	var sec = seconds - 60 * min;
	return min + " min " + sec + " sec";
}

function speedSymbolsMin(text, time) {
	return text.length / time * 60 + " symbols/min";
}

function speedWordsMin(text, time) {
	return text.split(" ").length / time * 60 + " words/min";
}

function errorsSymbolsInText(text1, text2) {
	var symbols = text2.split("");
	
	var errors = 0;
	text1.split("").forEach(function(symbol, i, arr) {
		if(symbol !== symbols[i]) {
			errors++;
		}
	});
	return errors + "/" + text1.split("").length;
}

function errorsWordsInText(text1, text2) {
	var words = text2.split(" ");
	
	var errors = 0;
	text1.split(" ").forEach(function(word, i, arr) {
		if(word !== words[i]) {
			errors++;
		}
	});
	return errors + "/" + text1.split(" ").length;
}

function start() {
	//обнулить все переменные
}

function finish() {
	clearInterval(getTimer());
	setTimer(null);
	showView(3);
}