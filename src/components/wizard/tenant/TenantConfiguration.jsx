import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Grid, Avatar, Button, Typography } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

import styles from "../../../components/primaryapp/appStyles";
class TenantConfiguration extends Component {
  render() {
    const { theme, source } = this.props;
    return (
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={2}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            {/** Logo */}
            <Avatar
              src={
                source.sourceState.logo
                  ? URL.createObjectURL(source.sourceState.logo)
                  : "/imgs/nopic.jpg"
              }
              //sizes={"100%,100%"}
              style={{ width: "6em", height: "6em" }}
            />
            <Button
              component="label"
              style={{
                textTransform: "none",
                marginTop: theme.spacing(2)
              }}
            >
              {source.sourceState.logo ? "Change logo" : "Upload logo"}
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                name="logo"
                onChange={source.handleDataChange}
              />
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            {/** Name */}
            <Grid item xs={12}>
              <TextField
                name="name"
                value={source.sourceState.name}
                placeholder="Organization name"
                label="Name"
                onChange={source.handleDataChange}
                fullWidth
                required
              />
            </Grid>
            {/** Email */}
            <Grid item xs={12}>
              <TextField
                name="email"
                value={source.sourceState.email}
                placeholder="Business email"
                label="Email"
                onChange={source.handleDataChange}
                type="Email"
                fullWidth
                required
              />
            </Grid>
            {/** Website */}
            <Grid item xs={12}>
              <TextField
                name="website"
                value={source.sourceState.website}
                placeholder="Company Website"
                label="Website"
                onChange={source.handleDataChange}
                fullWidth
              />
            </Grid>
            {/** Legal name */}
            <Grid item xs={12}>
              <TextField
                name="legalname"
                value={source.sourceState.legalName}
                placeholder="Legal name"
                label="Legal name"
                onChange={source.handleDataChange}
                fullWidth
              />
            </Grid>
            {/** Mobile */}
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                name="mobile"
                value={source.sourceState.mobile}
                placeholder="Mobile number"
                label="Mobile"
                onChange={source.handleDataChange}
                type="Mobile"
                fullWidth
              />
            </Grid>
            {/** Phone */}
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                name="phone"
                value={source.sourceState.phone}
                placeholder="Phone number"
                label="Phone"
                onChange={source.handleDataChange}
                type="Phone"
                fullWidth
              />
            </Grid>
            {/** Fax */}
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                name="fax"
                value={source.sourceState.fax}
                placeholder="Fax number"
                label="Fax"
                onChange={source.handleDataChange}
                type="Phone"
                fullWidth
              />
            </Grid>
            {/** Tax ID */}
            <Grid item xs={12}>
              <TextField
                name="tax"
                value={source.sourceState.taxId}
                placeholder="Tax ID"
                label="Tax ID"
                onChange={source.handleDataChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <DropzoneArea
              showFileNames
              acceptedFiles={["image/*", ".pdf", ".doc", ".docx"]}
              filesLimit={3}
              onChange={source.handleTenantFiles}
              dropzoneText="Drag company offical documents here or click to upload"
            />
            <Typography variant="caption">
              To ensure organization verification, please attach Company CR, or
              Tax card, as well as Electricty or Water bills.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TenantConfiguration.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TenantConfiguration);
