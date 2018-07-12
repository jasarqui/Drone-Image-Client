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
  }

  /* reusable function for setting the page */
  newSearch = page => {
    this.setPages(page).then(this.setImages);
  };

  /* these are for change to current user uploads */
  filterMyUpload = e => {
    e.preventDefault();
    this.changeMyUpload().then(() => this.newSearch(1));
  };

  async changeMyUpload() {
    this.setState({ myUpload: !this.state.myUpload });
  }

  /* these are for change category */
  changeCategory = e => {
    e.preventDefault();
    this.onChangeCategory(e).then(() => this.newSearch(1));
  };

  async onChangeCategory(e) {
    this.setState({ category: e.target.dataset.value });
  }

  /* these are for changing data privacy */
  changeData = e => {
    e.preventDefault();
    this.onChangeData(e).then(() => this.newSearch(1));
  };

  async onChangeData(e) {
    this.setState({ showData: e.target.value });
  }

  /* these are for resetting filters when user logs out */
  resetFilterOnLogout = () => {
    this.changeFilterOnLogout().then(() => this.newSearch(1));
  };

  async changeFilterOnLogout() {
    this.setState({
      myUpload: false,
      showData: this.props.loggedIn ? 'Public and Private Data' : 'Public Data'
    });
  }

  /* these are for resetting filters */
  resetFilters = e => {
    e.preventDefault();
    this.onResetFilter().then(() => this.newSearch(1));
  };

  async onResetFilter() {
    this.setState({
      search: '',
      searchTag: '',
      myUpload: false,
      category: 'All Seasons',
      showData: this.props.loggedIn ? 'Public and Private Data' : 'Public Data'
    });
  }

  /* these are for searching */
  changeSearch = e => {
    this.setState({ search: e.target.value });
  };

  search = e => {
    e.preventDefault();
    this.onSearch().then(() => this.newSearch(1));
  };

  async onSearch() {
    this.setState({ searchTag: this.state.search });
  }

  /* page handling */
  changePage = offset => {
    this.newSearch(this.state.currentPage + offset);
    this.setState({ currentPage: this.state.currentPage + offset });
  };

  /* this will go back one page */
  prev = e => {
    e.preventDefault();
    if (this.state.currentPage !== 1) this.changePage(-1);
  };

  /* this will go to the next page */
  next = e => {
    e.preventDefault();
    if (this.state.currentPage !== this.state.totalPages) this.changePage(1);
  };

  /* this will go back two pages */
  prevTwo = e => {
    e.preventDefault();
    if (this.state.currentPage > 2) this.changePage(-2);
  };

  /* this will go to up two pages */
  nextTwo = e => {
    e.preventDefault();
    if (this.state.currentPage < this.state.totalPages - 1) this.changePage(2);
  };

  /* this will go back to the start */
  start = e => {
    e.preventDefault();
    if (this.state.currentPage !== 1) this.changePage(1 - this.currentPage);
  };

  /* this will go the last */
  last = e => {
    e.preventDefault();
    if (this.state.currentPage !== this.state.totalPages)
      this.changePage(this.state.totalPages - this.state.currentPage);
  };

  /* load the first images */
  componentDidMount = () => this.newSearch(1);

  /* reuseable set total pages function */
  async setPages(page) {
    API.countPages({
      myUpload: this.state.myUpload,
      category: this.state.category,
      showData: this.state.showData,
      search: this.state.search ? this.state.search : null
    }).then(result => {
      this.setState({
        currentPage: page,
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
      search: this.state.searchTag ? this.state.searchTag : null,
      start: 6 * (this.state.currentPage - 1)
    }).then(result => {
      this.setState({ images: result.data.data });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.loggedIn === false && nextProps.loggedIn === false)
      this.resetFilterOnLogout();
  }

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
                  totalPage: this.state.totalPages,
                  /* pass the handlers here */
                  next: this.next,
                  prev: this.prev,
                  nextTwo: this.nextTwo,
                  prevTwo: this.prevTwo,
                  start: this.start,
                  last: this.last
                }}
              />
            </Column>
          </Columns>
        </div>
      </DocumentTitle>
    );
  }
}
