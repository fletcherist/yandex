'use strict';

console.log('[game]: logic module is connected');
var gameObj = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

var getXY = function getXY(number) {
	var x = 0;
	var y = 0;
	for (var i = 0; i < 3; i++) {
		for (var e = 0; e < 3; e++) {
			if (gameObj[i][e] === number) {
				x = e;
				y = i;
			}
		}
	};
	return { x: x, y: y };
};

var getNumber = function getNumber(number) {
	var count = 0;
	for (var i = 0; i < 3; i++) {
		for (var e = 0; e < 3; e++) {
			count++;
			if (gameObj[i][e] === number) {
				return count;
			}
		}
	};
};

var getCurrentPosition = function getCurrentPosition() {
	return getXY(0);
};

var canSwapToLeft = function canSwapToLeft() {
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	if (!gameObj[y][x - 1]) {
		return false;
	}
	return true;
};

var swapToLeft = function swapToLeft(fast) {
	if (!canSwapToLeft()) {
		return false;
	}
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	var leftPos = gameObj[y][x - 1];
	gameObj[y][x] = leftPos;
	gameObj[y][x - 1] = 0;

	animationSwapLeft(leftPos, fast);
	checkIfDone();
	return gameObj;
};

var canSwapToRight = function canSwapToRight() {
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	if (!gameObj[y][x + 1]) {
		return false;
	}
	return true;
};

var swapToRight = function swapToRight(fast) {
	if (!canSwapToRight()) {
		return false;
	}
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	var rightPos = gameObj[y][x + 1];
	gameObj[y][x] = rightPos;
	gameObj[y][x + 1] = 0;

	animationSwapRight(rightPos, fast);
	checkIfDone();
	return gameObj;
};

var canSwapToTop = function canSwapToTop() {
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	if (!gameObj[y - 1]) {
		return false;
	}
	return true;
};

var swapToTop = function swapToTop(fast) {
	if (!canSwapToTop()) {
		return false;
	}
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	var topPos = gameObj[y - 1][x];
	gameObj[y][x] = topPos;
	gameObj[y - 1][x] = 0;

	animationSwapTop(topPos, fast);
	checkIfDone();
	return gameObj;
};

var canSwapToBottom = function canSwapToBottom() {
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	if (!gameObj[y + 1]) {
		return false;
	}
	return true;
};

var swapToBottom = function swapToBottom(fast) {
	if (!canSwapToBottom()) {
		return false;
	}
	var pos = getCurrentPosition();
	var y = pos.y;
	var x = pos.x;

	var bottomPos = gameObj[y + 1][x];
	gameObj[y][x] = bottomPos;
	gameObj[y + 1][x] = 0;

	animationSwapBottom(bottomPos, fast);
	checkIfDone();
	return gameObj;
};

var getRandomNumber = function getRandomNumber(min, max) {
	var rand = Math.floor(Math.random() * (max + 1) + min);
	return rand;
};

var gen2Numbers = function gen2Numbers() {
	var first = 0;
	var second = 0;
	while (first === second) {
		first = getRandomNumber(0, 8);
		second = getRandomNumber(0, 8);
	}
	return [first, second];
};

var generateRandomTree = function generateRandomTree() {
	for (var i = 10; i >= 0; i--) {
		var numbers = gen2Numbers();
		swap2Numbers(numbers[0], numbers[1]);
	}
};

var checkIfDone = function checkIfDone() {
	var count = 1;
	for (var i = 0; i < 3; i++) {
		for (var e = 0; e < 3; e++) {
			if (count === 9 && gameObj[i][e] === 0) {
				console.log('you win!');
				pauseTimer();
				showWinScreen();
				return true;
			}

			if (gameObj[i][e] !== count) {
				return false;
			}
			count++;
		}
	}
};

var swap2Numbers = function swap2Numbers(first, second) {
	var firstPos = getXY(first);
	var secondPos = getXY(second);
	var tmp = gameObj[firstPos.y][firstPos.x];
	gameObj[firstPos.y][firstPos.x] = second;
	gameObj[secondPos.y][secondPos.x] = first;
	return gameObj;
};

var smashThaGame = function smashThaGame() {
	var count = 60;
	var interval = setInterval(function () {
		var direction = getRandomNumber(1, 3);
		switch (direction) {
			case 1:
				if (canSwapToTop()) {
					swapToTop(true);
				} else {
					swapToBottom(true);
				}
				break;
			case 2:
				if (canSwapToRight()) {
					swapToRight(true);
				} else {
					swapToLeft(true);
				}
				break;
			case 3:
				if (canSwapToBottom()) {
					swapToBottom(true);
				} else {
					swapToTop(true);
				}
				break;
			case 4:
				if (canSwapToLeft()) {
					swapToLeft(true);
				} else {
					swapToRight();
				}
				break;
			default:
				swapToTop(true);
				break;
		}

		count--;
		if (count < 0) {
			clearInterval(interval);
		}
	}, 100);
};

console.log('[game]: animation library is connected.');

var Margin = 10;
var AnimationDuration = 200;

