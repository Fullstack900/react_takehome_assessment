import React, { useState, useCallback, useEffect } from "react";
import Swal from "sweetalert2";

import MaterialTable from "./components/MaterialTable";
import CreateNewAccountModal from "./components/CreateNewAccountModal";
import FilterComponent from "./components/FilterComponent";
import Header from "./components/Header";
import { Box, CircularProgress } from "@mui/material";
import TableColumns from "./components/TableColumns";
import SuccessAlert from "./components/ResponseAlert";
import { useFilters } from "./context";
import { deleteUser, getUsers, saveUser, updateUser } from "./utils/api";

const App = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getUsers();
      setTableData(res?.data?.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateNewRow = async (values) => {
    let res = await saveUser(values);
    if (res?.data) {
      setTableData((prevData) => [...prevData, res?.data?.users]);
      SuccessAlert("Success", "User saved successfully.", "success", 1500);
    }
  };

  const handleUpdateNewRow = async (values) => {
    let res = await updateUser(values);

    if (res?.data) {
      const updatedTableData = [...tableData];

      const index = updatedTableData.findIndex(
        (user) => user.userId === values.userId
      );

      if (index !== -1) {
        updatedTableData[index] = values;
      }

      setTableData(updatedTableData);

      SuccessAlert("Success", "User updated successfully.", "success", 1500);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      await handleUpdateNewRow(values);
      tableData[row.index] = values;
      setTableData([...tableData]);
      SuccessAlert("Success", "Updated successfully.", "success", 1500);
      exitEditingMode();
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete ${row.getValue("firstName")}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        let res = await deleteUser(row?.original?.userId);
        if (res?.data?.status) {
          const updatedData = tableData.filter(
            (user) => user.userId !== row?.original?.userId
          );
          setTableData(updatedData);
          SuccessAlert("Success", "Deleted successfully.", "success", 1500);
        }
      }
    },
    [tableData]
  );
  const columns = TableColumns(validationErrors);

  const { filters, setFilters } = useFilters();

  const fetchFilteredData = async () => {
    setIsLoading(true);
    try {
      const queryString = Object.entries(filters)
        .filter(([, val]) => Boolean(val))
        .map(([key, val]) => `${key}=${val}`)
        .join("&");

      const res = await getUsers(queryString);
      setTableData(res?.data?.users);
    } catch (error) {
      console.error("Failed to fetch filtered users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const res = await getUsers();
      setTableData(res?.data?.users);
    } catch (error) {
      console.error("Failed to fetch users during reset:", error);
    } finally {
      setIsLoading(false);
    }
    setFilters({
      email: "",
      phoneNumber: "",
    });
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Header />
      <Box mt={5}>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <FilterComponent
              filters={filters}
              handleFilterChange={handleFilterChange}
              fetchFilteredData={fetchFilteredData}
              setCreateModalOpen={setCreateModalOpen}
              handleReset={handleReset}
            />
            <MaterialTable
              columns={columns}
              tableData={tableData}
              handleSaveRowEdits={handleSaveRowEdits}
              handleCancelRowEdits={handleCancelRowEdits}
              handleDeleteRow={handleDeleteRow}
              handleUpdateNewRow={handleUpdateNewRow}
              setCreateModalOpen={setCreateModalOpen}
            />
            <CreateNewAccountModal
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default App;
