import axios, { AxiosError, AxiosResponse } from "axios";
import {  toast } from 'react-toastify';


axios.defaults.baseURL = "http://dataservice.accuweather.com";

const apiKey = "SUnuBGzxV5mzzMoUAKdKHUKUJrcXGwPY";


axios.interceptors.response.use(function (response) {
  return response;
}, function (error:AxiosError) {
        const {data,status,config} =error.response!;
        switch(status){
          case 400:
            toast.error('bad request');
            break;
          case 401:
            toast.error('unauthorized');
            break;
          case 404:
            toast.error('not found');
            break;
          case 500:
            toast.error('server error');
            break;
        }
  return Promise.reject(error);
});

// axios.interceptors.response.use(async response =>{
//     return response
//   },error =>{
//     const {data,status} =error.response!;
//     switch(status){
//       case 400:
//         toast.error('bad request');
//         break;
//       case 401:
//         toast.error('unauthorized');
//         break;
//       case 404:
//         toast.error('not found');
//         break;
//       case 500:
//         toast.error('server error');
//         break;
//     }
//     return Promise.reject(error);
//   });

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
