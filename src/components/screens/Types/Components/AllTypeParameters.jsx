import React, { Component, forwardRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  ExpandMore,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import MaterialTable from "material-table";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {},
  list: {},
  listOrganizations: {},
  listUsers: {},
});
const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox fontSize="small" {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check fontSize="small" {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear fontSize="small" {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline fontSize="small" {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight fontSize="small" {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit fontSize="small" {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => (
    <SaveAlt fontSize="small" {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => (
    <FilterList fontSize="small" {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage fontSize="small" {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage fontSize="small" {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight fontSize="small" {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft fontSize="small" {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear fontSize="small" {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref) => (
    <Search fontSize="small" {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowUpward fontSize="small" {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove fontSize="small" {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumn fontSize="small" {...props} ref={ref} />
  )),
};
class AllTypeParameters extends Component {
  state = {
    columns: [
      { title: "Name", field: "name" },
      { title: "Label", field: "label", type: "string" },
      {
        title: "Type",
        field: "type",
        lookup: {
          textfield: "TextField",
          textarea: "TextArea",
          select: "Select",
          date: "Date",
          time: "Time",
          check: "Check",
          log: "Log",
        },
      },
      {
        title: "Width",
        field: "width",
        lookup: {
          3: "25%",
          4: "33%",
          6: "50%",
          12: "100%",
        },
      },
      { title: "Default", field: "default" },
      { title: "Must", field: "must", type: "boolean" },
      { title: "Show", field: "show", type: "boolean" },
      { title: "Values", field: "values" },
      {
        title: "Lookup",
        field: "lookup",
        lookup: {
          empty: "",
          users: "Users",
          customers: "Customers",
          interactions: "Interactions",
        },
      },
      { title: "Edit", field: "edit", type: "boolean" },
    ],
  };
  render() {
    const { theme, source } = this.props;
    let { selectedType } = source.sourceState;
    let { params } = selectedType.configuration
      ? selectedType.configuration
      : [];
    return (
      <Accordion
        style={{ width: "100%", boxShadow: "none`" }}
        defaultExpanded={false}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ boxShadow: "none`" }}
        >
          <Typography variant="caption">
            <b>Parameters configuration</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{ boxShadow: "none`", padding: theme.spacing(0) }}
        >
          <Grid container direction="column">
            {/* //style={{ width: "100%", maxWidth: "100%" }}> */}
            <MaterialTable
              columns={this.state.columns}
              icons={tableIcons}
              data={params}
              title={
                <Typography variant="caption">
                  {/* <b>Parameters</b> */}
                </Typography>
              }
              style={{
                boxShadow: "none",
                width: "100%",
                maxWidth: "100%",
                overflow: "auto",
              }}
              options={{
                headerStyle: {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  fontSize: "0.8rem",
                  padding: "dense",
                },
                rowStyle: {
                  //backgroundColor: '#EEE',
                  fontSize: "0.8rem",
                  //padding: theme.spacing(1),
                },
                cellStyle: {
                  fontSize: "0.8rem",
                },
                searchFieldStyle: {
                  fontSize: "0.8rem",
                },
                padding: "dense",
              }}
              editable={
                source.sourceState.canSave
                  ? {
                      isEditable: (rowData) => rowData.edit, // === "a", // only name(a) rows would be editable
                      isEditHidden: (rowData) => !rowData.edit, // === "x",
                      isDeletable: (rowData) => rowData.edit, // === "b", // only name(b) rows would be deletable,
                      isDeleteHidden: (rowData) => !rowData.edit,
                      //   !source.sourceState.canSave, // === "y",
                      // onBulkUpdate: (changes) =>
                      //   new Promise((resolve, reject) => {
                      //     setTimeout(() => {
                      //       /* setData([...data, newData]); */

                      //       resolve();
                      //     }, 1000);
                      //   }),
                      onRowAddCancelled: (rowData) =>
                        console.log("Row adding cancelled"),
                      onRowUpdateCancelled: (rowData) =>
                        console.log("Row editing cancelled"),
                      onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            let data = [...params];
                            newData.edit = true;
                            data.push(newData);
                            if (!selectedType.configuration)
                              selectedType.configuration = {
                                kpis: {},
                                params: [],
                              };

                            selectedType.configuration.params = data; // We do not need to recopy array
                            source.updateSelectedType(selectedType);
                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const data = [...params];
                            const index = oldData.tableData.id;
                            newData.edit = true;
                            data[index] = newData;
                            if (!selectedType.configuration)
                              selectedType.configuration = {
                                kpis: {},
                                params: [],
                              };

                            selectedType.configuration.params = [...data];
                            source.updateSelectedType(selectedType);
                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const data = [...params];
                            const index = oldData.tableData.id;
                            data.splice(index, 1);
                            if (!selectedType.configuration)
                              selectedType.configuration = {
                                kpis: {},
                                params: [],
                              };
                            selectedType.configuration.params = [...data];
                            source.updateSelectedType(selectedType);
                            resolve();
                          }, 1000);
                        }),
                    }
                  : {}
              }
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

AllTypeParameters.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AllTypeParameters);
