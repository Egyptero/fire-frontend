import React, { Component } from "react";
import { Grid, Card, Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UserTopBar from "./Components/UserTopBar";
import BasicUserInfo from "./Components/BasicUserInfo";
import UserSkillManagement from "./Components/UserSkillManagement";
import UserAdvancedManagement from "./Components/UserAdvancedManagement";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden"
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh"
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%"
  },
  details: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "78vh",
    maxHeight: "78vh",
    //    minWidth: "100%",
    whiteSpace: "nowrap",
    //width: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "90%"
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "18em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  listOrganizations: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "6.2em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  listUsers: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "14.7em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  }
});

class UserDetails extends Component {
  state = {};
  componentDidMount() {}
  render() {
    const { classes, source } = this.props;
    return (
      <Grid
        item
        xs={12}
        sm={source.getDetailsWidth()}
        md={source.getDetailsWidth()}
        lg={source.getDetailsWidth()}
        className={classes.grid}
      >
        <Card className={classes.card}>
          <Grid
            container
            style={{
              overflow: "auto",
              position: "relative",
              display: "flex"
            }}
          >
            {/** User Topbar running all user capabilities like save , edit , watch */}
            <UserTopBar {...this.props} />
            {/**User Details part. Having user basic info and skill management , and advanced management */}
            <Grid item className={classes.gridWithoutBorder} xs={12}>
              <Grid container className={classes.details}>
                <Grid container spacing={0}>
                  {/**Basic User Information like pic , name , email */}
                  <BasicUserInfo {...this.props} />
                  {/* Divider */}
                  <Grid item xs={12}>
                    <Divider style={{ margin: "1%" }} />
                  </Grid>
                  {/**User skillgroups management where you can assign or remove skill from user */}
                  <UserSkillManagement {...this.props} />
                  {/** User Team Management */}
                  <UserAdvancedManagement {...this.props} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

UserDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserDetails);
