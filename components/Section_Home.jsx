"use client";

import "@styles/Section_home.css";
import {  metaColums } from "@util/datPrueba";
import { useMemo, useState, useEffect, useRef } from "react";
import SelectBox from "./SelectBox";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import TableIni from "./Table_ini";
import Select from 'react-select'
import { addMonths } from 'date-fns'
import { BsFillCalendarFill, BsFillCalendarXFill, BsFillCalendarCheckFill } from 'react-icons/bs'

import Loader from './Loader'

const Section_Home = () => {
  /* Variables */
  const optionShow = [
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '300', label: '300' }
  ]

  const optionRange = [
    { value: 1, label: 'Todo' },
    { value: 2, label: 'Fechas' }
  ]
  const todayDate = new Date();
  const maxDate = addMonths(todayDate, -3);
  /* States */
  const [dataClients, setDataClients] = useState()
  const [dataOrdenByClient, setDataOrdenByClient] = useState([])
  const [limit, setLimit] = useState(100)
  const [rango, setRango] = useState(1)
  const [offSetPage, setOffSetPage] = useState(0)
  const [total, setTotal] = useState()
  const [disableSelect, setDisableSelect] = useState(true)
  const [dataTable, setDataTable] = useState([])
  const [loadingT, setLoadingT] = useState(false)
  const [initialValues, setInitialValues] = useState({
    clients: [],
    orden: [],
    fechIni: "",
    fechEnd: ""
  })
  /*Ref states*/
  const contTableRef = useRef(null);

  /* TODO:Consulta GET de los clientes para el SeelectBox cliente */
  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch("http://api.grabaciones.crp.local/cliente");
      const { data } = await response.json();
      const transformData = data.map(obj => ({
        value: obj.c_advertiser,
        label: obj.c_advertiser,
        ruc: obj.c_ruc
      }));
      setDataClients(transformData);
    };
    fetchClientes();

  }, [])
  /* End  */


  /* TODO:Hidratacion de la tabla y configuracion  */
  //Hidratacion inicial 
  useEffect(() => {
    const fetchDataTableInitial = async () => {
      const response = await fetch(`http://api.grabaciones.crp.local/data-horarios-emision?limit=${limit}`);
      const { data, total } = await response.json();
      if (data) setDataTable(data); setTotal(total)

    };
    fetchDataTableInitial();

  }, [])
  const fecthDataTableFilter = async () => {
    setLoadingT(true);
    try {
      let link = `http://api.grabaciones.crp.local/data-horarios-emision?limit=${limit}`

      if (offSetPage > 0) {
        link = link + `&offset=${offSetPage}`;
      }
      if (initialValues.clients.length === 1) {
        link = link + `&ruc=${initialValues.clients[0]}`;
      }
      if (initialValues.orden.length) {
        const valuesString = '[' + initialValues.orden.map(value => `"${value}"`).join(',') + ']';
        link = link + `&orden_ids=${valuesString}`;
      }
      if (initialValues.fechIni !== "" && initialValues.fechIni instanceof Date && rango === 2) {
        if (initialValues.fechEnd === "") initialValues.fechEnd = new Date();
        const isoDateString = initialValues.fechIni.toISOString();
        const formattedDate = isoDateString.substring(0, 10).replace(/-/g, "-");
        link = link + `&fecha_inicio=${formattedDate}`;
      }
      if (initialValues.fechEnd !== "" && initialValues.fechEnd instanceof Date && rango === 2) {
        const isoDateString = initialValues.fechEnd.toISOString();
        const formattedDate = isoDateString.substring(0, 10).replace(/-/g, "-");
        link = link + `&fecha_fin=${formattedDate}`;
      }
      const response = await fetch(link);
      const { data, total } = await response.json();
      if (data) { setDataTable(data); setTotal(total) }
      else alert("No se encontro la data")

    } catch (error) {
      console.log("Error al cargar  los datos :", error)
    } finally {
      setLoadingT(false);
    }

  }
  const dataT = dataTable || []; //Data de la tabla
  const columns = useMemo(() => metaColums, []); //Cabezera de la Tabla
  const handelSelectRangeOnChange = (opt) => {
    setRango(opt.value)
    if (opt.value === 1) {
      setInitialValues({ ...initialValues, fechIni: "", fechEnd: "" })
    }
  }
  /* End */


  /*TODO: Metodo para selecionnar toda la data de las filas seleccionadas con el checkBox */
  const handleGetSelectedData = () => {
    /*  const selectedData = rows
       .filter((row) => selectedRowIds[row.id])
       .map((row) => row.original);
     console.log(selectedData); */
  };
  /* End-sec */


  /* TODO:Consulta de los ordenes , cuando un cliente es seleccionado se hidrata el selectBox, cuando se selecciona mas de 1 se limpia todo las ordenes 
  seleccionadas y se limpia el selecBox */
  useEffect(() => {
    if (initialValues.clients.length === 1) {
      const fetchOrdenByClient = async () => {
        const response = await fetch(`http://api.grabaciones.crp.local/cliente-orden/${initialValues.clients[0]}`);
        const { data } = await response.json();
        const transformData = data.map(obj => ({
          value: obj.c_orden,
          label: obj.c_orden,
          ruc: obj.c_ruc
        }));
        setDataOrdenByClient(transformData);
      };
      fetchOrdenByClient();
      setDisableSelect(false);
    }
    else if (initialValues.clients.length > 1 || initialValues.clients.length === 0) {
      setDataOrdenByClient([])
      setDisableSelect(true)
      setInitialValues({ ...initialValues, orden: [] })
    }

  }, [initialValues.clients.length])
  /* End */
  /* Limpia todo al nivel incial, cada ves q se cambia de cliente o aumentan clientes */
  useEffect(() => {
    setInitialValues({ ...initialValues, orden: [] })
    setOffSetPage(0)

  }, [initialValues.clients])

  useEffect(() => {
    fecthDataTableFilter();
  }, [offSetPage, limit])

  /* Funciones paginado */
  const handelSelectLimitOnChange = (opt) => {

    setLimit(parseInt(opt.value, 10))
  }
  const nextPage = () => {
    let v = offSetPage + parseInt(limit, 10);
    setOffSetPage(v)
    if (contTableRef.current) {
      contTableRef.current.scrollTop = 0;
    }
  }
  const prevPage = () => {
    let v = offSetPage - parseInt(limit, 10);
    if (v < 0) v = 0;
    setOffSetPage(v)
    if (contTableRef.current) {
      contTableRef.current.scrollTop = 0;
    }
  }
  /* End */
  //console.log(initialValues.fechIni,initialValues.fechEnd)
  return (
    <div className="section_content relative flex flex-col w-full ">
      <div className="content-top-filter" >
        <form className="relative w-full py-2 border-radius-5px flex justify-between items-end z-10">
          <div className="relative flex flex-col justify-start items-start ">
            <div
              className="relative"
              style={{ width: "250px" }}
            >
              <label htmlFor="selectInputClient" className="label-filter" >Cliente: </label>
              <SelectBox id="selectInputClient" data={dataClients} setValues={setInitialValues} values={initialValues} type={1} />
            </div>
          </div>
          <div className=" relative flex justify-start items-center ">
            <div
              className="relative"
              style={{ width: "250px" }}
            >
              <label htmlFor="selectInputOrden" className="label-filter" >Orden: </label>
              <SelectBox id="selectInputOrden" data={dataOrdenByClient} setValues={setInitialValues} values={initialValues} type={2} disable={disableSelect} />
            </div>
          </div>
          <div className=" relative flex justify-start items-center ">
            <div
              className="relative"
              style={{ width: "150px" }}
            >
              <label htmlFor="selectInputRango" className="label-filter" >Rango: </label>
              <Select id="selectInputRango" options={optionRange} defaultValue={optionRange[0]} onChange={handelSelectRangeOnChange} isSearchable={false} />

            </div>
          </div>
          <div className=" relative flex justify-start items-center ">
            <div className="icon-filter-cust" >
              {rango === 1 ? <BsFillCalendarFill /> : <div> {initialValues.fechIni === "" ? <BsFillCalendarXFill className="fade-icon-e" /> : <BsFillCalendarCheckFill />} </div>}
            </div>
            <DatePicker disabled={rango === 1 ? true : false} minDate={maxDate} dateFormat="dd/MM/yyyy" selected={initialValues.fechIni === "" ? "" : initialValues.fechIni} onChange={(date) => setInitialValues({ ...initialValues, fechIni: date })} />
          </div>
          <span style={{ marginBottom: "10px", fontWeight: "bold", letterSpacing: "-3px" }} >--</span>
          <div className=" relative flex justify-start items-center ">
            <div className="icon-filter-cust">
              {rango === 1 ? <BsFillCalendarFill /> : <div> {initialValues.fechEnd === "" ? <BsFillCalendarXFill className="fade-icon-e" /> : <BsFillCalendarCheckFill />} </div>}
            </div>
            <DatePicker disabled={rango === 1 ? true : false} minDate={initialValues.fechIni === "" ? maxDate : initialValues.fechIni} dateFormat="dd/MM/yyyy" selected={initialValues.fechEnd === "" ? "" : initialValues.fechEnd} onChange={(date) => setInitialValues({ ...initialValues, fechEnd: date })} />
          </div>
          <button
            type="button"
            className="btn-search"
            onClick={fecthDataTableFilter}
            style={{ "--clrb":"#40ae49" }}
            disabled={initialValues.clients.length || initialValues.orden.length || initialValues.fechIni || initialValues.fechEnd ? false : true}
          >
           <span> Buscar</span><i></i>
          </button>
        </form>
      </div>
      {dataTable.length === 0 ? <Loader/> :
        <>
          <section className="w-full relative wrap-table b-blank container_table" ref={contTableRef}>
            <TableIni data={dataT} columns={columns} loading={loadingT} />
            {/*  <button onClick={handleGetSelectedData}>
          Obtener Datos seleccionados
        </button> */}
          </section>
          <div className="content-nav-page">
            <div className="cont-left-page">
              <span>Mostrando {`${offSetPage === 0 ? "1" : offSetPage} - ${offSetPage + limit > total ? total : offSetPage + limit} de ${total}`} </span>
            </div>
            <div className="cont-right-page" >
              <span style={{ lineHeight: "37px", marginRight: "10px",color:"#40ae49",fontWeight:"500" }} >Mostrar:</span>
              <Select menuPlacement="auto" options={optionShow} defaultValue={optionShow[0]} onChange={handelSelectLimitOnChange} isSearchable={false} />
              <button
                onClick={() => prevPage()}
                disabled={offSetPage === 0 ? true : false}
                style={{color:"#40ae49"}}
                className="btn-page px-4 py-2 ml-5 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Anterior
              </button>
              <button
                onClick={nextPage}
                style={{color:"#40ae49"}}
                disabled={offSetPage + limit > total ? true : false}
                className="btn-page px-4 py-2 mr-5 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Siguiente
              </button>
            </div>
          </div>
        </>
      }

    </div>
  );
};

export default Section_Home;
