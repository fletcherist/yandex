import React, { Component, PropTypes } from 'react'
import PlayPause from '../PlayPause'
import Timeline from '../Timeline'
import s from './Controllers.css'

class Controllers extends Component {
	render () {
		return (
			<div className={s.container}>
				<div className={s.timeline}>
					<Timeline />
				</div>
				<div className={s.navigation}>
					<div className={s.playpause}>
						<PlayPause />
					</div>
				</div>
			</div>
		)
	}
}

export default Controllers