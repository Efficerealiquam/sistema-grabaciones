"use client";

import React, { useState,useRef, useEffect } from "react";
import "@styles/SelectBox.css";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated();

const SelectBox = ({ data,setValues,values,type,disable }) => {
 
  const [isFocus, setIsFocus] = useState(false)
  const [valueData, setValueData] = useState([])
/*   const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10; */
  const selectRef = useRef(null);
  const handleFocus = () => {
    setIsFocus(true);
  };

  const arr = (v) => {
    const convValue = v.map((s)=> type === 1 ? s.ruc : s.value);
    if (type === 1) {
    setValues({...values,clients:convValue})
    setValueData(v)
    }
    else if(type === 2) {
      setValues({...values,orden:convValue})
      setValueData(v)
    }
  }
  

  useEffect(() => {
   if (disable === true) {
    setValueData([])
   }
  }, [disable])
  
  
  const handleBlur = () => {
    setIsFocus(false);
    if (selectRef.current) {
      let e = selectRef.current.controlRef;
      e.scrollTop=e.scrollHeight;
      setTimeout(function(){
        e.scrollTop = 0;
      }, 100);
    }
  };


/*   const handleMenuScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight) {
      // El usuario ha llegado al final del desplazamiento
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }; */
/*   
  const visibleOptions = data && data.slice(0, currentPage * pageSize); */
  

  return (
    <div className="custom-select-wrapper" style={{paddingTop:"2px", maxHeight:"38px !important"}}  >
      <Select
      ref={selectRef}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={data}
        className={`custom-select-mult ${isFocus ? '' : 'Nofocused'}`}
        onFocus={handleFocus}
        value={valueData}
        onBlur={handleBlur}
        onChange={(v)=> arr(v)}
        isDisabled={type===2 ? disable:false}
  /*       onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        pageSize={pageSize}
        menuIsOpen={menuIsOpen}
        onMenuScrollToBottom={handleMenuScroll} */
      />
    </div>
  );
};

export default SelectBox;
