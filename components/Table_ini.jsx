import React, { forwardRef, useEffect, useRef } from 'react'
import { useRowSelect, useTable } from 'react-table'
import LoaderT from './LoaderT';


/* TODO:Logica para crear una fila de checkBox que permita seleccionar al usuario */
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
/* End */


const Table_ini = ({ columns, data, loading }) => {
    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { selectedRowIds } } = useTable({ columns, data }, useRowSelect, (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div key="header" >
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div key={row.index} className='flex justify-center' >
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
        });


    /*   const handleGetSelectedData = () => {
          const selectedData = rows
              .filter((row) => selectedRowIds[row.id])
              .map((row) => row.original);
          console.log(selectedData);
      }; */
    return (
        <table
            className="table-main w-full"
            {...getTableProps()}
            style={{
                minWidth: "100%",
                borderCollapse: "collapse",
            }}
        >
            <thead>
                {headerGroups.map((headerGroups, i) => (
                    <tr key={i} {...headerGroups.getHeaderGroupProps()}>
                        {headerGroups.headers.map((column,i) => (
                            <th
                                key={i}
                                {...column.getHeaderProps()}
                                style={{
                                    position: "sticky",
                                    top: "-0.8px",
                                    zIndex: 1,
                                }}
                            >
                                <div
                                    style={{
                                        background: "#2f323f",
                                        color:"#40ae49",
                                        padding: "0.5rem",
                                        borderBottom: "1px inset #B0A8B9",
                                        borderTop: "1px inset #B0A8B9",
                                    }}
                                >
                                    {column.render("Header")}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            {loading ? <LoaderT/> : <tbody {...getTableBodyProps()}>
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

            }

        </table>
    )
}

export default Table_ini