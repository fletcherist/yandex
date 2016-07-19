class Engine {
	constructor () {
		this.isInitialized = false

		if (!this.isInitialized) {
			this.init()	
		}

		this.video = document.querySelector('#video')
		this.canvas = document.querySelector('#canvas')
		console.log(this.canvas);
	}

	init () {
		this.isInitialized = true
		// console.log(this.video)
		// this.context = this.canvas.getContext('2d')
		// this.back = document.createElement('canvas')
		// this.backContext = this.back.getContext('2d')

		// this.cw = this.video.clientWidth
		// this.ch = this.video.clientHeight
		// this.canvas.width = this.cw
		// this.canvas.height = this.ch
		// this.back.width = this.cw
		// this.back.height = this.ch
		
		console.log('engine is initialized')
	}
}

export default Engine