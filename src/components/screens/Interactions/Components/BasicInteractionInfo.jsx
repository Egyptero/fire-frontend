import React, { Component } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import loadCustomer from "../../../../functions/tenant/customer/loadCustomer";
import loadType from "../../../../functions/tenant/type/loadType";
import RenderInteractionParams from "../../../common/interaction/RenderInteractionParams";
import RenderInteractionType from "../../../common/interaction/RenderInteractionType";
import RenderInteractionCustomer from "../../../common/interaction/RenderInteractionCustomer";
import RenderInteractionObject from "../../../common/interaction/RenderInteractionObject";
import { ExpandMore } from "@material-ui/icons";

const styles = (theme) => ({
  content: {},
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden",
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "83vh",
    maxHeight: "83vh",
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%",
  },
  details: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "83vh",
    //maxHeight: "83vh",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke", //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {},
  list: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "18em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  listOrganizations: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "6.2em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  listUsers: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "14.7em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});

class BasicCustomerInfo extends Component {
  state = {};
  componentDidMount() {}
  onDataChange = (event) => {
    const { source } = this.props;
    let { selectedInteraction } = source.sourceState;
    // if (event.target.name === "title")
    //   selectedInteraction.attached.title = event.target.value;
    // if (event.target.name === "description")
    //   selectedInteraction.attached.description = event.target.value;
    // if (event.target.name === "due")
    //   selectedInteraction.attached.due = event.target.value;

    const types = this.props.app.types.filter(
      (type) => type._id === selectedInteraction.typeId
    );
    if (!types || types.length < 1) return <React.Fragment />;
    let { params } = selectedInteraction.attached;
    types[0].configuration.params.forEach((param) => {
      if (param.name === event.target.name) {
        //We need to update one of the params
        params[param.name] = event.target.value;
      }
    });
    //this.setState({ params });
    selectedInteraction.attached.params = { ...params };

    source.updateSelectedInteraction(selectedInteraction);
  };

  renderTypeData = () => {
    const { source, app } = this.props;
    if (app && app.types) {
      //
      const types = _.filter(
        app.types,
        (type) => type._id === source.sourceState.selectedInteraction.typeId
      );

      if (types.length > 0)
        return (
          <TextField
            name="type"
            label="Type"
            placeholder="Type"
            disabled
            value={`${types[0].name}`}
            fullWidth
            variant="outlined"
            inputProps={{ style: { fontSize: "0.8rem" } }}
            InputLabelProps={{ style: { fontSize: "0.8rem" } }}
          />
        );
      else return <React.Fragment />;
    }
  };
  renderCustomerData = () => {
    const { source, app } = this.props;
    if (app && app.customers) {
      //
      const customers = _.filter(
        app.customers,
        (customer) =>
          customer._id === source.sourceState.selectedInteraction.customerId
      );

      if (customers.length > 0)
        return (
          <TextField
            name="customer"
            label="Customer"
            placeholder="Customer"
            disabled
            value={`${customers[0].firstname} ${customers[0].lastname}`}
            fullWidth
            variant="outlined"
            inputProps={{ style: { fontSize: "0.8rem" } }}
            InputLabelProps={{ style: { fontSize: "0.8rem" } }}
          />
        );
      else return <React.Fragment />;
    }
  };
  render() {
    const { classes, source, theme } = this.props;
    if (!source.sourceState.selectedInteraction) return <React.Fragment />;
    const params = {
      ...source.sourceState.selectedInteraction.attached.params,
    };
    return (
      <Grid container style={{ padding: theme.spacing(1) }}>
        {/* Type Id , Customer Id*/}
        <Grid item xs={6} sm={6} md={8} lg={8}>
          <Grid container spacing={1}>
            <RenderInteractionParams
              {...this.props}
              type={
                this.props.app.types.filter(
                  (type) =>
                    type._id === source.sourceState.selectedInteraction.typeId
                )[0]
              }
              handleDataChange={this.onDataChange}
              canSave={source.sourceState.canSave}
              params={params}
            />
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <Grid
            container
            direction="column"
            style={{ padding: theme.spacing(1) }}
          >
            {/* Customer details */}
            <Accordion style={{ width: "100%" }} defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="caption">
                  <b>Customer data</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RenderInteractionCustomer
                  {...this.props}
                  customerId={source.sourceState.selectedInteraction.customerId}
                />
              </AccordionDetails>
            </Accordion>
            {/* Interaction details */}
            <Accordion style={{ width: "100%" }} defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="caption">
                  <b>All data</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RenderInteractionObject
                  {...this.props}
                  interaction={source.sourceState.selectedInteraction}
                />
              </AccordionDetails>
            </Accordion>
            {/* Type details */}
            <Accordion style={{ width: "100%" }} defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="caption">
                  <b>Type data</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RenderInteractionType
                  {...this.props}
                  typeId={source.sourceState.selectedInteraction.typeId}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

BasicCustomerInfo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BasicCustomerInfo);
