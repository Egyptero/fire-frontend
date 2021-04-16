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
import RenderInteractionWrapup from "../../common/interaction/RenderInteractionWrapup";
import RenderInteractionTransfer from "../../common/interaction/RenderInteractionTransfer";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  cardContent: {
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(0),
    height: "100%",
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
    const { classes, theme } = this.props;
    const { app } = this.props;
    const myInteractions = app.myInteractions ? app.myInteractions : [];

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader
            style={{
              padding: this.props.theme.spacing(1),
              //backgroundColor: this.props.theme.palette.secondary.light,
              backgroundColor: "lightgrey",
            }}
            action={
              <Grid container direction="row">
                {this.props.app.myInteraction ? (
                  <React.Fragment>
                    <RenderInteractionTransfer
                      {...this.props}
                      myInteraction={this.props.app.myInteraction}
                    />
                    <Divider
                      style={{
                        width: "0px",
                        marginLeft: theme.spacing(4),
                        marginRight: theme.spacing(4),
                      }}
                    />
                    <RenderInteractionWrapup
                      {...this.props}
                      interaction={this.props.app.myInteraction.interaction}
                    />
                    <Divider
                      style={{
                        width: "0px",
                        marginLeft: theme.spacing(4),
                        marginRight: theme.spacing(4),
                      }}
                    />
                  </React.Fragment>
                ) : (
                  ""
                )}

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
              </Grid>
            }
            title={<b>Running cases / interactions</b>}
            titleTypographyProps={{ variant: "body1" }}
          >
            
          </CardHeader>
          <Divider />
          <CardContent
            className={classes.cardContent}
            style={{ height: this.props.fullScreen ? "82vh" : "" }}
          >
            <Grid container direction="row" style={{ height: "100%" }}>
              <Grid md={3} item>
                <Grid
                  container
                  direction="column"
                  style={{
                    padding: this.props.theme.spacing(1),
                  }}
                >
                  <List
                    disablePadding
                    style={{
                      width: "100%",
                    }}
                  >
                    {myInteractions.map((myInteraction) => {
                      return this.renderMyInteractionList(myInteraction);
                    })}
                  </List>
                </Grid>
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
