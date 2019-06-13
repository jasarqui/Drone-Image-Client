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
/* import pdf utils */
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  openReport = async () => {
    // get images
    let images = await API.getAllImages({ id: this.props.folder_id }).then(
      result => {
        return result.data.data;
      }
    );
    // filter data
    var image_data = [["Image", "Date", "% Yield", "Days before Harvest"]];
    await images.map(image => {
      image_data.push([image.name, image.date, 
        image.data.find(
          datum => datum.name === "Yield Percentage (%)"
        ).value,
        image.data.find(datum => datum.name === "Days before Harvest")
          .value
      ]);
      return null;
    });

    // define the pdf format
    var pdf = {
      info: {
        title: (this.state.season === "WET" ? "WS" : "DS") + this.state.date
      },
      header: {
        width: "40",
        image:
          "data:image/png;base64,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",
        margin: [10, 10, 10, 10]
      },
      content: [
        {
          text: "SEASON REPORT",
          style: "header"
        },
        { text: "Bioinformatics | Drone Image Analysis", style: "info" },
        { text: "Analytics", style: "subheader" },
        {
          style: "tableExample",
          table: {
            widths: ["auto", "*"],
            body: [
              [
                "Season",
                {
                  text:
                    (this.state.season === "WET" ? "Wet" : "Dry") + " Season",
                  fontSize: 11
                }
              ],
              ["Year", { text: this.state.date, fontSize: 11 }],
              [
                "Pix4D QR",
                { text: this.state.report ? "Available" : "N/A", fontSize: 11 }
              ],
              [
                "Layout",
                {
                  text:
                    this.state.layout.length !== 0
                      ? this.state.layout.map(file => {
                          return file.name;
                        })
                      : "N/A",
                  fontSize: 11
                }
              ]
            ]
          }
        },
        { text: "Image Data", style: "subheader" },
        {
          style: "tableExample",
          table: {
            widths: ["*", "*", "*", "*"],
            body: image_data
          }
        }
      ],
      styles: {
        info: {
          fontSize: 12,
          alignment: "center",
          marginTop: -10
        },
        header: {
          color: "#015249",
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: "center"
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [10, 5, 0, 15]
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };

    // create pdf
    pdfMake.createPdf(pdf).open();
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
                  <Column isSize="1/4">Report</Column>
                  <Column isSize="3/4">
                    <small>
                      <p
                        onClick={this.openReport}
                        style={{ textDecoration: "underline" }}
                      >
                        <Icon className={"fa fa-file-pdf-o fa-1x"} />
                        <span style={{ cursor: "pointer" }}>
                          {this.state.season === "WET" ? "WS" : "DS"}
                          {this.state.date + "_Report"}
                        </span>
                      </p>
                    </small>
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
                  <Column isSize="1/4">Report</Column>
                  <Column isSize="3/4">
                    <small>
                      <p
                        onClick={this.openReport}
                        style={{ textDecoration: "underline" }}
                      >
                        <Icon className={"fa fa-file-pdf-o fa-1x"} />
                        <span style={{ cursor: "pointer" }}>
                          {this.state.season === "WET" ? "WS" : "DS"}
                          {this.state.date + "_Report"}
                        </span>
                      </p>
                    </small>
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
