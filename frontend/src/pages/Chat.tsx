import { Box, Avatar, Typography, Button, IconButton } from '@mui/material'
import {red} from '@mui/material/colors'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useRef } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { getUserChats, sendChatRequest, deleteUserChats } from '../helpers/api-communicator'
import { toast } from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom'
type Message = {
  role: string;
  parts: string;
}
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [messages, setmessages] = useState<Message[]>([]);
  const auth = useAuth();
  
  
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: 'user', parts: content };
    setmessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    // @ts-ignore
    const TMessage = chatData.chats.map((chat) => {
      const x:string = chat.role;
      const y: string = chat.parts[0].text
      // console.log(x, y);
      return { role:x, parts:y };
    })
    // console.log(TMessage);  
    setmessages([...TMessage]);
  }

  const handleDeleteChats = async () => {
    try {
    toast.loading("Deleting Chats",{id:"deletechats"});
    await deleteUserChats();
      setmessages([]);
      toast.success("Chats Deleted",{id:"deletechats"});
  } catch (error) {
      console.log(error);
      toast.error("Failed to delete chats",{id:"deletechats"});
  }
}


  useLayoutEffect(() => {
    if (auth?.isLogged && auth.user) {
      toast.loading("Fetching Chat Data", { id: "loadchats" });
      getUserChats().then((data) => {
        // @ts-ignore
        const TMessage = data.chats.map((chat) => {
          const x:string = chat.role;
          const y: string = chat.parts[0].text
          // console.log(x, y);
          return { role:x, parts:y };
        })
        setmessages([...TMessage]);
        toast.success("Success",{id:"loadchats"});
      }).catch((err) => {
        console.log(err);
        toast.error("Failed to fetch chat data",{id:"loadchats"});
      })
    }
  }, [auth])

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  })
  return (
    <Box sx={{
      display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3
    }}>
      
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none", flex:0.2, flexDirection:'column' } }}>
        <Box sx={{ display: "flex", width: "100%", height: "60vh", "bgcolor": "rgb(17, 29, 39)", borderRadius: "5px", flexDirection: "column", mx: 3 }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: "work sans"}}>
            You are talking to ChatBOT
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: "work sans", my: 4, p:3}}>
            You can ask some questions related to knowledge, business, advices, Education, etc. But avoid sharing personal information.
          </Typography>
          <Button onClick={handleDeleteChats} sx={{width:'200px', my:'auto', color:'white', fontWeight:'700', borderRadius:3, mx:'auto', bgcolor:red[300],":hover":{bgcolor:red.A400}}}>Clear Conversation</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection:'column', px:3}}>
        <Typography sx={{ fontSize: '40px', color: "white", mb: 2, mx:'auto' }}>
          Model - Gemini 1.5 Flash
        </Typography>
        <Box sx={{ width: "100%", height: "60vh", borderRadius: 3, mx: 'auto', display: "flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden", scrollBehavior: 'smooth' }}>
          {messages.map((chat,index) => {
            const str = chat.parts;
            return <ChatItem parts={str} role={chat.role} key={index} />
          })}
        </Box>
        <div style={{ width: '100%', borderRadius: 8, backgroundColor: 'rgb(17,27,39)', display: 'flex', margin:'auto' }}>
          <input ref={inputRef} type="text" style={{ width: "100%", backgroundColor: 'transparent', padding: '30px', border: 'none', outline: 'none', color: 'white', fontSize: '20px' }} />
          <IconButton onClick={handleSubmit} sx={{ color: 'white', mx:1}}>
            <IoMdSend />
          </IconButton>
        </div>
        
      </Box>
      </Box>
  )
}

export default Chat