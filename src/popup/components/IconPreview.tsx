import * as React from 'react';

interface IconPreviewProps {
  icon?: string;
}

export default class IconPreview extends React.Component<IconPreviewProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={"icon-preview"}>
        <img src={`img/${this.props.icon}`} />
      </div>
    );
  }
}
