import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import RowActions from "../RowActions";
import TopToolbarActions from "../TopToolbarActions";

const MaterialTable = ({
  columns,
  tableData,
  handleSaveRowEdits,
  handleCancelRowEdits,
  handleDeleteRow,
  handleUpdateNewRow,
}) => (
  <div>
    <MaterialReactTable
      columns={columns}
      enableTopToolbar={false}
      data={tableData}
      enableColumnActions={false}
      enableFullScreenToggle={true}
      editingMode="modal"
      enableColumnOrdering
      enableEditing
      onEditingRowSave={handleSaveRowEdits}
      onEditingRowCancel={handleCancelRowEdits}
      displayColumnDefOptions={{
        "mrt-row-actions": {
          muiTableHeadCellProps: { align: "center" },
          size: 0,
        },
      }}
      renderRowActions={(props) => (
        <RowActions
          {...props}
          handleDeleteRow={handleDeleteRow}
          handleUpdateNewRow={handleUpdateNewRow}
        />
      )}
      positionActionsColumn="last"
    />
  </div>
);

export default MaterialTable;
