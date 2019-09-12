import * as React from 'react';
import TabItem from './TabItem';

interface TabCategoryProps {
  title?: string;
  tabs: Array<any>;
  onDelete: any;
}

export default class TabCategory extends React.Component<TabCategoryProps> {
  render() {
    return (
      <div className="tab-category">
        <p className="category-title">{this.props.title}</p>
        {this.props.tabs.map(tab => (
          <TabItem key={tab.key} id={tab.id} name={tab.name} url={tab.url} icon={tab.icon} date={tab.date} onDelete={this.props.onDelete} />
        ))}
      </div>
    )
  }
}
