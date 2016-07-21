import React, { Component } from 'react'
import s from './Player.css'
import Paper from 'material-ui/Paper'

import Screen from '../Screen'
import Controllers from '../Controllers'

import 'engine/globals'

import { fetchSubtitles } from 'engine/SubtitlesParser'
import { fetchOldVideoLayer, fetchAudio } from 'engine/Filters'

class Player extends Component {
	componentDidMount () {
		return Promise.all([
			fetchSubtitles(), fetchOldVideoLayer(), fetchAudio()
		]).then(() => {
			console.log('Player has been initialized')
		})
	}

	render () {
		return (
			<Paper  className={s.player} zDepth={2}>
				<Screen />
				<Controllers />
			</Paper>
		)
	}
}

export default Player