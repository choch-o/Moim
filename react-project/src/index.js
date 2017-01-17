import React from 'react';
import ReactDOM from 'react-dom';
import Register from './register';
import App from './app';
import Meeting_board from './meeting_board';
import Meeting from './meeting_container'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
const rootElement = document.getElementById('root');    

ReactDOM.render(
		<Router history={browserHistory}>
		    
			<Route path="/" component={App}>
				<IndexRoute component={Meeting_board}/>
				<Route path="register_meeting" component={Register}/>
				<Route path="meeting/:id" component={Meeting}/>
			</Route>

		</Router>,

		document.getElementById('root')

		
		);

//ReactDOM.render(<Register />, rootElement);
