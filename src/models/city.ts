import  Area  from "./area"

export default interface City {
    version?: number
    key: number
    type?: string
    rank?: number
    localizedName? : string
    country?:Area
    administrativeArea?:Area
  }
  