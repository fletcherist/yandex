import React, { Component } from 'react'
import s from './Forms.css'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class Forms extends Component {
	render () {
		return (
			<div className={s.forms}>
				<VideoLink />
				<SubsLink />
				<SoundtrackLink />
				<div className={s.button}>
					<RaisedButton 
						label='заглушить'
					/>
				</div>
			</div>
		)
	}
}

class VideoLink extends Component {
	render () {
		return (
			<div>
				<TextField id='1' name='ссылка на видео'
					floatingLabelText='ссылка на видео'
					fullWidth/>
			</div>
		)
	}
}

class SubsLink extends Component {
	render () {
		return (
			<div>
				<TextField id='2'
					floatingLabelText='ссылка на субтитры'
					fullWidth/>
			</div>
		)
	}
}

class SoundtrackLink extends Component {
	render () {
		return (
			<div>
				<TextField id='3'
					floatingLabelText='ссылка на саундтрек'
					fullWidth/>
			</div>
		)
	}
}

export default Forms