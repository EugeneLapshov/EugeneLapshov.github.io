$(function () {
	showPage(1);
	
	var viewModel = function() {
		//time
		this.secondsCounter = ko.observable(0);
		
		//page1
		this.fragment = ko.observable(data[0].name);
		this.minutes = ko.observable(1);
		this.seconds = ko.observable(0);
		
		//page2		
		this.timer = ko.computed(function() {
			var _seconds = getSeconds(minutes(), seconds()) - secondsCounter();
			return "Time Left: " + getTimeString(_seconds);
		}, this);
		
		this.outputText = ko.computed(function() { 
			return data.filter(function(_item) {
				return _item.name === fragment();
			})[0].text;
		}, this);		
		this.inputText = ko.observable("");
				
		//page3
		this.time = ko.computed(function() {
			return getTimeString(secondsCounter());
		}, this);
		this.SPM = ko.computed(function() {
			return speedSymbolsMin(inputText(), secondsCounter());
		}, this);
		this.WPM = ko.computed(function() {
			return speedWordsMin(inputText(), secondsCounter());
		}, this);
		this.errors = ko.computed(function() {
			return errorsWordsInText(outputText(), inputText());
		}, this);		
		
		//interaction (events)
		this.onFocusIn = function(e) {			
			if(isTimerNull()) {
				var _time = getSeconds(minutes(), seconds());
				setTimer(setInterval(function() { 
					secondsCounter(secondsCounter() + 1);
					if(secondsCounter() === _time) {
						finish();
					}
				}, 1000));
			}
		};
		this.onInput = function(e) {
			var _outputText = outputText(),
				_inputText = e.component.option("text");
			if(_outputText.length === _inputText.length && _outputText === _inputText) {
				finish();
			}
		};
	};
	ko.applyBindings(viewModel);
});