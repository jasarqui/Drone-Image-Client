/* import React components here */
import React, { Component } from "react";
import Alert from "react-s-alert";
import Dropzone from "react-dropzone";
/* file upload api */
import { Dropbox } from "dropbox";
import fetch from "isomorphic-fetch";
/* import bulma components */
import {
  Button,
  Notification,
  Heading,
  Modal,
  ModalContent,
  ModalClose,
  ModalBackground,
  Columns,
  Column,
  Icon,
  Input,
  Tag
} from "bloomer";
/* import api here */
import * as API from "../../../api";

/* insert styles here */
const style = {
  activeButton: {
    color: "white",
    backgroundColor: "#77c9d4",
    border: "1px solid #77c9d4"
  },
  valid: {
    backgroundColor: "#57bc90",
    color: "white",
    width: "20%",
    marginLeft: "5px"
  },
  invalid: {
    backgroundColor: "#ef6f6c",
    color: "white",
    width: "20%",
    marginLeft: "5px"
  },
  none: {
    backgroundColor: "#77c9d4",
    color: "white",
    width: "20%",
    marginLeft: "5px"
  },
  date: {
    backgroundColor: "#77c9d4",
    color: "white",
    width: "20%",
    marginRight: "5px"
  },
  add: {
    borderRadius: "50%",
    color: "white",
    backgroundColor: "#015249",
    borderColor: "#015249"
  },
  flex: {
    /* pseudo flexbox */
    display: "flex",
    flexDirection: "column",
    verticalAlign: "center"
  },
  attach: {
    fontSize: "8px",
    color: "#999999"
  }
};

/* insert regex here */
/* update if reached more than year 9999 */
const yearRegex = /^[0-9]{4}$/;

