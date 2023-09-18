import React from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import TopToolbarActions from "../TopToolbarActions";

const FilterComponent = ({
  filters,
  handleFilterChange,
  fetchFilteredData,
  setCreateModalOpen,
  handleReset,
}) => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        spacing={2}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <Grid item xs={2}>
          <TextField
            id="outlined-basic"
            value={filters.email}
            label="Email"
            onChange={(e) => handleFilterChange("email", e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="outlined-basic"
            value={filters.phoneNumber}
            label="Phone"
            onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{ height: "56px" }}
            onClick={fetchFilteredData}
            variant="outlined"
            fullWidth
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            color="secondary"
            sx={{ height: "56px" }}
            onClick={handleReset}
            variant="outlined"
            fullWidth
          >
            Reset
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <TopToolbarActions setCreateModalOpen={setCreateModalOpen} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FilterComponent;
