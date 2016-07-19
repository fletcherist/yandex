import React from 'react';
import Player from './modules/Player';
import ReactDOM from 'react-dom';

var component = ReactDOM.render(Player);
document.querySelector('#app').innerHTML = component;
console.log(Player);
