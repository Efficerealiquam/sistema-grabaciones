"use client";

import "@styles/Section_home.css";
import { metaDataGab, metaColums, dataAdvertisers } from "@util/datPrueba";
import { useMemo, useState, useRef, forwardRef, useEffect } from "react";
import { useRowSelect, useTable } from "react-table";
import SelectBox from "./SelectBox";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});
const Section_Home = () => {
  const data = useMemo(() => metaDataGab, []);
  const columns = useMemo(() => metaColums, []);
  const tableInstance = useTable({ columns, data }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = tableInstance;

  const handleGetSelectedData = () => {
    const selectedData = rows
      .filter((row) => selectedRowIds[row.id])
      .map((row) => row.original);
    console.log(selectedData);
  };

  return (
    <div className="section_content relative flex flex-col w-full ">
      <div className="content-top-filter" >
        <form className="relative w-full background-blank p-2 border-radius-5px flex justify-start items-center z-10">
          <div className="relative flex justify-start items-center ">
            <span className="text-label-filter">Advertiser: </span>
            <div
              className="relative"
              style={{ height: "42px", width: "250px" }}
            >
              <SelectBox data={dataAdvertisers} />
            </div>
          </div>
        </form>
      </div>
      <section className="w-full relative wrap-table b-blank container_table">
        <table
          className="table-main w-full"
          {...getTableProps()}
          style={{
            minWidth: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            {headerGroups.map((headerGroups, i) => (
              <tr key={i} {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column, j) => (
                  <th
                    key={j}
                    {...column.getHeaderProps()}
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        background: "#fcf8ff",
                        padding: "0.5rem",
                        borderBottom: "1px inset #000",
                      }}
                    >
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return (
                      <td key={j} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={handleGetSelectedData}>
          Obtener Datos seleccionados
        </button>
      </section>
      <section>Section 2</section>
    </div>
  );
};

export default Section_Home;
