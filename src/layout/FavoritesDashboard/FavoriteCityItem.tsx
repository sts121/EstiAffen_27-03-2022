import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import agent from "../../api/agent";
import City from "../../models/city";
import Weather from "../../models/weather";
import { removeFavoriteItem } from "../../store/actions";
import { camelize } from "../../store/store";
interface Props {
  favoriteItem: City;
}

export default function FavoriteCityItem({ favoriteItem }: Props) {
  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const dispatch = useDispatch();

  useEffect(() => {
    agent.Forecast.currentConditions<any>(favoriteItem.key).then((res) => {
      var weather: Weather = camelize(res[0]);
      setCurrentWeather(weather);
    });
  }, []);

  const handleDelete = () => dispatch(removeFavoriteItem(favoriteItem.key));

  if (!currentWeather) return <></>;
  return (
    <>
      <Card key={favoriteItem.key}>
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
            <div> {currentWeather.temperature.metric.value}</div>
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
