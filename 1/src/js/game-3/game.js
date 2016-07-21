console.log('[game]: logic module is connected');
var gameObj = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 0]
];

const getXY = (number) => {
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
	return {x: x, y: y};
};

const getNumber = (number) => {
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

const getCurrentPosition = () => {
	return getXY(0);
}

const canSwapToLeft = () => {
	const pos = getCurrentPosition();
	const { y, x } = pos;
	if (!gameObj[y][x-1]) {
		return false;
	}
	return true;
}

const swapToLeft = (fast) => {
	if (!canSwapToLeft()) {
		return false;
	}
	var pos = getCurrentPosition();
	const { y, x } = pos;
	var leftPos = gameObj[y][x-1];
	gameObj[y][x] = leftPos;
	gameObj[y][x-1] = 0;

	animationSwapLeft(leftPos, fast);
	checkIfDone();
	return gameObj;
};

const canSwapToRight = () => {
	const pos = getCurrentPosition();
	const { y, x } = pos;
	if (!gameObj[y][x+1]) {
		return false;
	}
	return true;
}

const swapToRight = (fast) => {
	if (!canSwapToRight()) {
		return false;
	}	
	var pos = getCurrentPosition();
	const { y, x } = pos;
	var rightPos = gameObj[y][x+1]
	gameObj[y][x] = rightPos;
	gameObj[y][x+1] = 0;

	animationSwapRight(rightPos, fast);
	checkIfDone();
	return gameObj;
}

const canSwapToTop = () => {
	const pos = getCurrentPosition();
	const { y, x } = pos;
	if (!gameObj[y-1]) {
		return false;
	}
	return true;
}

const swapToTop = (fast) => {
	if (!canSwapToTop()) {
		return false;
	}
	var pos = getCurrentPosition();
	const { y, x } = pos;
	var topPos = gameObj[y-1][x];
	gameObj[y][x] = topPos;
	gameObj[y-1][x] = 0;

	animationSwapTop(topPos, fast);
	checkIfDone();
	return gameObj
}

const canSwapToBottom = () => {
	const pos = getCurrentPosition();
	const { y, x } = pos;
	if (!gameObj[y+1]) {
		return false;
	}
	return true;
}

const swapToBottom = (fast) => {
	if (!canSwapToBottom()) {
		return false;
	}
	var pos = getCurrentPosition();
	const { y, x } = pos;
	var bottomPos = gameObj[y+1][x];
	gameObj[y][x] = bottomPos;
	gameObj[y+1][x] = 0;

	animationSwapBottom(bottomPos, fast);
	checkIfDone();
	return gameObj;
}

const getRandomNumber = (min, max) => {
	var rand = Math.floor(Math.random() * (max + 1) + min);
	return rand;
};

const gen2Numbers = () => {
	var first = 0;
	var second = 0;
	while (first === second) {
		first = getRandomNumber(0, 8);
		second = getRandomNumber(0, 8);
	}
	return [first, second];	
};

const generateRandomTree = () => {
	for (var i = 10; i >= 0; i--) {
		var numbers = gen2Numbers();
		swap2Numbers(numbers[0], numbers[1]);
	}
}

const checkIfDone = () => {
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
}

const swap2Numbers = (first, second) => {
	var firstPos = getXY(first);
	var secondPos = getXY(second);
	var tmp = gameObj[firstPos.y][firstPos.x];
	gameObj[firstPos.y][firstPos.x] = second;
	gameObj[secondPos.y][secondPos.x] = first;
	return gameObj;
}

const smashThaGame = () => {
	var count = 60;
	var interval = setInterval(() => {
		var direction = getRandomNumber(1,3);
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




