import * as React from 'react';
import './Popup.scss';

interface AppProps {}

interface AppState {}

function Button(props) {
  let img = "img/icon-" + props.index + ".svg"
  return <button className="snooze-button">
    <div className="icon"><img src={img} /></div>
    <div className="label">{props.label}</div>
    </button>;
}

export default class Popup extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props, state);
    }

    componentDidMount() {
        // Example of how to send a message to eventPage.ts.
        chrome.runtime.sendMessage({ popupMounted: true });
    }

    render() {
        return (
            <div className="popupContainer">
              <div className="button-grid">
                <Button index="1" label="One Hour" />
                <Button index="2" label="3 Hours" />
                <Button index="3" label="6 Hours" />
                <Button index="4" label="12 Hours" />
                <Button index="5" label="One Day" />
                <Button index="6" label="3 Days" />
                <Button index="7" label="One Week" />
                <Button index="8" label="One Month" />
                <Button index="9" label="" />
              </div>
              <div className="tab-list">
                <img className="arrow" src="img/expand-arrow.svg" />
              </div>
            </div>
        )
    }
}
