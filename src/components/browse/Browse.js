/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import BrowsePanel from './components/BrowsePanel';
import BrowseBody from './components/BrowseBody';
/* import bulma components */
import { Columns, Column } from 'bloomer';

/* create styles here */
const style = {
  columnPadding: {
    padding: '20px'
  }
};

export default class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myUpload: false, // default is false
      category: 'all', // values: all, category name
      showData: this.props.loggedIn ? 'Public and Private Data' : 'Public Data' // values: Public and Private Data, Public Data, Private Data
    };
  }

  filterMyUpload = e => {
    e.preventDefault();
    this.setState({ myUpload: !this.state.myUpload });
  };

  changeCategory = e => {
    e.preventDefault();
    this.setState({ category: e.target.dataset.value });
  };

  changeData = e => {
    e.preventDefault();
    this.setState({ showData: e.target.value });
  };

  resetFilters = e => {
    e.preventDefault();
    this.setState({
      myUpload: false,
      category: 'all',
      showData: this.props.loggedIn ? 'Public and Private Data' : 'Public Data'
    });
  };

  render() {
    return (
      <DocumentTitle title="DIA | Browse">
        <div>
          <Columns isCentered style={style.columnPadding}>
            <Column isSize="1/4">
              <BrowsePanel
                {...{
                  /* pass the props here */
                  loggedIn: this.props.loggedIn,
                  myUpload: this.state.myUpload,
                  showData: this.state.showData,
                  category: this.state.category,
                  /* pass the handlers here */
                  filterMyUpload: this.filterMyUpload,
                  changeCategory: this.changeCategory,
                  changeData: this.changeData,
                  resetFilters: this.resetFilters
                }}
              />
            </Column>
            <Column isSize="3/4">
              <BrowseBody
                {...{
                  /* pass the props here */
                  myUpload: this.state.myUpload,
                  category: this.state.category,
                  showData: this.state.showData
                }}
              />
            </Column>
          </Columns>
        </div>
      </DocumentTitle>
    );
  }
}
