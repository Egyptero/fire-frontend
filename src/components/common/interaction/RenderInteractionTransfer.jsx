import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AccountCircle,
  Face,
  FastForward,
  Forward,
  Group,
  Help,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";

const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  details: {},
  formControl: {
    //padding: theme.spacing(1) * 0.4,
    minWidth: theme.spacing(15),
  },
  listOrganizations: {},
  listUsers: {},
});

class RenderInteractionTransfer extends Component {
  state = {
    transferToList: [
      {
        name: "manager",
        target: <Typography variant="caption">Manager</Typography>,
        icon: (
          <React.Fragment>
            <FastForward
              style={{
                color: this.props.theme.palette.common.white,
                marginLeft: this.props.theme.spacing(1),
              }}
              fontSize="small"
            />
            <AccountCircle
              style={{ color: this.props.theme.palette.common.white }}
              fontSize="small"
            />
          </React.Fragment>
        ),
        backgroundColor: this.props.theme.palette.success.main,
        color: this.props.theme.palette.common.white,
      },
      {
        name: "queue",
        target: <Typography variant="caption">Queue</Typography>,
        icon: (
          <React.Fragment>
            <FastForward
              style={{
                color: this.props.theme.palette.common.white,
                marginLeft: this.props.theme.spacing(1),
              }}
              fontSize="small"
            />

            <Group
              style={{ color: this.props.theme.palette.common.white }}
              fontSize="small"
            />
          </React.Fragment>
        ),
        backgroundColor: this.props.theme.palette.error.main,
        color: this.props.theme.palette.common.white,
      },
    ],
  };
  componentDidMount() {
    const { app } = this.props;
    if (!app) return;
    let skillgroups = app.skillgroups;
    if (!skillgroups) skillgroups = app.mySkillgroups;
    if (!skillgroups) return;
    let transferToList = [...this.state.transferToList];
    skillgroups.forEach((skillgroup, index) => {
      if (index > 2) return;
      transferToList.push({
        name: skillgroup.name,
        target: <Typography variant="caption">{skillgroup.name}</Typography>,
        icon: (
          <React.Fragment>
            <FastForward
              style={{
                color: this.props.theme.palette.common.white,
                marginLeft: this.props.theme.spacing(1),
              }}
              fontSize="small"
            />
            <Group
              style={{ color: this.props.theme.palette.common.white }}
              fontSize="small"
            />
          </React.Fragment>
        ),
        backgroundColor: this.props.theme.palette.info.main,
        color: this.props.theme.palette.common.white,
      });
      this.setState({ transferToList });
    });
  }
  onClick = (event) => {
    //We should communicate with ODI for routing the case according to transfer destination
    console.log("Event is as follow", event.target.name);
  };

  render() {
    const { classes, theme } = this.props;
    const { transferToList } = this.state;
    const { myInteraction } = this.props;
    if (!myInteraction) return <React.Fragment />;
    if (!myInteraction.buttons.transfer) return <React.Fragment />;
    if (!transferToList || transferToList.length < 1) return <React.Fragment />;
    return transferToList.map((transferTo) => {
      return (
        <Chip
          name={transferTo.name}
          icon={transferTo.icon ? transferTo.icon : <Help />}
          label={transferTo.target}
          style={{
            display: "flex",
            position: "relative",
            //top: "50%",
            marginLeft: theme.spacing(1),
            "-ms-transform": "translateY(40%)",
            transform: "translateY(40%)",
            backgroundColor: transferTo.backgroundColor,
            color: transferTo.color,
            boxShadow: `inset 1px 1px 2px ${theme.palette.secondary.main}`,
          }}
          onClick={this.onClick}
        />
      );
    });
  }
}

RenderInteractionTransfer.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  myInteraction: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(
  RenderInteractionTransfer
);
