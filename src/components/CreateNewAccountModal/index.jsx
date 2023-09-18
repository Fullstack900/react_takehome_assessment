import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import SuccessAlert from "../ResponseAlert";
import BasicDatePicker from "../BasicDatePicker";

const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    onSubmit(values);
    onClose();

    <SuccessAlert
      title="Success"
      text="Saved successfully."
      icon="success"
      timer="1500"
    />;
  };

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ marginBottom: "10px" }} textAlign="center">
        Create New Account
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => {
              if (column.accessorKey === "dob") {
                return (
                  <BasicDatePicker
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    inputFormat="yyyy-MM-dd"
                    value={values[column.accessorKey]}
                    onChange={(newValue) =>
                      setValues({
                        ...values,
                        [column.accessorKey]: newValue.format("YYYY-MM-DD"),
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                );
              } else {
                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              }
            })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewAccountModal;
