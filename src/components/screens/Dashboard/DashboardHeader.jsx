import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Grow,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Label, MoreVert, Settings } from "@material-ui/icons";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {
    // postiion:"absolute",
    // left: theme.spacing(-2),
    bottom: theme.spacing(-1),
  },
  cardContent: {
    position: "relative",
    overflow: "auto",
    //    height: "2vh", //32 vh
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {
    marginLeft: theme.spacing(),
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  floatButton: {},
  floatButtonLeft: {},
  avatar: {
    position: "relative",
    boxShadow: "1px 1px 4px gray",
    zIndex: 1,
    top: theme.spacing(-2),
    width: theme.spacing(6),
    height: theme.spacing(3),
    backgroundColor: theme.palette.error.light,
  },
  avatarOver: {
    position: "relative",
    boxShadow: "1px 1px 4px gray",
    zIndex: 1,
    //top: theme.spacing(-5),
    //left: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(3),
    backgroundColor: theme.palette.error.light,
  },
});

class DashboardHeader extends Component {
  state = {};
  render() {
    const { classes, params } = this.props;
    return (
      <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <Grid container alignItems="center" direction="column">
          <Avatar
            aria-label="recipe"
            className={classes.avatarOver}
            variant="square"
            style={{ backgroundColor: params.topAvatarColor }}
          >
            <Typography variant="h6">{params.bottomValue}</Typography>
          </Avatar>
          <Card className={classes.card}>
            <CardContent style={{ height: this.props.theme.spacing(0) }}>
              <Grid container alignItems="center" direction="column">
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  variant="square"
                  style={{ backgroundColor: params.bottomAvatarColor }}
                >
                  {params.icon ? params.icon() : ""}
                </Avatar>
              </Grid>
              <Divider />
            </CardContent>
            <CardActions>
              <Grid
                container
                alignItems="center"
                direction="column"
                justify="center"
              >
                <Typography variant="caption" style={{ margin: 0 }}>
                  {params.message}
                </Typography>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grow>
    );
  }
}

DashboardHeader.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(DashboardHeader);
