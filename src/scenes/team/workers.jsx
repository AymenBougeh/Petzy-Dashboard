import { Box, Typography, useTheme ,Dialog, DialogContent} from "@mui/material";
import ReportIcon from '@mui/icons-material/Report';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import Header from "../../components/Header";
import { NordicWalkingOutlined, PetsOutlined, VerifiedUserOutlined, VolunteerActivismSharp } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useState } from "react";

const Workers = ({collapsedSB, workers, setWorkers, search}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedWorkerName, setSelectedWorkerName] = useState(null);
  const handleDeleteIconClick = (workerId,workerName) => {
    setSelectedWorkerId(workerId);
    setSelectedWorkerName(workerName)
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/worker/deleteWorker/${selectedWorkerId}`)
      .then((res) => {
        console.log(res);
        fetchWorkers();
      })
      .catch((err) => {
        console.log(err);
      });

    setPopupOpen(false);
    setSelectedWorkerId(null);
  };
  //==================================================================================================================

const fetchWorkers = () => {
  axios.get("http://localhost:3000/worker/getAll")
    .then(({ data }) => setWorkers(data.reverse()))
    .catch((err) => console.log(err));
};
//==============================================
  var style={marginLeft: '290px' }

  if (collapsedSB){style = {marginLeft: '100px'}} 
  var filtredWorkers = workers?.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.phone.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()) || e.status.toLowerCase().includes(search.toLowerCase()))
  //==================================================================================================================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    
    { field: "id", headerName: "ID" },
    { field: "years_of_experience", headerName: "Years Of Exp" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "license_number",
      headerName: "License Number",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="85%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"

          >
            {role === "Vet" && <VolunteerActivismSharp />}
            {role === "Dog Walking" && <NordicWalkingOutlined />}
            {role === "Pet Bording" && <PetsOutlined />}
            {!role && <VerifiedUserOutlined />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
              {!role && "user"}
            </Typography>
          </Box>
        );
      },
    },
    //========================================
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { role, id, status} }) => {
        return (
          <Box
            width="75%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "pending"
              ? colors.orange[100]
              : status === "blocked"
                ? colors.orange[200]
              : colors.greenAccent[700]
          }
            borderRadius="4px"
            sx={{
              cursor: "pointer",
            }}
            id={id}
          >
            {status === "confirmed" && <VerifiedUserOutlined onClick={()=>{axios.put(`http://localhost:3000/worker/updateWorker/${id}`,{status:"blocked"}).then((res)=>{console.log(res); fetchWorkers()}).catch((err)=>{console.log(err)})}}/>}

            {status === "blocked" && <BlockIcon onClick={()=>{axios.put(`http://localhost:3000/worker/updateWorker/${id}`,{status:"confirmed"}).then((res)=>{console.log(res); fetchWorkers()}).catch((err)=>{console.log(err)})}}/>}
            

            {status === "pending" && <PendingIcon onClick={()=>{axios.put(`http://localhost:3000/worker/updateWorker/${id}`,{status:"confirmed"}).then((res)=>{console.log(res); fetchWorkers()}).catch((err)=>{console.log(err)})}}/>}

            {status === "pending" &&<Typography color={colors.grey[100]} sx={{ ml: "5px" }} onClick={()=>{axios.put(`http://localhost:3000/worker/updateWorker/${id}`,{status:"confirmed"}).then((res)=>{console.log(res); fetchWorkers()}).catch((err)=>{console.log(err)})}}>
              pending
            </Typography>}

            {status === "confirmed" &&<Typography color={colors.grey[100]} sx={{ ml: "5px" }} onClick={()=>{axios.put(`http://localhost:3000/worker/updateWorker/${id}`,{status:"blocked"}).then((res)=>{console.log(res); fetchWorkers()}).catch((err)=>{console.log(err)})}}>
              verified
            </Typography>}

            {status === "blocked" &&<Typography color={colors.grey[100]} sx={{ ml: "5px" }} onClick={()=>{axios.put(`http://localhost:3000/worker/updateWorker/${id}`,{status:"confirmed"}).then((res)=>{console.log(res); fetchWorkers()}).catch((err)=>{console.log(err)})}}>
               blocked
            </Typography>}
          </Box>
        );
      },
    },
    //========================================
    {
      field: "Remove",
      headerName: "Remove",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { id, name } }) => {
        return (
          <Box
            width="75%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
               colors.greenAccent[700]
            }
            borderRadius="4px"
            sx={{
              cursor: "pointer",
            }}
            id={id}
            onClick={() => handleDeleteIconClick(id,name)}
          >
            <DeleteIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            </Typography>
          </Box>
        );
      },
    }
  ];

  return (
    <Box m="20px" style={style}>
      <Header title="WORKERS" subtitle="Managing the Team Members" />
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
        }}
      >
        <DataGrid checkboxSelection rows={filtredWorkers} columns={columns} />
      </Box>

      <Dialog open={popupOpen} onClose={handlePopupClose} >

  <DialogContent sx={{ width: "310px", justifyContent:"center"}}>
    <Typography variant="body1" color={colors.grey[100]} sx={{ ml: "5px", width: "250px", height: "45px" }}>
    <ReportIcon sx={{ ml: "46%" }}/>
            <Typography sx={{ ml: "4%" }}>
      {selectedWorkerName} will be removed permanently !
      </Typography>
    </Typography>

    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        m="0 auto"
        mt="8px"
        p="10px 20px"
        display="flex"
        justifyContent="center"
        backgroundColor={colors.greenAccent[700]}
        borderRadius="4px"
        sx={{
          cursor: "pointer",
          width: "80px",
          height: "40px",
        }}
        onClick={handleConfirmDelete}
      >
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          Delete
        </Typography>
      </Box>

      <Box
        m="10px auto"
        p="10px 20px"
        display="flex"
        justifyContent="center"
        backgroundColor={colors.greenAccent[700]}
        borderRadius="4px"
        sx={{
          cursor: "pointer",
          width: "80px",
          height: "40px",
        }}
        onClick={handlePopupClose}
      >
        <Typography color={colors.grey[100]} sx={{ ml: "5px"}}>
          Cancel
        </Typography>
      </Box>
    </Box>
  </DialogContent>
</Dialog>

    </Box>
  );
};

export default Workers;
