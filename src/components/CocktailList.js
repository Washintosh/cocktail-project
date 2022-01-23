import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext();
  return (
    <>
      {loading ? (
        <Loading />
      ) : cocktails.length < 1 ? (
        <h2 className="section-title">No cocktails matched your search</h2>
      ) : (
        <section className="section">
          <h2 className="section-title">cocktails</h2>
          <div className="cocktails-center">
            {cocktails.map((i) => (
              <Cocktail key={i.id} {...i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default CocktailList;
