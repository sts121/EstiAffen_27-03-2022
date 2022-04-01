import { useEffect, useState } from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import agent from "../../api/agent";
import { useDispatch, useSelector } from "react-redux";
import { forecastState } from "../../store/forecastReducer";
import City from "../../models/city";
import Weather from "../../models/weather";
import ForecastMiniItem from "./ForecastMiniItem";
import DailyForecast from "../../models/dailyForecast";
import { addFavoriteItem, removeFavoriteItem } from "../../store/actions";
import { camelize } from "../../store/store";

export default function Forecast() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [comingDays, setComingdays] = useState<DailyForecast[]>();
  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const city = useSelector<forecastState, City>((state) => state.city);

  const favoritesList = useSelector<forecastState, City[]>(
    (state) => state.favoriteItems,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    agent.Forecast.currentConditions<any>(city.key).then((res) => {
      var weather: Weather = camelize(res[0]);
      setCurrentWeather(weather);
    });

    agent.Forecast.comingDays<any>(city.key).then((res) => {
      var comingDaysRes = res.DailyForecasts.map((daily: any) => {
        return camelize(daily);
      });
      setComingdays(comingDaysRes);
    });
  }, [city]);

  useEffect(() => {
    setIsFavorite(checkIsFavorite());
  }, [favoritesList, city]);

  const checkIsFavorite = () =>
    favoritesList.findIndex((x) => x.key === city.key) >= 0;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteItem(city.key));
    } else {
      dispatch(addFavoriteItem(city));
    }
  };

  return (
    <>
      <Grid>
        <Grid.Row>
          <Card style={{ width: "80%" }} centered inverted>
            <Card.Content>
              <Image
                floated="right"
                size="small"
                src={`../assets/weatherIcons/${currentWeather?.weatherIcon}.png`}
              />
              <Card.Header>{city.localizedName}</Card.Header>
              <Card.Meta>
                {`${currentWeather?.temperature?.metric?.value}`}&#176;
              </Card.Meta>
              <Card.Description>{currentWeather?.weatherText}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign="center">
              <Button
                content={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                icon={isFavorite ? "heart" : "heart outline"}
                labelPosition="left"
                onClick={handleFavorite}
              />
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered>
              {comingDays?.map((forecastItem: DailyForecast) => (
                <ForecastMiniItem
                  key={forecastItem.date}
                  forecastItem={forecastItem}
                />
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
