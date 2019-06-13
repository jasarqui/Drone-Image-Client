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
  Icon
} from "bloomer";
/* import api here */
import * as API from "../../../api";

/* insert styles here */
const style = {
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

export default class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: [],
      report: "",
      season: "",
      year: "",
      uploading_file: false,
      uploading_report: false
    };
  }

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
    e.preventDefault();
    /* restart modal */
    this.setState({
      layout: [],
      report: "",
      uploading: false
    });
    this.props.close();
  };

  editFolder = () => {
    API.editFiles({
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
        this.props.close();
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
          layout: result.data.data.layout ? result.data.data.layout : [],
          report: result.data.data.report,
          season: result.data.data.season,
          year: result.data.data.year
        });
      });
    }
  }

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
                  <strong>REPORT AND LAYOUT FILES</strong>
                </Heading>
                <Columns>
                  <Column isSize="1/4">Pix4D QR</Column>
                  <Column isSize="3/4">
                    {this.state.report ? (
                      <small>
                        <p>
                          <a href={this.state.report} target={"_blank"}>
                            <Icon className={"fa fa-file-pdf-o fa-1x"} />
                            {this.state.season === "WET" ? "WS" : "DS"}
                            {this.state.year}
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
                      multiple={true}
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
              </Notification>
              <Notification isHidden={"desktop"}>
                <Heading
                  style={{
                    color: "#015249",
                    fontSize: "14px",
                    marginBottom: "20px"
                  }}
                >
                  <strong>REPORT AND LAYOUT FILES</strong>
                </Heading>
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
                            {this.state.year}
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
                  <Button
                    isSize="large"
                    style={{
                      ...style.add
                    }}
                    onClick={this.editFolder}
                  >
                    <Icon className={"fa fa-edit fa-1x"} />
                  </Button>
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
