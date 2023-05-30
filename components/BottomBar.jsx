"use client"
import "@styles/BottomBar.css";
import { useRef } from "react";
import { AiFillSetting } from 'react-icons/ai'

const BottomBar = () => {

    const menuTg = useRef(null)
    const handleClickT = () => {
        menuTg.current.classList.toggle('active');
    };

    return (
        <div onClick={handleClickT} className='bnavigation fixed ' >
            <div ref={menuTg} className="bmenuToggle"><AiFillSetting /></div>
            <div className="bmenu"></div>
        </div>
    )
}

export default BottomBar