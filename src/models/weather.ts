import  Unit  from "./unit"

export default interface Weather {
    localObservationDateTime: string
    epochTime: number
    weatherText: string
    weatherIcon: number
    hasPrecipitation : boolean
    precipitationType : number
    isDayTime : boolean
    temperature: {
        metric:Unit
        imperial:Unit
    }
    mobileLink:string
    link:string
  }
  