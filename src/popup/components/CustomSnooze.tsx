import * as React from 'react';
import PopoutWindow from 'react-popout';
import * as moment from 'moment';
import Flatpickr from 'react-flatpickr'

export default class CustomSnooze extends React.Component<{onCancel: any, onSnooze: any}, {date: any}>  {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  handleChange = date => {
    this.setState({date: date});
  };

  handleSave = () => {
    if(moment(this.state.date[0]) > moment()) {
      this.props.onSnooze(moment(this.state.date[0]));
    }
  };

  render() {
      const { date } = this.state;
      return (
        <div className="custom-snooze">
          <h2>Select Custom Snooze Time</h2>
          <div className="calendar">
            <Flatpickr value={date} onChange={date => { this.handleChange(date) }} options={{inline: true, enableTime: true, minDate: "today", defaultHour: moment().hours(), defaultMinute: moment().minutes() }} />
          </div>
          <button id="cancel-button" onClick={this.props.onCancel}>Cancel</button>
          <button id="snooze-button" onClick={this.handleSave}>Snooze</button>
        </div>
      )
  }
}
