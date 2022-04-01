import { useSelector } from "react-redux";
import { Card, Grid } from "semantic-ui-react";
import City from "../../models/city";
import { forecastState } from "../../store/forecastReducer";
import FavoriteCityItem from "./FavoriteCityItem";

export default function Navbar() {
  const favoritesList = useSelector<forecastState, City[]>(
    (state) => state.favoriteItems,
  );
  return (
    <>
      <Grid>
        <Grid.Column>
          <Card.Group centered>
            {favoritesList.map((favoriteItem) => (
              <FavoriteCityItem
                key={favoriteItem.key}
                favoriteItem={favoriteItem}
              />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </>
  );
}
