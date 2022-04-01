import  Unit  from "./unit"

export default interface DailyForecast {
    date: string
    epochDate?: number
    temperature:{
        minimum:Unit
        maximum:Unit
    }
    day: { 
        icon: number
        iconPhrase: string
        hasPrecipitation?: boolean
        precipitationType?: string
        precipitationIntensity?: string}
    night : {
        icon: number
        iconPhrase: string
        hasPrecipitation?: boolean
        precipitationType?: string
        precipitationIntensity?: string
    }
    sources ?: string[]
    mobileLink? : string
    link?:string
  }
  