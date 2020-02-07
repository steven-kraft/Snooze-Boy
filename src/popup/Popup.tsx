import * as React from 'react';
import * as shortid from 'shortid';
import './Popup.scss';

import TabList from './components/TabList';
import ButtonGrid from './components/ButtonGrid';
import CustomSnooze from './components/CustomSnooze';
import ButtonEdit from './components/ButtonEdit';

interface AppProps {}
interface AppState {
  tabs: any,
  customSnooze: boolean,
  buttonEditor: boolean,
}

export default class Popup extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props, state);
        this.state = {tabs: [], customSnooze: false, buttonEditor: false}
    }

    componentDidMount(){
      this.loadTabs()
    }

    addTab = (date) => {
      chrome.tabs.query({highlighted: true, lastFocusedWindow: true}, function(tabs: Array<any>){
        console.log(tabs);
        var new_tabs = this.state.tabs;
        tabs.forEach(function(t) {
          if (new_tabs.filter(nt => t.url == nt.url && date == nt.date).length == 0) {
            var id = shortid.generate();
            var icon = t.favIconUrl ? t.favIconUrl : "img/favicon.svg"
            var new_tab = {key: id, id: id, cid: t.id, name: t.title, url: t.url, icon: icon, date: date}
            new_tabs.push(new_tab);
          }
        });
        var sorted_tabs = this.sortTabs(new_tabs);
        this.setState({tabs: sorted_tabs});
        this.saveTabs(sorted_tabs, true);
      }.bind(this));
    }

    sortTabs = (tabs) => {
      return tabs.sort((a, b) => (a.date > b.date) ? 1 : -1);
    }

    saveTabs = (tabs) => {
      chrome.runtime.sendMessage({message: "save", tabs: tabs});
    }

    loadTabs = () => {
      chrome.storage.local.get(['tabs'], function(result) {
        if (result.tabs) {
          this.setState({
            tabs: this.sortTabs(result.tabs)
          });
        } else {
          this.setState({
            tabs: []
          }, this.saveTabs);
        }
      }.bind(this));
    }

    handleDelete = tabId => {
      var tabs = this.state.tabs.filter(tab => tab.id !== tabId);
      this.setState({ tabs: tabs });
      this.saveTabs(tabs);
    }

    handleSnooze = (time) => {
      this.addTab(parseInt(time.format('x')));
    }

    customSnooze = () => {
      this.setState({customSnooze: !this.state.customSnooze});
    }

    buttonEditor = () => {
      this.setState({buttonEditor: !this.state.buttonEditor});
    }

    render() {
        if(this.state.customSnooze){
          return (
            <CustomSnooze onCancel={this.customSnooze.bind(this)} onSnooze={this.handleSnooze} />
          )
        }
        if(this.state.buttonEditor){
          return (
            <ButtonEdit />
          )
        }
        return (
            <div className="popupContainer">
              <ButtonGrid onSnooze={this.handleSnooze} customSnooze={this.customSnooze.bind(this)} buttonEditor={this.buttonEditor.bind(this)} />
              <TabList tabs={this.state.tabs} onDelete={this.handleDelete} />
            </div>
        )
    }
}
