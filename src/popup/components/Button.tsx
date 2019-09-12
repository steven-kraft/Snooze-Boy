import * as React from 'react';
import * as moment from 'moment';

interface ButtonProps {
  index: number;
  label: string;
  flipped?: boolean;
  icon?: string;
  time?: number;
  unit?: string;
  day?: string;
  onSnooze: any;
}

export default class Button extends React.Component<ButtonProps> {
  constructor(props) {
    super(props);
  }

  getTime = () => {
    var snooze_time = moment()
    if (!this.props.unit) {
      // if no unit is provided assume time property refers to hours and minutes in a day
      var hours = Math.floor(this.props.time);
      var minutes = Math.floor((this.props.time - hours) * 100);
      snooze_time = snooze_time.hours(hours).minutes(minutes);
      if (moment.weekdays().indexOf(this.props.day) !== -1) {
        snooze_time.days(this.props.day)
        if(snooze_time < moment()) {snooze_time = snooze_time.add(1, "weeks");}
      } else if(snooze_time < moment()) {
        snooze_time = snooze_time.add(1, "days");
      }
    } else {
      var unit:moment.unitOfTime.DurationConstructor = this.props.unit as moment.unitOfTime.DurationConstructor;
      snooze_time.add(this.props.time, unit);
    }

    if (["days", "weeks", "months"].indexOf(this.props.unit) !== -1) {
      snooze_time = snooze_time.hours(8).minutes(0);
    }
    return snooze_time.seconds(0).milliseconds(0);
  }

  handleSnooze = () => {
    this.props.onSnooze(this.getTime());
  }

  render() {
    if (!this.props.icon) {
      var img = this.props.flipped ? "img/flip-icon-" : "img/icon-";
      img += this.props.index.toString()  + ".svg";
    } else {
      var img = "img/" + this.props.icon;
    }

    return (
      <button className="snooze-button" title={this.getTime().format("MMMM DD, YYYY - h:mm A")} onClick={this.handleSnooze}>
        <div className="icon"><img src={img} /></div>
        <div className="label">{this.props.label}</div>
      </button>
    );
  }
}
