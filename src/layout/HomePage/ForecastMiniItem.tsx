import { useState } from "react";
import { Button, Card } from "semantic-ui-react";
import DailyForecast from "../../models/dailyForecast";
import DayPart from "./dayPart";

interface Props {
  forecastItem: DailyForecast;
}
export default function ForecastMiniItem({ forecastItem }: Props) {
  const [isDay, setIsDay] = useState(true);
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {new Date(forecastItem.date).toLocaleDateString("en-US", {
            weekday: "long",
          })}
        </Card.Header>
        <Card.Meta>
          {new Date(forecastItem.date).toLocaleDateString()}
        </Card.Meta>
        <Card.Meta floated="right">
          {`${forecastItem.temperature.minimum.value}-${forecastItem.temperature.maximum.value}\u00B0`}
        </Card.Meta>
        <DayPart dayPart={isDay ? forecastItem.day : forecastItem.night} />
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic={!isDay}
              color="yellow"
              onClick={() => setIsDay(true)}
            >
              day
            </Button>
            <Button basic={isDay} color="grey" onClick={() => setIsDay(false)}>
              night
            </Button>
          </div>
        </Card.Content>
      </Card.Content>
    </Card>
  );
}
