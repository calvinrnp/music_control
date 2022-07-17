import React, { useState } from "react";
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Typography,
  TextField,
  Button,
  ButtonGroup,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

const defaultVotes = "3";

export default function ViewRoomPage(props) {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const navigate = useNavigate();

  function handleGuestCanPauseChange(e) {
    setGuestCanPause(e.target.value === "true" ? true : false);
  }

  function handleVotesChange(e) {
    setVotesToSkip(e.target.value);
  }

  function handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code, { replace: true }));
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: props.update ? "0" : "100vh" }}
    >
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          Create a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormHelperText>Guest Control of Playback State</FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <TextField
            required
            type="number"
            defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            onChange={handleVotesChange}
          />
          <FormHelperText>Votes Required to Skip</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
