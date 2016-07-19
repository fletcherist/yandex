import React, { Component } from 'react'
import s from './PlayPause.css'

class PlayPause extends Component {
	state = {
		paused: false
	}
	pauseVideo () {
		this.setState({paused: !this.state.paused})
		const video = document.querySelector('#video')

		if (this.state.paused) {
			video.play()
		} else {
			video.pause()
		}
	}
	render () {
		var paused = !this.state.paused 
			? 'play'
			: 'pause'
		return (
			<div className={s.container} onClick={this.pauseVideo.bind(this)}>
				{paused}
			</div>
		)
	}
}

export default PlayPause