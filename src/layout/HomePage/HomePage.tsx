import Forecast from "./Forecast";
import SearchBoard from "./SearchBoard";
import "../../styles/homePage.css";
import HomeBackground from "./HomeBackground";

export default function HomePage() {
  return (
    <>
      <HomeBackground />
      <SearchBoard />
      <Forecast />
    </>
  );
}
