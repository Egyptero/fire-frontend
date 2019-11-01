import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TenantConfguration from "./tenant/TenantConfiguration";
import { Grid } from "@material-ui/core";
import SkillgroupsConfiguration from "./tenant/SkillgroupsConfiguration";
import UsersConfiguration from "./tenant/UsersConfiguration";
import DeployTenant from "./tenant/DeployTenant";
import styles from "../../components/primaryapp/appStyles";

function getSteps() {
  return ["Information", "Skillgroups", "Users"];
}

class ConfigureTenant extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    deployed: false,
    name: "",
    email: "",
    legalName: "",
    mobile: "",
    taxId: "",
    phone: "",
    fax: "",
    website: "",
    logo: null,
    files: [],
    skillgroupColumns: [
      { title: "Name", field: "name" },
      { title: "Description", field: "description" }
    ],
    skillgroups: [
      { name: "Sales", description: "Sales team group" },
      { name: "Support", description: "Support team group" },
      { name: "Complaints", description: "Complaints team group" }
    ],
    userColumns: [
      { title: "First name", field: "firstname" },
      { title: "Last name", field: "lastname" },
      { title: "User name", field: "username" },
      { title: "Email", field: "email" },
      { title: "Password", field: "password" }
    ],
    users: []
  };
  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <TenantConfguration {...this.props} source={this.getSharedObject()} />
        );
      case 1:
        return (
          <SkillgroupsConfiguration
            {...this.props}
            source={this.getSharedObject()}
          />
        );
      case 2:
        return (
          <UsersConfiguration {...this.props} source={this.getSharedObject()} />
        );
      default:
        return "Unknown step";
    }
  };
  isStepOptional = step =>
    step === 1 || step === 2 || step === 3 || step === 4 || step === 5;
  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };
  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };
  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }
  handleDataChange = event => {
    event.preventDefault();
    switch (event.target.name) {
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "website":
        this.setState({ website: event.target.value });
        break;
      case "mobile":
        this.setState({ mobile: event.target.value });
        break;
      case "phone":
        this.setState({ phone: event.target.value });
        break;
      case "fax":
        this.setState({ fax: event.target.value });
        break;
      case "legalname":
        this.setState({ legalName: event.target.value });
        break;
      case "tax":
        this.setState({ taxId: event.target.value });
        break;
      case "logo":
        this.setState({ logo: event.target.files[0] });
        break;
      default:
        break;
    }
  };
  handleTenantFiles = files => {
    console.log("Files upload");
    console.log(files);
    this.setState({ files });
  };
  updateSkillgroups = skillgroups => {
    this.setState({ skillgroups });
  };
  updateUsers = users => {
    this.setState({ users });
  };
  configureTenantData = () => {
    console.log("Configure tenant data");
    return <DeployTenant {...this.props} source={this.getSharedObject()} />;
  };
  getSharedObject = () => {
    return {
      updateUsers: this.updateUsers,
      updateSkillgroups: this.updateSkillgroups,
      handleDataChange: this.handleDataChange,
      handleTenantFiles: this.handleTenantFiles,
      sourceState: this.state
    };
  };
  render() {
    const { theme } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography>Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Grid container direction="column">
            <Grid
              item
              xs={12}
              style={{
                marginBottom: theme.spacing(3),
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1)
              }}
            >
              {this.configureTenantData()}
            </Grid>
            {this.state.deployed ? (
              <Button
                onClick={this.handleReset}
                style={{ textTransform: "none" }}
              >
                Reset
              </Button>
            ) : (
              ""
            )}
          </Grid>
        ) : (
          <Grid container direction="column">
            <Grid
              item
              xs={12}
              style={{
                marginBottom: theme.spacing(3),
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1)
              }}
            >
              {this.getStepContent(activeStep)}
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={1} padding={16}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  style={{
                    textTransform: "none",
                    marginRight: theme.spacing(1)
                  }}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    style={{
                      textTransform: "none",
                      marginRight: theme.spacing(1)
                    }}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  style={{
                    textTransform: "none",
                    marginRight: theme.spacing(1)
                  }}
                  disabled={!this.state.name || !this.state.email}
                >
                  {activeStep === steps.length - 1 ? "Configure" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

ConfigureTenant.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ConfigureTenant);
