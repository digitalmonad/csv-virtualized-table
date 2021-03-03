import { useBlockLayout, useTable } from "react-table";

import { FixedSizeList } from "react-window";
import React from "react";
import styled from "styled-components";

const scrollbarWidth = () => {
  const scrollDiv = document.createElement("div");
  scrollDiv.setAttribute(
    "style",
    "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export const ReactWindowTable = ({
  columns,
  data,
}: {
  columns: any;
  data: any;
}) => {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className='table-row'
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className='table-data'>
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  // Render the UI for your table
  return (
    <Root {...getTableProps()} className='table'>
      <div>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className='table-row'>
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className='table-head'>
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={400}
          itemCount={rows.length}
          itemSize={100}
          width={totalColumnsWidth + scrollBarSize}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </Root>
  );
};

const Root = styled.div`
  display: inline-block;
  border-spacing: 0;
  .table-row {
    :last-child {
      .table-data {
        border-bottom: 0;
      }
    }
  }

  .table-head,
  .table-data {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid #dbdbdb;
    border-right: 1px solid #dbdbdb;

    :last-child {
      border-right: 1px solid #dbdbdb;
    }
  }
`;
