console.log('[game]: animation library is connected.');

const Margin = 10;
const AnimationDuration = 200;

var Width = 150;
var Height = 150;
var NullElement;

const getWidthAndHeight = () => {
	NullElement = document.querySelector('.game__element--0');
	Width = NullElement.clientWidth;
	Height = NullElement.clientHeight;
}
const animationSwapLeft = (leftPos, fast) => {
	getWidthAndHeight();
	var leftElement = document.querySelector('.game__element--' + leftPos);

	NullElement.style.transform = `translateX(${-Width - Margin}px)`;
	leftElement.style.transform = `translateX(${Width + Margin}px)`;
	resetAnimations(NullElement, leftElement, fast);
};

const animationSwapRight = (rightPos, fast) => {
	getWidthAndHeight();
	var rightElement = document.querySelector('.game__element--' + rightPos);

	NullElement.style.transform = `translateX(${Width + Margin}px)`;
	rightElement.style.transform = `translateX(${- Width - Margin}px)`;
	resetAnimations(NullElement, rightElement, fast);
};

const animationSwapTop = (topPos, fast) => {
	getWidthAndHeight();
	var topElement = document.querySelector('.game__element--' + topPos);

	NullElement.style.transform = `translateY(${-Height - Margin}px)`;
	topElement.style.transform = `translateY(${Height + Margin}px)`;
	resetAnimations(NullElement, topElement, fast);
};

const animationSwapBottom = (bottomPos, fast) => {
	getWidthAndHeight();
	var bottomElement = document.querySelector('.game__element--' + bottomPos);

	NullElement.style.transform = `translateY(${Height + Margin}px)`;
	bottomElement.style.transform = `translateY(${-Height - Margin}px)`;
	resetAnimations(NullElement, bottomElement, fast);
};

const resetAnimations = (firstElement, secondElement, fast) => {
	var duration = AnimationDuration;
	var timeoutDuration = 50;
	if (fast) {
		duration = 30;
		timeoutDuration = 10;
	}
	setTimeout(() => {
		// reset translate
		firstElement.style.transition = 'transform 0s';
		firstElement.style.webkitTransition = 'transform 0s';
		firstElement.style.transform = '';

		secondElement.style.transition = 'transform 0s';
		secondElement.style.webkitTransition = 'transform 0s';
		secondElement.style.transform = '';
		// reset transitions to default

		setTimeout (() => {
			firstElement.style.transition = 'transform .' + AnimationDuration / 100 + 's';
			firstElement.style.webkitTransition = 'transform .' + AnimationDuration / 100 + 's';

			secondElement.style.transition = 'transform .' + AnimationDuration / 100 + 's';
			secondElement.style.webkitTransition = 'transform .' + AnimationDuration / 100 + 's';
		}, timeoutDuration);
		

		render();
	}, duration);
};
