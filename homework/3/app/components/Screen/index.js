import React, { Component } from 'react'
import s from './Screen.css'
import video from './test.webm'

function draw(v, c, bc, w, h) {
    if(v.paused || v.ended) {
    	return false
    }
    // First, draw it into the backing canvas
    bc.drawImage(v, 0, 0, w, h)
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0, 0, w, h)
    var data = idata.data
    // Loop through the pixels, turning them grayscale
    for(var i = 0; i < data.length; i+=4) {
        var r = data[i]
        var g = data[i+1]
        var b = data[i+2]
        var brightness = (3 * r + 4 * g + b) >>> 3
        data[i] = brightness
        data[i+1] = brightness
        data[i+2] = brightness
    }
    
    var renderData = new ImageData(data, w, h);
    // Draw the pixels onto the visible canvas
    c.putImageData(renderData, 0, 0)
    // Start over!
    setTimeout(() => { 
    	draw(v, c, bc, w, h)
    }, 0)
}

class Screen extends Component {
	componentDidMount () {
		var video = document.querySelector('#video')
		var canvas = document.querySelector('#canvas')
		var context = canvas.getContext('2d')
		var back = document.createElement('canvas')
		var backContext = back.getContext('2d')

		var cw, ch
		video.addEventListener('play', () => {
			cw = video.clientWidth
			ch = video.clientHeight
			canvas.width = cw
			canvas.height = ch
			back.width = cw
			back.height = ch

			draw(video, context, backContext, cw, ch)
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