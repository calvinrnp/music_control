import { Grid, Typography, ButtonGroup, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage({ room }) {

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography component="h3" variant="h3">
          Create a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
