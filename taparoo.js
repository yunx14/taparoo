var Taparoo = (function() {
	var p1Elem = {},
		p2Elem = {},
		height = 50,
		targetClicks = 10;

	function init(p1, p2) {
		p1Elem = new Player(document.getElementById(p1));
		p2Elem = new Player(document.getElementById(p2));

	}

	function addEvent(el, type, handler){
        if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }

    function bind(scope, fn) {
	   return function() {
	      return fn.apply(scope, arguments);
	   }
	}

	function readPlayers() {
		console.log(p1Elem, p2Elem);
	}

	function refreshPage() {
		location.reload();
	}

	function calculateClicks() {
		var diff = p1Elem.taps - p2Elem.taps;

		p1Elem.elem.style.height =  ((diff * 10) + height) + "%";
		p2Elem.elem.style.height = (100 - ((diff * 10) + height)) + "%";

		if (p1Elem.elem.style.height == "100%") {
			gameOver(p1Elem.name);
		} else if (p2Elem.elem.style.height == "100%") {
			gameOver(p2Elem.name);
		}
	}

	function gameOver(winner) {
		var overlay = document.getElementById("overlay");
		var overlayP = document.getElementById("winner");
		var overlayText = winner + " Wins! <br><br> Rematch!" ;

		overlayP.innerHTML = overlayText;
		addEvent(overlayP, "click", refreshPage);
		overlay.style.display = "flex";
		overlayP.style.display = "flex";

	}

	var Player = function(elem) {
		this.elem = elem,
		this.taps = 0,
		this.name = elem.id,
		this.tapArea = elem.getElementsByClassName("tap")[0];

		this.init();
	}

	Player.prototype.addTap = function() {
		this.taps++;
	};

	Player.prototype.sayMyName = function() {
		console.log(this.name, this.taps);
	};

	Player.prototype.init = function() {
		// if ('ontouchstart' in document.documentElement) {
			addEvent(this.tapArea, 'touchstart', bind(this, this.addTap), false);
		// } else {
		// 	addEvent(this.tapArea, 'click', bind(this, this.addTap), false);
		// }
		addEvent(this.tapArea, 'touchstart', calculateClicks, false);
	}

	return {
		init: init,
		readPlayers: readPlayers
	}
})();