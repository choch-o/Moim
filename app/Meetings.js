import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ListView } from 'react-native';

export default class Meetings extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });    

    this.state = {
      dataSource: ds.cloneWithRows([
        {title: 'row 1', time: 'row 1-2'},
        {title: 'row 2-1', time: 'row 2-2'}
      ])
    };

    this.getOnGoingMeetings = this.getOnGoingMeetings.bind(this);
    this.getOnGoingMeetings()
    this._navigate = this._navigate.bind(this);
  }

  static get defaultProps() {
    return {
      title: 'Meetings'
    };
  }

  _navigate(scene, name) {
    this.props.navigator.push({
      name: scene,
      passProps: {
        name: name
      }
    })
  }

  getOnGoingMeetings() {
    var meetingData = []
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    return fetch('http://52.79.155.110:3000/attendance/meetings')
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.forEach( function(meeting) {
          var date = new Date(meeting.meeting_date);
          var dateText = date.getFullYear() + "년 " + (date.getMonth()+1) + "월 " + date.getDate()
            + "일 " + date.getHours() + "시 " + date.getMinutes() + "분"
          meetingData.push({mongo_id: meeting._id, title: meeting.meeting_name, time: dateText})
        })

        this.setState({dataSource: ds.cloneWithRows(meetingData)})

        return responseJson;
      })
      .catch((error) => {
        console.error(error)
      });
  }

  render() {
    
    return (
      <View style={{ flex: 1 }} >
        <View style={ styles.navbar }>
          <TouchableHighlight
            onPress={ () => this.props.navigator.pop() } >
            <Text style={ styles.backText }>BACK</Text>
          </TouchableHighlight>
        </View>
        <View style={ styles.meetingList }>
          <ListView
            dataSource={ this.state.dataSource }
            renderRow={(data) =>
              <TouchableHighlight onPress={ () => { this._navigate('Attendance', data)} }>
                <View style={ styles.container }>
                  <Text style={ styles.title }>
                    {`${data.title}`}
                  </Text>
                  <Text style={ styles.time }>
                    {`${data.time}`}
                  </Text>
                </View>
              </TouchableHighlight>
            }
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={ styles.separator } />}
          />
        </View>
      </View>       
    );

  }
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    flexDirection: 'row'
  },
  backText: {
    textAlign: 'left',
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: '100',
    color: '#444444'
  },
  meetingList: {
    flex: 8
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  },

  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    marginLeft: 12,
    fontSize: 25,
    fontWeight: '100',
    marginBottom: 30
  },
  time: {
    fontSize: 20,
    fontWeight: '100'
  }
});

Meetings.propTypes = {
  title: PropTypes.string.isRequired,
};