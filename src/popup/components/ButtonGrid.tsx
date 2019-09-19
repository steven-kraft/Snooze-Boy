import * as React from 'react';
import Button from './Button';
import DualButton from './DualButton';

const default_buttons = [
  [
    {label:"One Hour",  time:1,  unit:"hours"},
    {label:"3 Hours",   time:3,  unit:"hours"},
    {label:"6 Hours",   time:6,  unit:"hours"},
    {label:"12 Hours",  time:12, unit:"hours"},
    {label:"24 Hours",  time:24, unit:"hours"},
    {label:"72 Hours",  time:72, unit:"hours"},
    {label:"One Week",  time:1,  unit:"weeks"},
    {label:"One Month", time:1,  unit:"months"}
  ],
  [
    {label:"Morning",    time:8},
    {label:"Night",      time:19},
    {label:"Weekend",    time:8,  day:"Saturday"},
    {label:"Soon",       time:30, unit:"minutes"},
    {label:"Few Days",   time:4,  unit:"days"},
    {label:"Eventually", time:3,  unit:"months"},
    {label:"Custom 1",   time:1,  unit:"weeks"},
    {label:"Custom 2",   time:1,  unit:"months"}
  ],
]

export default class ButtonGrid extends React.Component<{onSnooze: any, customSnooze: any}, {flipped: string}> {
  constructor(props) {
    super(props);
    this.state = {flipped: ""};
  }

  flip() {
    this.setState({
      flipped: this.state.flipped ? "" : " flipped"
    });
  }

  render() {
    return(<div className={"button-grid" + this.state.flipped}>
        <div className="front">
          {default_buttons[0].map((button, i) => (
            <Button key={i+1} index={i+1} label={button.label} time={button.time} unit={button.unit} day={button.day} onSnooze={this.props.onSnooze} />
          ))}
          <DualButton flip={this.flip.bind(this)} customSnooze={this.props.customSnooze.bind(this)} />
        </div>

        <div className="back">
          {default_buttons[1].map((button, i) => (
            <Button key={i+1} index={i+1} label={button.label} time={button.time} unit={button.unit} day={button.day} flipped={true} onSnooze={this.props.onSnooze} />
          ))}
          <DualButton flip={this.flip.bind(this)} flipped={true} />
        </div>
    </div>);
  }
}
