import React, { forwardRef, useEffect, useRef } from 'react'
import {useRowSelect, useTable} from 'react-table'

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

const Table_sec = ({ columns, data }) => {
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
                    <div key={row.index} >
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
                <tr key={headerGroups.id} {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map((column) => (
                        <th
                            key={column.id}
                            {...column.getHeaderProps()}
                            style={{
                                position: "sticky",
                                top: "-0.8px",
                                zIndex: 1,
                            }}
                        >
                            <div
                                style={{
                                    background: "#fcf8ff",
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
        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr key={row.id} {...row.getRowProps()}>
                        {row.cells.map((cell, j) => {
                            return (
                                <td key={cell.column.id} {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    </table>
)
}
export default Table_sec