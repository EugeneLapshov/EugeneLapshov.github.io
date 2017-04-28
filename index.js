$(function () {
	// TODO: add your code here
			
	
	
	//ViewModel	
	var viewModel = function() {
		var that = this;
		
		//navigation, interaction(?)
		this.buttonText1 = "Start Typing Test",
		this.buttonText2 = "Finish Test",
		this.buttonText3 = "New Test",
		this.buttonClicked1 = function() { 
			showView(2); //next()
		},
		this.buttonClicked2 = function() { 
			finish();
		},
		this.buttonClicked3 = function() {
			start();
		},
		
		//time
		this.secondsCounter = ko.observable(0);
		
		//view1
		this.selectBoxValue = ko.observable(data[0].name);
		this.timeMin = ko.observable(1);
		this.timeSec = ko.observable(0);
		
		//view2		
		this.timer = ko.computed(function() {
			var seconds = getSeconds(timeMin(), timeSec()) - secondsCounter();
			return "Time: " + getTime(seconds);
		}, this);
		
		this.text1 = ko.computed(function() { 
			return data.filter(function(item) {
				return item.name === selectBoxValue();
			})[0].text;
		}, this);		
		this.text2 = ko.observable("");
				
		//view3
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
				setTimer(setInterval(function() { 
					secondsCounter(secondsCounter() + 1);
					if(secondsCounter() === getSeconds(timeMin(), timeSec())) {
						finish();
					}
				}, 1000));
			}
		};
		this.text2OnInput = function(e) {
			if(text1().length === e.component.option("text").length && text1() === e.component.option("text")) {
				finish();
				
				//text2(component.text) или снять при анфокусе
			}
		};
	};		
	ko.applyBindings(viewModel);
	
});