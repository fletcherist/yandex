import Screen from './Screen'

export default class Playpause extends Screen {
	constructor () {
		super()
		this.paused = false
	}

	play () {
		if (this.isInitialized) {
			this.paused = false
			this.video.play()
			// this.stopRender()

			return false
		}

		console.log('error')
	}

	pause () {
		if (this.isInitialized) {
			this.paused = true
			this.video.pause()
			// this.stopRender()

			return false
		}

		console.log('error')
	}
}