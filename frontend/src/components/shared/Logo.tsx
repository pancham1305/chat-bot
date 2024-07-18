// import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import '../../../public/google-gemini-icon.png'

const Logo = () => {
  return (
    <div style={{ display: "flex", marginRight: "auto", alignItems: "center", gap: "8px" }}>
      <Link to={"/"}>
        <img src="google-gemini-icon.png" alt="Gemini" width={'30px'} height={'30px'} className='image-inverted' />
        </Link>
        <Typography sx={{ display: { md: "block", sm: "none", xs: "none" }, mr: "auto", fontWeight: "800", textShadow: "2px 2px 20px #000" }}>
          <span style={{fontSize:"20px"}}>Aries</span> GPT
        </Typography>
    </div>
  )
}

export default Logo