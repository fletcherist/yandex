import Engine from './Engine'
import subs from './subs.js'

class SubtitlesParser extends Engine {
	constructor () {
		super()
		// console.log(subs)
		this.subs = subs
		this.render = this.render.bind(this)
	}

	render () {
		this.splitStr()
	}

	splitStr () {
		this.split = this.subs.split(' ')
		// console.log(this.split)
	}
}

var parser = new SubtitlesParser()
parser.render()
export default SubtitlesParser