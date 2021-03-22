import React, { Component } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {
  Assignment,
  LocationCity,
  Category,
  DeviceHub,
  School,
  Group,
  CheckCircle,
  Contacts,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import styles from "../../primaryapp/appStyles";
import { withStyles } from "@material-ui/core/styles";
import TodoDialog from "../../dialogs/TodoDialog";
import addUser from "../../../functions/tenant/user/addUser";
import NewUserDialog from "../../dialogs/NewUserDialog";
import addSkillgroup from "../../../functions/tenant/skillgroup/addSkillgroup";
import NewSkillgroupDialog from "../../dialogs/NewSkillgroupDialog";
import compareGrade from "../../../app/compareGrade";
import addType from "../../../functions/tenant/type/addType";
import NewTypeDialog from "../../dialogs/NewTypeDialog";
import addWorkflow from "../../../functions/tenant/workflow/addWorkflow";
import NewWorkflowDialog from "../../dialogs/NewWorkflowDialog";
import addCustomer from "../../../functions/tenant/customer/addCustomer";
import NewCustomerDialog from "../../dialogs/NewCustomerDialog";
import addInteraction from "../../../functions/tenant/interaction/addInteraction";
import NewInteractionDialog from "../../dialogs/NewInteractionDialog";
const actions = [
  {
    icon: <Assignment fontSize="small" />,
    name: "To do",
    role: "User",
    tooltip: "Add new todo item",
  },
  {
    icon: <LocationCity fontSize="small" />,
    name: "Organization",
    role: "User",
    tooltip: "Add new organization wizard",
  },
  {
    icon: <Category fontSize="small" />,
    name: "Type",
    role: "Administrator",
    tooltip: "Add channel type",
  },
  {
    icon: <DeviceHub fontSize="small" />,
    name: "Workflow",
    role: "Administrator",
    tooltip: "Add new workflow",
  },
  {
    icon: <School fontSize="small" />,
    name: "Skillgroup",
    role: "Administrator",
    tooltip: "Add new skillgroup",
  },
  {
    icon: <Group fontSize="small" />,
    name: "User",
    role: "Administrator",
    tooltip: "Add new user",
  },
  {
    icon: <CheckCircle fontSize="small" />,
    name: "Task",
    role: "Administrator",
    tooltip: "Add new task",
  },
  {
    icon: <Contacts fontSize="small" />,
    name: "Customer",
    role: "Administrator",
    tooltip: "Add new customer",
  },
];
class MasterAdd extends Component {
  state = {
    open: false,
    openTodo: false,
    openNewUser: false,
    openNewSkillgroup: false,
    openNewType: false,
    openNewWorkflow: false,
    openNewCustomer: false,
    openNewInteraction: false,
    action: "new",
  };
  handleClick = (action) => {
    const { app } = this.props;
    switch (action) {
      case "To do":
        this.handleClose();
        this.handleNewTodoOpen();
        return;
      case "Organization":
        this.handleClose();
        app.handleScreenChange("Organization Wizard");
        return;
      case "Type":
        this.handleClose();
        this.handleNewTypeClickOpen();
        return;
      case "Workflow":
        this.handleClose();
        this.handleNewWorkflowClickOpen();
        return;
      case "Skillgroup":
        this.handleClose();
        this.handleNewSkillgroupClickOpen();
        return;
      case "User":
        this.handleClose();
        this.handleNewUserClickOpen();
        return;
      case "Task":
        this.handleClose();
        this.handleNewInteractionClickOpen();
        return;
      case "Customer":
        this.handleClose();
        this.handleNewCustomerClickOpen();
        return;
      default:
        console.log("Clicked");
        if (this.state.open) this.handleClose();
        else this.handleOpen();
        return;
    }
  };
  handleNewTodoOpen = () => {
    this.setState({ openTodo: true });
  };
  handleTodoClose = () => {
    this.setState({ openTodo: false });
  };
  handleNewUserClickOpen = () => {
    this.setState({ openNewUser: true });
  };
  handleNewUserClose = () => {
    this.setState({ openNewUser: false });
  };
  handleAddUser = (user) => {
    addUser(user, this, (result) => {
      if (!result.error) {
        this.handleNewUserClose();
      }
    });
  };
  handleNewSkillgroupClickOpen = () => {
    this.setState({ openNewSkillgroup: true });
  };
  handleNewSkillgroupClose = () => {
    this.setState({ openNewSkillgroup: false });
  };
  handleAddSkillgroup = (skillgroup) => {
    addSkillgroup(skillgroup, this, (result) => {
      if (!result.error) {
        this.handleNewSkillgroupClose();
      }
    });
  };
  handleNewTypeClickOpen = () => {
    this.setState({ openNewType: true });
  };
  handleNewTypeClose = () => {
    this.setState({ openNewType: false });
  };
  handleAddType = (type) => {
    addType(type, this, (result) => {
      if (!result.error) {
        this.handleNewTypeClose();
      }
    });
  };
  handleNewWorkflowClickOpen = () => {
    this.setState({ openNewWorkflow: true });
  };
  handleNewWorkflowClose = () => {
    this.setState({ openNewWorkflow: false });
  };
  handleAddWorkflow = (workflow) => {
    addWorkflow(workflow, this, (result) => {
      if (!result.error) {
        this.handleNewWorkflowClose();
      }
    });
  };
  handleNewCustomerClickOpen = () => {
    this.setState({ openNewCustomer: true });
  };
  handleNewCustomerClose = () => {
    this.setState({ openNewCustomer: false });
  };
  handleAddCustomer = (customer) => {
    addCustomer(customer, this, (result) => {
      if (!result.error) {
        this.handleNewCustomerClose();
      }
    });
  };
  handleNewInteractionClickOpen = () => {
    this.setState({ openNewInteraction: true });
  };
  handleNewInteractionClose = () => {
    this.setState({ openNewInteraction: false });
  };
  handleAddInteraction = (interaction) => {
    addInteraction(interaction, this, (result) => {
      if (!result.error) {
        this.handleNewInteractionClose();
      }
    });
  };

  getSharedObject = () => {
    return {
      handleTodoClose: this.handleTodoClose,
      handleNewUserClose: this.handleNewUserClose,
      handleNewSkillgroupClose: this.handleNewSkillgroupClose,
      handleNewTypeClose: this.handleNewTypeClose,
      handleNewWorkflowClose: this.handleNewWorkflowClose,
      handleNewCustomerClose: this.handleNewCustomerClose,
      handleNewInteractionClose: this.handleNewInteractionClose,
      handleAddInteraction: this.handleAddInteraction,
      handleAddCustomer: this.handleAddCustomer,
      handleAddWorkflow: this.handleAddWorkflow,
      handleAddType: this.handleAddType,
      handleAddSkillgroup: this.handleAddSkillgroup,
      handleAddUser: this.handleAddUser,
      sourceState: this.state,
    };
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <SpeedDial
          ariaLabel="New"
          className={classes.masterAdd}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={this.state.open}
          direction="up"
          FabProps={{ size: "small" }}
        >
          {actions.map((action) => {
            if (compareGrade(this.props.app.user.role, action.role) >= 0)
              return (
                <SpeedDialAction
                  FabProps={{ size: "small" }}
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.tooltip}
                  onClick={() => this.handleClick(action.name)}
                />
              );
            else return "";
          })}
        </SpeedDial>
        <TodoDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
        />
        <NewUserDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
          admin
        />
        <NewSkillgroupDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
        />
        <NewTypeDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
        />
        <NewWorkflowDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
        />
        <NewCustomerDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
        />
        <NewInteractionDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
        />
      </React.Fragment>
    );
  }
}

MasterAdd.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MasterAdd);