var Width = 150;
var Height = 150;
var NullElement;

var getWidthAndHeight = function getWidthAndHeight() {
	NullElement = document.querySelector('.game__element--0');
	Width = NullElement.clientWidth;
	Height = NullElement.clientHeight;
};
var animationSwapLeft = function animationSwapLeft(leftPos, fast) {
	getWidthAndHeight();
	var leftElement = document.querySelector('.game__element--' + leftPos);

	NullElement.style.transform = 'translateX(' + (-Width - Margin) + 'px)';
	leftElement.style.transform = 'translateX(' + (Width + Margin) + 'px)';
	resetAnimations(NullElement, leftElement, fast);
};

var animationSwapRight = function animationSwapRight(rightPos, fast) {
	getWidthAndHeight();
	var rightElement = document.querySelector('.game__element--' + rightPos);

	NullElement.style.transform = 'translateX(' + (Width + Margin) + 'px)';
	rightElement.style.transform = 'translateX(' + (-Width - Margin) + 'px)';
	resetAnimations(NullElement, rightElement, fast);
};

var animationSwapTop = function animationSwapTop(topPos, fast) {
	getWidthAndHeight();
	var topElement = document.querySelector('.game__element--' + topPos);

	NullElement.style.transform = 'translateY(' + (-Height - Margin) + 'px)';
	topElement.style.transform = 'translateY(' + (Height + Margin) + 'px)';
	resetAnimations(NullElement, topElement, fast);
};

var animationSwapBottom = function animationSwapBottom(bottomPos, fast) {
	getWidthAndHeight();
	var bottomElement = document.querySelector('.game__element--' + bottomPos);

	NullElement.style.transform = 'translateY(' + (Height + Margin) + 'px)';
	bottomElement.style.transform = 'translateY(' + (-Height - Margin) + 'px)';
	resetAnimations(NullElement, bottomElement, fast);
};

var resetAnimations = function resetAnimations(firstElement, secondElement, fast) {
	var duration = AnimationDuration;
	var timeoutDuration = 50;
	if (fast) {
		duration = 30;
		timeoutDuration = 10;
	}
	setTimeout(function () {
		// reset translate
		firstElement.style.transition = 'transform 0s';
		firstElement.style.webkitTransition = 'transform 0s';
		firstElement.style.transform = '';

		secondElement.style.transition = 'transform 0s';
		secondElement.style.webkitTransition = 'transform 0s';
		secondElement.style.transform = '';
		// reset transitions to default

		setTimeout(function () {
			firstElement.style.transition = 'transform .' + AnimationDuration / 100 + 's';
			firstElement.style.webkitTransition = 'transform .' + AnimationDuration / 100 + 's';

			secondElement.style.transition = 'transform .' + AnimationDuration / 100 + 's';
			secondElement.style.webkitTransition = 'transform .' + AnimationDuration / 100 + 's';
		}, timeoutDuration);

		render();
	}, duration);
};

console.log('[game]: interface module is connected');
var vector = {
	start: { x: 0, y: 0 },
	end: { x: 0, y: 0 }
};

var clearClasses = function clearClasses(elem) {
	elem.classList.remove('game__element--null');
	for (var i = 0; i < 9; i++) {
		elem.classList.remove('game__element--' + i);
	}
};
var render = function render() {
	var count = 0;
	for (var i = 0; i < 3; i++) {
		for (var e = 0; e < 3; e++) {
			var str = 'e' + count;
			var elem = document.getElementById(str);
			clearClasses(elem);

			elem.innerHTML = gameObj[i][e];
			elem.classList.add('game__element--' + gameObj[i][e]);

			if (gameObj[i][e] === 0) {
				elem.classList.add('game__element--null');
			}
			count++;
		}
	}
};

var initializeEventListeners = function initializeEventListeners() {
	window.addEventListener('keydown', function (e) {
		switch (e.keyCode) {
			case 38:
				// top
				swapToTop();
				break;
			case 39:
				// right
				swapToRight();
				break;
			case 40:
				swapToBottom();
				break;
			case 37:
				swapToLeft();
				break;
		}
	});

	window.addEventListener('pointerdown', function (e) {
		vector.start.x = e.x;
		vector.start.y = e.y;
	});

	window.addEventListener('pointerup', function (e) {
		vector.end.x = e.x;
		vector.end.y = e.y;
		swipesHandler();
	});
};

var swipesHandler = function swipesHandler() {
	var direction = calculateDirection();
	switch (direction) {
		case 'top':
			swapToTop();
			break;
		case 'bottom':
			swapToBottom();
			break;
		case 'left':
			swapToLeft();
			break;
		case 'right':
			swapToRight();
			break;
	}
};

var resetVector = function resetVector() {
	vector.start.x = 0;
	vector.start.y = 0;
	vector.end.x = 0;
	vector.end.y = 0;
};

