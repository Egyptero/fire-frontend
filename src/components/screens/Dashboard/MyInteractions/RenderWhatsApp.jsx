import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import MyInteractionButtons from "./MyInteractionButtons";
import MyInteractionToolbar from "./MyInteractionToolbar";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {},
  formControl: {},
});
class RenderWhatsApp extends Component {
  state = {};
  render() {
    const { theme, classes, app } = this.props;
    const { myInteraction } = app;
    console.log("running interaction", myInteraction);
    if (!myInteraction) return;
    return (
      <Card
        style={{
          backgroundImage: `url("./imgs/chatbackground.png")`,
          backgroundRepeat: true,
          //height: "100%",
          boxShadow: "none",
        }}
      >
        <CardHeader
          title={<MyInteractionToolbar {...this.props} />}
          style={{
            padding: theme.spacing(1),
            //backgroundColor: theme.palette.secondary.light,
          }}
          action={<MyInteractionButtons {...this.props} />}
        />
        <Divider />
        <CardContent className={classes.cardContent}>
          <Grid
            container
            direction="column"
            style={{ padding: theme.spacing(2) }}
          >
            <Grid item xs={12}>
              <Grid container>
                <Card style={{ maxWidth: "50%", padding: theme.spacing(1) }}>
                  <CardHeader
                    title="Omar mamdouh"
                    titleTypographyProps={{
                      variant: "body2",
                      paddingleft: theme.spacing(1),
                    }}
                    style={{ padding: theme.spacing(0) }}
                  />
                  <CardContent style={{ padding: theme.spacing(0) }}>
                    <Typography variant="caption" gutterBottom={false}>
                      Hello firemisc sales team , i want to see a demo for
                      whatsapp services
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
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
                      Hello Mr. Omar. Thank you for contacting us.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Card style={{ maxWidth: "50%", padding: theme.spacing(1) }}>
                  <CardHeader
                    title="Omar mamdouh"
                    titleTypographyProps={{
                      variant: "body2",
                      paddingleft: theme.spacing(1),
                    }}
                    style={{ padding: theme.spacing(0) }}
                  />
                  <CardContent style={{ padding: theme.spacing(0) }}>
                    <Typography variant="caption" gutterBottom={false}>
                      How can i subscribe!!!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          style={{
            padding: theme.spacing(1),
          }}
        >
          <TextField
            margin="dense"
            rows="2"
            multiline
            name="chat"
            autoFocus
            fullWidth
            variant="filled"
            inputProps={{
              className: classes.messageBox,
            }}
          />
          <IconButton className={classes.floatButton}>
            <Send />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

RenderWhatsApp.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(RenderWhatsApp);
