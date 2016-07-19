import React, { Component } from 'react'
import Slider from 'material-ui/Slider'
import s from './Timeline.css'

const styles = {
	marginTop: '0px !important',
	marginBottom: '0px !important'
}

class Timeline extends Component {
	render () {
		return (
			<div className={s.timeline}>
				<Slider style={styles}/>
			</div>
		)
	}
}

export default Timeline