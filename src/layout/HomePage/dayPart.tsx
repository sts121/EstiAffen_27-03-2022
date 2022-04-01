import { Card, Image } from "semantic-ui-react";
import Icon from "../../models/icon";

interface Props {
  dayPart: Icon;
}

export default function DayPart({ dayPart }: Props) {
  return (
    <>
      <Card.Content>
        <Image
          floated="right"
          size="small"
          src={`../assets/weatherIcons/${dayPart.icon}.png`}
        />
        <Card.Header>{dayPart.iconPhrase}</Card.Header>
      </Card.Content>
    </>
  );
}
