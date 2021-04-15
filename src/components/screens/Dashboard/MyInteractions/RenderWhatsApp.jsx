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
import RenderWhatsAppMsgs from "./RenderWhatsAppMsgs";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(0),
    height: "63vh",
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
  },
  formControl: {},
});
class RenderWhatsApp extends Component {
  state = {};
  render() {
    const { theme, classes, app } = this.props;
    const { myInteraction } = app;
    //console.log("running interaction", myInteraction);
    if (!myInteraction) return <React.Fragment />;
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
          <RenderWhatsAppMsgs {...this.props} />
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