export default class EditFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      season: "WET",
      date: "",
      layout: [],
      report: "",
      uploading_file: false,
      uploading_report: false
    };
  }

  changeSeason = e => {
    e.preventDefault();
    this.setState({ season: e.currentTarget.dataset.value });
  };

  changeDate = e => {
    this.setState({ date: e.target.value });
  };

  uploadFiles = async files => {
    let count_files = files.length;
    this.setState({ uploading_file: true });
    // authenticate dropbox
    var dropbox = new Dropbox({
      clientId: "iwlq20lyl4g9yz8",
      accessToken:
        "pQL-PvIyBLAAAAAAAAAAIC9K6bWxsgfcG9q6n0A6Xj1d_z-qt8bzYUCfXZAexWHt",
      fetch: fetch
    });

    // add files to dropbox
    var layoutFiles = [...this.state.layout];
    files.forEach(async file => {
      await dropbox
        .filesUpload({
          path: "/" + file.name,
          contents: file
        })
        .then(response => {
          dropbox
            .sharingCreateSharedLink({
              path: "/" + response.name,
              short_url: true
            })
            .then(res => {
              layoutFiles.push({ name: response.name, preview: res.url });
              count_files--;
              // on upload end
              if (count_files === 0)
                this.setState({ layout: layoutFiles, uploading_file: false });
            });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  removeFile = e => {
    e.preventDefault();
    var layoutFiles = [...this.state.layout];
    layoutFiles.splice(e.currentTarget.dataset.value, 1);
    this.setState({ layout: layoutFiles });
  };

  uploadReport = async file => {
    this.setState({ uploading_report: true });
    // authenticate dropbox
    var dropbox = new Dropbox({
      clientId: "iwlq20lyl4g9yz8",
      accessToken:
        "pQL-PvIyBLAAAAAAAAAAIC9K6bWxsgfcG9q6n0A6Xj1d_z-qt8bzYUCfXZAexWHt",
      fetch: fetch
    });

    // add report to dropbox
    await dropbox
      .filesUpload({
        path: "/" + file[0].name,
        contents: file[0]
      })
      .then(response => {
        dropbox
          .sharingCreateSharedLink({
            path: "/" + response.name,
            short_url: true
          })
          .then(res => {
            this.setState({ report: res.url });
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ uploading_report: false });
  };

  removeReport = e => {
    e.preventDefault();
    this.setState({ report: "" });
  };

  closeModal = e => {
    /* restart modal */
    this.setState({
      season: "WET",
      date: "",
      layout: [],
      report: "",
      uploading: false
    });
    this.props.close(e);
  };

  editFolder = () => {
    API.editFolder({
      season: this.state.season,
      date: this.state.date,
      layout: this.state.layout,
      report: this.state.report,
      id: this.props.folder_id
    })
      .then(() => {
        Alert.success("Successfully edited folder.", {
          beep: false,
          position: "top-right",
          effect: "jelly",
          timeout: 2000
        });
        this.props.closeDirect("edit");
        this.props.newFolderSearch(this.props.page);
      })
      .catch(() => {
        Alert.error("Failed to edit folder.", {
          beep: false,
          position: "top-right",
          effect: "jelly",
          timeout: 2000
        });
      });
  };

  /* when modal opens */
  componentWillReceiveProps(nextProps) {
    if (nextProps.folder_id && nextProps.active) {
      API.getFolder({ id: nextProps.folder_id }).then(result => {
        this.setState({
          season: result.data.data.season,
          date: result.data.data.year,
          layout: result.data.data.layout ? result.data.data.layout : [],
          report: result.data.data.report ? result.data.data.report : null
        });
      });
    }
  }

  openPreview = file => {
    window.open(file, "Download");
  };

  render() {
    return (
      <div>
        <center>
          <Modal isActive={this.props.active}>
            <ModalBackground data-value={"edit"} onClick={this.closeModal} />
            <ModalContent>
              <Notification
                style={{ width: "75%", textAlign: "left" }}
                isHidden={"mobile"}
              >
                <Heading
                  style={{
                    color: "#015249",
                    fontSize: "14px",
                    marginBottom: "20px"
                  }}
                >
                  <strong>EDIT FOLDER</strong>
                </Heading>
                <Columns style={{ marginBottom: "0px" }}>
                  <Column isSize="1/4">Name</Column>
                  <Column isSize="3/4">
                    {this.state.season === "WET" ? "WS" : "DS"}
                    {this.state.date}
                  </Column>
                </Columns>
                <Columns style={{ marginBottom: "0px" }}>
                  <Column isSize="1/4">Season</Column>
                  <Column isSize="3/4">
                    <Button
                      data-value={"WET"}
                      onClick={this.changeSeason}
                      isSize={"small"}
                      style={
                        this.state.season === "WET" ? style.activeButton : {}
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
                      onClick={this.changeSeason}
                      isSize={"small"}
                      style={
                        this.state.season === "DRY" ? style.activeButton : {}
                      }
                    >
                      <Icon
                        className={"fa fa-fire fa-1x"}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      DRY
                    </Button>
                  </Column>
                </Columns>
                <Columns>
                  <Column isSize="1/4">Date</Column>
                  <Column isSize="3/4">
                    <Input
                      isSize="small"
                      type="text"
                      placeholder="YYYY"
                      value={this.state.date}
                      onChange={this.changeDate}
                      style={{ width: "75%" }}
                    />
                    <Tag
                      style={
                        this.state.date
                          ? this.state.date.match(yearRegex)
                            ? style.valid
                            : style.invalid
                          : style.none
                      }
                    >
                      {this.state.date
                        ? this.state.date.match(yearRegex)
                          ? "Valid"
                          : "Invalid"
                        : "Required"}
                    </Tag>
                  </Column>
                </Columns>
                <Columns>
                  <Column isSize="1/4">Pix4D QR</Column>
                  <Column isSize="3/4">
                    {this.state.report ? (
                      <small>
                        <p>
                          <a href={this.state.report} target={"_blank"}>
                            <Icon className={"fa fa-file-pdf-o fa-1x"} />
                            {this.state.season === "WET" ? "WS" : "DS"}
                            {this.state.date}
                            {"QR"}
                          </a>
                          <a
                            href="."
                            onClick={this.removeReport}
                            style={{
                              textDecoration: "none",
                              color: "#999999"
                            }}
                          >
                            <Icon className={"fa fa-times-circle fa-1x"} />
                          </a>
                        </p>
                      </small>
                    ) : (
                      <p />
                    )}
                    {this.state.uploading_report ? (
                      <small>
                        <p>
                          Uploading...{" "}
                          <Icon className={"fa fa-gear fa-spin fa-1x"} />
                        </p>
                      </small>
                    ) : (
                      <small />
                    )}
                    <Dropzone
                      onDrop={this.uploadReport}
                      style={{ ...style.flex, width: "100%" }}
                    >
                      <small style={style.attach}>
                        <a
                          href={"."}
                          style={{ textDecoration: "none", fontSize: "15px" }}
                          onClick={e => e.preventDefault()}
                        >
                          <Icon
                            style={{ float: "left", marginTop: "0px" }}
                            className={"fa fa-paperclip fa-1x"}
                          />
                          {this.state.report ? "Edit " : "Insert "}attachment
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                <Columns>
                  <Column isSize="1/4">Layout</Column>
                  <Column isSize="3/4">
                    {this.state.layout.map((file, index) => {
                      return (
                        <p key={index}>
                          <small>
                            <Icon className={"fa fa-file-o fa-1x"} />
                            {file.name}
                            <a
                              data-value={index}
                              href="."
                              onClick={this.removeFile}
                              style={{
                                textDecoration: "none",
                                color: "#999999"
                              }}
                            >
                              <Icon className={"fa fa-times-circle fa-1x"} />
                            </a>
                          </small>
                        </p>
                      );
                    })}
                    {this.state.uploading_file ? (
                      <small>
                        <p>
                          Uploading...{" "}
                          <Icon className={"fa fa-gear fa-spin fa-1x"} />
                        </p>
                      </small>
                    ) : (
                      <small />
                    )}
                    <Dropzone
                      multiple={true}
                      onDrop={this.uploadFiles}
                      style={{ ...style.flex, width: "100%" }}
                    >
                      <small style={style.attach}>
                        <a
                          href={"."}
                          style={{ textDecoration: "none", fontSize: "15px" }}
                          onClick={e => e.preventDefault()}
                        >
                          <Icon
                            style={{ float: "left", marginTop: "0px" }}
                            className={"fa fa-paperclip fa-1x"}
                          />
                          Insert attachments
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                {this.state.date.match(yearRegex) ? (
                  <Button
                    isSize="large"
                    style={{
                      ...style.add,
                      float: "right"
                    }}
                    onClick={this.editFolder}
                  >
                    <Icon className={"fa fa-edit fa-1x"} />
                  </Button>
                ) : (
                  <Button
                    isSize="large"
                    style={{
                      ...style.add,
                      float: "right",
                      cursor: "not-allowed"
                    }}
                    onClick={e => e.preventDefault()}
                  >
                    <Icon className={"fa fa-ban fa-1x"} />
                  </Button>
                )}
              </Notification>
              <Notification isHidden={"desktop"}>
                <Heading
                  style={{
                    color: "#015249",
                    fontSize: "14px",
                    marginBottom: "20px"
                  }}
                >
                  <strong>EDIT FOLDER</strong>
                </Heading>
                <p style={{ margin: "10px 0px 10px 0px" }}>
                  <strong>Name:</strong>
                  {"  "}
                  <small>
                    {this.state.season === "WET" ? "WS" : "DS"}
                    {this.state.date}
                  </small>
                </p>
                <Button
                  data-value={"WET"}
                  onClick={this.changeSeason}
                  isSize={"small"}
                  style={this.state.season === "WET" ? style.activeButton : {}}
                >
                  <Icon
                    className={"fa fa-umbrella fa-1x"}
                    style={{ marginRight: "5px" }}
                  />{" "}
                  WET SEASON
                </Button>
                <Button
                  data-value={"DRY"}
                  onClick={this.changeSeason}
                  isSize={"small"}
                  style={this.state.season === "DRY" ? style.activeButton : {}}
                >
                  <Icon
                    className={"fa fa-fire fa-1x"}
                    style={{ marginRight: "5px" }}
                  />{" "}
                  DRY SEASON
                </Button>
                <Columns style={{ marginTop: "2px" }}>
                  <Column>
                    <Tag style={style.date}>Date</Tag>
                    <Input
                      style={{ width: "40%" }}
                      isSize="small"
                      type="text"
                      placeholder="YYYY"
                      value={this.state.date}
                      onChange={this.changeDate}
                    />
                    <Tag
                      style={
                        this.state.date
                          ? this.state.date.match(yearRegex)
                            ? style.valid
                            : style.invalid
                          : style.none
                      }
                    >
                      {this.state.date
                        ? this.state.date.match(yearRegex)
                          ? "Valid"
                          : "Invalid"
                        : "Required"}
                    </Tag>
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <p>
                      <strong>Pix4D QR</strong>
                    </p>
                    <p>
                      {this.state.report ? (
                        <small>
                          <a href={this.state.report} target={"_blank"}>
                            <Icon className={"fa fa-file-pdf-o fa-1x"} />
                            {this.state.season === "WET" ? "WS" : "DS"}
                            {this.state.date}
                            {"QR"}
                          </a>
                          <a
                            href="."
                            onClick={this.removeReport}
                            style={{
                              textDecoration: "none",
                              color: "#999999"
                            }}
                          >
                            <Icon className={"fa fa-times-circle fa-1x"} />
                          </a>
                        </small>
                      ) : (
                        <small />
                      )}
                    </p>
                    {this.state.uploading_report ? (
                      <p>
                        <small>
                          Uploading...{" "}
                          <Icon className={"fa fa-gear fa-spin fa-1x"} />
                        </small>
                      </p>
                    ) : (
                      <small />
                    )}
                    <Dropzone
                      multiple={true}
                      onDrop={this.uploadReport}
                      style={{ ...style.flex, width: "50%" }}
                    >
                      <small style={style.attach}>
                        <a
                          href={"."}
                          style={{ textDecoration: "none", fontSize: "15px" }}
                          onClick={e => e.preventDefault()}
                        >
                          <Icon
                            style={{ float: "left", marginTop: "0px" }}
                            className={"fa fa-paperclip fa-1x"}
                          />
                          {this.state.report ? "Edit " : "Insert "}attachment
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <p>
                      <strong>Layout</strong>
                    </p>
                    {this.state.layout.map((file, index) => {
                      return (
                        <p key={index}>
                          <small>
                            <a href={file.preview} target={"_blank"}>
                              <Icon className={"fa fa-file-o fa-1x"} />
                              {file.name}
                            </a>
                            <a
                              data-value={index}
                              href="."
                              onClick={this.removeFile}
                              style={{
                                textDecoration: "none",
                                color: "#999999"
                              }}
                            >
                              <Icon className={"fa fa-times-circle fa-1x"} />
                            </a>
                          </small>
                        </p>
                      );
                    })}
                    {this.state.uploading_file ? (
                      <p>
                        <small>
                          Uploading...{" "}
                          <Icon className={"fa fa-gear fa-spin fa-1x"} />
                        </small>
                      </p>
                    ) : (
                      <small />
                    )}
                    <Dropzone
                      multiple={true}
                      onDrop={this.uploadFiles}
                      style={{ ...style.flex, width: "50%" }}
                    >
                      <small style={style.attach}>
                        <a
                          href={"."}
                          style={{ textDecoration: "none", fontSize: "15px" }}
                          onClick={e => e.preventDefault()}
                        >
                          <Icon
                            style={{ float: "left", marginTop: "0px" }}
                            className={"fa fa-paperclip fa-1x"}
                          />
                          Insert attachments
                        </a>
                      </small>
                    </Dropzone>
                  </Column>
                </Columns>
                <center>
                  {this.state.date.match(yearRegex) ? (
                    <Button
                      isSize="large"
                      style={{
                        ...style.add
                      }}
                      onClick={this.editFolder}
                    >
                      <Icon className={"fa fa-edit fa-1x"} />
                    </Button>
                  ) : (
                    <Button
                      isSize="large"
                      style={{
                        ...style.add,
                        cursor: "not-allowed"
                      }}
                      onClick={e => e.preventDefault()}
                    >
                      <Icon className={"fa fa-ban fa-1x"} />
                    </Button>
                  )}
                </center>
              </Notification>
            </ModalContent>
            <ModalClose data-value={"edit"} onClick={this.closeModal} />
          </Modal>
        </center>
      </div>
    );
  }
}
