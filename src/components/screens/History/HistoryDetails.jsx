import React, { Component } from "react";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import loadMyHistoryDetails from "../../../functions/user/tenant/loadMyHistoryDetails";
import _ from "lodash";
import { Grid, Typography } from "@material-ui/core";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = theme => ({
  content: {},
  grid: {},
  fullgrid: {},
  card: {},
  cardContent: {},
  gridContent: {}
});

class HistoryDetails extends Component {
  state = {
    loading: true,
    error: false,
    columns: [
      { title: "Type", field: "type" },
      { title: "Direction", field: "direction" },
      { title: "Customer", field: "customer" },
      { title: "Skillgroup", field: "skillgroup" },
      { title: "Stage", field: "stage" },
      { title: "From address", field: "fromAddress" },
      { title: "To address", field: "toAddress" },
      { title: "ANI", field: "ani" },
      { title: "DNIS", field: "dnis" },
      { title: "Dial number", field: "dialNumber" },
      // { title: "Agent", field: "agent" },
      { title: "Sub type", field: "subType" },
      { title: "Timestamp", field: "creationDate" },
      { title: "Last modified", field: "lastModifiedDate" } //lastModifiedDate
    ],
    data: [],
    orgData: []
  };
  // {
  //   type: "Facebook",
  //   ani: "+201011222666",
  //   dnis: "5000",
  //   dialNumber: "1001",
  //   workflowId: "def",
  //   agentId: "Mamdouh Aref",
  //   customerId: "Haitham Ali",
  //   subType: "Comment",
  //   Stage: "Queue"
  // }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadHistoryDetails();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.range !== prevProps.range ||
      this.props.app.tenant !== prevProps.app.tenant
    )
      this.loadHistoryDetails();
  }
  loadHistoryDetails = () => {
    loadMyHistoryDetails(this, this.props.range)
      .then(historyData => {
        let data = [];
        historyData.forEach(historyRow => {
          let record = _.pick(historyRow, [
            "direction",
            "stage",
            "schedule",
            "creationDate",
            "lastModifiedDate",
            "ani",
            "dnis",
            "dialNumber",
            "fromAddress",
            "toAddress"
          ]);
          record["type"] = historyRow.type.channel;
          record["skillgroup"] = historyRow.skillgroup.name;
          record["agent"] =
            historyRow.agent.firstname + " " + historyRow.agent.lastname;
          record["agent"] =
            historyRow.agent.firstname + " " + historyRow.agent.lastname;
          record["customer"] =
            historyRow.customer.firstname + " " + historyRow.customer.lastname;
          data.push(record);
        });
        this.setState({
          data,
          loading: false,
          error: false,
          orgData: historyData
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ loading: false, error: true });
      });
  };

  render() {
    if (this.state.error) {
      return (
        <Grid container direction="row">
          <Typography variant="h6">Error loading summary ...</Typography>
        </Grid>
      );
    } else
      return (
        <MaterialTable
          title="Interactions log"
          icons={tableIcons}
          columns={this.state.columns}
          data={this.state.data}
          isLoading={this.state.loading}
          style={{
            whiteSpace: "nowrap"
          }}
          // editable={{
          //   onRowAdd: newData =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         const data = [...this.state.data];
          //         data.push(newData);
          //         this.setState({ ...this.state, data });
          //       }, 600);
          //     }),
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         const data = [...this.state.data];
          //         data[data.indexOf(oldData)] = newData;
          //         this.setState({ ...this.state, data });
          //       }, 600);
          //     }),
          //   onRowDelete: oldData =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         resolve();
          //         const data = [...this.state.data];
          //         data.splice(data.indexOf(oldData), 1);
          //         this.setState({ ...this.state, data });
          //       }, 600);
          //     })
          // }}
        />
      );
  }
}

HistoryDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  range: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(HistoryDetails);
