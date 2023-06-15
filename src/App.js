import { useState, useEffect } from "react";
import axios from "axios"
import { Routes, Route } from "react-router-dom";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/team";
import Workers from "./scenes/team/workers";
import SalesQuantity from "./scenes/bar";
import AddProduct from "./scenes/form";
import IncomeHistory from "./scenes/line";
import TopSellingProducts from "./scenes/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Products from "./scenes/shop/Products";
import UpdateProduct from "./scenes/form/UpdateProduct";
import Sales from "./scenes/sales";
import Login from "./scenes/login/login"

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
//=================================================== Users data ==============================================================
  const [collapsedSB, setCollapsedSB] = useState(false);
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [render, setRender] = useState(false);
  const [prodDetails, setProdDetails] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loggedin,setLoggedin] = useState(false);
  const [search,setSearch] = useState("");
  useEffect(()=>{
    axios.get("http://localhost:3000/user/getAll").then(({data})=> setUsers(data.reverse())).then(() =>axios.get("http://localhost:3000/worker/getAll")).then(({data})=> setWorkers(data.reverse())).catch((err)=>console.log(err))
},[]);
//=================================================== purchases data ==============================================================
  useEffect(()=>{
  axios.get("http://localhost:3000/purchases/getAll").then(({data})=> setPurchases(data)).catch((err)=>console.log(err))
},[]);
// console.log(search,"search")
//=================================================== Users data ==============================================================
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!loggedin && <Login setLoggedin={setLoggedin}/>}
        {loggedin && <>
        <div className="app">
          <Sidebar isSidebar={isSidebar} setCollapsedSB={setCollapsedSB} setSearch={setSearch}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} collapsedSB={collapsedSB} setSearch={setSearch} workers={workers} setLoggedin={setLoggedin}/>
            <Routes>
              <Route path="/" element={<Dashboard users={users} workers={workers} collapsedSB={collapsedSB} purchases={purchases}/>} />
              <Route path="/users" element={<Users users={users} collapsedSB={collapsedSB} search={search} setUsers={setUsers}/>} />
              <Route path="/workers" element={<Workers collapsedSB={collapsedSB} setRender={setRender} render={render} workers={workers} setWorkers={setWorkers} search={search}/>} />
              <Route path="/Sales" element={<Sales collapsedSB={collapsedSB} purchases={purchases} search={search}/>} />
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              <Route path="/addProduct" element={<AddProduct collapsedSB={collapsedSB} setRender={setRender} render={render}/>} />
              <Route path="/salesQuantity" element={<SalesQuantity collapsedSB={collapsedSB} purchases={purchases}/>} />
              <Route path="/TopSellingProducts" element={<TopSellingProducts collapsedSB={collapsedSB} purchases={purchases}/>} />
              <Route path="/incomeHistory" element={<IncomeHistory collapsedSB={collapsedSB} purchases={purchases}/>} />
              <Route path="/products" element={<Products collapsedSB={collapsedSB} setProdDetails={setProdDetails} search={search}/>} />




              <Route path="/updateProduct/:id" element={<UpdateProduct prodDetails={prodDetails} collapsedSB={collapsedSB} setRender={setRender} render={render}/>} />

            </Routes>
          </main>
        </div>
        </>}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
