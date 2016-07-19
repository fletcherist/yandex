import Engine from './Engine'
import Filters from './Filters'

class Screen extends Engine {
	constructor () {
		super()
	}

	/*
	 * @param {object} v - video object
	 * @param {object} c - canvas object
	 * @param {object} bc - canvas context
	 * @param {number} w - width
	 * @param {number} h - height
	 */
	render (v, c, bc, w, h) {
		console.log('trying to render')
		if(v.paused || v.ended) { return false }

		bc.drawImage(v, 0, 0, w, h)
		// @const {object} idata - 
		var idata = bc.getImageData(0, 0, w, h)
		var data = idata.data

		var filters = new Filters()
		// data = filters.all.reduce((data, filter) => {
			// return filter(data)
		// }, data)

		data = filters.grayscale(data)
		
		var renderData = new ImageData(data, w, h);
		c.putImageData(renderData, 0, 0)

		this.timeout = setTimeout(() => { 
			this.render(v, c, bc, w, h)
		}, 0)
	}

	tick () {

	}

	stopRender () {
		clearTimeout(this.timeout)
		this.timeout = null
	}
}

export default Screen