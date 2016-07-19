import React, { Component } from 'react'
import s from './Screen.css'
import video from './test.webm'

import ScreenEngine from 'engine/Screen'

class Screen extends Component {
	componentDidMount () {
		var video = document.querySelector('#video')
		var canvas = document.querySelector('#canvas')
		var context = canvas.getContext('2d')
		var back = document.createElement('canvas')
		var backContext = back.getContext('2d')

		var cw, ch
		var screen = new ScreenEngine()

		video.play()
		video.addEventListener('play', () => {
			cw = video.clientWidth
			ch = video.clientHeight
			canvas.width = cw
			canvas.height = ch
			back.width = cw
			back.height = ch

			screen.render(video, context, backContext, cw, ch)
		});
	}
	render () {
		return (
			<div className={s.screen}>	
				<video loop id='video' className={s.video__orig}>
					<source src={video} type='video/webm'/>
				</video>
				<canvas id='canvas' className={s.video__canvas}></canvas>
			</div>
		)
	}
}

export default Screen