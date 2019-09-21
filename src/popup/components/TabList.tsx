import * as React from 'react';
import * as moment from 'moment';
import TabCategory from './TabCategory';

const time_labels = {
  "This Morning": 43200000,
  "This Afternoon": 64800000,
  "This Evening": 79200000,
  "Tonight": 86400000,
  "Tomorrow Morning": 129600000,
  "Tomorrow Afternoon": 151200000,
  "Tomorrow Evening": 165600000,
  "Tomorrow Night": 172800000,
  "Later This Week": 604800000,
  "In Less Than Two Weeks": 1209600000
}

interface TabListProps {
    onDelete: any;
    tabs: any;
}

export default class TabList extends React.Component<TabListProps> {
  state = { showing: false }

  toggleMenu = () => {
    this.setState({
      showing: !this.state.showing
    });
  }

  getTimeLabel(time){
    var today = new Date().setHours(0,0,0,0);
    var time_label = "INVALID DATE";
    if (moment(time).month == moment(today).month) {
      time_label = "Later This Month";
    } else {
      time_label = moment(time).format("MMMM YYYY");
    }

    for (var label in time_labels) {
      if (today + time_labels[label] > time) {
        time_label = label;
        break;
      }
    }

    return time_label;
  }

  separateCategories(tabs) {
    var sepTabs = [];
    var prevLabel = "";
    for (var t in tabs) {
      var label = this.getTimeLabel(tabs[t].date);
      if(label != prevLabel) {
        sepTabs.push({label: label, tabs: []});
        prevLabel = label;
      }
      sepTabs[sepTabs.length-1].tabs.push(tabs[t])
    }
    return sepTabs;
  }

  render() {
    const  visibility = this.state.showing? "visible" : "hidden";
    return (
      <div>
        <div className={`tab-list ${visibility}`}>
          {this.separateCategories(this.props.tabs).map(cat => (
            <TabCategory key={cat.label} title={cat.label} tabs={cat.tabs} onDelete={this.props.onDelete} />
          ))}
        </div>
        <div className="tab-list-expand" onClick={this.toggleMenu}>
          <img className={`arrow ${visibility}`} src="img/expand-arrow.svg" />
        </div>
      </div>
    );
  }
}
