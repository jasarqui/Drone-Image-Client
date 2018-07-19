/* import React components here */
import React, { Component } from 'react';
import Archive from '../modals/Archive';
/* import bulma components */
import {
  Pagination,
  PageControl,
  PageList,
  Page,
  PageLink,
  PageEllipsis,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardHeaderIcon,
  CardImage,
  CardContent,
  Image,
  Tag,
  Columns,
  Column,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownContent,
  Button
} from 'bloomer';

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
  back: {
    color: '#015249',
    borderColor: '#015249'
  }
};

export default class BrowseFolders extends Component {
  constructor(props) {
    super(props);

    this.state = { archiveModalOpen: false, archiveId: '' };
  }

  /* archive functions */
  archive = e => {
    e.preventDefault();
    this.setState({ archiveModalOpen: false });
    this.props.archive(this.state.archiveId);
  };

  openModal = e => {
    e.preventDefault();
    this.setState({
      archiveModalOpen: true,
      archiveId: e.currentTarget.dataset.value
    });
  };

  closeModal = e => {
    e.preventDefault();
    this.setState({ archiveModalOpen: false });
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
              style={{ ...style.back, float: 'right' }}
              isSize={'small'}
              onClick={this.props.closeFolder}>
              <Icon
                className={'fa fa-chevron-left fa-1x'}
                style={{ marginRight: '5px' }}
              />{' '}
              Back to Folders
            </Button>
          </Column>
          <Column isHidden={'desktop'}>
            <center>
              <Button
                style={style.back}
                isSize={'small'}
                onClick={this.props.closeFolder}>
                <Icon
                  className={'fa fa-chevron-left fa-1x'}
                  style={{ marginRight: '5px' }}
                />{' '}
                Back to Folders
              </Button>
            </center>
          </Column>
        </Columns>
        {/* below shows the items for that page */}
        {this.props.images.length !== 0 ? (
          <div>
            {this.props.images.map(image => {
              return (
                <Card key={image.id} style={style.content}>
                  <CardHeader
                    style={{
                      backgroundColor: '#77c9d4',
                      borderRadius: '15px 15px 0px 0px'
                    }}>
                    <CardHeaderTitle style={{ color: 'white' }}>
                      {image.name}
                    </CardHeaderTitle>
                    {!image.archived ? (
                      image.user_id && this.props.userID === image.user_id ? (
                        <CardHeaderIcon style={{ color: 'white' }}>
                          <Dropdown isHoverable isAlign={'right'}>
                            <DropdownTrigger>
                              <Icon className={'fa fa-gear fa-1x'} />
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownContent>
                                <DropdownItem
                                  data-value={image.id}
                                  onClick={this.openModal}>
                                  Archive
                                </DropdownItem>
                                <DropdownItem
                                  data-value={image.id}
                                  onClick={this.props.viewImage}>
                                  View
                                </DropdownItem>
                              </DropdownContent>
                            </DropdownMenu>
                          </Dropdown>
                        </CardHeaderIcon>
                      ) : !image.user_id ? (
                        <CardHeaderIcon style={{ color: 'white' }}>
                          <Dropdown isHoverable isAlign={'right'}>
                            <DropdownTrigger>
                              <Icon className={'fa fa-gear fa-1x'} />
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownContent>
                                <DropdownItem
                                  data-value={image.id}
                                  onClick={this.openModal}>
                                  Archive
                                </DropdownItem>
                                <DropdownItem
                                  data-value={image.id}
                                  onClick={this.props.viewImage}>
                                  View
                                </DropdownItem>
                              </DropdownContent>
                            </DropdownMenu>
                          </Dropdown>
                        </CardHeaderIcon>
                      ) : (
                        <div />
                      )
                    ) : (
                      <div />
                    )}
                  </CardHeader>
                  <CardImage>
                    <a
                      href="."
                      data-value={image.id}
                      onClick={this.props.viewImage}>
                      <Image src={image.filepath} />
                    </a>
                  </CardImage>
                  <CardContent style={{ padding: '5px' }}>
                    <center>
                      <Columns
                        isGapless
                        isHidden={'mobile'}
                        style={{ marginBottom: '0px' }}>
                        <Column isSize="1/3">
                          <Tag style={style.leftMargin}>Uploader</Tag>
                          <Tag isColor="light">
                            <small>
                              {image.user
                                ? image.user.firstname +
                                  ' ' +
                                  image.user.lastname
                                : 'anonymous'}
                            </small>
                          </Tag>
                        </Column>
                        <Column isSize="1/3">
                          <Tag style={style.leftMargin}>Camera</Tag>
                          <Tag isColor="light">
                            <small>{image.camera ? image.camera : 'n/a'}</small>
                          </Tag>
                        </Column>
                        <Column isSize="1/3">
                          <Tag style={style.leftMargin}>Date</Tag>
                          <Tag isColor="light">
                            <small>{image.date ? image.date : 'n/a'}</small>
                          </Tag>
                        </Column>
                      </Columns>
                      <Columns isGapless isHidden={'desktop'}>
                        <Column isSize="1/2">
                          <Tag style={style.leftMargin}>Uploader</Tag>
                          <Tag isColor="light">
                            <small>
                              {image.user
                                ? image.user.firstname +
                                  ' ' +
                                  image.user.lastname
                                : 'anonymous'}
                            </small>
                          </Tag>
                          <Tag isColor="info" style={style.leftMargin}>
                            Camera
                          </Tag>
                          <Tag isColor="light">
                            <small>{image.camera ? image.camera : 'n/a'}</small>
                          </Tag>
                        </Column>
                        <Column isSize="1/2">
                          <Tag isColor="info" style={style.leftMargin}>
                            Date
                          </Tag>
                          <Tag isColor="light">
                            <small>{image.date ? image.date : 'n/a'}</small>
                          </Tag>
                        </Column>
                      </Columns>
                    </center>
                  </CardContent>
                </Card>
              );
            })}
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
            <small>There are no images found.</small>
          </p>
        )}
        <Archive
          {...{
            /* pass the props here */
            active: this.state.archiveModalOpen,
            id: this.state.archiveId,
            /* pass the handlers here */
            close: this.closeModal,
            archive: this.archive
          }}
        />
      </div>
    );
  }
}
