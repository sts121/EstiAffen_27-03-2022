import City from "../models/city";

export type Action = 
{type: "SELECT_CITY",payload:City}
|{type: "ADD_FAVORITE",payload:City}
|{type: "REMOVE_FAVORITE",payload:number}
|{type: "SET_ACTIVEITEM",payload:string}
|{type: "TOGGLE_DARKMODE"}
|{type: "IS_FAVORITE"};

export const selectCity =(city:City):Action =>({
 type:"SELECT_CITY",
payload:city
});

export const addFavoriteItem =(favoriteItem:City):Action =>({
    type:"ADD_FAVORITE",
   payload:favoriteItem
   });

   export const removeFavoriteItem =(key:number):Action =>({
    type:"REMOVE_FAVORITE",
   payload:key
   });
   export const setActiveItem =(key:string):Action =>({
    type:"SET_ACTIVEITEM",
   payload:key
   });
   export const toggleDarkMode =():Action =>({
    type:"TOGGLE_DARKMODE"
   });
 



