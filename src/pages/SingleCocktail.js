import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState("");

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const res = await fetch(`${url}${id}`);
        const data = await res.json();
        setCocktail(
          data.drinks
            ? {
                name: data.drinks[0].strDrink,
                img: data.drinks[0].strDrinkThumb,
                info: data.drinks[0].strAlcoholic,
                category: data.drinks[0].strCategory,
                glass: data.drinks[0].strGlass,
                instructions: data.drinks[0].strInstructions,
                ingredients: [
                  data.drinks[0].strIngredient1,
                  data.drinks[0].strIngredient2,
                  data.drinks[0].strIngredient3,
                  data.drinks[0].strIngredient4,
                  data.drinks[0].strIngredient5,
                ],
              }
            : null
        );
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : !cocktail ? (
        <h2 className="section-title">no cocktail to display</h2>
      ) : (
        <section className="section cocktail-section">
          <Link to="/" className="btn btn-primary">
            Back home
          </Link>
          <h2 className="section-title">{cocktail.name}</h2>
          <div className="drink">
            <img src={cocktail.img} alt={cocktail.name} />
            <div className="drink-info">
              <p>
                <span className="drink-data">name: </span>
                {cocktail.name}
              </p>
              <p>
                <span className="drink-data">category: </span>
                {cocktail.category}
              </p>
              <p>
                <span className="drink-data">info: </span>
                {cocktail.info}
              </p>
              <p>
                <span className="drink-data">glass: </span>
                {cocktail.glass}
              </p>
              <p>
                <span className="drink-data">instructions: </span>
                {cocktail.instructions}
              </p>
              <p>
                <span className="drink-data">ingredients: </span>
                {cocktail.ingredients.map(
                  (i, index) => i && <span key={index}>{i}</span>
                )}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleCocktail;
