"use client";

import { useEffect, useRef, useState } from "react";
import { Messages, sendMessage } from "../lib/types";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebug = (msg: string) => {
    console.log(msg);
    setDebugInfo((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${msg}`,
    ]);
  };

  const handlePlay = async () => {
    addDebug("🔵 Play button clicked");

    if (!videoRef.current) {
      addDebug("Video ref is null");
      return;
    }

    addDebug(`Video readyState: ${videoRef.current.readyState}`);

    if (!videoRef.current.srcObject) {
      addDebug("No srcObject attached");
      return;
    }

    const stream = videoRef.current.srcObject as MediaStream;
    addDebug(`Stream active: ${stream.active}`);
    addDebug(`Stream tracks: ${stream.getTracks().length}`);

    stream.getTracks().forEach((track) => {
      addDebug(
        `Track: ${track.kind}, enabled: ${track.enabled}, readyState: ${track.readyState}, muted: ${track.muted}`
      );
    });

    try {
      // Force load
      videoRef.current.load();
      addDebug("Called video.load()");

      await videoRef.current.play();
      addDebug("Video playing successfully!");
      setShowPlayButton(false);
    } catch (e: any) {
      addDebug(`Play failed: ${e.name} - ${e.message}`);
    }
  };

  useEffect(() => {
    // connect to the websocket server
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL ?? "");
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pcRef.current = pc;
    let rcvrId: string = "";

    // on receiving the video from the sender, attach it to the video
    pc.ontrack = (event) => {
      addDebug(`✅ Track received: ${event.track.kind}`);
      addDebug(`Track id: ${event.track.id}`);
      addDebug(`Track state: ${event.track.readyState}`);
      addDebug(`Track enabled: ${event.track.enabled}`);
      addDebug(`Track muted: ${event.track.muted}`);
      addDebug(`Streams: ${event.streams.length}`);

      if (videoRef.current && event.streams[0]) {
        const stream = event.streams[0];

        addDebug(`Stream id: ${stream.id}`);
        addDebug(`Stream active: ${stream.active}`);

        videoRef.current.srcObject = stream;
        addDebug("Stream attached to video element");

        // Add event listeners to the track
        event.track.onmute = () => addDebug("Track muted event");
        event.track.onunmute = () => addDebug("Track unmuted event");
        event.track.onended = () => addDebug("Track ended event");

        // Add event listeners to video element
        videoRef.current.onloadedmetadata = () => {
          addDebug(
            `Video metadata loaded, readyState: ${videoRef.current?.readyState}`
          );
        };

        videoRef.current.onloadeddata = () => {
          addDebug(
            `Video data loaded, readyState: ${videoRef.current?.readyState}`
          );
        };

        videoRef.current.oncanplay = () => {
          addDebug(
            `Video can play, readyState: ${videoRef.current?.readyState}`
          );
        };

        // Try autoplay
        setTimeout(() => {
          videoRef.current?.play().catch((e) => {
            addDebug(`Autoplay blocked: ${e.message}`);
            setShowPlayButton(true);
          });
        }, 100);
      }
    };

    pc.onicecandidate = (event) => {
      if (!event.candidate || !rcvrId) return;
      sendMessage(ws, {
        type: "iceCandidate",
        candidate: event.candidate,
        target: rcvrId,
      });
    };

    pc.oniceconnectionstatechange = () => {
      addDebug(`ICE state: ${pc.iceConnectionState}`);
    };

    pc.onconnectionstatechange = () => {
      addDebug(`Connection state: ${pc.connectionState}`);
    };

    ws.onopen = () => {
      addDebug("WebSocket connected");
      sendMessage(ws, { type: "receiver" });
    };

    ws.onmessage = async (event) => {
      const message: Messages = JSON.parse(event.data);
      addDebug(`Received: ${message.type}`);

      // this should run before createOffer, else receiver will not know it's id
      if (message.type === "receiverId") {
        rcvrId = message.id;
        addDebug(`📝 My receiver ID is: ${rcvrId}`);
      }

      if (message.type === "createOffer") {
        addDebug(`📝 About to send answer with target: ${rcvrId}`);
        await pc.setRemoteDescription(message.sdp);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        sendMessage(ws, {
          type: "createAnswer",
          sdp: answer,
          target: rcvrId,
        });
      } else if (message.type === "iceCandidate") {
        try {
          await pc.addIceCandidate(message.candidate);
        } catch (e: any) {
          addDebug(`ICE candidate error: ${e.message}`);
        }
      }
    };

    return () => {
      pc.close();
      ws.close();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Receiver Page</h1>

      {showPlayButton && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <button
            onClick={handlePlay}
            style={{
              padding: "20px 40px",
              fontSize: "24px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ▶️ CLICK TO PLAY VIDEO
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        muted
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#000",
          border: "2px solid #333",
        }}
      />

      {/* Debug Panel */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "5px",
          maxHeight: "400px",
          overflow: "auto",
          fontFamily: "monospace",
          fontSize: "12px",
        }}
      >
        <h3>Debug Log:</h3>
        {debugInfo.map((info, i) => (
          <div key={i}>{info}</div>
        ))}
      </div>
    </div>
  );
}
