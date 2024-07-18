// import React from 'react'
import { Toolbar,AppBar } from '@mui/material'
import Logo  from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'
const Header = () => {
    const auth = useAuth();
    return <AppBar sx={{
        bgcolor: "transparent", position: "static", boxShadow
            : "none",
    }}>
        <Toolbar sx={{ display: "flex" }}>
            <Logo />
            <div>
                {auth?.isLogged ? <>
                    <NavigationLink bg="#00fffc" to='/chat' text="go to chat" textColor='black' />
                    <NavigationLink bg="#51538f" textColor='white' to="Logout" text="logout" onClick={auth.logout}/>
                    </> : 
                    <>
                        <NavigationLink bg="#00fffc" to='/login' text="login" textColor='black'/>
                        <NavigationLink bg="#51538f" textColor='white' to="signup" text="signup"/>
                </>}
            </div>
        </Toolbar>
        </AppBar>
}

export default Header