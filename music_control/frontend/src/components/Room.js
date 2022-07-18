import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import ViewRoomPage from "./ViewRoomPage";

export default function Room({ leaveRoomCallback }) {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState("2");
  const [isHost, setIsHost] = useState(false);
  const [noRoom, setNoRoom] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const getRoomDetails = fetch("/api/get-room" + "?code=" + roomCode)
    .then((response) => {
      if (!response.ok) {
        leaveRoomCallback();
        setNoRoom(true);
      }
      return response.json();
    })
    .then((data) => {
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
      if (isHost) {
        authenticateSpotify();
      }
    });

  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status)
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((response) => {
      leaveRoomCallback();
      setNoRoom("true");
    });
  }

  if (noRoom) {
    return <Navigate to="/" />;
  } else {
    if (showSettings) {
      return (
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <ViewRoomPage
              update={true}
              votesToSkip={votesToSkip}
              guestCanPause={guestCanPause}
              roomCode={roomCode}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setShowSettings(false);
              }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      );
    } else {
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
            <Typography variant="h4" component="h4">
              Code: {roomCode.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4">
              Votes required to skip: {votesToSkip.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4">
              Guest can Pause: {guestCanPause.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4">
              Host: {isHost.toString()}
            </Typography>
          </Grid>
          {isHost && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowSettings(true)}
              >
                Settings
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      );
    }
  }
}
