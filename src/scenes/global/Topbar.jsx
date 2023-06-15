import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const Topbar = ({ collapsedSB, setSearch, workers, setLoggedin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()
  //==================================================================================
  var style = { marginLeft: '270px' }

  if (collapsedSB) { style = { marginLeft: '82px' } }

  var notification = workers?.filter((e) => e.status === "pending")

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorDis, setAnchorDis] = useState(null);

  const handleIconClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleDisClick = (event) => { setAnchorDis(event.currentTarget); };

  const handleClose = () => { setAnchorEl(null); };
  const handleDisClose = () => { setAnchorDis(null); };

  const open = Boolean(anchorEl);
  const Dis = Boolean(anchorDis);

  const popupId = open ? "simple-popover" : undefined;
  const popupDisId = Dis ? "disconnect-popover" : undefined;
  //==================================================================================
  return (
    <Box display="flex" justifyContent="space-between" p={2} style={style}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" onChange={(e) => setSearchText(e.target.value)} />
        <IconButton type="button" sx={{ p: 1 }} onClick={() => setSearch(searchText)}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleIconClick}>
          <Badge badgeContent={notification.length} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <Popover
          id={popupId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {notification.length === 1 && <Typography sx={{cursor: "pointer", p: 2 }} onClick={()=>{setSearch("pending");navigate("/workers")}}><b>{notification.length}</b> worker profile still pending review.</Typography>}
          {notification.length !== 1 && <Typography sx={{cursor: "pointer", p: 2 }} onClick={()=>{setSearch("pending");navigate("/workers")}}><b>{notification.length}</b> worker profiles still pending review.</Typography>}
        </Popover>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleDisClick}>
          <LogoutIcon />
        </IconButton>
        <Popover
          id={popupDisId}
          open={Dis}
          anchorEl={anchorDis}
          onClose={handleDisClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box
            width="93%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }} onClick={() => setLoggedin(false)}>
              Disconnect
            </Typography>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
