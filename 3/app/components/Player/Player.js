import React, { Component } from 'react'
import s from './Player.css'
import Paper from 'material-ui/Paper'

import Screen from '../Screen'
import Controllers from '../Controllers'

import 'engine/globals'

import SomePlayersadhsuaiduihsadhudsaiu from 'react-player'

class Player extends Component {
	render () {
		return (
			<div>
				<Paper  className={s.player} zDepth={2}>
					<Screen />
					<Controllers />
				</Paper>
			</div>
		)
	}
}

export default Player