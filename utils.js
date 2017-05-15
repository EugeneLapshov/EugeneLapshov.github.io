﻿function getTimer() {
	return window.timerId;
}

function setTimer(id) {
	window.timerId = id;
}

function isTimerNull() {
	return !getTimer();
}

function getSeconds(min, sec) {
	return 60 * min + sec;
}

function getTimeString(seconds) {
	var min = Math.floor(seconds / 60);
	var sec = seconds - 60 * min;
	return min + " min " + sec + " sec";
}

function speedSymbolsMin(text, time) {
	var speed = 0;
	if(time !== 0)
		speed = ((text.length / time) * 60).toFixed();
	return speed + " characters/min";
}

function speedWordsMin(text, time) {
	var speed = 0;
	if(time !== 0)
		speed = ((text.split(" ").length / time) * 60).toFixed();
	return speed + " words/min";
}

function errorsSymbolsInText(outputText, text2) {
	var symbols = text2.split("");
	
	var errors = 0;
	outputText.split("").forEach(function(symbol, i, arr) {
		if(symbol !== symbols[i]) {
			errors++;
		}
	});
	return (errors / outputText.split("").length * 100).toFixed() + "%";
}

function errorsWordsInText(outputText, text2) {
	var words = text2.split(" ");
	
	var errors = 0;
	outputText.split(" ").forEach(function(word, i, arr) {
		if(word !== words[i]) {
			errors++;
		}
	});
	return (errors / outputText.split(" ").length * 100).toFixed() + "%";
}

function showPage(pageIndex) {
	$(".page").hide();
	$(".page" + pageIndex).show();		
};

function start() {
	showPage(2);
}

function finish() {
	clearInterval(getTimer());
	setTimer(null);
	showPage(3);
}

function newTest() {
	secondsCounter(0);	
	fragment(data[0].name);
	minutes(1);
	seconds(0);	
	inputText("");	
	showPage(1);
}