import { Box, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import Sidebar from "../global/SideBar";
import Topbar from "../global/Topbar";
import Header from "../Header";
import LineChart from "../LineChart";
import Chart from 'chart.js';

const Dashboard = () => {
  const[uptime, setUptime] = React.useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  console.log(location.state);
  
  async function getDBs(){
      const res = await axios.get('http://localhost:5000/mysql/uptime');
      console.log(res.data);
      // get the data of up since

      const uptime = res.data.result[0];
      // get the second eement of uptime object
      console.log(Object.values(uptime));
      setUptime(Object.values(uptime));
  }

  useEffect(() => {
      getDBs();
  }, [])

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <div style={{width: "20%"}}>
        <Sidebar />
      </div>
      <div style={{width: "78%"}}>
        <Topbar />
        {/* <Box m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          </Box>
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
                    $59,342.32
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
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
              </Box>
            </Box>
        </Box> */}
        <div className="show__uptime">
          {
            uptime ? (
              <div>
                <h2>Uptime</h2>
                {
                  uptime?.map((item, index) => {
                    return <p key={index}>{item}</p>
                  })
                }
              </div>
            ) : (
              <div>
                <h2>Uptime</h2>
                <p>Fetching data...</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;