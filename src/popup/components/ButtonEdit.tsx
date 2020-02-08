import * as React from 'react';
import IconPreview from './IconPreview'

interface ButtonEditProps {
  button: any;
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
      </div>
    );
  }
}
