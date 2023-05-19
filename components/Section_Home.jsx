"use client";

import "@styles/Section_home.css";
import { metaDataGab, metaColums } from "@util/datPrueba";
import { useMemo, useState, useRef, forwardRef, useEffect } from "react";
import { useRowSelect, useTable } from "react-table";
import SelectBox from "./SelectBox";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import TableIni from "./Table_ini";

const Section_Home = () => {
  /* Variables */
  /* States */
  const [dataClients, setDataClients] = useState()
  const [dataOrdenByClient, setDataOrdenByClient] = useState([])
  const [disableSelect, setDisableSelect] = useState(true)
  const [dataTable, setDataTable] = useState([])
  const [initialValues, setInitialValues] = useState({
    clients: [],
    orden: [],
    fechIni: "",
    fechEnd: ""
  })
  /* End States */

  /* TODO:Consulta GET de los clientes para el SeelectBox cliente */
  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch("http://localhost:3001/cliente?limit=20");
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
      const response = await fetch("http://localhost:3001/data-horarios-emision?limit=50");
      const { data } = await response.json();
      if (data) setDataTable(data)

    };
    fetchDataTableInitial();

  }, [])

  const fecthDataTableFilter = async () => {
    let link = `http://localhost:3001/data-horarios-emision?limit=50`

    if (initialValues.clients.length === 1) {
      link = link +`&ruc=${initialValues.clients[0]}`;
    }
    if (condition) {
      
    }
    console.log(link)

  }

  const dataT =  dataTable || []; //Data de la tabla
  const columns = useMemo(() => metaColums, []); //Cabezera de la Tabla
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
        const response = await fetch(`http://localhost:3001/cliente-orden/${initialValues.clients[0]}`);
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


  //console.log(initialValues.clients[0])
  return (
    <div className="section_content relative flex flex-col w-full ">
      <div className="content-top-filter" >
        <form className="relative w-full background-blank p-2 border-radius-5px flex justify-between items-center z-10">
          <div className="relative flex justify-start items-center ">
            <span className="text-label-filter">Cliente: </span>
            <div
              className="relative"
              style={{ height: "42px", width: "250px" }}
            >
              <SelectBox data={dataClients} setValues={setInitialValues} values={initialValues} type={1} />
            </div>
          </div>
          <div className=" relative flex justify-start items-center ">
            <span className="text-label-filter">Orden: </span>
            <div
              className="relative"
              style={{ height: "42px", width: "250px" }}
            >
              <SelectBox data={dataOrdenByClient} setValues={setInitialValues} values={initialValues} type={2} disable={disableSelect} />
            </div>
          </div>
          <div className=" relative flex justify-start items-center ">
            <span className="text-label-filter" >
              Fecha Inicial:
            </span>
            <DatePicker dateFormat="dd/MM/yyyy" selected={initialValues.fechIni === "" ? new Date() : initialValues.fechIni } onChange={(date) => setInitialValues({ ...initialValues, fechIni: date })} />
          </div>
          <div className=" relative flex justify-start items-center ">
            <span className="text-label-filter" >
              Fecha Final:
            </span>
            <DatePicker dateFormat="dd/MM/yyyy" selected={initialValues.fechEnd  === "" ? new Date() : initialValues.fechIni} onChange={(date) => setInitialValues({ ...initialValues, fechEnd: date })} />
          </div>
          <button
            type="button"
            className="btn-search"
            onClick={fecthDataTableFilter}
            disabled={initialValues.clients.length || initialValues.orden.length || initialValues.fechIni || initialValues.fechEnd ? false : true}
          >
            Buscar
          </button>
        </form>
      </div>
      <section className="w-full relative wrap-table b-blank container_table">
        {dataTable.length === 0 ?
          "Loading..." :
          <TableIni data={dataT} columns={columns} />}
        <button onClick={handleGetSelectedData}>
          Obtener Datos seleccionados
        </button>
      </section>
      <section>Section 2</section>
    </div>
  );
};

export default Section_Home;
