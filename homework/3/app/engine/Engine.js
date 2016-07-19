class Engine {
	constructor () {

		this.initialize = this.initialize.bind(this)
	}

	initialize () {
		this.video = document.querySelector('#video')
		this.canvas = document.querySelector('#canvas')
	}
}

export default Engine