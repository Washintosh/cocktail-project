import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}${search}`);
      const data = await res.json();
      setCocktails(
        data.drinks
          ? data.drinks.map((i) => {
              const {
                idDrink,
                strDrink,
                strDrinkThumb,
                strAlcoholic,
                strGlass,
              } = i;
              return {
                id: idDrink,
                name: strDrink,
                img: strDrinkThumb,
                info: strAlcoholic,
                glass: strGlass,
              };
            })
          : []
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchDrinks();
  }, [search, fetchDrinks]);
  return (
    <AppContext.Provider value={{ loading, cocktails, setSearch }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
