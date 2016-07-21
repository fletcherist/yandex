import React, { Component } from 'react'
import Slider from 'material-ui/Slider'
import s from './Timeline.css'

const styles = {
	marginTop: '0px !important',
	marginBottom: '0px !important'
}

class Timeline extends Component {
	state = {
		value: 0
	}
	componentDidMount () {
		this.video = document.querySelector('#video')
		
		this.startRenderingTimeline()
	}

	startRenderingTimeline () {
		this.interval = setInterval(() => {
			this.progress = this.video.currentTime / this.video.duration * 100
			this.setState({value: this.progress})
		}, 300)
	}

	stopRenderingTimeline () {
		clearInterval(this.interval)
	}

	goTo (e) {
		// this.stopRenderingTimeline()

		setTimeout(() => {
			var val = this.slider.state.value
			this.setState({value: val})
			this.video.currentTime = val / 100 * this.video.duration

			if (this.video.paused) {
				this.video.play()
			}
			console.log(val)
			// this.startRenderingTimeline()
		}, 0)
	}

	render () {
		return (
			<div className={s.timeline}>
				<Slider 
					style={styles} 
					min={0} 
					max={100}
					value={this.state.value}
					ref={(r) => this.slider = r}
					onClick={this.goTo.bind(this)}
				/>
			</div>
		)
	}
}

export default Timeline