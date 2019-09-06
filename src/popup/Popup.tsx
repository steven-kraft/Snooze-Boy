import * as React from 'react';
import * as moment from 'moment';
import './Popup.scss';

interface AppProps {}
interface AppState {}

var test_tabs = [
  {name: "Tab 1", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000},
  {name: "Tab 2", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000},
  {name: "Tab 3", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000},
  {name: "Tab 4", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000},
  {name: "Tab 5", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000},
  {name: "Tab 6", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000},
  {name: "Tab 7", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000},
  {name: "Tab 8", url: "https://www.google.com/", icon: "https://s.ytimg.com/yts/img/favicon_96-vflW9Ec0w.png", date: 1567738800000}
]



interface ButtonProps {
  index: string;
  label: string;
  icon?: string;
  time?: number;
  unit?: moment.unitOfTime.DurationConstructor;
}

class Button extends React.Component<ButtonProps> {
  constructor(props) {
    super(props);
    this.handle_snooze = this.handle_snooze.bind(this);
  }

  handle_snooze(): void {
    let date = Date.now();
    chrome.runtime.sendMessage({ new_snooze: true, date: date });
    alert(moment().add(this.props.time, this.props.unit));
    window.close();
  }

  render() {
    if (!this.props.icon) {
      var img = "img/icon-" + this.props.index + ".svg";
    } else {
      var img = "img/" + this.props.icon;
    }

    return (
      <button className="snooze-button" onClick={this.handle_snooze}>
        <div className="icon"><img src={img} /></div>
        <div className="label">{this.props.label}</div>
      </button>
    );
  }
}

interface DualButtonProps {
  flip?: any;
  flipped?: boolean;
}

class DualButton extends React.Component<DualButtonProps> {
  custom_snooze(): void {
    alert("CUSTOM SNOOZE WINDOW");
    window.close();
  }

  open_settings(): void {
    alert("SETTINGS");
    window.close();
  }

