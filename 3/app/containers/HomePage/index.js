import React, { Component } from 'react'
import Forms from 'components/Forms'
import Player from 'components/Player'

export default class HomePage extends Component {
	componentDidMount () {
	}
  render() {
    return (
    	<div>
    		<h1>Видеоглушитель: мотор</h1>
        <div id='divforms'>
      		<Forms />
        </div>
        <div id='divplayer' style={{display: 'none'}}>
          <Player />
        </div>
    	</div>
    )
  }
}

export default HomePage