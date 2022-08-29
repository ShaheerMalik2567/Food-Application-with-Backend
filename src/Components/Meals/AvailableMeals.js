import React from "react";
import Card from "../UI/Card";

import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Biryani",
    description: "Spicy Chicken Biryani",
    price: 4.99,
  },
  {
    id: "m2",
    name: "Beef Pulao",
    description: "Bano Beef Pulao",
    price: 9.99,
  },
  {
    id: "m3",
    name: "Fried Rice",
    description: "Chinese Special",
    price: 7.99,
  },
  {
    id: "m4",
    name: "Zarda",
    description: "Sweet and Delicious",
    price: 3.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meals) => (
    <MealItem
      key={meals.id}
      id={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));

  return (
    <div className={styles.meals}>
      <Card>
        {" "}
        <ul>{mealsList}</ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
