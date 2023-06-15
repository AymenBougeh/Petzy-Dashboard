import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { PeopleOutlined, WorkHistory } from "@mui/icons-material";

const Dashboard = ({users, workers, collapsedSB, purchases}) => {
  //=======================================================
  var style={marginLeft: '290px' }

  if (collapsedSB){style = {marginLeft: '100px'}} 
  //=======================================================
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  var percentage ="+"+ Math.round(users.length*100/(users.length+workers.length)) +"%"
  var progress = users.length/(users.length+workers.length)
  //================ Today =============================
  const today = new Date().toISOString().slice(0, 10).replace('T', ' ');
  const todayPurchases = purchases.filter((e)=>e.date === today)

  const todaysIncome = todayPurchases.reduce((acc, e) => {return acc + e.cost * e.number_of_items}, 0);
  const todaysSales= todayPurchases.reduce((acc, e) => {return acc + e.number_of_items}, 0);
  //================ All ==================================
  const allIncome = purchases.reduce((acc, e) => {return acc + e.cost * e.number_of_items}, 0);
  const allSales= purchases.reduce((acc, e) => {return acc + e.number_of_items}, 0);

  //================ Recent Transactions ==================
  const recentTransactions = [...purchases].splice(purchases.length-7, purchases.length-1).reverse()

  //================ Weekly income  =======================

  let temp = purchases.map((e)=> {return {x: e.date, y: e.number_of_items*e.cost}})
  let incomeData = temp.reduce((result, { x, y }) => {
    const existingItem = result.find(item => item.x === x);
    if (existingItem) {
      existingItem.y += y;
    } else {
      result.push({ x, y });
    }
    return result;
  }, [])

  const weeklyIncomeData = [...incomeData].splice(incomeData.length-7, incomeData.length-1)
  const weeklyIncome = weeklyIncomeData.reduce((acc, e) => {return acc + e.y}, 0);
  //=============================================== lineData ======================================================
  return (
    <Box m="20px" style={style}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOME" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={users.length}
            subtitle="Users"
            progress={progress}
            increase={percentage}
            icon={<PeopleOutlined sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>}
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={workers.length}
            subtitle="Workers"
            progress={1-progress}
            increase={`+${Math.round((1-progress)*100)}%`}

            icon={<WorkHistory sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>}
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={todaysSales}
            subtitle="Sales Obtained Today"
            progress={todaysSales/allSales}
            increase={`+${Math.round((todaysSales/allSales)*100)}%`}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`$ ${todaysIncome}`}
            subtitle="Income Generated Today"
            progress={todaysIncome/allIncome}
            increase={`+${Math.round((todaysIncome/allIncome)*100)}%`}
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${weeklyIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
               
              </Typography>
            </Box>
            <Box>
                <CalendarMonthIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Last 7 Days
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} purchases={purchases}/>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {recentTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.product_name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.username}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost*transaction.number_of_items}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" sx={{color: colors.grey[100]}}>
          Lifetime Revenue
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" allIncome={allIncome} weeklyIncome = {weeklyIncome}/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              ${allIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} revenue generated
            </Typography>
            <Typography>Green: earnings for this week</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px", color: colors.grey[100]}}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} purchases={purchases}/>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px", color: colors.grey[100] }}
          
          >
            Top Selling Products
          </Typography>
          <Box height="200px">
            <PieChart isDashboard={true} purchases={purchases}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
