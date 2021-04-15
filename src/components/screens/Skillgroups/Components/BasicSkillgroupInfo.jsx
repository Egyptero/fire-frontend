import React, { Component } from "react";
import { Grid, TextField, FormControl } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {},
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class BasicSkillgroupInfo extends Component {
  state = {};
  componentDidMount() {}
  onDataChange = (event) => {
    const { source } = this.props;
    let { selectedSkillgroup } = source.sourceState;
    if (event.target.name === "name")
      selectedSkillgroup.name = event.target.value;
    if (event.target.name === "description")
      selectedSkillgroup.description = event.target.value;

    source.updateSelectedSkillgroup(selectedSkillgroup);
  };
  render() {
    const { classes, source, theme } = this.props;
    return (
      <React.Fragment>
        {/* Empty space*/}
        {/* <Grid item xs={12}>
          <p style={{ margin: theme.spacing(1) }} />
        </Grid> */}
        {/* Skillgroup name */}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid
            container
            direction="column"
            style={{
              // border: "1px solid",
              // borderColor: theme.palette.secondary.light,
              // "border-radius": "5px",
              padding: theme.spacing(1),
            }}
          >
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                label="Skill name"
                placeholder="Skillgroup name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedSkillgroup.name}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Skillgroup description */}
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            style={{
              // border: "1px solid",
              // borderColor: theme.palette.secondary.light,
              // "border-radius": "5px",
              padding: theme.spacing(1),
            }}
          >
            <FormControl className={classes.formControl}>
              <TextField
                name="description"
                label="Description"
                multiline
                rows="2"
                placeholder="Skillgroup description"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedSkillgroup.description}
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

BasicSkillgroupInfo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BasicSkillgroupInfo);
