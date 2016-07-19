import React, { Component } from 'react'
import s from './PlayPause.css'
import Playpause from 'engine/Playpause'

class PlayPause extends Component {

	state = {
		paused: false
	}

	componentDidMount () {
		window.addEventListener('keydown', (e) => {
			// Space - 32
			if (e.keyCode === 32) {
				this.pauseVideo()
			}
		})
	}

	pauseVideo () {
		var playpause = new Playpause()
		this.setState({paused: !this.state.paused})

		if (this.state.paused) {
			playpause.play()
		} else {
			playpause.pause()
		}
	}

	render () {
		var paused = !this.state.paused 
			? '>'
			: '||'
		return (
			<div className={s.container} onClick={this.pauseVideo.bind(this)}>
				{paused}
			</div>
		)
	}
}

export default PlayPause