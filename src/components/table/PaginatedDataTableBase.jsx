import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { IoMdArrowRoundDown } from "react-icons/io";

const sortIcon = <IoMdArrowRoundDown />;

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#edeff0",
      color: "#374151",
      fontWeight: "600",
      fontSize: "15px",
      borderTop: "1px solid #e5e7eb",
      "&:hover": {
        color: "#374151",
      },
    },
  },
  rows: {
    style: {
      borderBottom: "1px solid #e5e7eb",
      "&:hover": {
        backgroundColor: "#f5f6f7",
      },
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      color: "#374151",
    },
  },
};

const TableSkeleton = ({ rows = 10, cols = 4, cellLoaderWidth = "w-40" }) => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 border-b border-gray-200 py-3 px-4"
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`h-5 ${cellLoaderWidth} bg-gray-200 rounded`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

function PaginatedDataTableBase({
  fetchData,
  cellLoaderWidth,
  defaultSortColumn,
  defaultSortDirection,
  reloadTable,
  ...props
}) {
  const [data, setData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);

  const handlePageChange = (page) => {
    fetchData(
      page,
      perPage,
      sortColumn,
      sortDirection,
      setData,
      setTableLoading,
      setTotalRows
    );
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    fetchData(
      page,
      newPerPage,
      sortColumn,
      sortDirection,
      setData,
      setTableLoading,
      setTotalRows
    );
  };

  const handleSort = (column, sortDirection) => {
    const columnName = column?.sortColumn;
    setSortColumn(columnName);
    setSortDirection(sortDirection);
    fetchData(
      1,
      perPage,
      columnName,
      sortDirection,
      setData,
      setTableLoading,
      setTotalRows
    );
  };

  useEffect(() => {
    fetchData(
      1,
      perPage,
      sortColumn,
      sortDirection,
      setData,
      setTableLoading,
      setTotalRows
    );
  }, [reloadTable]);

  return (
    <div className="w-full">
      <DataTable
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        sortServer
        onSort={handleSort}
        sortIcon={sortIcon}
        progressPending={tableLoading}
        progressComponent={
          <TableSkeleton
            rows={10}
            cols={props.columns.length}
            cellLoaderWidth={cellLoaderWidth}
          />
        }
        customStyles={customStyles}
        data={data}
        {...props}
      />
    </div>
  );
}

export default PaginatedDataTableBase;
