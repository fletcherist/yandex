import Engine from './Engine'
import subs from './subs.js'


export function fetchSubtitles () {
  return new Promise (resolve => {
    fetch(`${window.PROXY_URL}/${window.SUBS_LINK}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    })
      .then(r => r.text())
      .then(r => parseSubtitles(r))
      .then(subtitles => {
        window.SUBTITLES = subs
      })
  })
}

export function msToSec (ms) {
  return ms / 1000
}

export function secToMs (sec) {
  return sec * 1000
}

export function checkForSubtitles () {
  if (!window.SUBTITLES || window.SUBTITLES.length === 0) {
    return false
  }

  if (window.WAIT_FOR_CHECKING_SUBTITLES_AGAIN < 50) {
    window.WAIT_FOR_CHECKING_SUBTITLES_AGAIN++
    return false
  }
  window.WAIT_FOR_CHECKING_SUBTITLES_AGAIN = 0

  var subtitles = window.SUBTITLES
  var video = window.VIDEO
  var currentTime = secToMs(video.currentTime)
  for (var i = 0; i < subtitles.length; i++) {
    var sub = subtitles[i]

    if (sub.startTime < currentTime && sub.endTime > currentTime) {

      // if sub has already played
      if (window.CURRENT_SUBTITLE.id === sub.id) {
        return false
      }

      window.CURRENT_SUBTITLE = sub
      window.RENDER_SUBTITLES = true
      return true
    }
  }

  window.RENDER_SUBTITLES = false
  return false
}

export function getDurationOfSubtitle () {
  var sub = window.CURRENT_SUBTITLE
  var duration = sub.endTime - sub.startTime
  return duration
}


export function parseSubtitles (subtitles) {
  if (!subtitles) { return false }
  var split = subtitles.split('\n\n')
  var renderedSubtitles = []
  split.forEach((line) => {
    var index = line.split('\n')

    var id = index[0]
    var time = index[1]
    var timeArr = time.split(' --> ')

    delete index[0] // Remove id
    delete index[1] // Remove time

    var reply = index.join('\n').trim()
    renderedSubtitles.push({
      id: id,
      startTime: calculateTime(timeArr[0]),
      endTime: calculateTime(timeArr[1]),
      message: reply
    })
  })

  return renderedSubtitles
}

export function calculateTime (time) {
  if (!time) { return false }

  var regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/
  var parts = regex.exec(time)

  if (!parts) { return false }
  for (let i = 1; i < 5; i++) {
      parts[i] = parseInt(parts[i], 10)
      if (isNaN(parts[i])) parts[i] = 0
  }

  // hours + minutes + seconds + ms
  return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4]
}

export function isTimeForSubtitles (subtitles, currentTime) {
  if (!currentTime || !subtitles) {
    return false
  }

  var srt = subtitles.filter((srt) => {
    return 
        srt.startTime < currentTime &&
        srt.endTime > currentTime
  })[0]

  if (srt) {
    return true
  }

  return false
}

