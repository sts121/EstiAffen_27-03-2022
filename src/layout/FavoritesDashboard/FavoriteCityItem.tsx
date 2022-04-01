import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Segment } from "semantic-ui-react";
import agent from "../../api/agent";
import City from "../../models/city";
import Weather from "../../models/weather";
import {
  removeFavoriteItem,
  selectCity,
  setActiveItem,
} from "../../store/actions";
import { forecastState } from "../../store/forecastReducer";
import { camelize } from "../../store/store";
interface Props {
  favoriteItem: City;
}

export default function FavoriteCityItem({ favoriteItem }: Props) {
  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const favoritesList = useSelector<forecastState, City[]>(
    (state) => state.favoriteItems,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    agent.Forecast.currentConditions<any>(favoriteItem.key).then((res) => {
      var weather: Weather = camelize(res[0]);
      setCurrentWeather(weather);
    });
  }, []);

  const handleDelete = () => dispatch(removeFavoriteItem(favoriteItem.key));

  const handleHoverToFavorite = () => {
    const city = favoritesList.find((x) => x.key === favoriteItem.key);
    city && dispatch(selectCity(city));
    dispatch(setActiveItem("home"));
  };
  if (!currentWeather) return <></>;
  return (
    <>
      <Card
        as={Link}
        onClick={handleHoverToFavorite}
        to={`/`}
        key={favoriteItem.key}
      >
        <Card.Content>
          <Image
            size="small"
            floated="right"
            src={`../assets/weatherIcons/${currentWeather?.weatherIcon}.png`}
          />
          <Card.Header>{favoriteItem.localizedName}</Card.Header>
          <Card.Meta>
            <Icon name="marker" />
            {favoriteItem.country?.localizedName}
          </Card.Meta>
          <Card.Meta>
            {new Date(
              currentWeather.localObservationDateTime,
            ).toLocaleDateString()}
          </Card.Meta>
          <Card.Description>
            <div> {currentWeather.temperature.metric.value} &#176;</div>
            {currentWeather.weatherText}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            onClick={handleDelete}
            floated="right"
            content="Delete"
            color="red"
          />
        </Card.Content>
      </Card>
    </>
  );
}
