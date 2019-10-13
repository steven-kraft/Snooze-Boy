import * as React from 'react';
import {Popout} from 'react-popout-component';

interface ButtonEditorProps {
  onClose: any;
  button: any;
}

const options = {
  resizeable: false,
  height: 234,
  width: 314,
};

export default class Button extends React.Component<ButtonEditorProps> {
  constructor(props) {
    super(props);
  }

  render() {
    var windowTitle = 'Edit "' + this.props.button.label + '" Button';

    return (
      <Popout options={options} html="<div/>" onClose={this.props.onClose}>
        <title>{windowTitle}</title>
        <div id="button-editor">
          <div className="icon-preview"><img src="img/icon-1.svg" /></div>
          <a href="#">
            <svg width="77" height="30" viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="77" height="30" rx="4" fill="#E0E0E0"/>
              <path d="M41.2835 16.4365C41.2835 15.999 41.1286 15.6618 40.8187 15.4248C40.5133 15.1878 39.9596 14.9486 39.1575 14.707C38.3555 14.4655 37.7174 14.1966 37.2435 13.9004C36.3366 13.3307 35.8831 12.5879 35.8831 11.6719C35.8831 10.8698 36.209 10.209 36.8607 9.68945C37.5169 9.16992 38.3668 8.91016 39.4105 8.91016C40.1032 8.91016 40.7207 9.03776 41.263 9.29297C41.8053 9.54818 42.2314 9.91276 42.5413 10.3867C42.8512 10.8561 43.0062 11.3779 43.0062 11.9521H41.2835C41.2835 11.4326 41.1195 11.027 40.7913 10.7354C40.4678 10.4391 40.0029 10.291 39.3968 10.291C38.8317 10.291 38.3919 10.4118 38.0775 10.6533C37.7676 10.8949 37.6126 11.2321 37.6126 11.665C37.6126 12.0296 37.7812 12.335 38.1185 12.5811C38.4557 12.8226 39.0117 13.0596 39.7864 13.292C40.5612 13.5199 41.1833 13.7819 41.6527 14.0781C42.1221 14.3698 42.4661 14.707 42.6849 15.0898C42.9036 15.4681 43.013 15.9124 43.013 16.4229C43.013 17.2523 42.694 17.9131 42.056 18.4053C41.4225 18.8929 40.5612 19.1367 39.472 19.1367C38.7519 19.1367 38.0889 19.0046 37.4827 18.7402C36.8812 18.4714 36.4118 18.1022 36.0745 17.6328C35.7418 17.1634 35.5755 16.6165 35.5755 15.9922H37.305C37.305 16.5573 37.4918 16.9948 37.8655 17.3047C38.2392 17.6146 38.7747 17.7695 39.472 17.7695C40.0736 17.7695 40.5247 17.6488 40.8255 17.4072C41.1308 17.1611 41.2835 16.8376 41.2835 16.4365ZM50.2619 16.6826H46.4064L45.5998 19H43.8019L47.5617 9.04688H49.1134L52.88 19H51.0754L50.2619 16.6826ZM46.8918 15.2881H49.7765L48.3341 11.1592L46.8918 15.2881ZM57.1484 16.833L59.6777 9.04688H61.5781L57.9961 19H56.3213L52.7529 9.04688H54.6465L57.1484 16.833ZM68.6834 14.5566H64.5955V17.6191H69.3739V19H62.8661V9.04688H69.326V10.4414H64.5955V13.1895H68.6834V14.5566Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4444 6H11.7778C10.7959 6 10 6.79594 10 7.77778V20.2222C10 21.2041 10.7959 22 11.7778 22H24.2222C25.2 22 26 21.2 26 20.2222V9.55556L22.4444 6ZM18 20.2222C16.5244 20.2222 15.3333 19.0311 15.3333 17.5556C15.3333 16.08 16.5244 14.8889 18 14.8889C19.4756 14.8889 20.6667 16.08 20.6667 17.5556C20.6667 19.0311 19.4756 20.2222 18 20.2222ZM20.6667 11.3333H11.7778V7.77778H20.6667V11.3333Z" fill="#1D1D1D"/>
            </svg>
          </a>
          <input type="radio" name="type" value="time" />
          <select>
            <option value="0">12:00 AM</option>
          </select>
          <select>
            <option value="0">Sunday</option>
          </select>
          <input type="radio" name="type" value="interval" />
          <select>
            <option value="1">1</option>
          </select>
          <select>
            <option value="hours">Hours</option>
          </select>
          <input type="text" placeholder="Custom Snooze Button" name="label"/>
        </div>
      </Popout>
    );
  }
}
