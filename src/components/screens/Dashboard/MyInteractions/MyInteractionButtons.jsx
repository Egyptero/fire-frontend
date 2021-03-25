import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AddCircle,
  Cancel,
  Check,
  CheckCircle,
  Close,
  PauseCircleFilled,
  PlayCircleFilled,
  SwapHorizontalCircle,
} from "@material-ui/icons";
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

class MyInteractionButtons extends Component {
  state = {
    source: null,
    openMenu: false,
  };
  handleMenuOpen = (event) => {
    this.setState({ openMenu: true, source: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ openMenu: false, source: null });
  };
  render() {
    const { classes, source, app } = this.props;
    const { myInteraction } = app;
    if (!myInteraction) return;
    return (
      <React.Fragment>
        {this.props.fullScreen && myInteraction.buttons.accept ? (
          <Tooltip title="Accept">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleAcceptInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <Check fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {this.props.fullScreen && myInteraction.buttons.reject ? (
          <Tooltip title="Reject">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleRejectInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {this.props.fullScreen && myInteraction.buttons.hold ? (
          <Tooltip title="Hold">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleHoldInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <PauseCircleFilled fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {this.props.fullScreen && myInteraction.buttons.resume ? (
          <Tooltip title="Resume">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleResumeInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <PlayCircleFilled fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {this.props.fullScreen && myInteraction.buttons.close ? (
          <Tooltip title="Close">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleCloseInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <Cancel fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {this.props.fullScreen && myInteraction.buttons.transfer ? (
          <Tooltip title="Transfer">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleTransferInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <SwapHorizontalCircle fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {this.props.fullScreen && myInteraction.buttons.conference ? (
          <Tooltip title="Conference">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleConferenceInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <AddCircle fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {this.props.fullScreen && myInteraction.buttons.terminate ? (
          <Tooltip title="End">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                app.handleTerminateInteraction(myInteraction.interaction._id);
              }}
              size="small"
            >
              <CheckCircle fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
        {/* <IconButton
            aria-haspopup="true"
            onClick={(event) => {
              this.handleMenuOpen(event);
            }}
            size="small"
            //color="inherit"
          >
            <MoreVert fontSize="small" />
          </IconButton> */}
        <Menu
          anchorEl={this.state.source}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.openMenu}
          onClose={this.handleMenuClose}
        >
          {myInteraction.buttons.accept ? (
            <MenuItem
              onClick={() => {
                app.handleAcceptInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Accept</Typography>
            </MenuItem>
          ) : (
            ""
          )}
          {myInteraction.buttons.reject ? (
            <MenuItem
              onClick={() => {
                app.handleRejectInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Reject</Typography>
            </MenuItem>
          ) : (
            ""
          )}
          <MenuItem
            onClick={() => {
              source.handleMyInteractionOpen(myInteraction._id);
              this.handleMenuClose();
            }}
          >
            <Typography variant="caption">Open</Typography>
          </MenuItem>
          {myInteraction.buttons.hold ? (
            <MenuItem
              onClick={() => {
                app.handleHoldInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Hold</Typography>
            </MenuItem>
          ) : (
            ""
          )}
          {myInteraction.buttons.resume ? (
            <MenuItem
              onClick={() => {
                app.handleResumeInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Retreive</Typography>
            </MenuItem>
          ) : (
            ""
          )}
          {myInteraction.buttons.terminate ? (
            <MenuItem
              onClick={() => {
                app.handleTerminateInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Terminate</Typography>
            </MenuItem>
          ) : (
            ""
          )}
          {myInteraction.buttons.close ? (
            <MenuItem
              onClick={() => {
                app.handleCloseInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Close</Typography>
            </MenuItem>
          ) : (
            ""
          )}
          {myInteraction.buttons.transfer ? (
            <MenuItem
              onClick={() => {
                app.handleTransferInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Transfer</Typography>
            </MenuItem>
          ) : (
            ""
          )}
          {myInteraction.buttons.conference ? (
            <MenuItem
              onClick={() => {
                app.handleConferenceInteraction(myInteraction.interaction._id);
                this.handleMenuClose();
              }}
            >
              <Typography variant="caption">Conference</Typography>
            </MenuItem>
          ) : (
            ""
          )}
        </Menu>
      </React.Fragment>
    );
  }
}

MyInteractionButtons.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyInteractionButtons);
