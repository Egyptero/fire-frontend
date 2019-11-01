import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  ListItemAvatar
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Add, Refresh } from "@material-ui/icons";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%"
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "73vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {}
});
class CustomersList extends Component {
  state = {};
  renderAvatar = customer => {
    return <Avatar>{customer.firstname[0]}</Avatar>;
  };
  render() {
    const { classes, source, app } = this.props;
    if (source.getListWidth() === 0) return <React.Fragment />;
    return (
      <Grid
        item
        xs={12}
        sm={source.getListWidth()}
        md={source.getListWidth()}
        lg={source.getListWidth()}
        className={classes.grid}
      >
        <Card className={classes.card}>
          {/** List of customers header having the add function as well as reload. We may need to add more filters */}
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadCustomers}>
                  <Refresh />
                </IconButton>
                <IconButton onClick={source.handleNewCustomerClickOpen}>
                  <Add />
                </IconButton>
              </div>
            }
            title="List of customers"
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {/** List of customers , it will be loaded from the app state. */}
            <List component="nav">
              {app.customers
                ? app.customers.map((customer, index) => {
                    return (
                      <ListItem
                        selected={
                          source.sourceState.selectedCustomer &&
                          customer._id ===
                            source.sourceState.selectedCustomer._id
                        }
                        button
                        key={index}
                        onClick={event =>
                          source.handleListItemClick(event, index)
                        }
                      >
                        <ListItemAvatar>
                          {this.renderAvatar(customer)}
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${customer.firstname} ${customer.lastname}`}
                          secondary={
                            <React.Fragment>
                              {customer.profession}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    );
                  })
                : ""}
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

CustomersList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CustomersList);
