import * as React from 'react';

interface IconPreviewProps {
  icon?: string;
}

export default class IconPreview extends React.Component<IconPreviewProps> {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    alert("OPEN FILE DIALOG");
  }

  render() {
    return(
      <div className={"icon-preview"} onClick={this.handleClick}>
        <img src={`img/${this.props.icon}`} />
      </div>
    );
  }
}
