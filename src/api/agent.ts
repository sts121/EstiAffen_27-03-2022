import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = "http://dataservice.accuweather.com";

const apiKey = "SUnuBGzxV5mzzMoUAKdKHUKUJrcXGwPY";

axios.interceptors.response.use(
response => {
    return response;
  }, error => {
    console.log(error);
       return Promise.reject(error);
  });

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody)
};

const Forecast = {
    currentConditions: <T>(locationId: number) => requests.get(`/currentconditions/v1/${locationId}?apikey=${apiKey}&language=en-us&details=false`),
    autoComplete: (text: string) => requests.get(`/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${text}&language=en-us`),
    comingDays: <T>(locationId: number) => requests.get(`/forecasts/v1/daily/5day/${locationId}?apikey=${apiKey}&language=en-us&details=false&metric=false`)
};
const agent = {
    Forecast,
};

export default agent;
