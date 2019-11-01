import React, { Component } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { LocationCity, Person } from "@material-ui/icons";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import updateMe from "../../functions/user/me/updateMe";

const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
    //background: theme.palette.primary.light
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
  }
});

class Welcome extends Component {
  updateUserTypeUser = () => {
    updateMe({ type: "User" }, this, result => {
      if (!result.error) this.props.app.handleScreenChange("Dashboard");
      console.log(result);
    });
  };
  updateUserTypeCompany = () => {
    updateMe({ type: "Company" }, this, result => {
      if (!result.error) this.props.app.handleScreenChange("Dashboard");
      console.log(result);
    });
  };
  render() {
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          <Card className={classes.card}>
            <CardContent className={classes.CardContent}>
              <Grid container direction="column">
                <Typography
                  variant="h4"
                  style={{
                    marginTop: theme.spacing(3),
                    marginBottom: theme.spacing(0)
                  }}
                >
                  Welcome to firemisc
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    marginTop: theme.spacing(0),
                    marginBottom: theme.spacing(5)
                  }}
                >
                  The first cloud PBX and Cloud contact center in middle east.
                </Typography>
                <Typography
                  style={{
                    marginTop: theme.spacing(0),
                    marginBottom: theme.spacing(10)
                  }}
                  variant="body2"
                >
                  At firemisc you can register new phone number online and call
                  many online organizations and users. Let us first define your
                  mission. Would you please tell us whether you are a company or
                  user?
                </Typography>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Grid container justify="flex-end">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.updateUserTypeCompany}
                          id="company"
                        >
                          <LocationCity
                            style={{ width: "4em", height: "4em" }}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.updateUserTypeUser}
                        id="user"
                      >
                        <Person style={{ width: "4em", height: "4em" }} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Typography
                  style={{
                    marginTop: theme.spacing(10),
                    marginBottom: theme.spacing(1)
                  }}
                  variant="body2"
                >
                  firemisc is offering remote agent service. We have users from
                  different countries which availing the ability to hire your
                  contact center on demand and pay as you go. User can register
                  as free remote agent in order to find a remote call center
                  job.
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }
}

Welcome.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Welcome);
