import * as React from 'react';

interface ButtonEditProps {

}

export default class ButtonEdit extends React.Component<ButtonEditProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={"button-edit button-grid"}>
        Button Editor
      </div>
    );
  }
}
