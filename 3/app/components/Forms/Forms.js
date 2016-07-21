import React, { Component } from 'react'
import s from './Forms.css'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Card from 'material-ui/Card'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

import 'engine/globals'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


class Forms extends Component {
	state = {
		video: {
			url: '',
			check: ''
		},
		subs: {
			url: '',
			check: ''
		},
		audio: {
			url: '',
			check: ''
		},
	}

	check() {
		var regex = /https?:\/\//

		this.setState({
			video: {url: this.video.input.value, check: false},
			subs: {url: this.subs.input.value, check: false},
			audio: {url: this.audio.input.value, check: false}
		})
		if (!this.video.input.value.match(regex)) {
			return this.setState({video: {
				check: 'ссылка на видео не работает'
			}})
		}

		if (!this.subs.input.value.match(regex)) {
			console.log(this.state.subs.check)
			return this.setState({subs: {
				check: 'ссылка на субтитры не валидна'
			}})
		} 
		if (!this.audio.input.value.match(regex)) {
			return this.setState({audio: {
				check: 'ссылка на аудио не работает'
			}})
		} 

		this.setState({
			video: {url: this.video.input.value, check: false},
			subs: {url: this.subs.input.value, check: false},
			audio: {url: this.audio.input.value, check: false}
		})

		return true
	}

	upload() {
		if (this.check() === true) {
			window.VIDEO_LINK = this.video.input.value
			window.SUBS_LINK = this.subs.input.value
			window.AUDIO_LINK = this.audio.input.value

			console.log(this.props.dispatch)
			setTimeout(() => {
				this.props.dispatch(push(`/player`))
			}, 1000)
			console.log(window.VIDEO_LINK)
		}
	}

	setExamples () {
		this.video.floatingLabelText = ''
		this.video.input.value = window.VIDEO_LINK

		this.subs.floatingLabelText = ''
		this.subs.input.value = window.SUBS_LINK

		this.audio.floatingLabelText = ''
		this.audio.input.value = window.AUDIO_LINK
	}

	render () {
		return (
			<div className={s.forms}>
				<div>
					<TextField id='1' name='ссылка на видео'
						floatingLabelText='ссылка на видео'
						ref={(r) => this.video = r}
						onBlur={this.check.bind(this)}
						errorText={this.state.video.check}
						fullWidth/>
				</div>
				<div>
					<TextField id='2'
						floatingLabelText='ссылка на субтитры'
						ref={(r) => this.subs = r}
						onBlur={this.check.bind(this)}
						errorText={this.state.subs.check}
						fullWidth/>
				</div>
				<div>
					<TextField id='3'
						floatingLabelText='ссылка на саундтрек'
						ref={(r) => this.audio = r}
						onBlur={this.check.bind(this)}
						errorText={this.state.audio.check}
						fullWidth/>
				</div>

				<div className={s.button}>
					<RaisedButton 
						label='заглушить'
						onClick={this.upload.bind(this)}
					/>
				</div>
				<div className={s.button}>
					<RaisedButton 
						label='example'
						secondary
						onClick={this.setExamples.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(Forms)
