import { useCallback } from "react";
import {
  validateAge,
  validateEmail,
  validateRequired,
} from "../../utils/validation";

const TableColumns = (validationErrors) => {
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);

          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({ ...validationErrors });
          }
        },
      };
    },
    [validationErrors]
  );

  return [
    {
      accessorKey: "userId",
      header: "User Id",
      enableColumnOrdering: false,
      enableEditing: false,
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      size: 140,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      size: 140,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
    },
    {
      accessorKey: "email",
      header: "Email",
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
        type: "email",
      }),
    },
    {
      accessorKey: "status",
      header: "Status",
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
    },
    {
      accessorKey: "dob",
      header: "DOB",
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
    },
    {
      accessorKey: "address",
      header: "Address",
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      size: 120,
      muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
        type: "number",
      }),
    },
  ];
};

export default TableColumns;
