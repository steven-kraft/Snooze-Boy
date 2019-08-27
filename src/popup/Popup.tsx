import * as React from 'react';
import * as moment from 'moment';
import './Popup.scss';

interface AppProps {}
interface AppState {}

interface ButtonProps {
  index: string;
  label: string;
  time?: number;
  unit?: moment.unitOfTime.DurationConstructor;
}

class Button extends React.Component<ButtonProps> {
  constructor(props) {
    super(props);
    this.handle_snooze = this.handle_snooze.bind(this);
  }

  img = "img/icon-" + this.props.index + ".svg";

  handle_snooze(): void {
    let date = Date.now();
    chrome.runtime.sendMessage({ new_snooze: true, date: date });
    alert(moment().add(this.props.time, this.props.unit))
    window.close();
  }

  test(): void {
    alert("test")
  }

  render() {
    return (
      <button className="snooze-button" onClick={this.handle_snooze}>
        <div className="icon"><img src={this.img} /></div>
        <div className="label">{this.props.label}</div>
      </button>
    );
  }
}

class DualButton extends React.Component<> {
  custom_snooze(): void {
    alert("CUSTOM SNOOZE WINDOW");
    window.close();
  }
  flip(): void {
    alert("FLIP!");
    window.close();
  }
  render() {
    return (
      <div className="dual-button">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <a onClick={this.flip} href="#" id="bottom-button">
          <rect width="100" height="100" class="bg" />
          <path d="M91.497 86.1994C91.8589 86.0512 92.0954 85.6946 92.0971 85.3028L93.8586 70.6338C93.8604 70.099 93.4235 69.6622 92.8879 69.663L78.2498 71.4554C77.9868 71.4536 77.7405 71.5604 77.5632 71.7378C77.4732 71.8278 77.4026 71.9355 77.3514 72.0538C77.2013 72.4173 77.2975 72.8206 77.5755 73.0986L81.4224 76.9455C72.637 85.7308 66.3165 87.0952 59.0094 78.6178C67.9147 94.9662 77.9118 90.6772 86.5329 82.0561L90.453 85.9761C90.7319 86.2532 91.1343 86.3503 91.497 86.1994Z" fill="white"/>
        </a>
        <line x1="33.6464" y1="100.646" x2="100.646" y2="33.6464" stroke="#6D6D6D"/>
        <a onClick={this.custom_snooze} href="#" id="top-button">
          <path d="M33.8308 100H0V0H100V34.1584L33.8308 100Z" class="bg" />
          <path d="M18.5 12V17H16C13.2425 17 11 19.2425 11 22V57C11 59.7575 13.2425 62 16 62H51C53.7575 62 56 59.7575 56 57V22C56 19.2425 53.7575 17 51 17H48.5V12H43.5V17H23.5V12H18.5ZM16 29.5H51L51.0049 57H16V29.5ZM31 37V42H26V47H31V52H36V47H41V42H36V37H31Z" fill="white"/>
        </a>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="100" height="100" />
        </clipPath>
        </defs>
        </svg>
      </div>
    );
  }
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
                <Button index="1" label="One Hour" time={1} unit="hours" />
                <Button index="2" label="3 Hours" time={3} unit="hours" />
                <Button index="3" label="6 Hours" time={6} unit="hours" />
                <Button index="4" label="12 Hours" time={12} unit="hours" />
                <Button index="5" label="One Day" time={1} unit="days" />
                <Button index="6" label="3 Days" time={3} unit="days" />
                <Button index="7" label="One Week" time={1} unit="weeks" />
                <Button index="8" label="One Month" time={1} unit="months" />
                <DualButton />
              </div>
              <div className="tab-list">
                <img className="arrow" src="img/expand-arrow.svg" />
              </div>
            </div>
        )
    }
}
