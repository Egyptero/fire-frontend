import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
  Typography,
  Avatar
} from "@material-ui/core";
import { Group } from "@material-ui/icons";
import getAvatarData from "./getAvatarData";
const styles = theme => ({
  content: {},
  grid: {},
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
      //height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  cardContentLong: {
    position: "relative",
    overflow: "auto",
    height: "77.7vh",
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

class TeamReportCard extends Component {
  state = {
    data: [
      {
        channel: "facebook",
        handled: 20,
        avght: "00:02:10",
        sla: "98%"
      },
      {
        channel: "twitter",
        handled: 120,
        avght: "00:01:11",
        sla: "91%"
      },
      {
        channel: "whatsapp",
        handled: 80,
        avght: "00:03:13",
        sla: "96%"
      },
      {
        channel: "instagram",
        handled: 30,
        avght: "00:00:44",
        sla: "93%"
      },
      {
        channel: "project",
        handled: 25,
        avght: "02:10:00",
        sla: "94%"
      },
      {
        channel: "call",
        handled: 15,
        avght: "00:06:50",
        sla: "90%"
      },
      {
        channel: "email",
        handled: 5,
        avght: "00:20:05",
        sla: "99%"
      },
      {
        channel: "chat",
        handled: 1,
        avght: "00:09:22",
        sla: "99%"
      }
    ],
    statistics: [
      {
        label: "Login time",
        value: "07:50:22"
      },
      {
        label: "Ready time",
        value: "07:50:22"
      },
      {
        label: "Not ready time",
        value: "07:50:22"
      },
      {
        label: "Handling time",
        value: "07:50:22"
      },
      {
        label: "NPS",
        value: "8.2"
      },
      {
        label: "CSAT",
        value: "happy"
      },
      {
        label: "Customer sentiment",
        value: "happy"
      }
    ]
  };
  renderAvatar = channel => {
    const avatarData = getAvatarData(channel);
    if (avatarData) {
      const { theme } = this.props;
      return (
        <Avatar
          style={{
            background: avatarData.color,
            width: theme.spacing(3),
            height: theme.spacing(3)
          }}
        >
          <img
            src={avatarData.img}
            alt={channel}
            width={theme.spacing(2)}
            height={theme.spacing(2)}
          />
        </Avatar>
      );
    }
    return channel;
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          style={{ backgroundColor: theme.palette.secondary.main }}
          title={
            <Grid container alignContent="center" justify="center">
              <Group style={{ color: "white" }} />
            </Grid>
          }
        />
        <CardContent className={classes.cardContentLong}>
          <Grid container direction="column" spacing={1}>
            <Table size="small" style={{ marginBottom: theme.spacing(2) }}>
              <TableHead>
                <TableRow>
                  <TableCell>Ch</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>AvgHT</TableCell>
                  <TableCell>SLA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(dataRow => {
                  return (
                    <TableRow>
                      <TableCell>
                        {this.renderAvatar(dataRow.channel)}
                      </TableCell>
                      <TableCell>{dataRow.handled}</TableCell>
                      <TableCell>{dataRow.avght}</TableCell>
                      <TableCell>{dataRow.sla}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>220</TableCell>
                  <TableCell>01:03:12</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            {/** statistics data */}
            {this.state.statistics.map(statisticsRow => {
              return (
                <Grid
                  item
                  style={{ marginBottom: theme.spacing(1) * 0.2 }}
                  key={statisticsRow.label}
                >
                  <Grid
                    container
                    style={{
                      borderRadius: "2em",
                      background: "#F3F3F3"
                    }}
                    spacing={1}
                  >
                    <Grid item xs={9}>
                      <Typography
                        variant="body2"
                        color="inherit"
                        style={{ marginLeft: theme.spacing(1) }}
                      >
                        {statisticsRow.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="body2"
                        color="inherit"
                        align="right"
                        style={{ marginRight: theme.spacing(1) }}
                      >
                        {statisticsRow.value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

TeamReportCard.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TeamReportCard);
