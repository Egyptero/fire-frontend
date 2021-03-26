import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
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
class RenderWhatsAppMsgs extends Component {
  state = {
    msgs: [
      {
        sender: "Omar Mamdouh",
        message: "Hello firemisc. I want to subscribe in whats app services",
        time: Date.now(),
        system: false,
      },
      {
        sender: "Mamdouh Osman",
        message:
          "Welcome Mr. Omar. Of course you can subscribe .. but you have to be patient as the first release is under development right now.",
        time: Date.now(),
        system: true,
      },
      {
        sender: "Omar Mamdouh",
        message: "So , please send me the url to subscribe ..",
        time: Date.now(),
        system: false,
      },
      {
        sender: "Mamdouh Osman",
        message: "Here you go.",
        time: Date.now(),
        system: true,
      },
      {
        sender: "Mamdouh Osman",
        message: "https://wwww.firemisc.com",
        time: Date.now(),
        system: true,
      },
    ],
  };
  render() {
    const { theme, classes, app } = this.props;
    const { myInteraction } = app;
    //console.log("running interaction", myInteraction);
    if (!myInteraction) return <React.Fragment />;

    return (
      <Grid container direction="column" style={{ padding: theme.spacing(2) }}>
        {this.state.msgs.map((msg) => {
          if (msg.system) {
            return (
              <Grid item xs={12}>
                <Grid container direction="row-reverse">
                  <Card
                    style={{
                      maxWidth: "50%",
                      padding: theme.spacing(1),
                      backgroundColor: theme.palette.success.light,
                    }}
                  >
                    <CardContent style={{ padding: theme.spacing(0) }}>
                      <Typography variant="caption" gutterBottom={false}>
                        {msg.message}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12}>
                <Grid container>
                  <Card style={{ maxWidth: "50%", padding: theme.spacing(1) }}>
                    <CardHeader
                      title={msg.sender}
                      titleTypographyProps={{
                        variant: "body2",
                        paddingleft: theme.spacing(1),
                      }}
                      style={{ padding: theme.spacing(0) }}
                    />
                    <CardContent style={{ padding: theme.spacing(0) }}>
                      <Typography variant="caption" gutterBottom={false}>
                        {msg.message}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            );
          }
        })}
      </Grid>
    );
  }
}

RenderWhatsAppMsgs.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(RenderWhatsAppMsgs);
