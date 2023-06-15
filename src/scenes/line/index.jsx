import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const IncomeHistory = ({collapsedSB, purchases}) => {
  //=======================================================
  var style={marginLeft: '290px' }

  if (collapsedSB){style = {marginLeft: '100px'}} 
  //=======================================================
  return (
    <Box m="20px" style={style}>
      <Header title="Income History" subtitle="Earnings For The Last 7 Days" />
      <Box height="75vh">
        <LineChart purchases={purchases}/>
      </Box>
    </Box>
  );
};

export default IncomeHistory;
