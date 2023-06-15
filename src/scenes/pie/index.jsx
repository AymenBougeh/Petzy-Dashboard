import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const TopSellingProducts = ({collapsedSB , purchases}) => {
    //=======================================================
    var style={marginLeft: '290px' }

    if (collapsedSB){style = {marginLeft: '100px'}} 
    //=======================================================
  return (
    <Box m="20px" style={style}>
      <Header title="Top Selling Products" subtitle="Top of the Charts: Best-Selling Products" />
      <Box height="75vh">
        <PieChart purchases={purchases}/>
      </Box>
    </Box>
  );
};

export default TopSellingProducts;
