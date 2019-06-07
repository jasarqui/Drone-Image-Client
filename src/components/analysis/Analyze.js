/* import React components here */
import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import Dropzone from "react-dropzone";
import Alert from "react-s-alert";
import ReactTooltip from "react-tooltip";
import { Carousel } from "react-responsive-carousel";
import RemoveModal from "./modals/RemoveModal";
import SaveModal from "./modals/SaveModal";
import AnalyzeModal from "./modals/AnalyzeModal";
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
  Section,
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
  imageMargin: {
    margin: "5px"
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
  dropInitial: {
    /* pseudo flexbox */
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    verticalAlign: "center",
    border: "2px dashed silver",
    borderRadius: "30px",
    backgroundColor: "#f8f8f8",
    margin: "20px",
    cursor: "pointer"
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
  greenText: {
    color: "#57bc90"
  },
  redText: {
    color: "#ef6f6c"
  },
  blueText: {
    color: "#77c9d4"
  },
  copyButton: {
    float: "right",
    borderRadius: "50%",
    backgroundColor: "white",
    color: "#015249",
    marginBottom: "2px"
  }
};

export default class Analyze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carousel: [],
      images: [],
      uploading: false,
      removeModalOpen: false,
      analyzeModalOpen: false,
      saveModalOpen: false,
      activeImage: 0,
      folders: [],
      cv_image: null
    };
  }

  /* this function will copy the metadata type
  into all of the same type for different images */
  copy = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    var index = 0;

    switch (e.currentTarget.value) {
      case "name": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].name = imageState[this.state.activeImage].name;
        }
        break;
      }
      case "date": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].day = imageState[this.state.activeImage].day;
        }
        break;
      }
      case "location": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].location =
              imageState[this.state.activeImage].location;
        }
        break;
      }
      case "drone": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].drone = imageState[this.state.activeImage].drone;
        }
        break;
      }
      case "camera": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].camera =
              imageState[this.state.activeImage].camera;
        }
        break;
      }
      case "image": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].image = imageState[this.state.activeImage].image;
        }
        break;
      }
      case "environment": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].env_condition =
              imageState[this.state.activeImage].env_condition;
        }
        break;
      }
      case "folder": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage) {
            imageState[index].season =
              imageState[this.state.activeImage].season;
            imageState[index].date = imageState[this.state.activeImage].date;
            this.checkFolder(index);
          }
        }
        break;
      }
      case "private": {
        for (index = 0; index < imageState.length; index++) {
          if (index !== this.state.activeImage)
            imageState[index].private =
              imageState[this.state.activeImage].private;
        }
        break;
      }
      default:
        break;
    }

    this.setState({ images: imageState });
  };

  openModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === "remove"
      ? this.setState({ removeModalOpen: true })
      : e.currentTarget.dataset.value === "save"
      ? this.setState({ saveModalOpen: true })
      : this.setState({ analyzeModalOpen: true });
  };

  closeModal = e => {
    e.preventDefault();
    e.currentTarget.dataset.value === "remove"
      ? this.setState({ removeModalOpen: false })
      : e.currentTarget.dataset.value === "save"
      ? this.setState({ saveModalOpen: false })
      : this.setState({ analyzeModalOpen: false });
  };

  changeActiveImg = index => {
    this.setState({ activeImage: index });
  };

  handleMeta = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].metadataOpen = !imageState[
      this.state.activeImage
    ].metadataOpen;
    this.setState({ images: imageState });
  };

  handleAttrib = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].attribOpen = !imageState[
      this.state.activeImage
    ].attribOpen;
    this.setState({ images: imageState });
  };

  switch = e => {
    e.preventDefault();
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].private = !imageState[
      this.state.activeImage
    ].private;
    this.setState({ images: imageState });
  };

  changeName = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].name = e.target.value;
    this.setState({ images: imageState });
  };

  changeDrone = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].drone = e.target.value;
    this.setState({ images: imageState });
  };

  changeLocation = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].location = e.target.value;
    this.setState({ images: imageState });
  };

  changeImage = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].image = e.target.value;
    this.setState({ images: imageState });
  };

  changeEnvCond = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].env_condition = e.target.value;
    this.setState({ images: imageState });
  };

  changeCam = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].camera = e.target.value;
    this.setState({ images: imageState });
  };

  changeDay = e => {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].day = e.target.value;
    this.setState({ images: imageState });
  };

  changeSeason = e => {
    e.preventDefault();
    this.onSeasonChange(e).then(() => {
      this.checkFolder(this.state.activeImage);
    });
  };

  async onSeasonChange(e) {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].season = e.currentTarget.dataset.value;
    this.setState({ images: imageState });
  }

  changeDate = e => {
    this.onDateChange(e).then(() => {
      this.checkFolder(this.state.activeImage);
    });
  };

  async onDateChange(e) {
    var imageState = [...this.state.images];
    imageState[this.state.activeImage].date = e.target.value;
    this.setState({ images: imageState });
  }

  checkFolder = index => {
    var imageState = [...this.state.images];
    /* check if folder generated is located in folders loaded */
    imageState[index].folder_exists =
      this.state.folders.filter(
        folder =>
          folder.name ===
          (this.state.images[index].season === "WET" ? "WS" : "DS") +
            this.state.images[index].date
      ).length > 0
        ? true
        : false;
    /* change state name */
    imageState[index].folder_name =
      (this.state.images[index].season === "WET" ? "WS" : "DS") +
      this.state.images[index].date;
    this.setState({ images: imageState });
  };

  /* removes all */
  removeAll = e => {
    e.preventDefault();
    this.setState({ removeModalOpen: false });
    /* this will reset the images array */
    this.setState({ images: [] });
    this.setState({ activeImage: 0 });
  };

  /* removes one */
  removeImage = index => {
    /* this is to avoid errors */
    if (this.state.activeImage !== 0) {
      if (this.state.activeImage === index)
        this.setState({ activeImage: this.state.activeImage - 1 });
      else if (this.state.activeImage - 1 === index)
        this.setState({ activeImage: this.state.activeImage - 2 });
    }

    this.updateImages(index)
      .then(result => {
        /* update the state */
        this.setState({ images: result });
      }) /* update the carousel */
      .then(this.renderCarousel);
  };

  /* this function returns the properly updated array */
  async updateImages(index) {
    return new Promise(resolve => {
      var imageState = [...this.state.images];
      imageState.splice(index, 1);
      return resolve(imageState);
    });
  }

  /* reusable carousel updater */
  renderCarousel = () => {
    /* restart the carousel first */
    this.setState({ carousel: [] });
    /* update the carousel */
    this.setState({
      carousel: (
        <Carousel
          showStatus={false}
          onChange={this.changeActiveImg}
          selectedItem={this.state.activeImage}
        >
          {this.state.images.map((image, index) => {
            return (
              <div key={index}>
                <img src={image.fileURL} alt={`${index}`} />
              </div>
            );
          })}
        </Carousel>
      )
    });
  };

  /* analyzes one */
  analyzeImage = index => {
    /* this is where we put the glue */

    /* this is an alert on success */
    Alert.success("Successfully analyzed image.", {
      beep: false,
      position: "top-right",
      effect: "jelly",
      timeout: 2000
    });
  };

  /* analyzes all */
  analyzeAll = e => {
    e.preventDefault();
    this.setState({ analyzeModalOpen: false });

    if (this.state.images.length === 0) {
      /* this is an alert on success */
      Alert.info("No images in the collection.", {
        beep: false,
        position: "top-right",
        effect: "jelly",
        timeout: 2000
      });
    } else {
      /* this is where we put the glue */

      /* this is an alert on success */
      Alert.success("Successfully analyzed all image(s).", {
        beep: false,
        position: "top-right",
        effect: "jelly",
        timeout: 2000
      });
    }
  };

  /* saves one */
  save = index => {
    if (this.state.images[index].folder_exists) {
      /* saves the image information */
      var imageState = [...this.state.images];
      imageState[index].saved = true;
      this.setState({ images: imageState });

      API.save({
        fileURL: this.state.images[index].fileURL,
        name: this.state.images[index].name,
        date: this.state.images[index].day,
        camera: this.state.images[index].camera,
        drone: this.state.images[index].drone,
        image: this.state.images[index].image,
        location: this.state.images[index].location,
        is_private: this.state.images[index].private,
        env_cond: this.state.images[index].env_condition,
        season: this.state.images[index].season,
        attrib: this.state.images[index].attrib,
        folder: this.state.images[index].folder_name,
        userId: this.props.userId
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

  /* saves all */
  saveAll = e => {
    e.preventDefault();
    this.setState({ saveModalOpen: false });
    /* this will save all images to database */

    var imageState = [...this.state.images];
    var imagesToSend = []; // array that holds images to send
    try {
      for (var index = 0; index < imageState.length; index++) {
        if (!imageState[index].saved && imageState[index].folder_exists) {
          // add to array
          imagesToSend.push({
            fileURL: imageState[index].fileURL,
            name: imageState[index].name,
            date: imageState[index].day,
            camera: imageState[index].camera,
            drone: imageState[index].drone,
            image: imageState[index].image,
            location: imageState[index].location,
            is_private: imageState[index].private,
            env_cond: imageState[index].env_condition,
            season: imageState[index].season,
            attrib: imageState[index].attrib,
            folder: imageState[index].folder_name,
            userId: this.props.userId
          });
          imageState[index].saved = true;
        } else if (
          !imageState[index].saved &&
          imageState[index].folder_exists
        ) {
          Alert.error(`${imageState[index].name} must have a folder`, {
            beep: false,
            position: "top-right",
            effect: "jelly",
            timeout: 2000
          });
        }
      }

      if (imagesToSend.length !== 0) {
        // send the array
        API.saveMany({ images: imagesToSend })
          .then(() => {
            this.setState({ images: imageState });
            /* this is an alert on success */
            Alert.success("Successfully saved image(s).", {
              beep: false,
              position: "top-right",
              effect: "jelly",
              timeout: 2000
            });
          })
          .catch(() => {
            /* this is an alert on failure */
            Alert.error("Failed to save image(s).", {
              beep: false,
              position: "top-right",
              effect: "jelly",
              timeout: 2000
            });
          });
      } else {
        /* this is an alert for no images */
        Alert.info("No valid image(s) to be saved.", {
          beep: false,
          position: "top-right",
          effect: "jelly",
          timeout: 2000
        });
      }
    } catch (err) {
      /* this is an alert on failure */
      Alert.error("Failed to save image(s).", {
        beep: false,
        position: "top-right",
        effect: "jelly",
        timeout: 2000
      });
    }
  };

  segment = file => {
    this.setState({ uploading: true });
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      API.segment({ file: reader.result })
        .then(res => {
          var imageState = [...this.state.images];

          res.data.data.forEach(file => {
            imageState.push({
              /* obtained by upload */
              fileURL: file.link,
              name: file.name,
              /* the following are defaults */
              camera: "",
              season: "WET",
              private: false,
              saved: false,
              date: "",
              drone: "",
              location: "",
              image: "",
              env_condition: "",
              day: "",
              /* the following are obtained by functions */
              folder_exists: "",
              folder_name: "",
              attrib: [],
              /* these are for UX */
              metadataOpen: true,
              attribOpen: true
            });
          });

          this.setState({ images: imageState, uploading: false });

          /* this is an alert on success */
          Alert.success("Successfully segmented image.", {
            beep: false,
            position: "top-right",
            effect: "jelly",
            timeout: 2000
          });
          /* render the carousel */
          this.renderCarousel();
        })
        .catch(err => {
          /* this is an alert on error */
          Alert.error("Failed to upload image.", {
            beep: false,
            position: "top-right",
            effect: "jelly",
            timeout: 2000
          });

          this.setState({ uploading: false });
        });
    });

    reader.readAsDataURL(file[0]);
  };

  componentDidMount = () => {
    /* load the folders */
    API.getAllFolders().then(result => {
      this.setState({ folders: result.data.data });
    });
  };

  render() {
    return (
      <DocumentTitle title="DIA | Analyze">
        <div>
          <Columns isFullWidth style={{ backgroundColor: "#015249" }}>
            <Column style={style.toolbar} isHidden={"mobile"}>
              <center>
                <Dropzone
                  multiple={true}
                  accept="image/*"
                  onDrop={this.segment}
                  style={{ width: "0px" }}
                >
                  <a
                    href={"."}
                    data-tip={"Add Image(s)"}
                    style={style.whiteText}
                    onClick={e => e.preventDefault()}
                  >
                    <Icon className={"fa fa-plus-circle fa-1x"} />
                    <Heading>ADD</Heading>
                  </a>
                </Dropzone>
              </center>
            </Column>
            <Column style={style.toolbar} isHidden={"mobile"}>
              <a
                href={"."}
                data-value={"analyze"}
                data-tip={"Analyze Image(s)"}
                style={style.whiteText}
                onClick={this.openModal}
              >
                <Icon className={"fa fa-bolt fa-1x"} />
                <Heading>ANALYZE</Heading>
              </a>
            </Column>
            <Column style={style.toolbar} isHidden={"mobile"}>
              <a
                href={"."}
                data-value={"save"}
                data-tip={"Save analyzed Image(s)"}
                style={style.whiteText}
                onClick={this.openModal}
              >
                <Icon className={"fa fa-save fa-1x"} />
                <Heading>SAVE</Heading>
              </a>
            </Column>
            <Column style={style.toolbar} isHidden={"mobile"}>
              <a
                href={"."}
                data-value={"remove"}
                data-tip={"Remove all Image(s)"}
                style={style.whiteText}
                onClick={this.openModal}
              >
                <Icon className={"fa fa-minus-circle fa-1x"} />
                <Heading>REMOVE</Heading>
              </a>
            </Column>
            <Column
              style={{ paddingTop: "20px", textAlign: "center" }}
              isHidden={"desktop"}
            >
              <Button style={style.button}>
                <center>
                  <Dropzone
                    multiple={true}
                    accept="image/*"
                    onDrop={this.segment}
                    style={{
                      height: "0px",
                      marginLeft: "0px",
                      marginBottom: "25px"
                    }}
                  >
                    <Icon className={"fa fa-plus-circle fa-1x"} />
                    <small style={{ color: "white", fontSize: "15px" }}>
                      ADD
                    </small>
                  </Dropzone>
                </center>
              </Button>
              <Button
                data-value={"analyze"}
                style={style.button}
                onClick={this.openModal}
              >
                <center>
                  <Icon className={"fa fa-bolt fa-1x"} />
                  <small style={{ color: "white" }}>ANALYZE</small>
                </center>
              </Button>
              <Button
                data-value={"save"}
                style={style.button}
                onClick={this.openModal}
              >
                <center>
                  <Icon className={"fa fa-save fa-1x"} />
                  <small style={{ color: "white" }}>SAVE</small>
                </center>
              </Button>
              <Button
                data-value={"remove"}
                style={style.button}
                onClick={this.openModal}
              >
                <center>
                  <Icon className={"fa fa-minus-circle fa-1x"} />
                  <small style={{ color: "white" }}>REMOVE</small>
                </center>
              </Button>
            </Column>
          </Columns>
          {this.state.images.length === 0 ? (
            this.state.uploading ? (
              <div style={style.dropInitial}>
                <Icon className={"fa fa-gear fa-spin fa-5x"} />
                <p style={{ marginTop: "30px" }}>
                  Please wait while the image is uploading
                </p>
              </div>
            ) : (
              <Dropzone
                style={style.dropInitial}
                multiple={true}
                accept="image/*"
                onDrop={this.segment}
              >
                <Section isHidden="mobile">
                  <Icon className="fa fa-download" style={style.icon} />
                  Drop images or{"  "}
                  <Icon className="fa fa-upload" style={style.icon} />
                  Click to select them.
                </Section>
                <Section isHidden="desktop">
                  <Icon className="fa fa-upload" style={style.icon} />
                  Click to select images.
                </Section>
              </Dropzone>
            )
          ) : (
            <div>
              <Columns isFullWidth>
                <Column
                  isSize={"1/3"}
                  style={{ borderRight: "2px solid #015249" }}
                >
                  <Menu>
                    <MenuLabel style={{ marginLeft: "5px" }}>
                      Collection
                    </MenuLabel>
                    <MenuList>
                      {this.state.images.map((image, index) => {
                        return (
                          <MenuLink
                            key={index}
                            style={
                              index === this.state.activeImage
                                ? {
                                    backgroundColor: "#77c9d4",
                                    color: "white",
                                    cursor: "default"
                                  }
                                : { cursor: "default" }
                            }
                          >
                            {image.name}
                            <Button
                              isSize={"small"}
                              style={
                                index === this.state.activeImage
                                  ? style.activeHelper
                                  : style.inactiveHelper
                              }
                              onClick={() => {
                                this.removeImage(index);
                              }}
                            >
                              <Icon className={"fa fa-times"} />
                            </Button>
                            <Button
                              isSize={"small"}
                              style={
                                index === this.state.activeImage
                                  ? style.activeHelper
                                  : style.inactiveHelper
                              }
                              onClick={() => {
                                this.analyzeImage(index);
                              }}
                            >
                              <Icon className={"fa fa-bolt"} />
                            </Button>
                            {!image.saved ? (
                              <Button
                                isSize={"small"}
                                style={
                                  index === this.state.activeImage
                                    ? style.activeHelper
                                    : style.inactiveHelper
                                }
                                onClick={() => {
                                  this.save(index);
                                }}
                              >
                                <Icon className={"fa fa-save"} />
                              </Button>
                            ) : (
                              <div />
                            )}
                          </MenuLink>
                        );
                      })}
                      {this.state.uploading ? (
                        <MenuLink>
                          <Icon
                            style={{ marginRight: "5px" }}
                            className={"fa fa-gear fa-spin fa-1x"}
                          />{" "}
                          Please wait while the image is uploading
                        </MenuLink>
                      ) : (
                        <div />
                      )}
                    </MenuList>
                  </Menu>
                </Column>
                <Column
                  isSize={"2/3"}
                  style={{ backgroundColor: "#F8F8F8", paddingLeft: "0px" }}
                >
                  <center>{this.state.carousel}</center>
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
                    <MessageBody style={{ minHeight: "40vh" }}>
                      <Menu>
                        <MenuLabel>
                          Metadata{" "}
                          <a
                            href="."
                            onClick={this.handleMeta}
                            style={style.removeUnderline}
                          >
                            <Icon
                              className={
                                this.state.images[this.state.activeImage]
                                  .metadataOpen
                                  ? "fa fa-angle-up"
                                  : "fa fa-angle-down"
                              }
                              isSize="small"
                            />
                          </a>
                        </MenuLabel>
                        {this.state.images[this.state.activeImage]
                          .metadataOpen ? (
                          <MenuList>
                            <MenuLink style={style.removeUnderline}>
                              <Columns isMultiline>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>Name</p>
                                      <Button
                                        value={"name"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="3/4">
                                      <Input
                                        type="text"
                                        isSize="small"
                                        placeholder="IMAGE1..."
                                        value={
                                          this.state.images[
                                            this.state.activeImage
                                          ].name
                                        }
                                        onChange={this.changeName}
                                      />
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>Date</p>
                                      <Button
                                        value={"date"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="3/4">
                                      <Input
                                        type="date"
                                        isSize="small"
                                        value={
                                          this.state.images[
                                            this.state.activeImage
                                          ].day
                                        }
                                        onChange={this.changeDay}
                                      />
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>Location</p>
                                      <Button
                                        value={"location"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="3/4">
                                      <Input
                                        type="text"
                                        isSize="small"
                                        placeholder="B500..."
                                        value={
                                          this.state.images[
                                            this.state.activeImage
                                          ].location
                                        }
                                        onChange={this.changeLocation}
                                      />
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>Drone</p>
                                      <Button
                                        value={"drone"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="3/4">
                                      <Input
                                        type="text"
                                        isSize="small"
                                        placeholder="Sensefly eBee, DJI M100..."
                                        value={
                                          this.state.images[
                                            this.state.activeImage
                                          ].drone
                                        }
                                        onChange={this.changeDrone}
                                      />
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>Camera</p>
                                      <Button
                                        value={"camera"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="3/4">
                                      <Input
                                        type="text"
                                        isSize="small"
                                        placeholder="RGB, NIR, MS..."
                                        value={
                                          this.state.images[
                                            this.state.activeImage
                                          ].camera
                                        }
                                        onChange={this.changeCam}
                                      />
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column>
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>
                                        Image Type
                                      </p>
                                      <Button
                                        value={"image"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="3/4">
                                      <Input
                                        type="text"
                                        isSize="small"
                                        placeholder="Mosaic, Index, DSM..."
                                        value={
                                          this.state.images[
                                            this.state.activeImage
                                          ].image
                                        }
                                        onChange={this.changeImage}
                                      />
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>
                                        Environment
                                      </p>
                                      <Button
                                        value={"environment"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="3/4">
                                      <Input
                                        type="text"
                                        isSize="small"
                                        placeholder="Was it rainy?"
                                        value={
                                          this.state.images[
                                            this.state.activeImage
                                          ].env_condition
                                        }
                                        onChange={this.changeEnvCond}
                                      />
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>Folder</p>
                                      <Button
                                        value={"folder"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column isSize="2/4">
                                      <Columns>
                                        <Column isSize="1/2">
                                          <Button
                                            data-value={"WET"}
                                            onClick={this.changeSeason}
                                            isSize={"small"}
                                            style={
                                              this.state.images[
                                                this.state.activeImage
                                              ].season === "WET"
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
                                            onClick={this.changeSeason}
                                            isSize={"small"}
                                            style={
                                              this.state.images[
                                                this.state.activeImage
                                              ].season === "DRY"
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
                                          <Input
                                            isSize="small"
                                            type="text"
                                            placeholder="Year"
                                            value={
                                              this.state.images[
                                                this.state.activeImage
                                              ].date
                                            }
                                            onChange={this.changeDate}
                                          />
                                        </Column>
                                      </Columns>
                                    </Column>
                                    <Column isSize="1/4">
                                      <small>
                                        {this.state.images[
                                          this.state.activeImage
                                        ].folder_exists === "" ? (
                                          <p style={style.blueText}>
                                            <Icon
                                              className={
                                                "fa fa-info-circle fa-xs"
                                              }
                                            />
                                            Required
                                          </p>
                                        ) : this.state.images[
                                            this.state.activeImage
                                          ].folder_exists ? (
                                          <p style={style.greenText}>
                                            <Icon
                                              className={
                                                "fa fa-check-circle fa-xs"
                                              }
                                            />
                                            Exists
                                          </p>
                                        ) : (
                                          <p style={style.redText}>
                                            <Icon
                                              className={
                                                "fa fa-times-circle fa-xs"
                                              }
                                            />
                                            Doesn't Exist
                                          </p>
                                        )}
                                      </small>
                                    </Column>
                                  </Columns>
                                </Column>
                                <Column isSize="1/2">
                                  <Columns>
                                    <Column isSize="1/4">
                                      <p style={{ float: "left" }}>Private</p>
                                      <Button
                                        value={"private"}
                                        isSize={"small"}
                                        style={style.copyButton}
                                        onClick={this.copy}
                                      >
                                        <Icon className={"fa fa-clone fa-sm"} />
                                      </Button>
                                    </Column>
                                    <Column
                                      isSize="3/4"
                                      style={{
                                        padding: "0px",
                                        paddingLeft: "15px",
                                        paddingTop: "15px"
                                      }}
                                    >
                                      {this.state.images[this.state.activeImage]
                                        .private ? (
                                        <div>
                                          <i
                                            style={{
                                              ...style.switchOn,
                                              cursor: "pointer"
                                            }}
                                            onClick={this.switch}
                                          >
                                            <Icon
                                              href="."
                                              className={
                                                "fa fa-toggle-on fa-lg"
                                              }
                                              isSize="small"
                                            />
                                          </i>
                                        </div>
                                      ) : (
                                        <div>
                                          <i
                                            style={{
                                              ...style.switchOff,
                                              cursor: "pointer",
                                              margin: "5px 0px 5px 0px"
                                            }}
                                            onClick={this.switch}
                                          >
                                            <Icon
                                              href="."
                                              className={
                                                "fa fa-toggle-off fa-lg"
                                              }
                                              isSize="small"
                                            />
                                          </i>
                                        </div>
                                      )}
                                    </Column>
                                  </Columns>
                                </Column>
                              </Columns>
                            </MenuLink>
                            <MenuLink
                              style={style.removeUnderline}
                              onClick={this.switch}
                            >
                              <Columns>
                                <Column isSize="1/2" />
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
                                this.state.images[this.state.activeImage]
                                  .attribOpen
                                  ? "fa fa-angle-up"
                                  : "fa fa-angle-down"
                              }
                              isSize="small"
                            />
                          </a>
                        </MenuLabel>
                        {this.state.images[this.state.activeImage]
                          .attribOpen ? (
                          <MenuList>
                            {this.state.images[
                              this.state.activeImage
                            ].attrib.map((attribute, id) => {
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
          )}
          {this.state.cv_image};
          <ReactTooltip effect={"solid"} place={"bottom"} />
          {/* these are modals */}
          <RemoveModal
            {...{
              /* pass props here */
              active: this.state.removeModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              removeAll: this.removeAll
            }}
          />
          <SaveModal
            {...{
              /* pass props here */
              active: this.state.saveModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              saveAll: this.saveAll
            }}
          />
          <AnalyzeModal
            {...{
              /* pass props here */
              active: this.state.analyzeModalOpen,
              /* pass handlers here */
              close: this.closeModal,
              analyzeAll: this.analyzeAll
            }}
          />
        </div>
      </DocumentTitle>
    );
  }
}
