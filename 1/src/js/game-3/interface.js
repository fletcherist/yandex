console.log('[game]: interface module is connected');
var vector = {
	start: {x: 0, y: 0},
	end: {x: 0, y: 0}
}

const clearClasses = (elem) => {
	elem.classList.remove('game__element--null');
	for (var i = 0; i < 9; i++) {
		elem.classList.remove('game__element--' + i);	
	}
};
const render = () => {
	var count = 0;
	for (var i=0; i<3; i++) {
		for (var e=0; e<3; e++) {
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

const initializeEventListeners = () => {
	window.addEventListener('keydown', (e) => {
		switch (e.keyCode) {
			case 38: // top
				swapToTop();
				break;
			case 39: // right
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

	window.addEventListener('pointerdown', e => {
		vector.start.x = e.x;
		vector.start.y = e.y;
	});

	window.addEventListener('pointerup', e => {
		vector.end.x = e.x;
		vector.end.y = e.y;
		swipesHandler();
	});
}

const swipesHandler = () => {
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

const resetVector = () => {
	vector.start.x = 0;
	vector.start.y = 0;
	vector.end.x = 0;
	vector.end.y = 0;
};

const calculateDirection = () => {
	var diffY = vector.end.y - vector.start.y;
	var diffX = vector.end.x - vector.start.x;
	var dir = '';

	if (Math.abs(diffY) > Math.abs(diffX)) {
		if (diffY < 0) {
			dir =  'top'; // swipe to the top
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

const writeWithTimeout = (element, text, delay) => {
	setTimeout(() => {
		element.innerHTML = text;
	}, delay);
};