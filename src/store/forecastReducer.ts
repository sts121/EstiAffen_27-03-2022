import { createSlice } from "@reduxjs/toolkit"
import City from "../models/city"
import { Action } from "./actions"


export interface forecastState{
    city : City,
    favoriteItems: City[],
    darkMode: boolean,
    isFavorite : boolean
}
const initialState = {
    city:{
    version:1,
    key:215854,
    type:"City",
    rank: 31,
    localizedName:"Tel Aviv",
    country:{id:"IL",localizedName:"Israel"},
    administrativeArea:{id:"TA",localizedName:"Tel Aviv"}
    },
    favoriteItems:[],
    darkMode:false,
    isFavorite:false
}



export const forecastReducer = (state:forecastState = initialState, action:Action)=>{
    switch(action.type){
        case "SELECT_CITY":{
            return {...state,city: action.payload}
        }
        case "ADD_FAVORITE":{
            return {...state,favoriteItems: [...state.favoriteItems,action.payload]}
        }
        case "REMOVE_FAVORITE":{
            return {...state,favoriteItems: [...state.favoriteItems.filter(x => x.key!== action.payload)]}
        }
        //  case "IS_FAVORITE":{
        //      return {...state,isFavorite: state.favoriteItems.findIndex(x => x.key === state.city.key) > 1}
        //  }
        case "TOGGLE_DARKMODE":{
            return {...state,darkMode: !state.darkMode}
        }
        default:
            return state
    }
}

