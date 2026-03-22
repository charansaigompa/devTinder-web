import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;

  const fetchChatMessages=async()=>{
    const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true})
    const chatMessages=chat?.data?.messages.map((msg)=>{
      const{senderId,text}=msg
      return{
        firstName:senderId?.firstName,
        lastName:senderId?.lastName,
        text,
      }
    })
    setMessages(chatMessages)
  }

  useEffect(()=>{
    fetchChatMessages()
  },[targetUserId])


  useEffect(() => {
    if (!userId || !targetUserId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived",({firstName,lastName,text})=>{
        console.log(firstName+":"+text)
        setMessages((messages)=>[...messages,{firstName,lastName,text}])

    })
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);


const sendMessage=()=>{
    const socket=createSocketConnection()
    socket.emit("sendMessage",{
        firstName:user.firstName,
        lastName:user.lastName,
        userId,
        targetUserId,
        text:newMessage
    })
    setNewMessage("")
}

  return (
    <div className="w-3/4 mx-auto border border-gray-600 h-[80vh] m-5 mb-20 flex flex-col rounded">
      <h1 className="p-5 border-b border-b-gray-600">Chat</h1>
      <div className="p-5 flex-1 overflow-scroll">
        {messages.map((msg, index) => {
          return (
            <div key={index} className={"chat "+(msg.firstName===user.firstName?"chat-end":"chat-start")}>
              <div className="chat-header mb-2">
                {`${msg?.firstName} ${msg?.lastName}`}
                
              </div>
              <div className="chat-bubble">{msg?.text}</div>
              
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-600 p-5 flex items-center gap-2">
        <input
          value={newMessage}
          type="text"
          className="p-2 border border-gray-500 flex-1 rounded"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage} className="btn btn-secondary">send</button>
      </div>
    </div>
  );
};

export default Chat;
