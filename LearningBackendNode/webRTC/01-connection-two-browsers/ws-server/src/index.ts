import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000, host: "0.0.0.0" });

type Messages =
  | {
      type: "sender";
    }
  | {
      type: "receiver";
    }
  | {
      type: "createOffer";
      target: string;
      sdp: RTCSessionDescriptionInit;
    }
  | {
      type: "createAnswer";
      target: string;
      sdp: RTCSessionDescriptionInit;
    }
  | {
      type: "iceCandidate";
      target: string;
      candidate: RTCIceCandidate;
    }
  | {
      type: "receiverId";
      id: string;
    };

function sendMessage(ws: WebSocket | undefined | null, msg: Messages) {
  if (!ws) return;
  ws.send(JSON.stringify(msg));
}

const receivers = new Map<string, WebSocket>();

let senderSocket: null | WebSocket = null;

wss.on("connection", function connection(ws) {
  console.log('Connection received.');
  
  // handle error
  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log(data.toString());
    
    const message: Messages = JSON.parse(data.toString());

    // sender websocket
    if (message.type === "sender") {
      senderSocket = ws;
    }

    // receiver websocket
    if (message.type === "receiver") {
      // create new random id
      const rcvrId = crypto.randomUUID();
      receivers.set(rcvrId, ws);

      // send to receiver and sender
      sendMessage(senderSocket, { type: "receiverId", id: rcvrId });
      sendMessage(ws, { type: 'receiverId', id: rcvrId });
    }

    // sender sends an offer
    if (message.type === "createOffer") {
      if (ws !== senderSocket) {
        return;
      }

      // send the offer to the target receiver
      sendMessage(receivers.get(message.target), message);
    }

    // receiver receives the offer and creates an answer send it to the sender and establish the connection
    if (message.type === "createAnswer") {
      sendMessage(senderSocket, message);
    }

    // add the icecandidate for receiver and sender
    if (message.type === "iceCandidate") {
      if (ws === senderSocket) {
        sendMessage(receivers.get(message.target), message);
      } else {
        sendMessage(senderSocket, message);
      }
    }
  });

  // cleanup
  ws.on("close", () => {
    receivers.forEach((v, k) => {
      if (v === ws) receivers.delete(k);
    });
  });
});
