import * as React from 'react';
import './Popup.scss';

interface AppProps {}

interface AppState {}

function Button(props) {
  let img = "img/icon-" + props.index + ".svg"
  return <button className="snooze-button">
    <div className="icon"><img src={img} /></div>
    <div className="label">1 Hour</div>
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
                <Button index="1" />
                <Button index="2" />
                <Button index="3" />
                <Button index="4" />
                <Button index="5" />
                <Button index="6" />
                <Button index="7" />
                <Button index="8" />
                <Button index="9" />
            </div>
        )
    }
}
