/* import React components here */
import React, { Component } from 'react';
/* import bulma components */
import {
  Panel,
  PanelBlock,
  PanelHeading,
  PanelIcon,
  PanelTabs,
  Control,
  Input,
  Icon,
  Button,
  Select
} from 'bloomer';

/* create styles here */
const style = {
  noBorder: {
    border: '1px solid #015249',
    backgroundColor: '#015249',
    color: 'white'
  },
  lessMargin: {
    marginTop: '-50px'
  },
  textShow: {
    fontSize: '13px'
  },
  greenIcon: {
    color: '#57bc90'
  },
  redIcon: {
    color: '#ef6f6c'
  }
};

export default class BrowsePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Panel>
        <PanelHeading style={style.noBorder}>
          <strong>
            <small style={{ color: 'white' }}>Database</small>
          </strong>
        </PanelHeading>
        <PanelBlock style={style.noBorder}>
          <Control hasIcons="left">
            <Input isSize="small" placeholder="Search" />
            <Icon isSize="small" isAlign="left">
              <span className="fa fa-search" aria-hidden="true" />
            </Icon>
          </Control>
        </PanelBlock>
        {this.props.loggedIn ? (
          <PanelTabs style={style.noBorder}>
            <Control>
              <small style={style.textShow}>Shows</small>
              <Select
                style={style.noBorder}
                isSize={'small'}
                onChange={this.props.changeData}
                value={this.props.showData}>
                <option value="Public and Private Data">
                  Public and Private Data
                </option>
                <option value="Public Data">Public Data</option>
                <option value="Private Data">Private Data</option>
              </Select>
            </Control>
          </PanelTabs>
        ) : (
          <div />
        )}
        <PanelBlock
          href="."
          isActive
          style={style.noBorder}
          data-value={'all'}
          onClick={this.props.changeCategory}>
          <PanelIcon
            className={
              this.props.category === 'all'
                ? 'fa fa-check-circle'
                : 'fa fa-times-circle'
            }
            style={
              this.props.category === 'all' ? style.greenIcon : style.redIcon
            }
          />
          All
        </PanelBlock>
        <PanelBlock
          href="."
          style={style.noBorder}
          data-value={'1'}
          onClick={this.props.changeCategory}>
          <PanelIcon
            className={
              this.props.category === '1'
                ? 'fa fa-check-circle'
                : 'fa fa-times-circle'
            }
            style={
              this.props.category === '1' ? style.greenIcon : style.redIcon
            }
          />
          Category 1
        </PanelBlock>
        <PanelBlock
          href="."
          style={style.noBorder}
          data-value={'2'}
          onClick={this.props.changeCategory}>
          <PanelIcon
            className={
              this.props.category === '2'
                ? 'fa fa-check-circle'
                : 'fa fa-times-circle'
            }
            style={
              this.props.category === '2' ? style.greenIcon : style.redIcon
            }
          />
          Category 2
        </PanelBlock>
        <PanelBlock
          href="."
          style={style.noBorder}
          data-value={'3'}
          onClick={this.props.changeCategory}>
          <PanelIcon
            className={
              this.props.category === '3'
                ? 'fa fa-check-circle'
                : 'fa fa-times-circle'
            }
            style={
              this.props.category === '3' ? style.greenIcon : style.redIcon
            }
          />
          Category 3
        </PanelBlock>
        <PanelBlock
          href="."
          style={style.noBorder}
          onClick={this.props.filterMyUpload}>
          <PanelIcon
            className={
              this.props.myUpload ? 'fa fa-check-circle' : 'fa fa-times-circle'
            }
            style={this.props.myUpload ? style.greenIcon : style.redIcon}
          />
          Show only my images
        </PanelBlock>
        <PanelBlock style={style.noBorder}>
          <Button isOutlined isFullWidth onClick={this.props.resetFilters}>
            {' '}
            Reset all filters
          </Button>
        </PanelBlock>
      </Panel>
    );
  }
}
