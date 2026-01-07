export type Messages =
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


export function sendMessage(ws: WebSocket, message: Messages) {
    ws.send(JSON.stringify(message));
}