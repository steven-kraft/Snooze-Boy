import * as React from 'react';
import IconPreview from './IconPreview'
import TextField from '@material-ui/core/TextField';

interface ButtonEditProps {
  button: any;
}


function TimePicker(props) {
  return <TextField
      id="time"
      type="time"
      defaultValue="07:30"
      className="time-picker"
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />;
}

export default class ButtonEdit extends React.Component<ButtonEditProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={"button-editor"}>
        <IconPreview icon={`icon-${this.props.button.index}.svg`} />
        <input className="snooze-label-edit" type="text" placeholder={this.props.button.label} name="label"/>
        <TimePicker />
      </div>
    );
  }
}
