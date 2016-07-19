// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

 function unlock(ctx) {
    setTimeout(function() {
        ctx.unlock()
    },0)
 }
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);
    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        // this.unlock();
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var slider = document.querySelector('.slide_wrapper');
    var cords = {
        start: { x: 0, y: 0},
        progress: { x: 0, y: 0},
        end: { x: 0, y: 0 }
    }
    var distance;
    this.resetSlider = function () {
        slider.style.transition = 'transform .5s';
        slider.style.transform = 'translateX(0px)';
        setTimeout(function () {
            slider.style.transition = 'transform 0;';
        }, 500);
    }

    this.popup.addEventListener('pointerdown', function(e) {
        cords.start.x = e.x;
        cords.start.y = e.y;
    });
    this.popup.addEventListener('pointermove', function(e) {
        cords.progress.x = e.x - cords.start.x;
        slider.style.transform = 'translateX(' + cords.progress.x.toString() + 'px)';
    }.bind(this));
    this.popup.addEventListener('pointerup', function(e) {
        if (cords.progress.x < 150) {
            this.resetSlider();
        } else {
            this.unlock();
        }
    }.bind(this));

    // this.popup.addEventListener('click', function() {
        // this.unlock();
    // }.bind(this));
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);
    // unlock(this);
    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var vectors = {
        start: {x: 0, y: 0},
        end: {x: 0, y: 0}
    }

    var distance = 0;
    var pointers = {
    };

    this.popup.addEventListener('pointerdown', onPointerDown.bind(this));
    function onPointerDown (e) {
        pointers[e.pointerId] = {
            start: { x: e.x, y: e.y },

            onPointerUp: onPointerUp.bind(this, e.pointerId),
            onPointerMove: onPointerMove.bind(this, e.pointerId)
        };

        this.popup.addEventListener('pointermove', pointers[e.pointerId].onPointerMove);
        this.popup.addEventListener('pointerup', pointers[e.pointerId].onPointerUp);
    }

    function onPointerMove (pointerId, e) {
        if (pointerId !== e.pointerId) return false;

         pointers[e.pointerId] = Object.assign(pointer[e.pointerId], {}, {
            current: { x: e.x, y: e.y }
        });

        var pointer = pointers[e.pointerId];

        distance = Math.sqrt(
            Math.pow((pointer.current.x - pointer.start.x), 2) +
            Math.pow((pointer.current.y - pointer.start.y), 2)
        );

        console.log(distance);

    };
    function onPointerUp (pointerId, e) {
        if (pointerId !== e.pointerId) return false;
           this.popup.removeEventListener('pointermove', pointers[e.pointerId].onPointerMove);
           this.popup.removeEventListener('pointerup', pointers[e.pointerId].onPointerUp);
    };

    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);
    var door3 = document.querySelector('#door3');
        door3.addEventListener('click', function (e) {
            if (!door3.classList.contains('door_disabled')) {
                // The game is in the js files in folder src/js/game-3
                // The game is in the js files in folder src/js/game-3
                // The game is in the js files in folder src/js/game-3
                initGame3();    
            }
            return false;
        });
    var reset3 = document.querySelector('#reset3');
        reset3.addEventListener('click', function (e) {
            resetGame();
        });
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
