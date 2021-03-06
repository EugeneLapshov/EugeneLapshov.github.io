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

function calculateSPM(text, seconds) {
	var speed = 0;
	if(seconds !== 0)
		speed = (text.length / seconds * 60).toFixed();
	return speed + " characters/min";
}

function calculateWPM(text, seconds) {
	var speed = 0;
	if(seconds !== 0)
		speed = (text.split(" ").length / seconds * 60).toFixed();
	return speed + " words/min";
}

function calculateErrors(outputText, inputText) {
	var numberOfErrors = 0,
		inputWords = inputText.split(" "),
		outputWords = outputText.split(" ");	
	outputWords.forEach(function(outputWord, i) {
		if(outputWord !== inputWords[i]) {
			numberOfErrors++;
		}
	});
	return (numberOfErrors / outputWords.length * 100).toFixed() + "%";
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