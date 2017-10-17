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

	function calculateClicks() {
		var diff = p1Elem.taps - p2Elem.taps;

		p1Elem.elem.style.height =  ((diff * 10) + height) + "%";
		p2Elem.elem.style.height = (100 - ((diff * 10) + height)) + "%";

		if (p1Elem.elem.style.height == "100%" || p2Elem.elem.style.height == "100%") {
			alert("the game is over");
		}
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
			addEvent(this.tapArea, 'touchend', bind(this, this.addTap), false);
		// } else {
		// 	addEvent(this.tapArea, 'click', bind(this, this.addTap), false);
		// }
		addEvent(this.tapArea, 'click', calculateClicks, false);
	}

	return {
		init: init,
		readPlayers: readPlayers
	}
})();

Taparoo.init("player1", "player2");