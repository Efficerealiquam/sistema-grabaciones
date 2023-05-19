"use client";

import React, { useState,useRef, useEffect } from "react";
import "@styles/SelectBox.css";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated();

const SelectBox = ({ data,setValues,values,type,disable }) => {
 
  const [isFocus, setIsFocus] = useState(false)
  const [valueData, setValueData] = useState([])
  const selectRef = useRef(null);
  const handleFocus = () => {
    setIsFocus(true);
  };

  const arr = (v) => {
    const convValue = v.map((s)=> s.ruc);
  /*   if(type===2 && convValue.length){

    } */
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



  return (
    <div className="custom-select-wrapper" style={{paddingTop:"2px"}}  >
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
        
      />
    </div>
  );
};

export default SelectBox;
