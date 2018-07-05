/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import {
  Box,
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
  Delete,
  Columns,
  Column
} from 'bloomer';

/* create styles here */
const style = {
  content: {
    marginTop: '15px'
  },
  leftMargin: {
    marginLeft: '10px'
  }
};

export default class BrowseBody extends Component {
  constructor(props) {
    super(props);

    this.state = { activePage: 0 };
  }

  render() {
    return (
      <Box>
        {/* below shows the tags */}
        {'Currently shows '}
        {this.props.showData === 'Public and Private Data'
          ? 'all data'
          : this.props.showData === 'Public Data'
            ? 'public data'
            : 'private data'}
        {' of '}
        {this.props.myUpload ? 'your images' : "everyone's images"}
        {' that is of '}
        {this.props.category === 'all'
          ? 'all categories.'
          : 'category ' + this.props.category + '.'}
        {/* below shows the items for that page */}
        {this.props.images
          ? this.props.images.map(image => {
              return (
                <Card key={image.id} style={style.content}>
                  <CardHeader>
                    <CardHeaderTitle>{image.name}</CardHeaderTitle>
                    <CardHeaderIcon>
                      <Delete />
                    </CardHeaderIcon>
                  </CardHeader>
                  <CardImage>
                    <Image src={image.filepath} />
                  </CardImage>
                  <CardContent style={{ padding: '5px' }}>
                    <center>
                      <Columns isGapless isHidden={'mobile'}>
                        <Column isSize="1/3">
                          <Tag isColor="info" style={style.leftMargin}>
                            Uploader
                          </Tag>
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
                          <Tag isColor="info" style={style.leftMargin}>
                            Camera
                          </Tag>
                          <Tag isColor="light">
                            <small>{image.camera}</small>
                          </Tag>
                        </Column>
                        <Column isSize="1/3">
                          <Tag isColor="info" style={style.leftMargin}>
                            Date
                          </Tag>
                          <Tag isColor="light">
                            <small>{image.date}</small>
                          </Tag>
                        </Column>
                      </Columns>
                      <Columns isGapless isHidden={'desktop'}>
                        <Column isSize="1/2">
                          <Tag isColor="info" style={style.leftMargin}>
                            Uploader
                          </Tag>
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
                            <small>{image.camera}</small>
                          </Tag>
                        </Column>
                        <Column isSize="1/2">
                          <Tag isColor="info" style={style.leftMargin}>
                            Date
                          </Tag>
                          <Tag isColor="light">
                            <small>{image.date}</small>
                          </Tag>
                        </Column>
                      </Columns>
                    </center>
                  </CardContent>
                </Card>
              );
            })
          : 'There are no images to view yet.'}
        {/* below shows the pagination */}
        <Pagination isSize="small" isAlign="centered" style={style.content}>
          <PageControl>Previous</PageControl>
          <PageControl isNext>Next</PageControl>
          <PageList>
            <Page>
              <PageLink>1</PageLink>
            </Page>
            <Page>
              <PageEllipsis />
            </Page>
            <Page>
              <PageLink>45</PageLink>
            </Page>
            <Page>
              <PageLink isCurrent>46</PageLink>
            </Page>
            <Page>
              <PageLink>47</PageLink>
            </Page>
            <Page>
              <PageEllipsis />
            </Page>
            <Page>
              <PageLink>86</PageLink>
            </Page>
          </PageList>
        </Pagination>
      </Box>
    );
  }
}
