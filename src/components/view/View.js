/* import React components here */
import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import Alert from "react-s-alert";
import ReactTooltip from "react-tooltip";
import ArchiveModal from "./modals/ArchiveModal";
import UnarchiveModal from "./modals/UnarchiveModal";
/* import bulma components */
import {
  Columns,
  Column,
  Icon,
  Message,
  MessageHeader,
  MessageBody,
  Menu,
  MenuLabel,
  MenuLink,
  MenuList,
  Input,
  Heading,
  Button
} from "bloomer";
/* import api here */
import * as API from "../../api";

/* create styles here */
const style = {
  marginCard: {
    margin: "30px",
    borderRadius: "25px"
  },
  icon: {
    marginRight: "3px"
  },
  removeUnderline: {
    textDecoration: "none"
  },
  switchOn: {
    color: "#57bc90",
    margin: "0px",
    padding: "0px",
    textDecoration: "none"
  },
  switchOff: {
    color: "#ef6f6c",
    margin: "0px",
    padding: "0px",
    textDecoration: "none"
  },
  toolbar: {
    textAlign: "center",
    padding: "15px 0px 0px 0px"
  },
  whiteText: {
    color: "white"
  },
  greenText: {
    color: "#57bc90"
  },
  redText: {
    color: "#ef6f6c"
  },
  blueText: {
    color: "#77c9d4"
  },
  dataHeader: {
    backgroundColor: "#015249",
    color: "white",
    paddingTop: "0px"
  },
  button: {
    backgroundColor: "#015249",
    border: "1px solid #015249",
    color: "white",
    marginTop: "0px",
    width: "25%",
    textAlign: "center"
  },
  activeButton: {
    color: "white",
    backgroundColor: "#77c9d4",
    border: "1px solid #77c9d4"
  },
  activeHelper: {
    float: "right",
    borderRadius: "50%",
    color: "white",
    backgroundColor: "#77c9d4",
    border: "none",
    marginTop: "-4px"
  },
  inactiveHelper: {
    float: "right",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "none",
    marginTop: "-4px"
  },
  imageColumn: {
    /* pseudo flexbox */
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    backgroundColor: "#f8f8f8",
    paddingLeft: "0px"
  }
};

