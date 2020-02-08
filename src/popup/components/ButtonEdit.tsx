import * as React from 'react';
import IconPreview from './IconPreview'

interface ButtonEditProps {
  index: number;
}

export default class ButtonEdit extends React.Component<ButtonEditProps> {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.index);

    return(
      <div className={"button-editor"}>
        <IconPreview icon={`icon-${this.props.index}.svg`} />
      </div>
    );
  }
}
