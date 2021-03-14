import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { MoreVert, Settings } from "@material-ui/icons";

const styles = (theme) => ({
  content: {},
  grid: {},
  card: {
    // postiion:"absolute",
    // left: theme.spacing(-2)
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
    width: theme.spacing(12),
    height: theme.spacing(5),
    backgroundColor: theme.palette.error.light,
  },
  avatarOver: {
    position: "relative",
    boxShadow: "1px 1px 4px gray",
    zIndex: 1,
    //top: theme.spacing(-5),
    left: theme.spacing(2),
    width: theme.spacing(12),
    height: theme.spacing(5),
    backgroundColor: theme.palette.error.light,
  },
});

class DashboardHeader extends Component {
  state = {};
  render() {
    const { classes, params } = this.props;
    console.log(params);
    return (
      <Grid container>
        <Avatar
          aria-label="recipe"
          className={classes.avatarOver}
          variant="square"
          style={{ backgroundColor: params.topAvatarColor }}
        >
          <Typography variant="h4">{params.bottomValue}</Typography>
        </Avatar>
        <Card className={classes.card}>
          <CardHeader
            // className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                variant="square"
                style={{ backgroundColor: params.bottomAvatarColor }}
              >
                {params.icon ? params.icon() : ""}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVert />
            //   </IconButton>
            // }
            // title="Sample Header"
            // subheader="September 14, 2016"
          ></CardHeader>
          <CardContent
            className={classes.cardContent}
            style={this.props.fullScreen ? { height: "75vh" } : {}}
          >
            <Divider />
            {params.message}
          </CardContent>
        </Card>
      </Grid>
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
