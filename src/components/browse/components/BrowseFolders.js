/* import React components here */
import React, { Component } from 'react';
import Folder from '../modals/Folder';
import EditFolder from '../modals/EditFolder';
/* import bulma components */
import {
  Pagination,
  PageControl,
  PageList,
  Page,
  PageLink,
  PageEllipsis,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Box,
  Media,
  MediaLeft,
  MediaContent,
  Icon,
  Columns,
  Column,
  Button
} from 'bloomer';
/* import assets here */
import Sunny from '../../../assets/sunny.png';
import Rainy from '../../../assets/rainy.png';

/* create styles here */
const style = {
  content: {
    marginTop: '15px',
    borderRadius: '15px'
  },
  leftMargin: {
    marginLeft: '10px',
    backgroundColor: '#57bc90',
    color: 'white'
  },
  tag: {
    backgroundColor: '#77c9d4',
    color: 'white'
  },
  add: {
    color: '#015249',
    borderColor: '#015249'
  },
  flex: {
    /* pseudo flexbox */
    display: 'flex',
    flexDirection: 'column',
    verticalAlign: 'center'
  },
  folderButton: {
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    verticalAlign: 'center',
    float: 'right',
    marginLeft: '5px'
  }
};

export default class BrowseBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folderModalOpen: false,
      editModalOpen: false,
      currentFolder: ''
    };
  }

  openModal = e => {
    e.preventDefault();
    this.getCurrentFolder(e);
  };

  async getCurrentFolder(e) {
    if (e.currentTarget.dataset.value === 'add')
      this.setState({ folderModalOpen: true });
    else
      this.setState({
        editModalOpen: true,
        currentFolder: e.currentTarget.dataset.value
      });
  }

  closeModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === 'add'
      ? this.setState({ folderModalOpen: false })
      : this.setState({ editModalOpen: false });
  };

  close = modal => {
    modal === 'add'
      ? this.setState({ folderModalOpen: false })
      : this.setState({ editModalOpen: false });
  };

  render() {
    return (
      <div style={{ padding: '30px' }}>
        {/* below shows the tags */}
        <Columns>
          <Column>
            <Breadcrumb hasSeparator={'dot'}>
              <ul>
                <BreadcrumbItem>
                  <Tag style={style.tag}>{this.props.showData}</Tag>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Tag style={style.tag}>{this.props.category}</Tag>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Tag style={style.tag}>
                    {this.props.myUpload ? 'My Uploads' : 'All Uploads'}
                  </Tag>
                </BreadcrumbItem>
                {this.props.searchTag ? (
                  <BreadcrumbItem>
                    <Tag style={style.tag}>{this.props.searchTag}</Tag>
                  </BreadcrumbItem>
                ) : (
                  <div />
                )}
              </ul>
            </Breadcrumb>
          </Column>
          <Column isHidden={'mobile'}>
            <Button
              style={{ ...style.add, float: 'right' }}
              isSize={'small'}
              data-value={'add'}
              onClick={this.openModal}>
              <Icon
                className={'fa fa-folder fa-1x'}
                style={{ marginRight: '5px' }}
              />{' '}
              Add Folder
            </Button>
          </Column>
          <Column isHidden={'desktop'}>
            <center>
              <Button
                style={style.add}
                isSize={'small'}
                data-value={'add'}
                onClick={this.openModal}>
                <Icon
                  className={'fa fa-folder fa-1x'}
                  style={{ marginRight: '5px' }}
                />{' '}
                Add Folder
              </Button>
            </center>
          </Column>
        </Columns>
        {/* below shows the items for that page */}
        {this.props.folders.length !== 0 ? (
          <div>
            <Columns isMultiline>
              {this.props.folders.map(folder => {
                return (
                  <Column key={folder.id} isSize="1/2">
                    <Box style={{ padding: '10px' }}>
                      <Media
                        isSize={'small'}
                        style={{ margin: '0px', padding: '0px' }}>
                        <MediaLeft style={style.flex}>
                          <img
                            style={{
                              borderRadius: '50%',
                              width: '35px',
                              height: '35px',
                              border: '3px solid #015249'
                            }}
                            alt={`${folder.season}`}
                            src={folder.season === 'DRY' ? Sunny : Rainy}
                          />
                        </MediaLeft>
                        <MediaContent>
                          <div style={{ float: 'left' }}>
                            <p>{folder.name}</p>
                            <small style={{ color: '#999999' }}>
                              {folder.images
                                ? folder.images.length === 1
                                  ? '1 image available'
                                  : `${folder.images.length} images available`
                                : 'No images available'}
                            </small>
                          </div>
                          <div style={{ float: 'right' }}>
                            <Button style={style.folderButton} isSize={'small'}>
                              <Icon className={'fa fa-trash fa-sm'} />
                            </Button>
                            <Button
                              style={style.folderButton}
                              isSize={'small'}
                              data-value={folder.id}
                              onClick={this.openModal}>
                              <Icon className={'fa fa-edit fa-sm'} />
                            </Button>
                            <Button
                              style={style.folderButton}
                              isSize={'small'}
                              onClick={() => {
                                this.props.openFolder(folder.id);
                              }}>
                              <Icon className={'fa fa-eye fa-sm'} />
                            </Button>
                          </div>
                        </MediaContent>
                      </Media>
                    </Box>
                  </Column>
                );
              })}
            </Columns>
            <Pagination isSize="small" isAlign="centered" style={style.content}>
              {this.props.totalPage > 1 ? (
                <PageControl onClick={this.props.prev}>Previous</PageControl>
              ) : (
                <div />
              )}
              {this.props.totalPage > 1 ? (
                <PageControl onClick={this.props.next} isNext>
                  Next
                </PageControl>
              ) : (
                <div />
              )}
              <PageList>
                {this.props.totalPage > 1 && this.props.currentPage > 3 ? (
                  <Page>
                    <PageLink onClick={this.props.start}>1</PageLink>
                  </Page>
                ) : (
                  <div />
                )}
                {this.props.totalPage > 1 && this.props.currentPage > 4 ? (
                  <Page>
                    <PageEllipsis />
                  </Page>
                ) : (
                  <div />
                )}
                {this.props.totalPage > 1 && this.props.currentPage > 2 ? (
                  <Page>
                    <PageLink onClick={this.props.prevTwo}>
                      {this.props.currentPage - 2}
                    </PageLink>
                  </Page>
                ) : (
                  <div />
                )}
                {this.props.totalPage > 1 && this.props.currentPage > 1 ? (
                  <Page>
                    <PageLink onClick={this.props.prev}>
                      {this.props.currentPage - 1}
                    </PageLink>
                  </Page>
                ) : (
                  <div />
                )}
                <Page>
                  <PageLink
                    style={{
                      backgroundColor: '#77c9d4',
                      color: 'white',
                      border: '1px solid #77c9d4'
                    }}>
                    {this.props.currentPage}
                  </PageLink>
                </Page>
                {this.props.totalPage > 1 &&
                this.props.currentPage < this.props.totalPage ? (
                  <Page>
                    <PageLink onClick={this.props.next}>
                      {this.props.currentPage + 1}
                    </PageLink>
                  </Page>
                ) : (
                  <div />
                )}
                {this.props.totalPage > 1 &&
                this.props.currentPage + 1 < this.props.totalPage ? (
                  <Page>
                    <PageLink onClick={this.props.nextTwo}>
                      {this.props.currentPage + 2}
                    </PageLink>
                  </Page>
                ) : (
                  <div />
                )}
                {this.props.totalPage > 1 &&
                this.props.currentPage + 3 < this.props.totalPage ? (
                  <Page>
                    <PageEllipsis />
                  </Page>
                ) : (
                  <div />
                )}
                {this.props.currentPage + 2 < this.props.totalPage ? (
                  <Page>
                    <PageLink onClick={this.props.last}>
                      {this.props.totalPage}
                    </PageLink>
                  </Page>
                ) : (
                  <div />
                )}
              </PageList>
            </Pagination>
          </div>
        ) : (
          <p>
            <small>There are no folders found.</small>
          </p>
        )}
        <Folder
          {...{
            /* pass props here */
            active: this.state.folderModalOpen,
            page: this.props.currentPage,
            /* pass handlers here */
            newFolderSearch: this.props.newFolderSearch,
            close: this.closeModal,
            closeDirect: this.close
          }}
        />
        <EditFolder
          {...{
            /* pass props here */
            active: this.state.editModalOpen,
            page: this.props.currentPage,
            folder_id: this.state.currentFolder,
            /* pass handlers here */
            newFolderSearch: this.props.newFolderSearch,
            close: this.closeModal,
            closeDirect: this.close
          }}
        />
      </div>
    );
  }
}
