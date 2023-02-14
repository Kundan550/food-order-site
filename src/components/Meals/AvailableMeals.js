import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';


const AvailableMeals = () => {

  const [meals,setMeals] = useState([]);
  const [hasError,setHasError] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(()=>{
    const fetchMeals = async () =>{
      
  const response= await fetch('https://react-http-3506b-default-rtdb.firebaseio.com/meals.json');

  if(!response.ok)
  {
    throw new Error('something went wrong');
  }
      const responseData = await response.json();
  
      const loadedMeals =[];
  
      for(const key in responseData)
      {
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setisLoading(false);
    };
  
    fetchMeals().catch((error) => {
      setisLoading(false);
      setHasError(error.message);
    });  },[]);
  
  if(isLoading)
  {
    return(<section className={classes.MealsLoading}>
      <p>Loading.....</p>
    </section>);
  }

  if (hasError) {
    return (
      <section className={classes.MealsError}>
        <p>{hasError}</p>
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
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