var calculateDirection = function calculateDirection() {
	var diffY = vector.end.y - vector.start.y;
	var diffX = vector.end.x - vector.start.x;
	var dir = '';

	if (Math.abs(diffY) > Math.abs(diffX)) {
		if (diffY < 0) {
			dir = 'top'; // swipe to the top
		} else {
			dir = 'bottom'; // swipe to the bottom
		}
	} else {
		if (diffX < 0) {
			dir = 'left'; // swipe to the left
		} else {
			dir = 'right'; // swipe to the right
		}
	}

	return dir;
};

var writeWithTimeout = function writeWithTimeout(element, text, delay) {
	setTimeout(function () {
		element.innerHTML = text;
	}, delay);
};
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

var startTimer = function startTimer() {
	TimerCount = setInterval(function () {
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

var initializeTimer = function initializeTimer() {
	timer.classList.add('game__timer--start');
	timer.innerHTML = Count;
	startTimer();
};

var pauseTimer = function pauseTimer() {
	clearInterval(TimerCount);
};

var resetTimer = function resetTimer() {
	pauseTimer();
	Count = 60;
};

var Paused = false;
window.addEventListener('keyup', function (e) {
	if (e.which === 32 && !Paused) {
		pauseTimer();
	}
	if (e.which === 32 && Paused) {
		startTimer();
	}
	Paused = !Paused;
});

var ticker = document.querySelector('#ticktime');
var startTickTime = function startTickTime() {
	writeWithTimeout(ticker, 'Ready?', 0);
	writeWithTimeout(ticker, '', 500);
	writeWithTimeout(ticker, 'Steady?', 1000);
	writeWithTimeout(ticker, '', 1500);
	writeWithTimeout(ticker, 'GO!', 2000);
};
var startMessage = document.querySelector('#start');
var progressMessage = document.querySelector('#progress');
var preparation = document.querySelector('#preparation');
var winMessage = document.querySelector('#success');
var loseMessage = document.querySelector('#fail');
var isGameStarted = false;

var gamePole = document.querySelector('#gamePole');

var showStartMessage = function showStartMessage() {
	startMessage.classList.add('show');
	startMessage.classList.remove('hidden');
};

var hideStartMessage = function hideStartMessage() {
	startMessage.classList.remove('show');
	startMessage.classList.add('hidden');
};

var showProgressMessage = function showProgressMessage() {
	progressMessage.classList.add('show');
	progressMessage.classList.remove('hidden');
};

var hideProgressMessage = function hideProgressMessage() {
	progressMessage.classList.remove('show');
	progressMessage.classList.add('hidden');
};

var showPreparation = function showPreparation() {
	preparation.classList.remove('hidden');
	preparation.classList.add('show');
};

var hidePreparation = function hidePreparation() {
	preparation.classList.add('hidden');
	preparation.classList.remove('show');
};

var showWinMessage = function showWinMessage() {
	winMessage.classList.add('show');
	winMessage.classList.remove('hidden');
	setTimeout(function () {
		console.log(document.querySelector('#gamePrize'));
		console.log(document.querySelector('#gamePole'));
	}, 2000);
};

var hideWinMessage = function hideWinMessage() {
	winMessage.classList.add('hidden');
	winMessage.classList.remove('show');
};

var step1 = function step1() {
	return new Promise(function (resolve) {
		gamePole.classList.add('safe__bg--gray');
		smashThaGame();

		setTimeout(function () {
			resolve();
		}, 7000);
	});
};

var step2 = function step2() {
	return new Promise(function (resolve) {
		hideStartMessage();
		showPreparation();
		startTickTime();

		setTimeout(function () {
			gamePole.classList.remove('safe__bg--gray');
			resolve();
		}, 3000);
	});
};

var step3 = function step3() {
	return new Promise(function (resolve) {
		setTimeout(function () {
			hidePreparation();
			showProgressMessage();
			initializeTimer();
			isGameStarted = !isGameStarted;
		}, 1000);
	});
};

var showWinScreen = function showWinScreen() {
	if (isGameStarted) {
		gamePole.classList.add('safe__bg--win');
		document.querySelector('#level3').classList.add('background--win');
		hideProgressMessage();
		showWinMessage();
	}
};

var showLoseScreen = function showLoseScreen() {
	hideStartMessage();
	hideProgressMessage();
	hidePreparation();
	loseMessage.classList.add('show');
	loseMessage.classList.remove('hidden');
	gamePole.classList.add('safe__bg--gray');
	document.querySelector('#level3').classList.add('background--lose');
};

var initGame3 = function initGame3() {
	console.log('[game]: initializing game 3');
	// generateRandomTree();
	initializeEventListeners();
	hideProgressMessage();
	hidePreparation();
	showStartMessage();
	render();

	setTimeout(function () {
		step1().then(function (res) {
			return step2();
		}).then(function (res) {
			return step3();
		});
	}, 1000);
};

var resetGame = function resetGame() {
	resetTimer();
	hideProgressMessage();
	hidePreparation();
	hideWinMessage();
	showStartMessage();

	loseMessage.classList.add('hidden');
	loseMessage.classList.remove('show');
	document.querySelector('#level3').classList.remove('background--lose', 'background--win');
};