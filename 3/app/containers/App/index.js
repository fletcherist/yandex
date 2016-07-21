import React from 'react';
import s from './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className={s.container}>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
