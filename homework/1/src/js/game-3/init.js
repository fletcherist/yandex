var startMessage = document.querySelector('#start');
var progressMessage = document.querySelector('#progress');
var preparation = document.querySelector('#preparation');
var winMessage = document.querySelector('#success');
var loseMessage = document.querySelector('#fail');
var isGameStarted = false;


var gamePole = document.querySelector('#gamePole');

const showStartMessage = () => {
	startMessage.classList.add('show');
	startMessage.classList.remove('hidden');
}

const hideStartMessage = () => {
	startMessage.classList.remove('show');
	startMessage.classList.add('hidden');	
}

const showProgressMessage = () => {
	progressMessage.classList.add('show');
	progressMessage.classList.remove('hidden');
}

const hideProgressMessage = () => {
	progressMessage.classList.remove('show');
	progressMessage.classList.add('hidden');
}

const showPreparation = () => {
	preparation.classList.remove('hidden');
	preparation.classList.add('show');
}

const hidePreparation = () => {
	preparation.classList.add('hidden');
	preparation.classList.remove('show');
}

const showWinMessage = () => {
	winMessage.classList.add('show');
	winMessage.classList.remove('hidden');
	setTimeout(() => {
		console.log(document.querySelector('#gamePrize'));
		console.log(document.querySelector('#gamePole'));
	}, 2000);
}

const hideWinMessage = () => {
	winMessage.classList.add('hidden');
	winMessage.classList.remove('show');
}

const step1 = () => {
	return new Promise (resolve => {
		gamePole.classList.add('safe__bg--gray');
		smashThaGame();

		setTimeout(() => {
			resolve();
		}, 7000);
	});
}

const step2 = () => {
	return new Promise (resolve => {
		hideStartMessage();
		showPreparation();
		startTickTime();

		setTimeout(() => {
			gamePole.classList.remove('safe__bg--gray');
			resolve();
		}, 3000);
	});
}

const step3 = () => {
	return new Promise (resolve => {
		setTimeout(() => {
			hidePreparation();
			showProgressMessage();
			initializeTimer();
			isGameStarted = !isGameStarted;
		}, 1000);
	});
};

const showWinScreen = () => {
	if (isGameStarted) {
		gamePole.classList.add('safe__bg--win');
		document.querySelector('#level3').classList.add('background--win');
		hideProgressMessage();
		showWinMessage();
	}
};

const showLoseScreen = () => {
	hideStartMessage();
	hideProgressMessage();
	hidePreparation();
	loseMessage.classList.add('show');
	loseMessage.classList.remove('hidden');
	gamePole.classList.add('safe__bg--gray');
	document.querySelector('#level3').classList.add('background--lose');
}

const initGame3 = () => {
	console.log('[game]: initializing game 3');
	// generateRandomTree();
	initializeEventListeners();
	hideProgressMessage();
	hidePreparation();
	showStartMessage();
	render();

	setTimeout(() => {
		step1()
			.then(res => step2())
			.then(res => step3());
	}, 1000);
}

const resetGame = () => {
	resetTimer();
	hideProgressMessage();
	hidePreparation();
	hideWinMessage();
	showStartMessage();

	loseMessage.classList.add('hidden');
	loseMessage.classList.remove('show');
	document.querySelector('#level3').classList.remove('background--lose', 'background--win');
}
