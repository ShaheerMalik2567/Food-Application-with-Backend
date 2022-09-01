import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setISLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setISLoading(true);
      const response = await fetch(
        "https://react-http-b804f-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch Data");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setISLoading(false);
    };
    fetchData().catch((error) => {
      setISLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (httpError) {
    return (
      <section className={styles.loading}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <div className={styles.meals}>
      <Card>
        {" "}
        {isLoading && <p className={styles.loading}>Fetching the data</p>}
        <ul>{mealsList}</ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
