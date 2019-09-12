import * as React from 'react';
import * as moment from 'moment';

interface TabItemProps {
    id: string;
    name: string;
    icon?: string;
    url: string;
    date?: any;
    onDelete: any;
}

export default class TabItem extends React.Component<TabItemProps> {
  openTab = () => {
    chrome.tabs.create({url: this.props.url});
    this.props.onDelete(this.props.id);
  }

  formatDate = () => {
    return moment(this.props.date).format("h:mm A - M/DD/YYYY");
  }

  render() {
    return (
      <div className="tab-item">
        <a href="#" onClick={this.openTab}>
          <div>
            <img src={this.props.icon} />
            <div className="tab-label" title={this.props.name}>
              <p className="tab-name">{this.props.name}</p>
              <p className="tab-date">{this.formatDate()}</p>
            </div>
          </div>
        </a>
        <a href="#" onClick={() => this.props.onDelete(this.props.id)}>
          <div className="delete-button">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="black" fillOpacity="0.04"/>
            <path d="M15.3333 8.66666L14.5 9.49999H10.3333V11.1667H12.8333H21.1666H23.6666V9.49999H19.5L18.6666 8.66666H15.3333ZM11.1666 12.8333V23.6667C11.1666 24.5833 11.9166 25.3333 12.8333 25.3333H21.1666C22.0833 25.3333 22.8333 24.5833 22.8333 23.6667V12.8333H11.1666Z" fill="white"/>
            </svg>
          </div>
        </a>
      </div>
    )
  }
}
