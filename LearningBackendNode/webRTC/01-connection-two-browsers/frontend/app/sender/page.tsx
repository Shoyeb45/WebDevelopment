"use client";
import { useEffect, useRef, useState } from "react";
import { Messages, sendMessage } from "../lib/types";

export default function Page() {
  const videoref = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const pcsRef = useRef<Map<string, RTCPeerConnection>>(
    new Map<string, RTCPeerConnection>()
  );

  const addDebug = (msg: string) => {
    console.log(msg);
    setDebugInfo((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${msg}`,
    ]);
  };

  // function to create only one media stream
  async function getMediaStream() {
    if (!localStreamRef.current) {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoref.current) {
        videoref.current.srcObject = localStreamRef.current;
      }
    }

    return localStreamRef.current;
  }

  // function which will create peer connection per receiver 
  async function createPc(ws: WebSocket, receiverId: string) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // send the video to the receiver 
    await getCameraStreamAndSend(pc);

    // send the ice candidate to the websocket which will send it to the receiver 
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDebug("Sending ICE candidate from sender");
        sendMessage(ws, {
          type: "iceCandidate",
          candidate: event.candidate,
          target: receiverId,
        });
      }
    };

    pc.oniceconnectionstatechange = () => {
      addDebug(`Sender ICE state: ${pc.iceConnectionState}`);
    };

    pc.onconnectionstatechange = () => {
      addDebug(`Sender connection state: ${pc.connectionState}`);
    };

    return pc;
  }

  

  const getCameraStreamAndSend = async (pc: RTCPeerConnection) => {
    try {
      addDebug("Requesting camera access...");
      const stream = await getMediaStream();
      addDebug("Camera access granted");

      // attach camera to video element
      if (videoref.current) {
        videoref.current.srcObject = stream;
      }

      // add the tracks
      stream.getTracks().forEach((track) => {
        addDebug(`Adding track: ${track.kind}, id: ${track.id}`);
        pc.addTrack(track, stream);
      });
    } catch (error) {
      addDebug(`Error accessing camera: ${error}`);
    }
  };

  useEffect(() => {
    // connecto to our websocket(Singalling server)
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000"
    );
    const pcs = new Map<string, RTCPeerConnection>();
    pcsRef.current = pcs;

    ws.onopen = () => {
      addDebug("Sender WebSocket connected");
      sendMessage(ws, { type: "sender" });
    };

    ws.onmessage = async (event) => {
      const message: Messages = JSON.parse(event.data);
      addDebug(`Sender received: ${message.type}`);

      // we received receiver, so create new pc and add that to our map
      if (message.type === "receiverId") {
        const rcvrId = message.id;
        addDebug(`New receiver connected: ${rcvrId}`);
        
        const pc = await createPc(ws, rcvrId);

        // creating an offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // send the offer to the server it will send to the target receiver
        addDebug(`Sending offer to receiver ${rcvrId}`);
        sendMessage(ws, {
          type: "createOffer",
          target: rcvrId,
          sdp: offer,
        });
        pcs.set(rcvrId, pc);
      }

      if (message.type === "createAnswer") {
        addDebug(`Received answer from ${message.target}`);
        
        const pc = pcsRef.current.get(message.target);
        if (pc) {
          // establish the connection
          addDebug(`Found peer connection for ${message.target}`);
          await pc.setRemoteDescription(message.sdp);
          addDebug(`✅ Remote description set for ${message.target}`);
        } else {
          addDebug(`❌ No peer connection found for ${message.target}`);
          addDebug(`Available connections: ${Array.from(pcsRef.current.keys()).join(", ")}`);
        }
      }

      if (message.type === "iceCandidate") {
        const pc = pcsRef.current.get(message.target);
        // adding icecandidate
        if (pc) {
          await pc.addIceCandidate(message.candidate);
        } else {
          addDebug(`❌ No peer connection for ICE candidate: ${message.target}`);
        }
      }
    };

    return () => {
      pcs.forEach((pc) => pc.close());
      ws.close();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sender Page</h2>
      <div>
        <video
          ref={videoref}
          autoPlay
          playsInline
          muted
          style={{ width: "100%", maxWidth: "600px", border: "1px solid black" }}
        />
      </div>

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
        <h3>Sender Debug Log:</h3>
        {debugInfo.map((info, i) => (
          <div key={i}>{info}</div>
        ))}
      </div>
    </div>
  );
}