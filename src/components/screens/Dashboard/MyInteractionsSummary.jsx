import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Grid,
} from "@material-ui/core";
import MyInteractionsItem from "./MyInteractions/MyInteractionsItem";
import MyInteractionDetails from "./MyInteractions/MyInteractionDetails";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(0),
    //    height: "32vh",
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
});

class MyInteractionsSummary extends Component {
  state = {
    openInteraction: false,
    action: "new",
    interactionId: null,
    view: "Summary", //Detailed
  };

  handleMyInteractionOpen = (interactionId) => {
    this.setState({ openInteraction: true, action: "open", interactionId });
  };
  handleMyInteractionClose = () => {
    this.setState({ openInteraction: false });
  };
  changeView = (event) => {
    this.setState({ view: event.target.value });
  };
  getSharedObject = () => {
    return {
      handleMyInteractionClose: this.handleMyInteractionClose,
      handleMyInteractionOpen: this.handleMyInteractionOpen,
      sourceState: this.state,
    };
  };

  renderMyInteractionList = (myInteraction) => {
    return (
      <MyInteractionsItem
        key={myInteraction.interaction._id}
        {...this.props}
        myInteraction={myInteraction}
        source={this.getSharedObject()}
        view={this.state.view}
        fullScreen={this.props.fullScreen}
      />
    );
  };
  render() {
    const { classes } = this.props;
    const { app } = this.props;
    const myInteractions = app.myInteractions ? app.myInteractions : [];

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader
            style={{ padding: this.props.theme.spacing(1) }}
            action={
              <div>
                <FormControl className={classes.formControl} size="small">
                  <InputLabel shrink htmlFor="bot-label-placeholder">
                    <Typography variant="caption">View</Typography>
                  </InputLabel>
                  <Select value={this.state.view} onChange={this.changeView}>
                    <MenuItem value={"Summary"}>
                      <Typography variant="caption">Summary</Typography>
                    </MenuItem>
                    <MenuItem value={"Detailed"}>
                      <Typography variant="caption">Detailed</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            }
            title="Running interactions"
            titleTypographyProps={{ variant: "body1" }}
          />
          <Divider />
          <CardContent
            className={classes.cardContent}
            style={{ height: this.props.fullScreen ? "80vh" : "" }}
          >
            <Grid container direction="row" style={{ height: "100%" }}>
              <Grid md={3} item>
                <List disablePadding style={{ width: "100%" }}>
                  {myInteractions.map((myInteraction) => {
                    return this.renderMyInteractionList(myInteraction);
                  })}
                </List>
              </Grid>
              <Grid md={9} item>
                <MyInteractionDetails {...this.props} />
                {/* <Typography variant="h5">Welcome to my interaction</Typography> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* <TodoDialog {...this.props} source={this.getSharedObject()} /> */}
      </React.Fragment>
    );
  }
}

MyInteractionsSummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  // fullScreen: PropTypes.bool.optional it give exception in runtime
};
export default withStyles(styles, { withTheme: true })(MyInteractionsSummary);
