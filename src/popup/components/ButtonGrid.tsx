import * as React from 'react';
import Button from './Button';
import DualButton from './DualButton';
import ButtonEditor from './ButtonEditor';

const default_buttons = [
  [
    {id: 1, label:"One Hour",  time:1,  unit:"hours"},
    {id: 2, label:"3 Hours",   time:3,  unit:"hours"},
    {id: 3, label:"6 Hours",   time:6,  unit:"hours"},
    {id: 4, label:"12 Hours",  time:12, unit:"hours"},
    {id: 5, label:"24 Hours",  time:24, unit:"hours"},
    {id: 6, label:"72 Hours",  time:72, unit:"hours"},
    {id: 7, label:"One Week",  time:1,  unit:"weeks"},
    {id: 8, label:"One Month", time:1,  unit:"months"}
  ],
  [
    {id: 9, label:"Morning",     time:8},
    {id: 10, label:"Night",      time:19},
    {id: 11, label:"Weekend",    time:8,  day:"Saturday"},
    {id: 12, label:"Soon",       time:30, unit:"minutes"},
    {id: 13, label:"Few Days",   time:4,  unit:"days"},
    {id: 14, label:"Eventually", time:3,  unit:"months"},
    {id: 15, label:"Custom 1",   time:1,  unit:"weeks"},
    {id: 16, label:"Custom 2",   time:1,  unit:"months"}
  ],
]

export default class ButtonGrid extends React.Component<{onSnooze: any, customSnooze: any, buttonEditor: any}, {flipped: string, editButton: any}> {
  constructor(props) {
    super(props);
    this.state = {flipped: "", editButton: null};
  }

  flip() {
    this.setState({
      flipped: this.state.flipped ? "" : " flipped"
    });
  }

  openButtonEditor = (button) => {
    this.setState({editButton: button});
    return false; // Prevents Context Menu from Opening
  }

  closeButtonEditor = () => {
    this.setState({editButton: null});
  }

  render() {
    /*
    var editor = null;
    if (this.state.editButton) {
      editor = (
        <ButtonEditor button={this.state.editButton} onClose={this.closeButtonEditor} />
      );
    }*/
    return(
      <div className={"button-grid" + this.state.flipped}>
        <div className="front">
          {default_buttons[0].map((button, i) => (
            <Button key={button.id} index={button.id} label={button.label} time={button.time} unit={button.unit} day={button.day} onSnooze={this.props.onSnooze} onRightClick={this.props.buttonEditor.bind(this)} />
          ))}
          <DualButton flip={this.flip.bind(this)} customSnooze={this.props.customSnooze.bind(this)} />
        </div>

        <div className="back">
          {default_buttons[1].map((button, i) => (
            <Button key={button.id} index={button.id} label={button.label} time={button.time} unit={button.unit} day={button.day} flipped={true} onSnooze={this.props.onSnooze} onRightClick={this.openButtonEditor} />
          ))}
          <DualButton flip={this.flip.bind(this)} flipped={true} />
        </div>
    </div>);
  }
}
