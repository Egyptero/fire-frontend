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
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Add, Refresh } from "@material-ui/icons";
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    //height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
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
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "83vh",
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
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});
class SkillgroupsList extends Component {
  state = {};
  renderAvatar = (skillgroup) => {
    const { theme } = this.props;
    return (
      <Avatar
        style={{
          width: theme.spacing(4),
          height: theme.spacing(4),
          backgroundColor: theme.palette.info.light,
        }}
      >
        <Typography variant="caption">{skillgroup.name[0]}</Typography>
      </Avatar>
    );
  };
  render() {
    const { classes, source, app, theme } = this.props;
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
          {/** List of skillgroups header having the add function as well as reload. We may need to add more filters */}
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadSkillgroups} size="small">
                  <Refresh fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={source.handleNewSkillgroupClickOpen}
                  size="small"
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>
            }
            title={<b>Skillgroups</b>}
            titleTypographyProps={{ variant: "body1" }}
            style={{ padding: theme.spacing(1) }}
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {/** List of skillgroups , it will be loaded from the app state. */}
            <List component="nav" disablePadding>
              {app.skillgroups
                ? app.skillgroups.map((skillgroup, index) => {
                    return (
                      <ListItem
                        selected={
                          source.sourceState.selectedSkillgroup &&
                          skillgroup._id ===
                            source.sourceState.selectedSkillgroup._id
                        }
                        button
                        key={index}
                        onClick={(event) =>
                          source.handleListItemClick(event, index)
                        }
                        style={{padding:theme.spacing(1)}}
                      >
                        <ListItemAvatar>
                          {this.renderAvatar(skillgroup)}
                        </ListItemAvatar>
                        <ListItemText
                          primary={<b>{skillgroup.name}</b>}
                          secondary={skillgroup.description}
                          primaryTypographyProps={{ variant: "caption" }}
                          secondaryTypographyProps={{ variant: "caption" }}
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

SkillgroupsList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SkillgroupsList);
