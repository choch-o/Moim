import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

export default class meeting_board extends React.Component{

  constructor(props) {

    super(props);
    this.state = {
      meetings: []};
    this.componentWillMount = this.componentWillMount.bind(this);

  }

  componentWillMount(){
    axios.post('/call_meeting_board',{
    }).then(function(response){
      var nextState={};
      console.log(response.data);
      nextState['meetings'] = response.data;
      this.setState(nextState);
    }.bind(this))
      .catch(function(response) {
        console.log(response);
      });

  }

  render(){
    console.log(this.state.meetings);
    return (
      <div>
        <ul>
          {this.state.meetings.map(

            function(given_meeting) {

              return (<MeetingInfo meeting={given_meeting}/>);

            })}

          </ul>
        </div>
    );
  }

}

class MeetingInfo extends React.Component {


  constructor(props){
    super(props);
    this.state={
      presentor: this.props.meeting['presentor'],
      meeting_title: this.props.meeting['meeting_name'],
      meeting_date: this.props.meeting['meeting_date'],
      id: this.props.meeting['_id']
    }
    console.log(this.state.id);
  }


  render() {

    return(
      <Link to={"meeting/"+this.state.id}>
        <div>
          <span>presentor: {this.state.presentor}&nbsp;</span>
          <span>title: {this.state.meeting_title}&nbsp;</span>
          <span>date: {this.state.meeting_date}&nbsp;</span>
        </div>
      </Link>


    );

  }
}


