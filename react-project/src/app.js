import React, {Component} from 'react';

import Header from './header';

const divStyle = {

  background: '#E0E0E0',
};

class App extends Component {
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
