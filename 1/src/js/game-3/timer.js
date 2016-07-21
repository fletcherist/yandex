console.log('[game]: timer is connected');

var Count = 60;
var TimerCount = undefined;
var timer = document.querySelector('#timer');



// var Timer = function(count) {
// 	var count = count || 60;
// 	this.update = function(newCount) {
// 		count = newCount;
// 	}
// 	this.updateWithRelauch = function(count) {
// 		this.update(count);
// 		tick()
// 	}
// 	this._timeoutId = null
// 	tick = () => {
// 		this._timeoutId = setTimeout(() => {
// 			count--;
// 			if (count) {
// 				console.log(count, duration)
// 				tick();
// 			} else {
// 				delete Timer._instance
// 			}
// 		}, 1000);
// 	};

// 	this.stop = () => {
// 		clearTimeout(this._timeoutId);
// 		this._timeoutId = null;
// 	}
// 	this.start = function() {
// 		tick()
// 	}
// 	tick()
// };

// Timer.instance = function(count) {
// 	if (this._instance) {
// 		return this._instance
// 	} else {
// 		var timer = new Timer(count);
// 		this._instance = timer;
// 	}
// }

// Timer.update = function(count) {
// 	var _timer = this.instance();
// 	_timer.count = count
// }

// function SuperTimer(argument) {
// 	Timer.apply(this, arguments);
// 	this.stop2 = () => {
// 		console.log('STOOOOOP!')
// 		clearTimeout(this._timeoutId);
// 		this._timeoutId = null;
// 	}
// }

const startTimer = () => {
	TimerCount = setInterval(() => {
		if (Count === 0) {
			pauseTimer();
			showLoseScreen();
		}
		if (Count % 2 === 0) {
			timer.classList.add('game__timer--active');
		} else {
			timer.classList.remove('game__timer--active');
			timer.classList.remove('game__timer--start');
		}

		timer.innerHTML = Count;
		var message = document.querySelector('#message');
		if (Count === 40) {
			writeWithTimeout(message, 'Какой же ты медленный..', 0);
		}
		if (Count === 30) {
			writeWithTimeout(message, 'А ты думал<br /> в сказку попал?', 0);
		}
		if (Count === 20) {
			writeWithTimeout(message, 'Ты, кажется, забыл <br />что у тебя одна попытка!', 0);
		}
		if (Count === 15) {
			writeWithTimeout(message, 'Тяжелый случай...', 0);
		}
		if (Count === 8) {
			writeWithTimeout(message, 'Кажется, тут без шансов', 0);
		}
		Count--;
	}, 1000);
};

const initializeTimer = () => {
	timer.classList.add('game__timer--start');
	timer.innerHTML = Count;
	startTimer();
};

const pauseTimer = () => {
	clearInterval(TimerCount);
};

const resetTimer = () => {
	pauseTimer();
	Count = 60;
}

var Paused = false;
window.addEventListener('keyup', (e) => {
	if (e.which === 32 && !Paused) {
		pauseTimer();
	}
	if (e.which === 32 && Paused) {
		startTimer();
	}
	Paused = !Paused;
});

var ticker = document.querySelector('#ticktime');
const startTickTime = () => {
	writeWithTimeout(ticker, 'Ready?', 0);
	writeWithTimeout(ticker, '', 500);
	writeWithTimeout(ticker, 'Steady?', 1000);
	writeWithTimeout(ticker, '', 1500);
	writeWithTimeout(ticker, 'GO!', 2000);
}