import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";


const Sales = ({collapsedSB, purchases, search}) => {
  //=======================================================
  var style={marginLeft: '290px' }

  if (collapsedSB){style = {marginLeft: '100px'}} 

  var filtredPurchases = purchases?.filter((e)=>e.username.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || (e.phone).toString().toLowerCase().includes(search.toLowerCase()) || e.product_name.toLowerCase().includes(search.toLowerCase()) || e.date.toLowerCase().includes(search.toLowerCase()) || (e.cost).toString().includes((search).toString()))
   filtredPurchases.reverse()
  //=======================================================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "number_of_items",
      headerName: "Number Of Items",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "cost",
      headerName: "Cost",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost*params.row.number_of_items}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Operation Date",
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <Box m="20px" style={style}>
      <Header
        title="SALES HISORY"
        subtitle="List Of Purchases Made"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filtredPurchases}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Sales;
