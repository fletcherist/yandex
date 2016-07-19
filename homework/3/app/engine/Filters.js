import Screen from './Screen'

export default class Filters {
	constructor() {
		this.all = [
			this.grayscale.bind(this)
		]

		this.grayscale = this.grayscale.bind(this)
	}

	grayscale (data) {
		if (!data) {
			console.log(`Can't apply this filter: no data`)
		}
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

	framerate () {
		var number = Math.random();
		if (number > 0.6) {
			return false
		}

		return true
	}
}