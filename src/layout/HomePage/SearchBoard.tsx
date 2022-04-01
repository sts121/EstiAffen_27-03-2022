import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Label, Search } from "semantic-ui-react";
import agent from "../../api/agent";
import City from "../../models/city";
import { selectCity } from "../../store/actions";
import { camelize } from "../../store/store";

export default function SearchBoard() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm.length < 1) {
      setLoading(false);
      setSearchTerm("");
    } else {
      setLoading(true);
      agent.Forecast.autoComplete(searchTerm).then((res) => {
        const search = res.map((car: any) => {
          return camelize(car);
        });
        setSearchResults(search);
      });
    }
  }, [searchTerm]);

  const handleChange = (event: SyntheticEvent, data: any) => {
    setSearchTerm(data.value);
  };

  const handleSelectCity = (event: SyntheticEvent, data: any) => {
    dispatch(selectCity(data.result));
    setLoading(false);
  };

  const resultRenderer = ({ localizedName }: any) => (
    <Label content={localizedName} />
  );

  return (
    <>
      <Grid inverted centered>
        <Grid.Row>
          <Search
            fluid
            loading={loading}
            placeholder="Search a city..."
            noResultsMessage="No cities found"
            onResultSelect={handleSelectCity}
            onSearchChange={handleChange}
            resultRenderer={resultRenderer}
            results={searchResults}
            value={searchTerm}
          />
        </Grid.Row>
      </Grid>
    </>
  );
}
