import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});
class RenderInteractionParams extends Component {
  state = {};
  formattedDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  };

  render() {
    return (
      <React.Fragment>
        {this.props.type.configuration.params.map((param) => {
          //      console.log("param loaded", param);
          if (!this.props.params[param.name])
            this.props.params[param.name] = "";
          switch (param.type) {
            case "textfield":
              return (
                <Grid key={param.name} item xs={param.width}>
                  <TextField
                    name={param.name}
                    disabled={!this.props.canSave}
                    label={param.label}
                    placeholder={param.label}
                    onChange={this.props.handleDataChange}
                    value={this.props.params[param.name]} // Should be referred to created interaction attached data
                    fullWidth
                    inputProps={{ style: { fontSize: "0.8rem" } }}
                    InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                    required={param.must}
                  />
                </Grid>
              );
            case "textarea":
              return (
                <Grid key={param.name} item xs={param.width}>
                  <TextField
                    key={param.name}
                    name={param.name}
                    disabled={!this.props.canSave}
                    label={param.label}
                    placeholder={param.label}
                    multiline
                    rows="3"
                    onChange={this.props.handleDataChange}
                    value={this.props.params[param.name]} // Should be referred to created interaction attached data
                    fullWidth
                    inputProps={{ style: { fontSize: "0.8rem" } }}
                    InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                    required={param.must}
                  />
                </Grid>
              );
            case "select":
              break;
            case "check":
              break;
            case "date":
              return (
                <Grid key={param.name} item xs={param.width}>
                  <TextField
                    key={param.name}
                    name={param.name}
                    disabled={!this.props.canSave}
                    label={param.label}
                    placeholder={param.label}
                    margin="dense"
                    onChange={this.props.handleDataChange}
                    value={this.formattedDate(this.props.params[param.name])}
                    type="Date"
                    variant="outlined"
                    fullWidth
                    required={param.must}
                    inputProps={{ style: { fontSize: "0.8rem" } }}
                    InputLabelProps={{
                      style: { fontSize: "0.8rem" },
                      shrink: true,
                    }}
                  />
                </Grid>
              );

            case "time":
              return (
                <Grid key={param.name} item xs={param.width}>
                  <TextField
                    name={param.name}
                    disabled={!this.props.canSave}
                    label={param.label}
                    placeholder={param.label}
                    margin="dense"
                    onChange={this.props.handleDataChange}
                    value={this.props.params[param.name]}
                    type="Time"
                    variant="outlined"
                    fullWidth
                    required={param.must}
                    inputProps={{ style: { fontSize: "0.8rem" } }}
                    InputLabelProps={{
                      style: { fontSize: "0.8rem" },
                      shrink: true,
                    }}
                  />
                </Grid>
              );

            case "log":
              break;
            default:
              break;
          }
          return <React.Fragment key={param.name} />;
        })}
      </React.Fragment>
    );
  }
}

RenderInteractionParams.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  canSave: PropTypes.bool.isRequired,
};
export default withStyles(styles, { withTheme: true })(RenderInteractionParams);
