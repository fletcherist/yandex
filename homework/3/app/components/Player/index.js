import React, { Component } from 'react'
import s from './Player.css'
import Paper from 'material-ui/Paper'

import Screen from '../Screen'
import Controllers from '../Controllers'
import Subtitles from '../Subtitles'

import Engine from 'engine/Engine'

class Player extends Component {
	componentDidMount () {
			var engine = new Engine()
	}
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