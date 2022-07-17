import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Room(props) {
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState("2");
  const [isHost, setIsHost] = useState(false);
  const { roomCode } = useParams();

  const getRoomDetails = fetch("/api/get-room" + "?code=" + roomCode)
    .then((response) => response.json())
    .then((data) => {
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
    });

  return (
    <div>
      <h3>{roomCode.toString()}</h3>
      <p>Guest can pause: {guestCanPause.toString()}</p>
      <p>Votes to Skip: {votesToSkip.toString()}</p>
      <p>Host: {isHost.toString()}</p>
    </div>
  );
}
