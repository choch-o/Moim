import React, {Component} from 'react';

import Header from './header';
import Firebase from './firebase';
const divStyle = {

  background: '#E0E0E0',
};

class App extends Component {
	constructor(props) {
		super(props);
		Firebase.initialise();
	}
  render() {

    return (

      <div style={divStyle}>

        <Header/>

        {this.props.children}

      </div>
    );

  }
}

export default App;
