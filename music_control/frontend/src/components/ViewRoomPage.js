import React, { Component, useRef, useState } from "react";
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
  Collapse,
  Alert,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

export default function ViewRoomPage(props) {
  const defaultProps = {
    update: false,
    votesToSkip: 3,
    guestCanPause: true,
    roomCode: null,
  };
  const [guestCanPause, setGuestCanPause] = useState(
    defaultProps.guestCanPause
  );
  const [votesToSkip, setVotesToSkip] = useState(defaultProps.votesToSkip);
  const [updateResponse, setUpdateResponse] = useState("");
  const navigate = useNavigate();

  const votesRef = useRef();
  const guestRef = useRef();

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

  function handleUpdateButtonPressed(e) {
    setVotesToSkip(votesRef.current.value);
    guestRef.current.checked ? setGuestCanPause(true) : setGuestCanPause(false);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestRef.current.checked,
        votes_to_skip: votesRef.current.value,
        code: props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setUpdateResponse("success");
      } else {
        setUpdateResponse("error");
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
        <Collapse in={updateResponse != ""}>
          {
            (updateResponse == "success" ? (
              <Alert
                severity="success"
                onClose={() => {
                  setUpdateResponse("");
                }}
              >
                Room successfully updated.
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  setUpdateResponse("");
                }}
              >
                An Error occurred. Room was not updated.
              </Alert>
            ))
          }
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormHelperText
            sx={{
              textAlign: "center",
            }}
          >
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={props.guestCanPause}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" inputRef={guestRef} />}
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
            inputRef={votesRef}
          />
          <FormHelperText
            sx={{
              textAlign: "center",
            }}
          >
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
