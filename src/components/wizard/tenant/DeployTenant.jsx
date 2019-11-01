import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, LinearProgress } from "@material-ui/core";
import addTenant from "../../../functions/tenant/addTenant";
import uploadLogo from "../../../functions/tenant/uploadLogo";
import _ from "lodash";
import reAuth from "../../../functions/user/me/reAuth";
import addUser from "../../../functions/tenant/user/addUser";
import addSkillgroup from "../../../functions/tenant/skillgroup/addSkillgroup";
import uploadDocs from "../../../functions/tenant/uploadDocs";
import styles from "../../../components/primaryapp/appStyles";
import addTodo from "../../../functions/user/addTodo";

class DeployTenant extends Component {
  state = {
    step: 0,
    completed: 0,
    buffer: 20,
    currentAction: ""
  };

  saveTenant = () => {
    console.log("Saving tenant data");
    const { sourceState } = this.props.source;
    addTenant(
      _.pick(sourceState, [
        "name",
        "email",
        "legalName",
        "website",
        "phone",
        "mobile",
        "fax",
        "taxId"
      ]),
      this,
      result => {
        if (!result.error) this.stepForward();
        //We should add else here , so in case of error , we should go to error page with option to reconfigure.
      }
    );
  };
  authenticate = () => {
    reAuth(this, result => {
      if (!result.error) this.stepForward();
      //We should add else here , so in case of error , we should go to error page with option to reconfigure.
    });
  };
  saveLogo = () => {
    console.log("Upload tenant logo");
    const { sourceState } = this.props.source;
    const { logo } = sourceState;
    if (logo) {
      uploadLogo(logo, this, result => {
        if (!result.error) this.stepForward();
      });
    } else this.stepForward();
  };
  saveDocuments = () => {
    console.log("Upload tenant documents");
    const { sourceState } = this.props.source;
    const { files } = sourceState;
    console.log(files);
    if (files && files.length > 0) {
      uploadDocs(files, this, result => {
        if (!result.error) this.stepForward();
      });
    } else this.stepForward();
  };
  saveSkillgroups = async () => {
    console.log("Save skillgroups");
    const { sourceState } = this.props.source;
    console.log(sourceState.skillgroups);
    await sourceState.skillgroups.forEach(async skillgroup => {
      await addSkillgroup(
        _.pick(skillgroup, ["name", "description"]),
        this,
        result => {
          if (result.error) {
            //We should direct to error page
          }
        }
      );
    });
    this.stepForward();
  };
  saveUsers = async () => {
    console.log("Save users");
    const { sourceState } = this.props.source;
    console.log(sourceState.users);
    await sourceState.users.forEach(async user => {
      await addUser(
        _.pick(user, [
          "firstname",
          "lastname",
          "email",
          "username",
          "password"
        ]),
        this,
        result => {
          if (result.error) {
            //We should direct to error page
          }
        }
      );
    });
    this.stepForward();
  };
  finalize = () => {
    console.log("Finalize tenant");
    const { sourceState } = this.props.source;
    const { skillgroups, users } = sourceState;
    if (users.length > 0 && skillgroups.length > 0)
      addTodo(
        {
          title: "Assign users to skillgroups",
          description: `Make sure to visit users page to assign skillgroups per user.
      You may change user details such as (Role , ODI , Phone)`,
          due: Date.now(),
          priority: "Critical",
          status: "New"
        },
        this
      );
    addTodo(
      {
        title: "Configure workflows",
        description: `Please clicking on workflows page , you can start configuring your workflows for routing and Bots`,
        due: Date.now(),
        priority: "Critical",
        status: "New"
      },
      this
    );
    addTodo(
      {
        title: "Configure channels",
        description: `Please clicking on channels page , you can start configuring your channels for Voice , Social .. etc`,
        due: Date.now(),
        priority: "Critical",
        status: "New"
      },
      this
    );
  };
  stepForward = async () => {
    let { step } = this.state;
    step++;
    this.setState({ step });
    switch (step) {
      case 1:
        this.setState({
          currentAction: "Deploy organization information ....",
          completed: 0,
          buffer: 10
        });
        this.saveTenant();
        break;
      case 2:
        this.setState({
          currentAction: "Authenticating ....",
          completed: 10,
          buffer: 20
        });
        this.authenticate();
        break;
      case 3:
        this.setState({
          currentAction: "Upload organization logo ....",
          completed: 20,
          buffer: 40
        });
        this.saveLogo();
        break;
      case 4:
        this.setState({
          currentAction: "Upload organization documents",
          completed: 40,
          buffer: 60
        });
        this.saveDocuments();
        break;
      case 5:
        this.setState({
          currentAction: "Configure skillgroups",
          completed: 60,
          buffer: 80
        });
        await this.saveSkillgroups();
        break;
      case 6:
        this.setState({
          currentAction: "Configure users",
          completed: 80,
          buffer: 100
        });
        await this.saveUsers();
        break;
      case 7:
        this.setState({
          currentAction:
            "Congratulations." +
            this.props.source.sourceState.name +
            " is ready!",
          completed: 100,
          buffer: 100
        });
        this.finalize();
        break;
      default:
        break;
    }
  };

  render() {
    const { theme } = this.props;
    return (
      <React.Fragment>
        {this.state.step === 0 ? (
          <Grid container direction="column" alignItems="center">
            <Typography variant="h6">Deployment will start soon ...</Typography>
            <Typography
              variant="subtitle2"
              style={{
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(4)
              }}
            >
              By clicking start button, a new organization will be configured.
              Please do not refresh or change page during the deployment.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={this.stepForward}
            >
              Start
            </Button>
          </Grid>
        ) : (
          <Grid container direction="column">
            <Grid container direction="column" alignItems="center">
              <Typography
                variant="h6"
                style={{
                  marginTop: theme.spacing(2),
                  marginBottom: theme.spacing(4)
                }}
              >
                {this.state.currentAction}
              </Typography>
            </Grid>
            <LinearProgress
              color="primary"
              variant="buffer"
              value={this.state.completed}
              valueBuffer={this.state.buffer}
            />
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

DeployTenant.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(DeployTenant);
