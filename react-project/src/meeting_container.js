import React, {Component} from 'react';
import axios from 'axios';
import Meeting_wrapper from './meeting_wrapper';
import Navigate from "./navigate"
import Meeting from "./meeting"

class meeting_container extends Component {
		
		constructor(props){
			super(props);
			this.state = {
				meeting_id: this.props.params.id,
				meeting: [], 
				date: "",
				items_length: 0,
				item_id: 1,
				item_title: '',
				item_content: '',
			}

		}

		fetchItemInfo(item_id) {
			var nextState = {};
			nextState['item_id'] = item_id;
			const t_item = this.state.meeting['items'][item_id];
			console.log(t_item);
			nextState['item_title'] = this.state.meeting['items'][item_id-1]['item_title'];
			nextState['item_content'] = this.state.meeting['items'][item_id-1]['item_content'];
			this.setState(nextState);
		}
		
		handleNavigateClick(type){
			
			const item_id = this.state.item_id;
			const items_length = this.state.items_length;		
		
			if(type === 'NEXT' && (item_id < items_length)) {
						            
				this.fetchItemInfo(item_id+1);
				
			} else if(type === 'PREV' && 1<item_id){
												           
			   	this.fetchItemInfo(item_id-1);
			
			}else{
				console.log("page corrupted");
			}
		
		}	


		componentWillMount(){
			console.log('/find_meeting/'+this.props.params.id);
			axios.get('/find_meeting/'+this.props.params.id,{
			}).then(function(response){
				var nextState={};
				nextState['meeting'] = response.data;
				nextState['date'] = response.data['meeting_date'].split('T')[0];
				nextState['item_title'] = response.data['items'][this.state.item_id-1]['item_title'];
				nextState['item_content'] = response.data['items'][this.state.item_id-1]['item_content'];
				nextState['items_length'] = response.data['items'].length;
				this.setState(nextState);		
			}.bind(this))
			.catch(function(response) {
				console.log(response);
			});
	
		}



	    render() {
			
			
			console.log(this.state.date);
			
			return(

					<Meeting_wrapper date={this.state.date}>
						<Navigate id={this.state.item_id} onClick={this.handleNavigateClick.bind(this)} />
						<Meeting title={this.state.item_title} content = {this.state.item_content}/>
					</Meeting_wrapper>
					 );

		}

}
 
export default meeting_container;
