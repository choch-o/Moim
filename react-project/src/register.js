import React from 'react';
import axios from 'axios';
import update from 'react-addons-update';
import GoogleMap from "google-map-react";
import styles from "./register.css";
//import { triggerEvent } from "react-google-maps/lib/utils";



export default class register extends React.Component {


	constructor(props) {

		super(props);
		this.state = {	
			presentor: "",
			meeting_name:"",
			meeting_date:"",
			items: [],
			position: {
				lat: 25.0112183,
				lng: 121.5206757000000					      
			}

		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMapClick = this.handleMapClick.bind(this);
	}

	handleChange(event) {
		var nextState= {};
		nextState[event.target.name] = event.target.value;
		this.setState(nextState);		
	}

	handleSubmit(event){

		axios.post('/register',{
			presentor: this.state.presentor,
			meeting_name: this.state.meeting_name,
			meeting_date: this.state.meeting_date,
			items: this.state.items,
			position: this.state.position		
		}).then(function(response){
			console.log(response);
			window.location.href = '/'; 
		})
		.catch(function(response) {
			console.log(response);
		});

	}


	__addItem(item_title, item_content){

		let newState = update(this.state,{
			items: {
				$push: [{"item_title": item_title, "item_content": item_content}]
			}

		});

		this.setState(newState);
	}

	handleMapClick(e){
		var nextState = {};
		console.log(e.lat);
		console.log(e.lng);
		var nextPosition = {};
		nextPosition['lat'] = e.lat;
		nextPosition['lng'] = e.lng;
		nextState['position'] = nextPosition;
		this.setState(nextState);
	}


	render() {

		return (
				<div className={styles.wrapper}>
				<div className ={styles.register}>
				<form className="registerForm" onSubmit={this.handleSubmit}>
				<h2>Register Meeting</h2>
				<input type ="text" name="presentor" placeholder="put the name of presenter" value={this.state.presentor} onChange={this.handleChange.bind(this)}/>
				<br/><br/>
				<input type ="text" name="meeting_name" placeholder="put the name of meeting" value={this.state.meeting_name} onChange={this.handleChange.bind(this)}/>
				<br/><br/>
				<input type ="datetime-local" name="meeting_date" placeholder="put the date of meeting" value={this.state.meeting_date} onChange={this.handleChange.bind(this)}/>
				<br/><br/>

				<ul>
				{this.state.items.map(
						function(item) {							                       
							return (<ItemInfo title={item.item_title} />);
						})}
				</ul>
				<br/><br/>
				<input type="submit" value="Submit" />
				</form>	
				<br/> <br/>
				<div>
				<p>Adding Item</p>
				<ItemAdder onInsert={this.__addItem.bind(this)}/>
				</div>
				</div>
				<div className ={styles.map}>
				<span>lat: {this.state.position['lat']}</span>
				<span>lng: {this.state.position['lng']}</span>
				<GoogleMap
				bootstrapURLKeys={{
					key: 'AIzaSyDfT_3exb4B2EVA_rIf-JSPjcaDvIXiQT0',
					language: 'ko'}}
		defaultZoom={6}
		defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
		onClick={this.handleMapClick}
		/>
			</div>
			</div>

			);

	}
}





class ItemInfo extends React.Component {

	render() {
		return(
				<li>{this.props.title}</li>
				);

	}
}


class ItemAdder extends React.Component{

	constructor(props){
		super(props);
		this.state={
			item_title:"",
			item_content:""
		};
	}

	handleChange(e){
		var nextState={};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleClick(e){
		this.props.onInsert(this.state.item_title, this.state.item_content);
		this.setState(
				{
					item_title:"",
					item_content:""
				}
				);
	}

	render() {
		return (
				<div>
				<input type="text" name="item_title" placeholder="put the title of the item" value={this.state.item_title} onChange={this.handleChange.bind(this)}/>
				<textarea name="item_content" placeholder="put the content of the item" value={this.state.item_content} onChange={this.handleChange.bind(this)}/>
				<button onClick={this.handleClick.bind(this)}>Add</button>
				</div>

				);
	}

}

