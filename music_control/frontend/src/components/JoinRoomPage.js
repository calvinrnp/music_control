import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function JoinRoomPage(props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleJoinRoomButton() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`, { replace: true });
        } else {
          setError("Room Not Found.");
        }
      })
      .catch((error) => console.log(error));
  }

  function handleTextFieldChange(e) {
    setRoomCode(e.target.value);
  }

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
        <Typography component="h4" variant="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid
        container
        item
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={handleJoinRoomButton}
          >
            Join Room
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
