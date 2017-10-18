var Countdown = (function() {
	var overlay = document.getElementById("overlay"),
		counter = document.getElementById("countdown");

	function init() {
		overlay.style.display= "flex";
		counter.textContent = "5";
		startCountdown();
	}

	function startCountdown() {
		var timeleft = 5;
		var downloadTimer = setInterval(function(){
		  	counter.textContent =  --timeleft;
		  	if(timeleft <= 0) {
		  		overlay.style.display= "none";
				counter.style.display= "none";
		    	clearInterval(downloadTimer);
			}
		},1000);
	}

	return {
		init: init
	}
})();