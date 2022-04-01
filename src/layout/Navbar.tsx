import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, Icon, Image, Menu } from "semantic-ui-react";
import { toggleDarkMode } from "../store/actions";
import { forecastState } from "../store/forecastReducer";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const darkMode = useSelector<forecastState>((state) => state.darkMode);
  const dispatch = useDispatch();
  const onToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  return (
    <Menu inverted fixed="top">
      <Image
        as={NavLink}
        to="/"
        caseSensitive
        header
        src="/assets/logo3.png"
        onClick={() => setActiveItem("home")}
        alt="logo"
        style={{ margin: "15px", width: "70px" }}
      />
      <Container>
        <Menu.Item
          name="Home"
          active={activeItem === "home"}
          as={NavLink}
          to="/"
          caseSensitive
          onClick={() => setActiveItem("home")}
          icon="home"
        />
        <Menu.Item
          name="Favorites"
          active={activeItem === "favorites"}
          as={NavLink}
          to="/favorites"
          caseSensitive
          onClick={() => setActiveItem("favorites")}
          icon="heart"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name={darkMode ? "bright mode" : "dark mode"}
            onClick={() => onToggleDarkMode()}
            icon={darkMode ? "sun" : "moon"}
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
