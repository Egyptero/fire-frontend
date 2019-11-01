import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Chart from "react-google-charts";
import loadMyHistoryGraph from "../../../functions/user/tenant/loadMyHistoryGraph";
const styles = theme => ({
  content: {},
  grid: {},
  fullgrid: {},
  card: {},
  cardContent: {},
  gridContent: {}
});

class HistoryChart extends Component {
  state = {
    loading: true,
    error: false,
    data: []
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.loadHistoryGraph();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.range !== prevProps.range ||
      this.props.app.tenant !== prevProps.app.tenant
    )
      this.loadHistoryGraph();
  }

  loadHistoryGraph = () => {
    loadMyHistoryGraph(this, this.props.range)
      .then(graphData => {
        let data = [];
        graphData.forEach(graphElement => {
          if (data.length === 0) data.push(["Date", "Count"]);
          data.push([graphElement._id, graphElement.count]);
        });
        this.setState({ data, loading: false, error: false });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ loading: false, error: true });
      });
  };
  render() {
    console.log("Render history chart");
    if (this.state.error) {
      return (
        <Grid container alignItems="center">
          <Typography variant="h6">Error loading graph ...</Typography>
        </Grid>
      );
    } else
      return (
        <React.Fragment>
          {this.state.loading ? (
            <Typography variant="h6">Loading ...</Typography>
          ) : (
            <React.Fragment>
              {this.state.data.length > 1 ? (
                <Chart
                  chartType="ScatterChart"
                  data={this.state.data}
                  options={
                    // Chart options
                    {
                      title: "Interactions history",
                      hAxis: {
                        title: "Timestamp"
                      },
                      vAxis: { title: "Count" },
                      legend: "none",
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "transparent"
                    }
                  }
                  legendToggle
                />
              ) : (
                "No Data"
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      );
  }
}

HistoryChart.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  range: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(HistoryChart);
