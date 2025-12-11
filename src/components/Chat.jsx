import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const {targetUserId}=useParams();

    const [messages, setMessages]=useState([]);
    const [newMessage, setNewMessage]=useState("");
    const user=useSelector(state=>state.user);
    const userId=user?._id;

    const fetchChats=async()=>{
        try{
            const chat=await axios.get(BASE_URL+"/chat/"+targetUserId, {withCredentials:true});
            const chatMessages=chat?.data?.messages.map(msg=>{
                return {
                    firstName:msg?.senderId?.firstName,
                    text:msg.text
                }
            })
            setMessages(chatMessages);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchChats();
    }, [])

useEffect(()=>{
    if(!userId) return;
    const socket=createSocketConnection();
    socket.emit("joinChat", {firstName:user.firstName, userId, targetUserId});

    socket.on("messageRecieved", ({firstName, text})=>{
        setMessages(messages=>[...messages, {firstName, text}]);
        console.log(firstName+" : "+text);
        
    })

    return()=>{
        socket.disconnect();
    }
}, [userId, targetUserId]);

const sendMessage=()=>{
    const socket=createSocketConnection();
    socket.emit("sendMessage", {firstName:user.firstName, userId, targetUserId, text:newMessage});
    setNewMessage("");
}



  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
        <h1 className='p-5 border-b border-gray-600 '>Chat</h1>
        <div className='flex-1 overflow-scroll p-5'>
            {/* {display msg} */}
            {messages.map((msg, index)=>{
                return (<div key={index} className={"chat "+(user.firstName===msg.firstName?"chat-end":"chat-start")}>
  <div className="chat-header">
    {msg.firstName}
    <time className="text-xs opacity-50">2 hours ago</time>
  </div>
  <div className="chat-bubble">{msg.text}</div>
  <div className="chat-footer opacity-50">Seen</div>
</div>)
            })}
        </div>
        <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
            <input
            value={newMessage}
            onChange={(e)=>setNewMessage(e.target.value)}
            className='flex-1 border border-gray-500 p-2 text-white rounded'></input>
            <button
            onClick={sendMessage}
            className='p-6 btn btn-secondary'>Send</button>
        </div>
    </div>
  )
}

export default Chat