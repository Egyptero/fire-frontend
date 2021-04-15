import {
  Avatar,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Email, Facebook, Phone, WhatsApp } from "@material-ui/icons";

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
});

class RenderInteractionCustomer extends Component {
  state = {
    customer: null,
  };
  componentDidMount() {
    //Find customer
    // If not found , load customer
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.customerId === this.props.customerId) return;
    else {
      //Reload customer information
    }
  }
  render() {
    const { theme, classes } = this.props;
    return (
      <Grid container direction="column">
        <TableContainer
          component={Paper}
          style={{ boxShadow: "none", backgroundColor: "transparent" }}
        >
          <Table size="small">
            <TableBody>
              <TableRow key={"photo"}>
                <TableCell align="center" colSpan={2}>
                  <Grid
                    container
                    alignItems="center"
                    alignContent="center"
                    justify="center"
                    direction="column"
                  >
                    <Avatar
                      src="/imgs/nopic.jpg"
                      style={{
                        width: theme.spacing(12),
                        height: theme.spacing(12),
                      }}
                    />
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow key={"name"}>
                <TableCell align="center" colSpan={2}>
                  <Typography variant="caption">
                    <b>Customer name</b>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow key={"phone"}>
                <TableCell align="center">
                  <Phone
                    fontSize="small"
                    style={{ color: theme.palette.success.dark }}
                  />
                </TableCell>
                <TableCell align="left">+966552735273</TableCell>
              </TableRow>
              <TableRow key={"whatsapp"}>
                <TableCell align="center">
                  <WhatsApp
                    fontSize="small"
                    style={{ color: theme.palette.success.main }}
                  />
                </TableCell>
                <TableCell align="left">+966552735273</TableCell>
              </TableRow>
              <TableRow key={"facebook"}>
                <TableCell align="center">
                  <Facebook
                    fontSize="small"
                    style={{ color: theme.palette.info.dark }}
                  />
                </TableCell>
                <TableCell align="left">mamdouh.aref</TableCell>
              </TableRow>
              <TableRow key={"email"}>
                <TableCell align="center">
                  <Email
                    fontSize="small"
                    style={{ color: theme.palette.info.light }}
                  />
                </TableCell>
                <TableCell align="left">aref.mamdouh@gmail.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}
RenderInteractionCustomer.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  customerId: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(
  RenderInteractionCustomer
);
