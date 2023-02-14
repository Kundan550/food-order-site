import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value =>value.trim() === '';
const isFivechar  = value =>value.trim().length === 5;
const Checkout =(props)=>{

const [forminputValidity, setforminputValidity] = useState({
    name:true,
    street:true,
    postal:true,
    city:true
})

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const formSubmitHandler =(event) =>{
          event.preventDefault();

          const nameentered = nameInputRef.current.value;
          const streetentered = streetInputRef.current.value;
          const postalentered = postalInputRef.current.value;
          const cityentered = cityInputRef.current.value;

          const enterednameIsValid = !isEmpty(nameentered);
          const enteredstreetIsValid = !isEmpty(streetentered);

          const enteredpostalIsValid = isFivechar(postalentered);
         
          const enteredcityIsValid = !isEmpty(cityentered);

          setforminputValidity({
            name:enterednameIsValid,
            street:enteredstreetIsValid,
            postal:enteredpostalIsValid,
            city:enteredcityIsValid
          })

          const isFormValid = enteredcityIsValid &&
           enterednameIsValid &&
            enteredpostalIsValid && 
            enteredstreetIsValid;

            if(!isFormValid)
            {
                return;
            }

            //submit cart data

            props.onConfirm({
                name:nameentered,
                street:streetentered,
                postal:postalentered,
                city:cityentered
            });
    };

    const nameControlclass = `${classes.control} ${forminputValidity.name ? '' :classes.invalid}`
    const streetControlclass = `${classes.control} ${forminputValidity.street ? '' :classes.invalid}`
    const postalControlclass = `${classes.control} ${forminputValidity.postal ? '' :classes.invalid}`
    const cityControlclass = `${classes.control} ${forminputValidity.city ? '' :classes.invalid}`

    return(

        <form onSubmit={formSubmitHandler}>
            <div className={nameControlclass}>
                <label htmlFor="name" >Your name</label>
                <input type="text"id="name" ref={nameInputRef}/>
                {!forminputValidity.name &&<p>name is not valid</p> }
            </div>

            <div className={streetControlclass}>
                <label htmlFor="street" >Street</label>
                <input type="text"id="street"ref={streetInputRef}/>
                {!forminputValidity.street &&<p>street is not valid</p> }

            </div>

            <div className={postalControlclass}>
                <label htmlFor="postal" >Postal code</label>
                <input type="text"id="postal" ref={postalInputRef}/>
                {!forminputValidity.postal &&<p>postal is not valid</p> }

            </div>

            <div className={cityControlclass}>
                <label htmlFor="city" >City
                </label>
                <input type="text"id="city" ref={cityInputRef}/>
                {!forminputValidity.city &&<p>city is not valid</p> }

            </div>
            <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
        </form>
    );
};
export default Checkout;