export default class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: "",
      name: "",
      camera: "",
      season: "",
      private: "",
      year: "",
      drone: "",
      location: "",
      image: "",
      env_condition: "",
      date: "",
      archived: "",
      attrib: [],
      folder_name: "",
      /* these are for UX */
      folders: [],
      folder_exists: true,
      metadataOpen: true,
      attribOpen: true,
      archiveModalOpen: false,
      unarchiveModalOpen: false,
      userID: ""
    };
  }

  /* modal functions */
  openModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === "archive"
      ? this.setState({ archiveModalOpen: true })
      : this.setState({ unarchiveModalOpen: true });
  };

  closeModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === "archive"
      ? this.setState({ archiveModalOpen: false })
      : this.setState({ unarchiveModal: false });
  };

  /* this is to archive an image */
  archive = e => {
    e.preventDefault();
    this.archiveImage().then(() => {
      this.loadInfo("archive");
      this.setState({ archiveModalOpen: false });
    });
  };

  async archiveImage() {
    await API.archiveImg({ id: this.props.imageID });
  }

  /* this is to unarchive an image */
  unarchive = e => {
    e.preventDefault();
    this.unarchiveImage().then(() => {
      this.loadInfo("unarchive");
      this.setState({ unarchiveModalOpen: false });
    });
  };

  async unarchiveImage() {
    await API.unarchiveImg({ id: this.props.imageID });
  }

  /* handlers */
  handleMeta = e => {
    e.preventDefault();
    this.setState({ metadataOpen: !this.state.metadataOpen });
  };

  handleAttrib = e => {
    e.preventDefault();
    this.setState({ attribOpen: !this.state.attribOpen });
  };

  switch = e => {
    e.preventDefault();
    this.setState({ private: !this.state.private });
  };

  changeName = e => {
    this.setState({ name: e.target.value });
  };

  changeCam = e => {
    this.setState({ camera: e.target.value });
  };

  changeDate = e => {
    this.setState({ date: e.target.value });
  };

  changeSeason = e => {
    e.preventDefault();
    this.onChangeSeason(e).then(this.checkFolder);
  };

  async onChangeSeason(e) {
    this.setState({ season: e.currentTarget.dataset.value });
  }

  changeYear = e => {
    this.onChangeYear(e).then(this.checkFolder);
  };

  async onChangeYear(e) {
    this.setState({ year: e.target.value });
  }

  checkFolder = () => {
    /* check if folder generated is located in folders loaded */
    this.state.folders.filter(
      folder =>
        folder.name ===
        (this.state.season === "WET" ? "WS" : "DS") + this.state.year
    ).length > 0
      ? this.setState({ folder_exists: true })
      : this.setState({ folder_exists: false });
    /* change state name */
    this.setState({
      folder_name: (this.state.season === "WET" ? "WS" : "DS") + this.state.year
    });
  };

  changeDrone = e => {
    this.setState({ drone: e.target.value });
  };

  changeImage = e => {
    this.setState({ image: e.target.value });
  };

  changeLocation = e => {
    this.setState({ location: e.target.value });
  };

  changeEnvironment = e => {
    this.setState({ env_condition: e.target.value });
  };

  /* when user logs out */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.loggedIn === false &&
      nextProps.loggedIn === false &&
      (this.state.private || this.state.archived)
    )
      this.props.changePage("browse");
  }

  componentDidMount = () => {
    /* loads the image info */
    this.loadInfo("all");
    /* load the folders */
    API.getAllFolders().then(result => {
      this.setState({ folders: result.data.data });
    });
  };

  /* reusable load info */
  loadInfo = params => {
    if (params === "all") {
      API.getImage(this.props.imageID).then(result => {
        this.setState({
          fileURL: result.data.data.filepath,
          name: result.data.data.name,
          camera: result.data.data.camera,
          drone: result.data.data.drone,
          location: result.data.data.location,
          image: result.data.data.image,
          season: result.data.data.season,
          env_condition: result.data.data.env_cond,
          private: result.data.data.private,
          date: result.data.data.date,
          attrib: result.data.data.data,
          archived: result.data.data.archived,
          userID: result.data.data.user_id,
          year: result.data.data.folder.year,
          folder_name: result.data.data.folder.name
        });
      });
    } else {
      API.getImage(this.props.imageID).then(result => {
        this.setState({
          archived: result.data.data.archived
        });
      });
    }
  };

  /* analyzes one */
  analyze = e => {
    e.preventDefault();
    /* this is where we put the glue */
    API.analyze({ file: this.state.fileURL })
      .then(result => {
        this.setState({
          attrib: [
            { name: "Yield Percentage (%)", value: result.data.data.yield },
            { name: "Days before Harvest", value: result.data.data.days }
          ]
        });

        /* this is an alert on success */
        Alert.success("Successfully analyzed image.", {
          beep: false,
          position: "top-right",
          effect: "jelly",
          timeout: 2000
        });
      })
      .catch(err => {
        /* this is an alert on failure */
        Alert.error("Failed to analyze image.", {
          beep: false,
          position: "top-right",
          effect: "jelly",
          timeout: 2000
        });
      });
  };

  /* saves one */
  save = e => {
    e.preventDefault();
    if (this.state.folder_exists) {
      API.update({
        name: this.state.name,
        date: this.state.date,
        camera: this.state.camera,
        drone: this.state.drone,
        image: this.state.image,
        location: this.state.location,
        is_private: this.state.private,
        env_cond: this.state.env_condition,
        season: this.state.season,
        attrib: this.state.attrib,
        folder: this.state.folder_name,
        id: this.props.imageID
      })
        .then(() => {
          /* this is an alert on success */
          Alert.success("Successfully saved image.", {
            beep: false,
            position: "top-right",
            effect: "jelly",
            timeout: 2000
          });
        })
        .catch(() => {
          /* this is an alert on failure */
          Alert.error("Failed to save image.", {
            beep: false,
            position: "top-right",
            effect: "jelly",
            timeout: 2000
          });
        });
    } else {
      Alert.error("Must have a folder.", {
        beep: false,
        position: "top-right",
        effect: "jelly",
        timeout: 2000
      });
    }
  };

  render() {
    return (
      <DocumentTitle title="DIA | View">
        <div>
          <Columns isFullWidth style={{ backgroundColor: "#015249" }}>
            {this.state.userID && this.props.userID === this.state.userID ? (
              <Column style={style.toolbar} isHidden={"mobile"}>
                <a
                  href={"."}
                  data-tip={"Back to Browse Images"}
                  style={style.whiteText}
                  onClick={this.props.backToFolders}
                >
                  <Icon className={"fa fa-chevron-left fa-1x"} />
                  <Heading>GO BACK</Heading>
                </a>
              </Column>
            ) : !this.state.userID ? (
              <Column style={style.toolbar} isHidden={"mobile"}>
                <a
                  href={"."}
                  data-tip={"Back to Browse Images"}
                  style={style.whiteText}
                  onClick={this.props.backToFolders}
                >
                  <Icon className={"fa fa-chevron-left fa-1x"} />
                  <Heading>GO BACK</Heading>
                </a>
              </Column>
            ) : (
              <div />
            )}
            {this.state.userID && this.props.userID === this.state.userID ? (
              <Column style={style.toolbar} isHidden={"mobile"}>
                <a
                  href={"."}
                  data-tip={"Analyze Image"}
                  style={style.whiteText}
                  onClick={this.analyze}
                >
                  <Icon className={"fa fa-bolt fa-1x"} />
                  <Heading>ANALYZE</Heading>
                </a>
              </Column>
            ) : !this.state.userID ? (
              <Column style={style.toolbar} isHidden={"mobile"}>
                <a
                  href={"."}
                  data-tip={"Analyze Image"}
                  style={style.whiteText}
                  onClick={this.analyze}
                >
                  <Icon className={"fa fa-bolt fa-1x"} />
                  <Heading>ANALYZE</Heading>
                </a>
              </Column>
            ) : (
              <div />
            )}
            {this.state.userID && this.props.userID === this.state.userID ? (
              <Column style={style.toolbar} isHidden={"mobile"}>
                <a
                  href={"."}
                  data-tip={"Save Image"}
                  style={style.whiteText}
                  onClick={this.save}
                >
                  <Icon className={"fa fa-save fa-1x"} />
                  <Heading>SAVE</Heading>
                </a>
              </Column>
            ) : !this.state.userID ? (
              <Column style={style.toolbar} isHidden={"mobile"}>
                <a
                  href={"."}
                  data-tip={"Save Image"}
                  style={style.whiteText}
                  onClick={this.save}
                >
                  <Icon className={"fa fa-save fa-1x"} />
                  <Heading>SAVE</Heading>
                </a>
              </Column>
            ) : (
              <div />
            )}
            {this.state.userID && this.props.userID === this.state.userID ? (
              this.state.archived ? (
                <Column style={style.toolbar} isHidden={"mobile"}>
                  <a
                    href={"."}
                    data-value={"unarchive"}
                    data-tip={"Remove from Archive"}
                    style={style.whiteText}
                    onClick={this.openModal}
                  >
                    <Icon className={"fa fa-plus-circle fa-1x"} />
                    <Heading>UNARCHIVE</Heading>
                  </a>
                </Column>
              ) : (
                <Column style={style.toolbar} isHidden={"mobile"}>
                  <a
                    href={"."}
                    data-value={"archive"}
                    data-tip={"Archive Image"}
                    style={style.whiteText}
                    onClick={this.openModal}
                  >
                    <Icon className={"fa fa-minus-circle fa-1x"} />
                    <Heading>ARCHIVE</Heading>
                  </a>
                </Column>
              )
            ) : !this.state.userID ? (
              this.state.archived ? (
                <Column style={style.toolbar} isHidden={"mobile"}>
                  <a
                    href={"."}
                    data-value={"unarchive"}
                    data-tip={"Remove from Archive"}
                    style={style.whiteText}
                    onClick={this.openModal}
                  >
                    <Icon className={"fa fa-plus-circle fa-1x"} />
                    <Heading>UNARCHIVE</Heading>
                  </a>
                </Column>
              ) : (
                <Column style={style.toolbar} isHidden={"mobile"}>
                  <a
                    href={"."}
                    data-value={"archive"}
                    data-tip={"Archive Image"}
                    style={style.whiteText}
                    onClick={this.openModal}
                  >
                    <Icon className={"fa fa-minus-circle fa-1x"} />
                    <Heading>ARCHIVE</Heading>
                  </a>
                </Column>
              )
            ) : (
              <Column style={style.toolbar} isHidden={"mobile"}>
                <Heading style={style.whiteText}>
                  <span
                    onClick={this.props.backToFolders}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    <Icon className={"fa fa-chevron-left fa-xs"}/>GO BACK
                  </span>{" "}
                  | NO USER PRIVILEGES
                </Heading>
              </Column>
            )}
            <Column
              style={{ paddingTop: "20px", textAlign: "center" }}
              isHidden={"desktop"}
            >
              {this.state.userID && this.props.userID === this.state.userID ? (
                <Button style={style.button} onClick={this.props.backToFolders}>
                  <center>
                    <Icon className={"fa fa-chevron-left fa-1x"} />
                    <small style={{ color: "white" }}>GO BACK</small>
                  </center>
                </Button>
              ) : !this.state.userID ? (
                <Button style={style.button} onClick={this.props.backToFolders}>
                  <center>
                    <Icon className={"fa fa-chevron-left fa-1x"} />
                    <small style={{ color: "white" }}>GO BACK</small>
                  </center>
                </Button>
              ) : (
                <div />
              )}
              {this.state.userID && this.props.userID === this.state.userID ? (
                <Button style={style.button} onClick={this.analyze}>
                  <center>
                    <Icon className={"fa fa-bolt fa-1x"} />
                    <small style={{ color: "white" }}>ANALYZE</small>
                  </center>
                </Button>
              ) : !this.state.userID ? (
                <Button style={style.button} onClick={this.analyze}>
                  <center>
                    <Icon className={"fa fa-bolt fa-1x"} />
                    <small style={{ color: "white" }}>ANALYZE</small>
                  </center>
                </Button>
              ) : (
                <div />
              )}
              {this.state.userID && this.props.userID === this.state.userID ? (
                <Button style={style.button} onClick={this.save}>
                  <center>
                    <Icon className={"fa fa-save fa-1x"} />
                    <small style={{ color: "white" }}>SAVE</small>
                  </center>
                </Button>
              ) : !this.state.userID ? (
                <Button style={style.button} onClick={this.save}>
                  <center>
                    <Icon className={"fa fa-save fa-1x"} />
                    <small style={{ color: "white" }}>SAVE</small>
                  </center>
                </Button>
              ) : (
                <div />
              )}
              {this.state.userID && this.props.userID === this.state.userID ? (
                this.state.archived ? (
                  <Button
                    data-value={"unarchive"}
                    style={style.button}
                    onClick={this.openModal}
                  >
                    <center>
                      <Icon className={"fa fa-plus-circle fa-1x"} />
                      <small style={{ color: "white" }}>UNARCHIVE</small>
                    </center>
                  </Button>
                ) : (
                  <Button
                    data-value={"archive"}
                    style={style.button}
                    onClick={this.openModal}
                  >
                    <center>
                      <Icon className={"fa fa-minus-circle fa-1x"} />
                      <small style={{ color: "white" }}>ARCHIVE</small>
                    </center>
                  </Button>
                )
              ) : !this.state.userID ? (
                this.state.archived ? (
                  <Button
                    data-value={"unarchive"}
                    style={style.button}
                    onClick={this.openModal}
                  >
                    <center>
                      <Icon className={"fa fa-plus-circle fa-1x"} />
                      <small style={{ color: "white" }}>UNARCHIVE</small>
                    </center>
                  </Button>
                ) : (
                  <Button
                    data-value={"archive"}
                    style={style.button}
                    onClick={this.openModal}
                  >
                    <center>
                      <Icon className={"fa fa-minus-circle fa-1x"} />
                      <small style={{ color: "white" }}>ARCHIVE</small>
                    </center>
                  </Button>
                )
              ) : (
                <Heading style={style.whiteText}>
                  <span
                    onClick={this.props.backToFolders}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    <Icon className={"fa fa-chevron-left fa-xs"}/>GO BACK
                  </span>{" "}
                  | NO USER PRIVILEGES
                </Heading>
              )}
            </Column>
          </Columns>
          <div>
            <Columns isFullWidth style={{ minHeight: "40vh" }}>
              <Column
                isSize={"1/3"}
                style={{ borderRight: "2px solid #015249" }}
              >
                <Menu>
                  <MenuLabel style={{ marginLeft: "10px" }}>
                    IMAGE INFO
                  </MenuLabel>
                  <MenuList>
                    <MenuLink style={style.removeUnderline}>
                      <Columns>
                        <Column isSize="1/4">Name</Column>
                        <Column isSize="3/4">
                          {this.state.userID &&
                          this.props.userID === this.state.userID ? (
                            <Input
                              type="text"
                              isSize="small"
                              value={this.state.name}
                              onChange={this.changeName}
                              placeholder="IMAGE1..."
                            />
                          ) : !this.state.userID ? (
                            <Input
                              type="text"
                              isSize="small"
                              value={this.state.name}
                              onChange={this.changeName}
                              placeholder="IMAGE1..."
                            />
                          ) : (
                            this.state.name
                          )}
                        </Column>
                      </Columns>
                    </MenuLink>
                    <MenuLink style={style.removeUnderline}>
                      <Columns>
                        <Column isSize="1/4">Date</Column>
                        <Column isSize="3/4">
                          {this.state.userID &&
                          this.props.userID === this.state.userID ? (
                            <Input
                              type="date"
                              isSize="small"
                              value={this.state.date}
                              onChange={this.changeDate}
                            />
                          ) : !this.state.userID ? (
                            <Input
                              type="date"
                              isSize="small"
                              value={this.state.date}
                              onChange={this.changeDate}
                            />
                          ) : (
                            this.state.date
                          )}
                        </Column>
                      </Columns>
                    </MenuLink>
                    <MenuLink style={style.removeUnderline}>
                      <Columns>
                        <Column isSize="1/4">Folder</Column>
                        <Column isSize="3/4">
                          {this.state.userID &&
                          this.props.userID === this.state.userID ? (
                            <Columns isMultiline>
                              <Column isSize="1/2">
                                <Button
                                  data-value={"WET"}
                                  onClick={
                                    this.state.userID &&
                                    this.state.userID === this.props.userID
                                      ? this.changeSeason
                                      : !this.state.userID
                                      ? this.changeSeason
                                      : e => e.preventDefault()
                                  }
                                  isSize={"small"}
                                  style={
                                    this.state.season === "WET"
                                      ? style.activeButton
                                      : {}
                                  }
                                >
                                  <Icon
                                    className={"fa fa-umbrella fa-1x"}
                                    style={{ marginRight: "5px" }}
                                  />{" "}
                                  WET
                                </Button>
                                <Button
                                  data-value={"DRY"}
                                  onClick={
                                    this.state.userID &&
                                    this.state.userID === this.props.userID
                                      ? this.changeSeason
                                      : !this.state.userID
                                      ? this.changeSeason
                                      : e => e.preventDefault()
                                  }
                                  isSize={"small"}
                                  style={
                                    this.state.season === "DRY"
                                      ? style.activeButton
                                      : {}
                                  }
                                >
                                  <Icon
                                    className={"fa fa-fire fa-1x"}
                                    style={{ marginRight: "5px" }}
                                  />{" "}
                                  DRY
                                </Button>
                              </Column>
                              <Column isSize="1/2">
                                {this.state.userID &&
                                this.props.userID === this.state.userID ? (
                                  <Input
                                    type="text"
                                    isSize="small"
                                    value={this.state.year}
                                    onChange={this.changeYear}
                                  />
                                ) : !this.state.userID ? (
                                  <Input
                                    type="text"
                                    isSize="small"
                                    value={this.state.year}
                                    onChange={this.changeYear}
                                  />
                                ) : (
                                  this.state.year
                                )}
                              </Column>
                            </Columns>
                          ) : !this.state.userID ? (
                            <Columns isMultiline>
                              <Column isSize="1/2">
                                <Button
                                  data-value={"WET"}
                                  onClick={
                                    this.state.userID &&
                                    this.state.userID === this.props.userID
                                      ? this.changeSeason
                                      : !this.state.userID
                                      ? this.changeSeason
                                      : e => e.preventDefault()
                                  }
                                  isSize={"small"}
                                  style={
                                    this.state.season === "WET"
                                      ? style.activeButton
                                      : {}
                                  }
                                >
                                  <Icon
                                    className={"fa fa-umbrella fa-1x"}
                                    style={{ marginRight: "5px" }}
                                  />{" "}
                                  WET
                                </Button>
                                <Button
                                  data-value={"DRY"}
                                  onClick={
                                    this.state.userID &&
                                    this.state.userID === this.props.userID
                                      ? this.changeSeason
                                      : !this.state.userID
                                      ? this.changeSeason
                                      : e => e.preventDefault()
                                  }
                                  isSize={"small"}
                                  style={
                                    this.state.season === "DRY"
                                      ? style.activeButton
                                      : {}
                                  }
                                >
                                  <Icon
                                    className={"fa fa-fire fa-1x"}
                                    style={{ marginRight: "5px" }}
                                  />{" "}
                                  DRY
                                </Button>
                              </Column>
                              <Column isSize="1/2">
                                {this.state.userID &&
                                this.props.userID === this.state.userID ? (
                                  <Input
                                    type="text"
                                    isSize="small"
                                    value={this.state.year}
                                    onChange={this.changeYear}
                                    placeholder="2019..."
                                  />
                                ) : !this.state.userID ? (
                                  <Input
                                    type="text"
                                    isSize="small"
                                    value={this.state.year}
                                    onChange={this.changeYear}
                                    placeholder="2019..."
                                  />
                                ) : (
                                  this.state.year
                                )}
                              </Column>
                              <Column
                                isSize="1/2"
                                style={{ paddingTop: "0px" }}
                              >
                                <small>
                                  {this.state.folder_exists === "" ? (
                                    <p style={style.blueText}>
                                      <Icon
                                        className={"fa fa-info-circle fa-xs"}
                                      />
                                      Required
                                    </p>
                                  ) : this.state.folder_exists ? (
                                    <p style={style.greenText}>
                                      <Icon
                                        className={"fa fa-check-circle fa-xs"}
                                      />
                                      Exists
                                    </p>
                                  ) : (
                                    <p style={style.redText}>
                                      <Icon
                                        className={"fa fa-times-circle fa-xs"}
                                      />
                                      Doesn't Exist
                                    </p>
                                  )}
                                </small>
                              </Column>
                            </Columns>
                          ) : (
                            this.state.folder_name
                          )}
                        </Column>
                      </Columns>
                    </MenuLink>
                    <MenuLink style={style.removeUnderline}>
                      <Columns>
                        <Column isSize="1/4">Private</Column>
                        <Column isSize="3/4" style={{ paddingLeft: "20px" }}>
                          {this.state.private ? (
                            <i
                              style={{
                                ...style.switchOn,
                                cursor: "pointer"
                              }}
                              onClick={
                                this.state.userID &&
                                this.props.userID === this.state.userID
                                  ? this.switch
                                  : !this.state.userID
                                  ? this.switch
                                  : e => e.preventDefault()
                              }
                            >
                              <Icon
                                href="."
                                className={"fa fa-toggle-on fa-lg"}
                                isSize="small"
                              />
                            </i>
                          ) : (
                            <i
                              style={{
                                ...style.switchOff,
                                cursor: "pointer"
                              }}
                              onClick={
                                this.state.userID &&
                                this.props.userID === this.state.userID
                                  ? this.switch
                                  : !this.state.userID
                                  ? this.switch
                                  : e => e.preventDefault()
                              }
                            >
                              <Icon
                                href="."
                                className={"fa fa-toggle-off fa-lg"}
                                isSize="small"
                              />
                            </i>
                          )}
                        </Column>
                      </Columns>
                    </MenuLink>
                  </MenuList>
                </Menu>
              </Column>
              <Column isSize={"2/3"} style={style.imageColumn}>
                <img alt={`${this.state.name}`} src={this.state.fileURL} />
              </Column>
            </Columns>
            <Columns isFullWidth style={{ backgroundColor: "#015249" }}>
              <Column>
                <Message>
                  <MessageHeader style={style.dataHeader}>
                    <Heading
                      style={{
                        fontSize: "18px",
                        paddingTop: "5px",
                        paddingBottom: "0px"
                      }}
                    >
                      Image Data
                    </Heading>
                  </MessageHeader>
                  <MessageBody>
                    <Menu style={{ minHeight: "35vh" }}>
                      <MenuLabel>
                        Metadata
                        <a
                          href="."
                          onClick={this.handleMeta}
                          style={style.removeUnderline}
                        >
                          <Icon
                            className={
                              this.state.metadataOpen
                                ? "fa fa-angle-up"
                                : "fa fa-angle-down"
                            }
                            isSize="small"
                          />
                        </a>
                      </MenuLabel>
                      {this.state.metadataOpen ? (
                        <MenuList>
                          <MenuLink style={style.removeUnderline}>
                            <Columns isMultiline>
                              <Column isSize="1/2">
                                <Columns>
                                  <Column isSize="1/4">Location</Column>
                                  <Column isSize="3/4">
                                    {this.state.userID &&
                                    this.props.userID === this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.location}
                                        onChange={this.changeLocation}
                                        placeholder="B500..."
                                      />
                                    ) : !this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.location}
                                        onChange={this.changeLocation}
                                        placeholder="B500..."
                                      />
                                    ) : (
                                      this.state.location
                                    )}
                                  </Column>
                                </Columns>
                              </Column>
                              <Column isSize="1/2">
                                <Columns>
                                  <Column isSize="1/4">Drone</Column>
                                  <Column isSize="3/4">
                                    {this.state.userID &&
                                    this.props.userID === this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.drone}
                                        placeholder="Sensefly eBee, DJI M100..."
                                        onChange={this.changeDrone}
                                      />
                                    ) : !this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.drone}
                                        placeholder="Sensefly eBee, DJI M100..."
                                        onChange={this.changeDrone}
                                      />
                                    ) : (
                                      this.state.drone
                                    )}
                                  </Column>
                                </Columns>
                              </Column>
                              <Column isSize="1/2">
                                <Columns>
                                  <Column isSize="1/4">Camera</Column>
                                  <Column isSize="3/4">
                                    {this.state.userID &&
                                    this.props.userID === this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.camera}
                                        placeholder="RGB, NIR, MS..."
                                        onChange={this.changeCam}
                                      />
                                    ) : !this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.camera}
                                        placeholder="RGB, NIR, MS..."
                                        onChange={this.changeCam}
                                      />
                                    ) : (
                                      this.state.camera
                                    )}
                                  </Column>
                                </Columns>
                              </Column>
                              <Column isSize="1/2">
                                <Columns>
                                  <Column isSize="1/4">Image Type</Column>
                                  <Column isSize="3/4">
                                    {this.state.userID &&
                                    this.props.userID === this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.image}
                                        placeholder="Mosaic, Index, DSM..."
                                        onChange={this.changeImage}
                                      />
                                    ) : !this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.image}
                                        placeholder="Mosaic, Index, DSM..."
                                        onChange={this.changeImage}
                                      />
                                    ) : (
                                      this.state.image
                                    )}
                                  </Column>
                                </Columns>
                              </Column>
                              <Column isSize="1/2">
                                <Columns>
                                  <Column isSize="1/4">Environment</Column>
                                  <Column isSize="3/4">
                                    {this.state.userID &&
                                    this.props.userID === this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.env_condition}
                                        placeholder="Was it rainy?"
                                        onChange={this.changeEnvironment}
                                      />
                                    ) : !this.state.userID ? (
                                      <Input
                                        type="text"
                                        isSize="small"
                                        value={this.state.env_condition}
                                        placeholder="Was it rainy?"
                                        onChange={this.changeEnvironment}
                                      />
                                    ) : (
                                      this.state.env_condition
                                    )}
                                  </Column>
                                </Columns>
                              </Column>
                            </Columns>
                          </MenuLink>
                        </MenuList>
                      ) : (
                        <div />
                      )}
                      <MenuLabel>
                        Attributes{" "}
                        <a
                          href="."
                          onClick={this.handleAttrib}
                          style={style.removeUnderline}
                        >
                          <Icon
                            className={
                              this.state.attribOpen
                                ? "fa fa-angle-up"
                                : "fa fa-angle-down"
                            }
                            isSize="small"
                          />
                        </a>
                      </MenuLabel>
                      {this.state.attribOpen ? (
                        <MenuList>
                          {this.state.attrib.map((attribute, id) => {
                            return (
                              <li key={id}>
                                <MenuLink style={style.removeUnderline}>
                                  <Columns>
                                    <Column isSize="1/4">
                                      {attribute.name}
                                    </Column>
                                    <Column isSize="3/4">
                                      {attribute.value}
                                    </Column>
                                  </Columns>
                                </MenuLink>
                              </li>
                            );
                          })}
                        </MenuList>
                      ) : (
                        <div />
                      )}
                    </Menu>
                  </MessageBody>
                </Message>
              </Column>
            </Columns>
          </div>
          <ReactTooltip effect={"solid"} place={"bottom"} />
          <ArchiveModal
            {...{
              /* pass props here */
              active: this.state.archiveModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              archive: this.archive
            }}
          />
          <UnarchiveModal
            {...{
              /* pass props here */
              active: this.state.unarchiveModalOpen,
              /* pass the handlers here */
              close: this.closeModal,
              unarchive: this.unarchive
            }}
          />
        </div>
      </DocumentTitle>
    );
  }
}
