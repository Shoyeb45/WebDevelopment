import { useEffect, useState } from "react"

type Chat = {
  isMe: boolean,
  message: string
}

export default function App() {
  const [ socket, setSocket ] = useState<WebSocket | null>(null);
  const [ messages, setMessages ] = useState<Chat[]>([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Server connected");
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      console.log("Message Received " + message);
      setMessages([...messages, { isMe: false, message: message.data}])
    }

    return () => {
      socket.close();
    }
  }, []);

  if (!socket) {
    return (
      <div>
        Connecting to the server....
      </div>
    )
  }
  return (
    <div>

      <ChatContainer messages={messages}/>

      <input type="text" onChange={(e) => setUserMessage(e.target.value)}/>
      <button  onClick={() => {
        setMessages((m) => [...m, {isMe: true, message: userMessage}])
        socket.send(userMessage);
      }}> Submit</button>
    </div>
  )
}

function ChatContainer({ messages }: {
  messages: Chat[]
}) {
  console.log(messages);
  
  return (
    <div>
      {messages?.map((m, idx) => <Message key={idx} message={m} />)}
    </div>
  )
}

function Message({ message } :{
  message: Chat
}) {
  return (
    <div>
      <div style={{

      }}>
        {message.message}
      </div>
    </div>
  )
}