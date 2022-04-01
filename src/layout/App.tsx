import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage/HomePage";
import FavoritesDashboard from "./FavoritesDashboard/FavoritesDashboard";
import { Container } from "semantic-ui-react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
import { GlobalStyles } from "../styles/global";
import { useSelector } from "react-redux";
import { forecastState } from "../store/forecastReducer";

function App() {
  const darkMode = useSelector<forecastState>((state) => state.darkMode);
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Navbar />
        <Container style={{ marginTop: "7em"  }}>
          <Routes>
            <Route path="/" caseSensitive element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesDashboard />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
