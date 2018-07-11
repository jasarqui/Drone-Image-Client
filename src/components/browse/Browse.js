/* import React components here */
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import BrowsePanel from './components/BrowsePanel';
import BrowseBody from './components/BrowseBody';
/* import bulma components */
import { Columns, Column } from 'bloomer';
/* import api here */
import * as API from '../../api';

export default class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      searchTag: '',
      images: [],
      currentPage: 1,
      totalPages: 1,
      /* these are filters */
      myUpload: false, // default is false
      category: 'All Seasons', // values: all, category name
      showData: this.props.loggedIn ? 'Public and Private Data' : 'Public Data' // values: Public and Private Data, Public Data, Private Data
    };

    /* since this is not an arrow binded function */
    this.setPages = this.setPages.bind(this);
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
      search: '',
      searchTag: '',
      myUpload: false,
      category: 'All Seasons',
      showData: this.props.loggedIn ? 'Public and Private Data' : 'Public Data'
    });
  };

  changeSearch = e => {
    this.setState({ search: e.target.value });
  };

  search = e => {
    e.preventDefault();
    this.setState({ searchTag: this.state.search });
    /* add search functionality here */
  };

  componentDidMount = () => {
    this.setPages().then(this.setImages);
  };

  /* reuseable set total pages function */
  async setPages() {
    API.countPages({
      myUpload: this.state.myUpload,
      category: this.state.category,
      showData: this.state.showData,
      search: this.state.search ? this.state.search : null
    }).then(result => {
      this.setState({
        currentPage: 1,
        totalPages: Math.ceil(result.data.data / 6)
      });
    });
  }

  /* reuseable set images function */
  setImages = () => {
    API.getImages({
      myUpload: this.state.myUpload,
      category: this.state.category,
      showData: this.state.showData,
      search: this.state.search ? this.state.search : null,
      start: 6 * (this.state.currentPage - 1)
    }).then(result => {
      this.setState({ images: result.data.data });
    });
  };

  render() {
    return (
      <DocumentTitle title="DIA | Browse">
        <div>
          <Columns isCentered isGapless style={{ minHeight: '100vh' }}>
            <Column isSize="1/4" style={{ backgroundColor: '#015249' }}>
              <BrowsePanel
                {...{
                  /* pass the props here */
                  loggedIn: this.props.loggedIn,
                  myUpload: this.state.myUpload,
                  showData: this.state.showData,
                  category: this.state.category,
                  search: this.state.search,
                  /* pass the handlers here */
                  searchImgs: this.search,
                  changeSearch: this.changeSearch,
                  filterMyUpload: this.filterMyUpload,
                  changeCategory: this.changeCategory,
                  changeData: this.changeData,
                  resetFilters: this.resetFilters
                }}
              />
            </Column>
            <Column isSize="3/4" style={{ backgroundColor: '#F8F8F8' }}>
              <BrowseBody
                {...{
                  /* pass the props here */
                  searchTag: this.state.searchTag,
                  myUpload: this.state.myUpload,
                  category: this.state.category,
                  showData: this.state.showData,
                  images: this.state.images,
                  currentPage: this.state.currentPage,
                  totalPage: this.state.totalPage
                }}
              />
            </Column>
          </Columns>
        </div>
      </DocumentTitle>
    );
  }
}
