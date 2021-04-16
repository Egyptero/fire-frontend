import {
  Avatar,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Email, Facebook, Phone, WhatsApp } from "@material-ui/icons";
import _ from "lodash";

import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  details: {},
  formControl: {
    padding: theme.spacing(1) * 0.4,
  },
  listOrganizations: {},
  listUsers: {},
  table: {
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(0),
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
    boxShadow: "none",
    backgroundColor: "transparent",
  },
});

class RenderInteractionObject extends Component {
  state = {};
  render() {
    const { theme, classes, interaction } = this.props;
    return (
      <Grid container direction="column">
        <TableContainer component={Paper} className={classes.table}>
          <Table size="small">
            <TableHead style={{ backgroundColor: theme.palette.info.light }}>
              <TableRow>
                <TableCell variant="head">Key</TableCell>
                <TableCell variant="head">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(
                _.pick(interaction, [
                  "_id",
                  "stage",
                  "priority",
                  "direction",
                  "crmlink",
                  "schedule",
                  "creationDate",
                  "lastModifiedDate",
                ])
              ).map(function (keyName, keyIndex) {
                return (
                  <TableRow key={keyName}>
                    <TableCell align="left" variant="body">
                      {keyName}
                    </TableCell>
                    <TableCell align="left" variant="body">
                      {interaction[keyName]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}

RenderInteractionObject.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  interaction: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(RenderInteractionObject);
