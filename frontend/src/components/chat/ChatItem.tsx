import React from 'react'
import { Box, Avatar,Typography } from '@mui/material'
import '../../../public/google-gemini-icon.png'
import { useAuth } from '../../context/AuthContext'
import { Prism as SyntaxHighlighter, } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ExtractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}
function isCodeBlock(str: string) {
    if (str.includes("=" || str.includes(";") || str.includes("//") || str.includes("[") || str.includes("]") || str.includes("{") || str.includes("}") || str.includes("#")||str.includes("*")||str.includes("(")||str.includes(")"))) {
        return true;
    }
    return false;
}
const ChatItem = ({ role, parts }: { role: string, parts: string }) => {
    const messageBlocks = ExtractCodeFromString(parts); 

    console.log(messageBlocks);
    // -----------------------
    const auth = useAuth();
    return role === "model" ? <Box sx={{ display: 'flex', p: 2, bgcolor: '#004d5612', my: 2, gap: 2 }}>
        <Avatar sx={{ ml: '0' }}>
            <img src="google-gemini-icon.png" alt="gemini" className='image-inverted'width='30px' />
        </Avatar>
        <Box>
            {!messageBlocks && (
                <Typography fontSize={"20px"}>{parts}</Typography>
            )}
            {messageBlocks && messageBlocks.length && messageBlocks.map((block) => {
                if (isCodeBlock(block)) {
                    return <SyntaxHighlighter style={coldarkDark} language='javascript'>
                        {block}
                    </SyntaxHighlighter>
                }
                else {
                    return <Typography fontSize={"20px"}>{block}</Typography>
                }
            })}


            
        </Box>
    </Box> : <Box sx={{ display: 'flex', p: 2, bgcolor: '#004d56', gap: 2 }}>
        <Avatar sx={{ ml: '0', bgcolor:'black', color:'white' }}>
           {auth?.user?.name[0]}
        </Avatar>
        <Box><Typography fontSize={"20px"}>{parts}</Typography></Box>
    </Box> 
}

export default ChatItem