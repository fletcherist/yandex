import React, { Component } from 'react'
import s from './Player.css'
import Paper from 'material-ui/Paper'

import Screen from '../Screen'
import Controllers from '../Controllers'
import Subtitles from '../Subtitles'

import 'engine/engine'

class Player extends Component {
	render () {
		return (
			<Paper  className={s.player} zDepth={2}>
				<Screen />
				<Controllers />
				<Subtitles />
			</Paper>
		)
	}
}

export default Player