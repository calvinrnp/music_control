import React, { Component, useState } from "react";
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
  Collapse,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

export default function ViewRoomPage(props) {
  const defaultProps = {
    update: false,
    votesToSkip: 3,
    guestCanPause: true,
    roomCode: null,
    updateCallback: () => {},
  };
  const [guestCanPause, setGuestCanPause] = useState(
    defaultProps.guestCanPause
  );
  const [votesToSkip, setVotesToSkip] = useState(defaultProps.votesToSkip);
  const [updateMessage, setUpdateMessage] = useState("");
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

  function handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
        code: props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setUpdateMessage("Successfully updated room.");
      } else {
        setUpdateMessage("An Error occurred. Room was not updated.");
      }
    });
  }

  const title = props.update ? "Update Room" : "Create a Room";

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
        <Collapse in={updateMessage != ""}>{updateMessage}</Collapse>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormHelperText sx={{
            textAlign: "center",
            }}>
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={props.guestCanPause}
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
            defaultValue={props.votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            onChange={handleVotesChange}
          />
          <FormHelperText sx={{
            textAlign: "center",
            }}>
            Votes Required to Skip
          </FormHelperText>
        </FormControl>
      </Grid>
      <DisplayButtons
        update={props.update}
        handleRoomButtonPressed={handleRoomButtonPressed}
        handleUpdateButtonPressed={handleUpdateButtonPressed}
      />
    </Grid>
  );
}

function DisplayButtons(props) {
  if (props.update) {
    return (
      <Grid item xs={12}>
        <Button
          color="primary"
          variant="contained"
          onClick={props.handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  } else {
    return (
      <>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={props.handleRoomButtonPressed}
          >
            Create Room
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </>
    );
  }
}
