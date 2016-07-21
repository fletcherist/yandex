import React, { Component } from 'react'
import s from './Playpause.css'

class PlayPause extends Component {
	componentDidMount () {
		this.video = document.querySelector('#video')
		window.addEventListener('keydown', (e) => {
			// Space - 32
			if (e.keyCode === 32) {
				this.pauseVideo()
			}
		})
	}

	state = {
		paused: true
	}

	pauseVideo () {
		this.setState({paused: !this.state.paused})
		window.PAUSED = !window.PAUSED
		if (this.state.paused) {
			this.video.play()
			window.AUDIO.play()

		} else {
			this.video.pause()
			window.AUDIO.pause()
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