  render() {
    var button = (<a onClick={this.custom_snooze} href="#" id="top-button">
      <path d="M33.8308 100H0V0H100V34.1584L33.8308 100Z" className="bg" />
      <path d="M18.5 12V17H16C13.2425 17 11 19.2425 11 22V57C11 59.7575 13.2425 62 16 62H51C53.7575 62 56 59.7575 56 57V22C56 19.2425 53.7575 17 51 17H48.5V12H43.5V17H23.5V12H18.5ZM16 29.5H51L51.0049 57H16V29.5ZM31 37V42H26V47H31V52H36V47H41V42H36V37H31Z" fill="white"/>
    </a>)
    if (this.props.flipped) {
      button = (<a onClick={this.open_settings} href="#" id="top-button">
        <path d="M33.8308 100H0V0H100V34.1584L33.8308 100Z" className="bg" />
        <path d="M61.1255 35.0567L54.958 34.0487C54.5969 32.8111 54.1033 31.6216 53.4855 30.4957L57.0858 25.3649C57.377 24.9506 57.3269 24.3861 56.969 24.0271L52.9105 19.9711C52.5484 19.6101 51.9786 19.5631 51.5633 19.8626L46.5093 23.495C45.3728 22.8668 44.1727 22.368 42.9277 22.0059L41.8518 15.864C41.7642 15.3652 41.3311 15 40.8239 15H35.0843C34.5729 15 34.1367 15.3704 34.0543 15.8755L33.0566 21.984C31.8043 22.344 30.6021 22.8376 29.4699 23.4574L24.4294 19.8574C24.013 19.56 23.4464 19.608 23.0843 19.968L19.0279 24.024C18.67 24.3819 18.6199 24.9454 18.911 25.3597L22.4581 30.4341C21.8268 31.5767 21.3238 32.7861 20.9575 34.0445L14.8724 35.0577C14.3694 35.1412 14 35.5774 14 36.0866V41.8257C14 42.3318 14.3632 42.7649 14.8609 42.8536L20.946 43.9325C21.3102 45.1878 21.8132 46.3972 22.4466 47.543L18.8557 52.5652C18.5594 52.9795 18.6063 53.5482 18.9663 53.9103L23.0237 57.9704C23.3817 58.3283 23.9463 58.3784 24.3606 58.0873L29.4427 54.528C30.5834 55.1551 31.7887 55.6529 33.0378 56.0139L34.0564 62.1297C34.1388 62.6317 34.574 63 35.0843 63H40.8239C41.33 63 41.7631 62.6369 41.8508 62.1391L42.9413 55.993C44.1925 55.6247 45.3916 55.1238 46.5207 54.4957L51.6394 58.0863C52.0548 58.3795 52.6183 58.3283 52.9773 57.9704L57.0347 53.9103C57.3958 53.5482 57.4427 52.9774 57.1432 52.5621L53.4928 47.4939C54.1117 46.367 54.6032 45.1753 54.9611 43.9377L61.137 42.8536C61.6368 42.7659 62 42.3318 62 41.8257V36.0866C62.001 35.5753 61.6306 35.1391 61.1255 35.0567ZM38 46.3043C33.9656 46.3043 30.695 43.0341 30.695 39C30.695 34.9659 33.9656 31.6957 38 31.6957C42.0344 31.6957 45.305 34.9659 45.305 39C45.305 43.0341 42.0344 46.3043 38 46.3043Z" fill="white"/>
        </a>)
    }

    return (
      <div className="snooze-button dual">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <a onClick={this.props.flip} href="#" id="bottom-button">
          <rect width="100" height="100" className="bg" />
          <path d="M91.497 86.1994C91.8589 86.0512 92.0954 85.6946 92.0971 85.3028L93.8586 70.6338C93.8604 70.099 93.4235 69.6622 92.8879 69.663L78.2498 71.4554C77.9868 71.4536 77.7405 71.5604 77.5632 71.7378C77.4732 71.8278 77.4026 71.9355 77.3514 72.0538C77.2013 72.4173 77.2975 72.8206 77.5755 73.0986L81.4224 76.9455C72.637 85.7308 66.3165 87.0952 59.0094 78.6178C67.9147 94.9662 77.9118 90.6772 86.5329 82.0561L90.453 85.9761C90.7319 86.2532 91.1343 86.3503 91.497 86.1994Z" fill="white"/>
        </a>
        <line x1="33.6464" y1="100.646" x2="100.646" y2="33.6464" stroke="#6D6D6D"/>
        {button}
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

interface TabCategoryProps {
  title?: string;
  tabs: Array<any>;
}

class TabCategory extends React.Component<TabCategoryProps> {
  render() {
    return (
      <div className="tab-category">
        <p className="category-title">{this.props.title}</p>
        {this.props.tabs.map(tab => (
          <TabItem name={tab.name} url={tab.url} icon={tab.icon} date={tab.date} />
        ))}
      </div>
    )
  }
}

interface TabItemProps {
    name: string;
    icon?: string;
    url: string;
    date?: any;
}

class TabItem extends React.Component<TabItemProps> {
  openTab = () => {
    chrome.tabs.create({url: this.props.url});
  }

  removeTab = () => {
    alert("TAB REMOVED");
  }

  render() {
    return (
      <div className="tab-item">
        <a href="#" onClick={this.openTab}>
          <div>
            <img src={this.props.icon} />
            <div className="tab-label">
              <p className="tab-name">{this.props.name}</p>
              <p className="tab-date">{this.props.date}</p>
            </div>
          </div>
        </a>
        <a href="#" onClick={this.removeTab}>
          <div className="delete-button">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="black" fill-opacity="0.04"/>
            <path d="M15.3333 8.66666L14.5 9.49999H10.3333V11.1667H12.8333H21.1666H23.6666V9.49999H19.5L18.6666 8.66666H15.3333ZM11.1666 12.8333V23.6667C11.1666 24.5833 11.9166 25.3333 12.8333 25.3333H21.1666C22.0833 25.3333 22.8333 24.5833 22.8333 23.6667V12.8333H11.1666Z" fill="white"/>
            </svg>
          </div>
        </a>
      </div>
    )
  }
}

class TabList extends React.Component {
  state = { showing: false }

  toggleMenu = () => {
    this.setState({
      showing: !this.state.showing
    })
  }

  render() {
    const  visibility = this.state.showing? "visible" : "hidden";

    return (
      <div>
        <div className={`tab-list ${visibility}`}>
          <TabCategory title="Coming Up" tabs={test_tabs} />
        </div>
        <div className="tab-list-expand" onClick={this.toggleMenu}>
          <img className={`arrow ${visibility}`} src="img/expand-arrow.svg" />
        </div>
      </div>
    );
  }
}

class ButtonGrid extends React.Component<{}, {flipped: string}> {
  constructor(props) {
    super(props);
    this.state = {flipped: ""};
  }

  flip() {
    this.setState({
      flipped: this.state.flipped ? "" : " flipped"
    });
  }

  render() {
    return(<div className={"button-grid" + this.state.flipped}>
        <div className="front">
          <Button index="1" label="One Hour" time={1} unit="hours" />
          <Button index="2" label="3 Hours" time={3} unit="hours" />
          <Button index="3" label="6 Hours" time={6} unit="hours" />
          <Button index="4" label="12 Hours" time={12} unit="hours" />
          <Button index="5" label="One Day" time={1} unit="days" />
          <Button index="6" label="3 Days" time={3} unit="days" />
          <Button index="7" label="One Week" time={1} unit="weeks" />
          <Button index="8" label="One Month" time={1} unit="months" />
          <DualButton flip={this.flip.bind(this)} />
        </div>

        <div className="back">
          <Button index="1" label="Morning" time={1} unit="hours" icon="flip-icon-1.svg" />
          <Button index="2" label="Night" time={3} unit="hours" icon="flip-icon-2.svg"  />
          <Button index="3" label="Weekend" time={6} unit="hours" icon="flip-icon-3.svg"  />
          <Button index="4" label="Soon" time={12} unit="hours" icon="flip-icon-4.svg"  />
          <Button index="5" label="Few Days" time={1} unit="days" icon="flip-icon-5.svg"  />
          <Button index="6" label="Eventually" time={3} unit="days" icon="flip-icon-6.svg"  />
          <Button index="7" label="Custom 1" time={1} unit="weeks" icon="flip-icon-7.svg"  />
          <Button index="8" label="Custom 2" time={1} unit="months" icon="flip-icon-8.svg"  />
          <DualButton flip={this.flip.bind(this)} flipped={true} />
        </div>
    </div>);
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
              <ButtonGrid />
              <TabList />
            </div>
        )
    }
}
