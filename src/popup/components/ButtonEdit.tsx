import * as React from 'react';
import IconPreview from './IconPreview'
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ReplayIcon from '@material-ui/icons/Replay';

interface ButtonEditProps {
  button: any;
}


function TimePicker(props) {
  return <TextField
      id="time"
      type="time"
      defaultValue="07:30"
      className="time-picker"
      disabled={props.disabled}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />;
}

export default function ButtonEdit(props) {
  const [weekday, setWeekday] = React.useState(0);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [interval, setInterval] = React.useState("hours");

  const handleWeekdayChange = event => {
    setWeekday(event.target.value);
  };

  const handleRadioChange = event => {
    setSelectedValue(event.target.value);
  };

  const handleIntervalChange = event => {
    setInterval(event.target.value);
  };

  const handleCancel = event => {
    window.close();
  };

  return(
    <div className={"button-editor"}>
      <IconPreview icon={`icon-${props.button.index}.svg`} />
      <input className="snooze-label-edit" type="text" placeholder={props.button.label} name="label"/>
      <div className="day-options">
        <Radio
          checked={selectedValue === 'a'}
          onChange={handleRadioChange}
          value="a"
          name="radio-button-demo"
          color="primary"
          inputProps={{ 'aria-label': 'A' }}
        />
        <TimePicker disabled={selectedValue !== 'a'} />
        <Select className="weekday-picker" value={weekday} onChange={handleWeekdayChange} disabled={selectedValue !== 'a'} >
          {moment.weekdays().map((day, i) =>(
            <MenuItem value={i} key={day}>{day}</MenuItem>
          ))}
        </Select>
      </div>
      <div className="interval-options">
        <Radio
          checked={selectedValue === 'b'}
          onChange={handleRadioChange}
          value="b"
          name="radio-button-demo"
          color="primary"
          inputProps={{ 'aria-label': 'B' }}
        />
        <TextField className="number-select" type="number" InputProps={{ inputProps: { min: 0, max: 99 } }} InputLabelProps={{shrink: true}} disabled={selectedValue !== 'b'} />
        <Select className="interval-picker" value={interval} onChange={handleIntervalChange} disabled={selectedValue !== 'b'} >
          <MenuItem value="minutes" key="minutes">Minutes</MenuItem>
          <MenuItem value="hours" key="hours">Hours</MenuItem>
          <MenuItem value="days" key="days">Days</MenuItem>
          <MenuItem value="weeks" key="weeks">Weeks</MenuItem>
          <MenuItem value="months" key="months">Months</MenuItem>
          <MenuItem value="years" key="years">Years</MenuItem>
        </Select>
      </div>
      <Button variant="contained" className="default-button"><ReplayIcon />Default</Button>
      <Button variant="contained" className="cancel-button" onClick={handleCancel}><CancelIcon />Cancel</Button>
      <Button variant="contained" className="save-button"><SaveIcon />Save</Button>
    </div>
  );
}
