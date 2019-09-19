import * as React from 'react';
import * as shortid from 'shortid';
import './Popup.scss';

import TabList from './components/TabList';
import ButtonGrid from './components/ButtonGrid';
import CustomSnooze from './components/CustomSnooze';

interface AppProps {}
interface AppState {
  tabs: any,
  customSnooze: boolean
}

export default class Popup extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props, state);
        this.state = {tabs: [], customSnooze: false}
    }

    componentDidMount(){
      this.loadTabs()
    }

    addTab = (date) => {
      chrome.tabs.query({highlighted: true, lastFocusedWindow: true}, function(tabs: Array<any>){
        var new_tabs = this.state.tabs;
        tabs.forEach(function(t) {
          if (new_tabs.filter(nt => t.url == nt.url && date == nt.date).length == 0) {
            console.log(t);
            var id = shortid.generate();
            var new_tab = {key: id, id: id, name: t.title, url: t.url, icon: t.favIconUrl, date: date}
            new_tabs.push(new_tab);
            chrome.tabs.remove(t.id);
            console.log("TAB ADDED");
            console.log(new_tab);
          }
        });
        this.setState({tabs: this.sortTabs(new_tabs)}, this.saveTabs).then(window.close);
      }.bind(this));
    }

    sortTabs = (tabs) => {
      return tabs.sort((a, b) => (a.date > b.date) ? 1 : -1);
    }

    saveTabs = (callback = null) => {
      console.log(this.state.tabs);
      chrome.storage.local.set({'tabs': this.state.tabs}, callback);
    }

    loadTabs = () => {
      chrome.storage.local.get(['tabs'], function(result) {
        if (result.tabs) {
          console.log("Tabs Found in Storage, loading into list")
          this.setState({
            tabs: this.sortTabs(result.tabs)
          });
        } else {
          console.log("No Tabs Found, Initializing List")
          this.setState({
            tabs: []
          }, this.saveTabs);
        }
      }.bind(this));
    }

    handleDelete = tabId => {
      this.setState({ tabs: this.state.tabs.filter(tab => tab.id !== tabId) }, this.saveTabs);
    }

    handleSnooze = (time) => {
      this.addTab(parseInt(time.format('x')));
    }

    customSnooze() {
      this.setState({customSnooze: !this.state.customSnooze});
    }

    render() {
        if(this.state.customSnooze){
          return (
            <CustomSnooze onCancel={this.customSnooze.bind(this)} onSnooze={this.handleSnooze} />
          )
        }
        return (
            <div className="popupContainer">
              <ButtonGrid onSnooze={this.handleSnooze} customSnooze={this.customSnooze.bind(this)} />
              <TabList tabs={this.state.tabs} onDelete={this.handleDelete} />
            </div>
        )
    }
}
