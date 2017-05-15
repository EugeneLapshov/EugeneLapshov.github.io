$(function () {
	showPage(1);
	
	var viewModel = function() {
		//time
		this.secondsCounter = ko.observable(0);
		
		//page1
		this.selectBoxValue = ko.observable(data[0].name);
		this.timeMin = ko.observable(1);
		this.timeSec = ko.observable(0);
		
		//page2		
		this.timer = ko.computed(function() {
			var seconds = getSeconds(timeMin(), timeSec()) - secondsCounter();
			return "Time Left: " + getTimeString(seconds);
		}, this);
		
		this.outputText = ko.computed(function() { 
			return data.filter(function(item) {
				return item.name === selectBoxValue();
			})[0].text;
		}, this);		
		this.inputText = ko.observable("");
				
		//page3
		this.time3 = ko.computed(function() {
			return getTimeString(secondsCounter());
		}, this);
		this.speed1 = ko.computed(function() {
			return speedSymbolsMin(inputText(), secondsCounter());
		}, this);
		this.speed2 = ko.computed(function() {
			return speedWordsMin(inputText(), secondsCounter());
		}, this);
		this.errors1 = ko.computed(function() {
			return errorsSymbolsInText(outputText(), inputText());
		}, this);
		this.errors2 = ko.computed(function() {
			return errorsWordsInText(outputText(), inputText());
		}, this);		
		
		//interaction (events)
		this.inputTextOnFocusIn = function(e) {			
			if(isTimerNull()) {
				var time = getSeconds(timeMin(), timeSec());
				setTimer(setInterval(function() { 
					secondsCounter(secondsCounter() + 1);
					if(secondsCounter() === time) {
						finish();
					}
				}, 1000));
			}
		};
		this.inputTextOnInput = function(e) {
			if(outputText().length === e.component.option("text").length && outputText() === e.component.option("text")) {
				finish();
			}
		};
	};		
	ko.applyBindings(viewModel);
});