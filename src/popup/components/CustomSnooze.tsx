import * as React from 'react';
import PopoutWindow from 'react-popout'

interface CustomSnoozeProps {
  snoozeClosed: any;
}

export default class CustomSnooze extends React.Component<CustomSnoozeProps>  {
  render() {
      return (
        <PopoutWindow title='Window title' onClosing={this.props.snoozeClosed}>
          <div>Popped out content!</div>
        </PopoutWindow>
      )
  }
}
