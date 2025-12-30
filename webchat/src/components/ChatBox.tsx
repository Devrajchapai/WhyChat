import { useEffect, useState } from "react";
import {io} from "socket.io-client"

function ChatBox(){
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([{}])
    const [userId, setUserId] = useState('')
    const socket = io("http://localhost:4000")


    useEffect(()=>{
        let storedUserId = sessionStorage.getItem("userId");
        if(!storedUserId){
            storedUserId = Math.random().toString(36).substring(7);
            sessionStorage.setItem("userId", storedUserId);
        }
        setUserId(storedUserId);

        socket.on("receiverMessage", (message)=>{
            setMessages((prevMessage)=>[...prevMessage, message]);
        })

        return () =>{
            socket.off("receiverMessage")
        }

    },[])
    const sendMessage = () =>{
        if(input.trim()){
            const message = {
                userId,
                text: input,
            };
            socket.emit("sendMesssage", message);
            setInput('')
        }
    }
    console.log(messages, "MESSAGES")
    
    return(
        <>
            <h1>Message Area</h1>
            <input
                type="text"
                value={input} 
                onChange={(event)=>setInput(event.target.value)}
                className="bg-amber-600"
            />

            <button onClick={sendMessage}> button</button>
            {messages.map((msg, index)=>(
                <li>{msg.text}</li>
            ))}
           <h2>Ends</h2> 
        </>
    )
}

export default ChatBox;
