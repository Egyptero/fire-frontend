import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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

class RenderInteractionWrapup extends Component {
  state = {
    wrapupReasons: [],
    wrapupReason: "Select ...",
  };
  componentDidMount() {
    //We need load wrap up reasons from tenant if not found , do not render
    const { app } = this.props;
    if (!app) return;
    const { tenant } = app;
    console.log("wrap reasons", tenant.wrapupReasons);
    this.setState({ wrapupReasons: [...tenant.wrapupReasons] });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.app.tenant === prevProps.app.tenant) return;
    const { app } = this.props;
    if (!app) return;
    const { tenant } = app;
    console.log("wrap reasons", tenant.wrapupReasons);
    this.setState({ wrapupReasons: [...tenant.wrapupReasons] });
  }
  wrapupChanged = (event) => {
    this.setState({ wrapupReason: event.target.value });
    //We should update the ODI at this moment about wrapup reason to be saved with the interaction.
  };
  render() {
    const { classes } = this.props;
    const { wrapupReasons } = this.state;
    if (!wrapupReasons || wrapupReasons.length < 1) return <React.Fragment />;
    return (
      <FormControl className={classes.formControl} size="small">
        <InputLabel shrink htmlFor="bot-label-placeholder">
          <Typography variant="caption">Wrapup reason</Typography>
        </InputLabel>

        <Select value={this.state.wrapupReason} onChange={this.wrapupChanged}>
          <MenuItem value={"Select ..."}>
            <Typography variant="caption">{"Select ..."}</Typography>
          </MenuItem>
          {wrapupReasons.map((reason) => {
            return (
              <MenuItem value={reason}>
                <Typography variant="caption">{reason}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

RenderInteractionWrapup.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  interaction: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(RenderInteractionWrapup);
