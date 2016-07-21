import React, { Component } from 'react'
import s from './Screen.css'

import { 
	grayscaleFilter, 
	subtitlesFilter,
	oldscaleFilter } from 'engine/Filters'
import { throttle } from 'engine/Tools'

import { checkForSubtitles, getDurationOfSubtitle } from 'engine/SubtitlesParser'

/*
 * @param {object} v - video object
 * @param {object} c - canvas object
 * @param {object} bc - canvas context
 * @param {number} w - width
 * @param {number} h - height
 */

var RENDER_TIMEOUT
var RENDER_SUBTITLES = false

function renderCanvas (v, c, bc, w, h) {
	if (!v || v.ended || v.paused) { return false }

	bc.drawImage(v, 0, 0, w, h)
	var idata = bc.getImageData(0, 0, w, h)
	var data = idata.data

	// Subtitles Filter
	if (checkForSubtitles()) {
		data = subtitlesFilter(bc, w, h)

		pauseVideoWhenSubs()
	}

	// Oldscalse Filter
	data = oldscaleFilter(bc, w, h)
	// Grayscale Filter
	data = grayscaleFilter(bc, w, h)


	var renderData = new ImageData(data, w, h);
	c.putImageData(renderData, 0, 0)

	startRender(v, c, bc, w, h)
}

function startRender (v, c, bc, w, h) {
	RENDER_TIMEOUT = setTimeout(() => { 
		requestAnimationFrame(() => {
			renderCanvas(v, c, bc, w, h)
		})
	}, 0)
}

function stopRender () {
	clearTimeout(RENDER_TIMEOUT)
	RENDER_TIMEOUT = null
}

function pauseVideoWhenSubs () {
	var sub = window.CURRENT_SUBTITLE
	var duration = sub.endTime - sub.startTime

	window.VIDEO.pause()

	// check if already paused
	if (window.PAUSED) {
		return false
	}
	setTimeout(() => {
		window.VIDEO.play()
	}, duration)
}


class Screen extends Component {
	componentDidMount () {
		var video = document.querySelector('#video')
		var canvas = document.querySelector('#canvas')
		var context = canvas.getContext('2d')
		var back = document.createElement('canvas')
		var backContext = back.getContext('2d')

		var cw, ch

		window.VIDEO = video

		setTimeout(() => {
			window.AUDIO.play()
			video.play()
			video.volume = 0
		}, 2000)

		video.addEventListener('subt', () => {
			renderCanvas(video, context, backContext, cw, ch)
		})

		video.dispatchEvent(new Event('subt'))
		
		video.addEventListener('play', () => {
			cw = video.clientWidth
			ch = video.clientHeight
			canvas.width = cw
			canvas.height = ch
			back.width = cw
			back.height = ch

			console.log(window.PAUSED)
			if (window.PAUSED && window.RENDER_SUBTITLES) {
				console.log('paused on sub')
				var duration = getDurationOfSubtitle()
				setTimeout(() => {
					renderCanvas(video, context, backContext, cw, ch)
				}, duration)
			} else {
				renderCanvas(video, context, backContext, cw, ch)
			}
		});

		video.addEventListener('pause', () => {
			// alert('video is paused')
			// stopRender()
		})
	}
	render () {
		return (
			<div className={s.screen}>
				<video 
						id='video' 
						className={s.video__orig}
						crossOrigin={'Anonymous'}>
					<source src={`${window.PROXY_URL}/${window.VIDEO_LINK}`} />
				</video>
				<canvas id='canvas' className={s.video__canvas}></canvas>
			</div>
		)
	}
}

export default Screen