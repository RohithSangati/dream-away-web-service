import { useContext, useState } from "react";
import PaginatedDataTableBase from "../../components/table/PaginatedDataTableBase";
import adminService from "../../services/adminService";
import logger from "../../utils/logger";
import { showToast } from "../../utils/toastUtil";
import { AuthContext } from "../../context/AuthContext";
import ConfirmationAlert from "../../components/common/ConfirmationAlert";
import { LoaderContext } from "../../context/LoaderContext";
import ViewProperty from "./ViewProperty";

const PropertyRequests = () => {
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [currentSelectedHotel, setCurrentSelectedHotel] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [isViewPropertyOpen, setIsViewPropertyOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoaderContext);

  const closeAlert = () => {
    setShowConfirmationAlert(false);
    setCurrentSelectedHotel(null);
    setIsApprove(false);
  };

  const approveOrRejectRequest = async () => {
    setShowConfirmationAlert(false);
    setIsLoading(true);
    try {
      const payload = {
        hotelId: currentSelectedHotel,
        approved: isApprove,
      };
      await adminService.approveOrRejectRequest(
        payload,
        closeAlert,
        setReloadTable,
        logout
      );
    } catch (err) {
      logger.error("Something went wrong while approving or rejecting :", err);
      showToast(false, "Something went wrong while approving or rejecting!");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      reorder: true,
    },
    {
      name: "Property Type",
      selector: (row) => row.propertyType,
      reorder: true,
    },
    {
      name: "Number of Rooms",
      selector: (row) => row.noOfRooms,
      reorder: true,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      reorder: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-1">
          <div
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-1.5 text-center cursor-pointer w-[61px] text-[13px] rounded"
            onClick={() => {
              setCurrentSelectedHotel(row.hotelId);
              setIsViewPropertyOpen(true);
            }}
          >
            View
          </div>
          <div
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-1.5 text-center cursor-pointer w-[61px] text-[13px] rounded"
            onClick={() => {
              setShowConfirmationAlert(true);
              setIsApprove(true);
              setCurrentSelectedHotel(row.hotelId);
            }}
          >
            Approve
          </div>
          <div
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-1.5 text-center cursor-pointer w-[61px] text-[13px] rounded"
            onClick={() => {
              setShowConfirmationAlert(true);
              setIsApprove(false);
              setCurrentSelectedHotel(row.hotelId);
            }}
          >
            Reject
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      minWidth: "220px",
    },
  ];

  const fetchData = async (
    page,
    perPage,
    sortColumn,
    sortDirection,
    setData,
    setTableLoading,
    setTotalRows
  ) => {
    setTableLoading(true);
    try {
      const payload = {
        page,
        perPage,
        sortColumn,
        sortDirection,
      };
      await adminService.getPendingPropertyRequests(
        payload,
        setData,
        setTotalRows,
        logout
      );
    } catch (err) {
      logger.error(
        "Something went wrong while fetching pending properties :",
        err
      );
      showToast(
        false,
        "Something went wrong while fetching pending properties"
      );
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <div className="mt-3 py-3 w-[900px] flex border border-gray-200 rounded-[10px]">
      <PaginatedDataTableBase
        title="Pending Property Requests"
        columns={columns}
        fetchData={fetchData}
        cellLoaderWidth={"w-40"}
        reloadTable={reloadTable}
      />
      {showConfirmationAlert && (
        <ConfirmationAlert
          header={"Are you sure?"}
          confirmationMessage={
            "This action cannot be reversed. Please confirm to proceed."
          }
          onClose={closeAlert}
          onConfirm={approveOrRejectRequest}
        />
      )}
      {isViewPropertyOpen && (
        <ViewProperty
          setIsViewPropertyOpen={setIsViewPropertyOpen}
          currentSelectedHotel={currentSelectedHotel}
          setCurrentSelectedHotel={setCurrentSelectedHotel}
        />
      )}
    </div>
  );
};

export default PropertyRequests;
