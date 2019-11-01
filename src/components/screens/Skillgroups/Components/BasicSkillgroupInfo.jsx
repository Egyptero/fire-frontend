import React, { Component } from "react";
import { Grid, TextField, FormControl } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1)
  },
  list: {},
  listOrganizations: {},
  listUsers: {}
});

class BasicSkillgroupInfo extends Component {
  state = {};
  componentDidMount() {}
  onDataChange = event => {
    const { source } = this.props;
    let { selectedSkillgroup } = source.sourceState;
    if (event.target.name === "name")
      selectedSkillgroup.name = event.target.value;
    if (event.target.name === "description")
      selectedSkillgroup.description = event.target.value;

    source.updateSelectedSkillgroup(selectedSkillgroup);
  };
  render() {
    const { classes, source } = this.props;
    return (
      <React.Fragment>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: "2%" }} />
        </Grid>
        {/* Skillgroup name */}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid container direction="column">
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                label="Skill name"
                placeholder="Skillgroup name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedSkillgroup.name}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: "2%" }} />
        </Grid>
        {/* Skillgroup description */}
        <Grid item xs={12}>
          <Grid container direction="column">
            {/* User Email */}
            <FormControl className={classes.formControl}>
              <TextField
                name="description"
                label="Description"
                multiline
                rows="4"
                placeholder="Skillgroup description"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedSkillgroup.description}
                variant="outlined"
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
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BasicSkillgroupInfo);
