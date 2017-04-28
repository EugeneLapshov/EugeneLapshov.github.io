$(function () {
	var viewModel = function() {
		var that = this;
		
		//navigation, interaction(?)
		this.buttonClicked1 = function() { 
			showPage(2); //next()
		},
		this.buttonClicked2 = function() { 
			finish();
		},
		this.buttonClicked3 = function() {
			start();
		},
		
		//time
		this.secondsCounter = ko.observable(0);
		
		//page1
		this.selectBoxValue = ko.observable(data[0].name);
		this.timeMin = ko.observable(1);
		this.timeSec = ko.observable(0);
		
		//page2		
		this.timer = ko.computed(function() {
			var seconds = getSeconds(timeMin(), timeSec()) - secondsCounter();
			return "Time Left: " + getTime(seconds);
		}, this);
		
		this.text1 = ko.computed(function() { 
			return data.filter(function(item) {
				return item.name === selectBoxValue();
			})[0].text;
		}, this);		
		this.text2 = ko.observable("");
				
		//page3
		this.time3 = ko.computed(function() {
			return getTime(secondsCounter());
		}, this);
		this.speed1 = ko.computed(function() {
			return speedSymbolsMin(text2(), secondsCounter());
		}, this);
		this.speed2 = ko.computed(function() {
			return speedWordsMin(text2(), secondsCounter());
		}, this);
		this.errors1 = ko.computed(function() {
			return errorsSymbolsInText(text1(), text2());
		}, this);
		this.errors2 = ko.computed(function() {
			return errorsWordsInText(text1(), text2());
		}, this);		
		
		//interaction (events)
		this.text2OnFocusIn = function(e) {			
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
		this.text2OnInput = function(e) {
			if(text1().length === e.component.option("text").length && text1() === e.component.option("text")) {
				finish();
			}
		};
	};		
	ko.applyBindings(viewModel);
});