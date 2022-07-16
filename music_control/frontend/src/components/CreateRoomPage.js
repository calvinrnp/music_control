import React from "react";
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
  Paper,
  Box,
  styled,
} from "@mui/material";

import { Link } from "react-router-dom";

const defaultVotes = "2";

export default function CreateRoomPage(props) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue="true">
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
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required
            type="number"
            defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
          <FormHelperText>
            <div align="center">Votes Required to Skip</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained">Create Room</Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
      </Grid>
    </Grid>
  );
}
