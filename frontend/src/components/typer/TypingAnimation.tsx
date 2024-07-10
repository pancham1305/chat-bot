import React from 'react'
import {TypeAnimation} from 'react-type-animation'
const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Errors? Prepare for mockery.",
        1000, // wait 1s before replacing "Mice" with "Hamsters"
       "Typos? I'll mock your incompetence.",
        1000,
       "Mistakes? I'll ridicule you.",
        1000,
        "Keyboard woes? I'll mock you.",
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '50px',color:"white", display: 'inline-block' ,textShadow:"1px 1px 20px #000"}}
      repeat={Infinity}
    />
  )
}

export default TypingAnimation