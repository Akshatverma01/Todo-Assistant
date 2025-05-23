import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Grid, Button, Box, Paper } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import Summary from "./components/Summary.jsx";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


// TodoForm

function App() {
  const theme = useTheme();
  const [isSummary, setIsSummary] = React.useState(false);

  const handleChange = (newValue) => {
    if (newValue === "summary") setIsSummary(true);
    else setIsSummary(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <Container sx={{ maxWidth: "100%", p: 4, minHeight:"500px" }}>
        <Paper elevation={4} className="p-6 rounded-2xl  flex justify-center flex-col " >
          <Typography
            variant="h4"
            align="center"
            className="font-bold mb-6 text-indigo-600"
          >
            📝 To-Do Assistant
          </Typography>

          <Grid
            container
            spacing={4}
            sx={{
              display: { xs: "block", sm: "flex" ,md:"flex" },
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="p-5 rounded-xl bg-white" style={{height:"100%"}}>
                <TodoForm />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="p-5 rounded-xl bg-white w-100 h-100 overflow-y-scroll">
                <div className="flex justify-between items-center mb-4">
                  <Typography variant="h6" className="text-gray-700">
                    {isSummary ? "Summary" : "Todo List"}
                  </Typography>
                  <Button
                    variant="contained"
                    color={isSummary ? "secondary" : "primary"}
                    onClick={()=>handleChange(isSummary?"list":"summary")}
                    sx={{ borderRadius: "20px", textTransform: "none" }}
                  >
                    {isSummary ? "Show Todos" : "Generate Summary"}
                  </Button>
                </div>
                {isSummary ? <Summary /> : <TodoList />}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
