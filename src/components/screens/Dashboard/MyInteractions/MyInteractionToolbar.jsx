import { Chip, Divider, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {},
  formControl: {},
});

class MyInteractionToolbar extends Component {
  state = {};
  render() {
    const { theme, classes, app } = this.props;
    const { myInteraction } = app;
    if (!myInteraction) return;

    return (
      <Grid container direction="row">
        <Typography variant="body1">Omar Mamdouh</Typography>
        <Divider
          style={{
            width: "2px",
            height: theme.spacing(3),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
          }}
        />
        <Chip
          label={myInteraction.interaction.stage}
          size="small"
          style={{
            width: theme.spacing(10),
            backgroundColor:
              myInteraction.interaction.stage === "Handle"
                ? theme.palette.info.light
                : myInteraction.interaction.stage === "Offer"
                ? theme.palette.error.light
                : myInteraction.interaction.stage === "Hold"
                ? theme.palette.warning.light
                : "inherit",
          }}
        />
        {myInteraction.interaction.fromAddress ? (
          <React.Fragment>
            <Divider
              style={{
                width: "2px",
                height: theme.spacing(3),
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
              }}
            />
            <Typography variant="body1">
              {myInteraction.interaction.fromAddress}
            </Typography>
          </React.Fragment>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}

MyInteractionToolbar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyInteractionToolbar);
