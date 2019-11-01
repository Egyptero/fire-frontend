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
  Avatar,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import getAvatarData from "./getAvatarData";
const styles = theme => ({
  content: {},
  grid: {},
  card: {},
  skillgroupsCard: {
    overflow: "auto",
    maxHeight: "85vh",
    minWidth: "100%",
    background: "transparent",
    boxShadow: "none",
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
  cardContentLong: {},
  summaryCellLght: {
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    borderRadius: "5px",
    background: "#E8E8E8" //theme.palette.secondary.light,
    //margin: theme.spacing(1)
  },
  summaryCellDrk: {
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    borderRadius: "5px",
    background: "#F8F8F8" //theme.palette.secondary.dark
    //margin: theme.spacing(1)
  },
  expansionSummaryText: {
    margin: theme.spacing(1) * 0
  }
});

class SkillgroupReportCard extends Component {
  state = {
    data: [
      {
        channel: "facebook",
        offered: 20,
        handled: 20,
        avght: "00:02:10",
        sla: "98%"
      },
      {
        channel: "twitter",
        offered: 120,
        handled: 120,
        avght: "00:01:11",
        sla: "91%"
      },
      {
        channel: "whatsapp",
        offered: 80,
        handled: 80,
        avght: "00:03:13",
        sla: "96%"
      },
      {
        channel: "instagram",
        offered: 80,
        handled: 30,
        avght: "00:00:44",
        sla: "93%"
      },
      {
        channel: "project",
        offered: 25,
        handled: 25,
        avght: "02:10:00",
        sla: "94%"
      },
      {
        channel: "call",
        offered: 25,
        handled: 15,
        avght: "00:06:50",
        sla: "90%"
      },
      {
        channel: "email",
        offered: 10,
        handled: 5,
        avght: "00:20:05",
        sla: "99%"
      },
      {
        channel: "chat",
        offered: 1,
        handled: 1,
        avght: "00:09:22",
        sla: "99%"
      }
    ],
    statistics: [
      {
        label: "Avg Login time",
        value: "07:50:22"
      },
      {
        label: "Avg Ready time",
        value: "07:50:22"
      },
      {
        label: "Avg Not ready time",
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
      <Card className={classes.skillgroupsCard}>
        <ExpansionPanel
          style={{
            border: "2px solid",
            borderColor: theme.palette.secondary.light,
            borderRadius: "5px",
            marginBottom: theme.spacing(1),
            padding: 0
          }}
        >
          {/**style={{ margin: 0, padding: 0 }} */}
          <ExpansionPanelSummary style={{ padding: theme.spacing(1) }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid
                  container
                  className={classes.summaryCellDrk}
                  direction="column"
                >
                  <Typography
                    variant="h6"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Skillgroup
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Arabic
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  className={classes.summaryCellLght}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Offered
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    100
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  className={classes.summaryCellLght}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Handle
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    76
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  className={classes.summaryCellLght}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Aban
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    10
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  className={classes.summaryCellDrk}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    AvgHT
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    00:03:09
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  className={classes.summaryCellDrk}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    ASA
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    00:00:23
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction="column" spacing={1}>
              <Table size="small" style={{ marginBottom: theme.spacing(2) }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Ch</TableCell>
                    <TableCell>O</TableCell>
                    <TableCell>H</TableCell>
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
                        <TableCell>{dataRow.offered}</TableCell>
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
                    <TableCell>292</TableCell>
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          style={{
            border: "2px solid",
            borderColor: theme.palette.secondary.light,
            borderRadius: "5px",
            marginBottom: theme.spacing(1),
            padding: 0
          }}
        >
          {/**style={{ margin: 0, padding: 0 }} */}
          <ExpansionPanelSummary style={{ padding: theme.spacing(1) }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid
                  container
                  className={classes.summaryCellDrk}
                  direction="column"
                >
                  <Typography
                    variant="h6"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Skillgroup
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    English
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  className={classes.summaryCellLght}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Offered
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    100
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  className={classes.summaryCellLght}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Handle
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    76
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  className={classes.summaryCellLght}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    Aban
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    10
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  className={classes.summaryCellDrk}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    AvgHT
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    00:03:09
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  className={classes.summaryCellDrk}
                  direction="column"
                >
                  <Typography
                    variant="subtitle2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    ASA
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    align="center"
                    className={classes.expansionSummaryText}
                  >
                    00:00:23
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction="column" spacing={1}>
              <Table size="small" style={{ marginBottom: theme.spacing(2) }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Ch</TableCell>
                    <TableCell>O</TableCell>
                    <TableCell>H</TableCell>
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
                        <TableCell>{dataRow.offered}</TableCell>
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
                    <TableCell>292</TableCell>
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  }
}

SkillgroupReportCard.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SkillgroupReportCard);
