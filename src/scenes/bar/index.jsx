import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const SalesQuantity = ({collapsedSB, purchases}) => {
  //=======================================================
  var style={marginLeft: '290px' }

  if (collapsedSB){style = {marginLeft: '100px'}} 
  //=======================================================
  return (
    <Box m="20px" style={style}>
      <Header title="Sales Quantity" subtitle="Sales Quantity For The Top Sold Products  (Last 7 Days)" />
      <Box height="75vh">
        <BarChart purchases={purchases}/>
      </Box>
    </Box>
  );
};

export default SalesQuantity;
