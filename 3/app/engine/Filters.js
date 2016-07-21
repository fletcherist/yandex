import { isTimeForSubtitles } from './SubtitlesParser'
import noiseLayer from './old.mp4'

export function fetchOldVideoLayer () {
  return new Promise (resolve => {
    window.OLD_VIDEO = document.createElement('video')
    window.OLD_VIDEO.src = noiseLayer

    resolve()
  })
}

export function fetchAudio () {
  return new Promise (resolve => {
    window.AUDIO = document.createElement('audio')
    window.AUDIO.src = window.AUDIO_LINK
    document.body.appendChild(window.AUDIO)

    resolve()
  })
}

export function oldscaleFilter (ctx, w, h) {
  window.OLD_VIDEO.width = w
  window.OLD_VIDEO.height = h
  var video = window.OLD_VIDEO
  video.play()

  var canvas = document.createElement('canvas')
  var wctx = canvas.getContext('2d')
  wctx.globalAlpha = .3
  wctx.drawImage(video, -40, -40, w, h)
  

  // var widata = wctx.getImageData(0, 0, w, h)
  // var wdata = widata.data

  // var someData = new ImageData(wdata, w, h)

  var oldOperation = ctx.globalCompositeOperation
  ctx.globalCompositeOperation = 'multiply'
  ctx.drawImage(canvas, 0, 0, w, h)
  ctx.globalCompositeOperation = oldOperation

  var idata = ctx.getImageData(0, 0, w, h)
  var data = idata.data

  return data
}

export function grayscaleFilter (ctx, w, h) {
	// @slow performance 
	var idata = ctx.getImageData(0, 0, w, h)
	var data = idata.data

	for(var i = 0; i < data.length; i+=4) {
		var r = data[i]
		var g = data[i+1]
		var b = data[i+2]
		var brightness = (3 * r + 4 * g + b) >>> 3
		data[i] = brightness
		data[i+1] = brightness
		data[i+2] = brightness
	}
	return data
}

export function subtitlesFilter (ctx, w, h) {
  var x = 0
  var y = 0
  var fh = 12
  var spl = 20
  var text = window.CURRENT_SUBTITLE.message
  var font = '18px \'Oranienbaum\''
  ctx.font = font
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 5
  ctx.fillStyle = 'black'
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = 'white'

  // Paint text
  var lines = splitLines(ctx, w, font, text)
  // Block of text height
  var both = lines.length * (fh + spl)

  var ly = (h - both)/2 + y + spl * lines.length - 30
  var lx = 0
  for (var j = 0, ly; j < lines.length; ++j, ly += fh + spl) {
      lx = x + w / 2 - ctx.measureText(lines[j]).width / 2
      ctx.fillText(lines[j], lx, ly)
  }

	var idata = ctx.getImageData(0, 0, w, h)
	var data = idata.data

	return data
}

var splitLines = function(ctx, mw, font, text) {
	mw = mw - 10
	ctx.font = font
	var words = text.split(' ')
	var newLine = words[0]
	var lines = []
	for(var i = 1; i < words.length; ++i) {
	  if (ctx.measureText(newLine + " " + words[i]).width < mw) {
      newLine += " " + words[i]
	  } else {
      lines.push(newLine)
      newLine = words[i]
	  }
	}
	lines.push(newLine)
	return lines
}

