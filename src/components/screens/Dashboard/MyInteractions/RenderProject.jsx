import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import RenderInteractionCustomer from "../../../common/interaction/RenderInteractionCustomer";
import RenderInteractionParams from "../../../common/interaction/RenderInteractionParams";
import MyInteractionButtons from "./MyInteractionButtons";
import MyInteractionToolbar from "./MyInteractionToolbar";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContentProject: {
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(0),
    height: "76.7vh",
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
class RenderProject extends Component {
  state = {};
  render() {
    const { theme, classes, app } = this.props;
    const { myInteraction } = app;
    if (!myInteraction) return <React.Fragment />;
    const params = { ...myInteraction.interaction.attached.params };
    //console.log("running interaction", myInteraction);

    return (
      <Card
        style={{
          //backgroundImage: `linear-gradient(to top, #e1d376, #e0dc87, #e0e599, #e1edaa, #e3f5bc)`,
          //backgroundImage: `url("./imgs/chatbackground.png")`,
          //backgroundRepeat: true,
          backgroundColor: "transparent",
          //height: "100%",
          //boxShadow: "none",
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
        <CardContent className={classes.cardContentProject}>
          <Grid container>
            <Grid item sm={8} style={{ padding: theme.spacing(2) }}>
              <Grid container spacing={1}>
                <RenderInteractionParams
                  {...this.props}
                  params={params}
                  handleDataChange={(event) => {
                    console.log(event.target.name, event.target.value);
                  }}
                  canSave={true}
                  type={
                    app.types.filter(
                      (type) => type._id === myInteraction.interaction.typeId
                    )[0]
                  }
                />
              </Grid>
            </Grid>
            <Grid item sm={4} style={{ padding: theme.spacing(2) }}>
              <Grid container direction="column" spacing={1}>
                <RenderInteractionCustomer
                  {...this.props}
                  customerId={myInteraction.interaction.customerId}
                />
                {/* <Typography variant="h5">
                  We need to render customer details , then customer last 5
                  interactions
                </Typography> */}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardActions
          style={{
            padding: theme.spacing(1),
          }}
        > */}
        {/* <TextField
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
          </IconButton> */}
        {/* </CardActions> */}
      </Card>
    );
  }
}

RenderProject.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(RenderProject);
