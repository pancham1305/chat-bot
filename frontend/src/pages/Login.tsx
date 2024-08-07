import { Box, Typography, Button } from '@mui/material'
import { IoIosLogIn } from "react-icons/io";
import React, { useEffect } from 'react'
import "../../public/airobot.png"
import CustomizedInput from '../components/shared/CustomizedInput'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    // console.log(email, password);
    try {
      toast.loading('Logging in...', {id:"1ogin"});
      await auth?.login(email, password);
      toast.success('Logged in successfully', {id:"1ogin"});
      
    } catch (error) {
      console.log(error);
      toast.error('Login failed', {id:"1ogin"});
}
  }
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
   }, [auth]);
  return (
    <Box width={'100%'} height={'100%'} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{width:"400px"}} />
      </Box>
      <Box display={"flex"} flex={{ xs: 1, md: 0.5 }} justifyContent={'center'} alignItems={"center"} padding={2} ml={'auto'} mt={16}>
        <form onSubmit={handleSubmit} style={{ margin: 'auto', padding: "30px", boxShadow: "10px 10px 20px #000", borderRadius: '10px', border: "none" }}>
          <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>Login</Typography>
            <CustomizedInput type="email" name="email" label='Email'/>
            <CustomizedInput type="password" name="password" label='Password' />
            <Button type='submit' sx={{px:2, py:1, mt:2, width:"428px", borderRadius:2, bgcolor:"#00fffc", ":hover":{bgcolor:"white", color:"black"}}} endIcon={<IoIosLogIn />}>Login </Button>
          </Box>
        </form>
      </Box>
   </Box>
  )
}

export default Login