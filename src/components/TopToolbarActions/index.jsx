import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TopToolbarActions = ({ setCreateModalOpen }) => (
  <Button
    sx={{
      padding: "15px 25px",
      borderRadius: "25px",
      backgroundColor: "grey",
      "&:hover": {
        backgroundColor: "darkgrey",
      },
      "&:focus": {
        outline: "none",
        boxShadow: "none",
      },
    }}
    color="primary"
    onClick={() => setCreateModalOpen(true)}
    variant="contained"
    startIcon={<AddIcon />}
  >
    Add New User
  </Button>
);

export default TopToolbarActions;
