"use client";
import "@styles/Sidebar.css";
import { useRef, useState } from "react";
import { TiDocumentText } from 'react-icons/ti'
import { SiMicrosoftexcel } from 'react-icons/si'
import { MdOutlineEmail } from 'react-icons/md'
import { FaRegFileAudio } from 'react-icons/fa'
import { BsInfoSquare } from 'react-icons/bs'

const Sidebar = () => {

  const sibardRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* useEffect(() => {
    let list = document.querySelectorAll(".list");
    const selectElement = () => {
      list.forEach((item)=>
      item.classList.remove("active"));
      this.classList.add("active")
      
    }
  
  }, []) */

  const menuOptions = [
    { text: "Documentacion", icon: <TiDocumentText />, color: "#0fc70f" },
    { text: "Descargar Excel", icon: <SiMicrosoftexcel />, color: "#0fc70f" },
    { text: "Mandar correo", icon: <MdOutlineEmail />, color: "#0fc70f" },
    { text: "Decargar Audio", icon: <FaRegFileAudio />, color: "#0fc70f" },
    { text: "Información", icon: <BsInfoSquare />, color: "#0fc70f" }
  ]
  
  const selectElement = (index) => {
    setActiveIndex(index);
  };

  const handleClick = () => {
    sibardRef.current.classList.toggle('active');
  };

  return (
    <div ref={sibardRef}  className="sidebar_content flex-center" >
      <div className="menuToggle" onClick={handleClick}></div>
      <ul>
        {
          menuOptions.map((item, index) => (
            <li
             key={index}
             className={`list ${activeIndex === index ? "active" : ""}`}
             onClick={()=>selectElement(index)}
             >
              <a href="#" style={{ "--clr":item.color }} className="flex" >
                <span className="icon">
                  {item.icon}
                </span>
                <span className="text">{item.text}</span>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar