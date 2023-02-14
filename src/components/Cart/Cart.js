import { Fragment, useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import userEvent from '@testing-library/user-event';

const Cart = (props) => {

  const [didSubmit, setdidSubmit] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isCheckout,setischeckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler =() =>{
    setischeckout(true);
  }
  const ConfirmOrderHandler =async (userData) =>{
    setisSubmitting(true);
   await fetch('https://react-http-3506b-default-rtdb.firebaseio.com/confirm.json',{
      method:'POST',
      body:JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })
    setisSubmitting(false);
    setdidSubmit(true);
    cartCtx.clearCart();
  };
  const modalActions =(

    <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>
  );

  const cartModalcontent = (
   <Fragment> {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>

 {isCheckout && <Checkout onConfirm={ConfirmOrderHandler} onCancel={props.onClose}></Checkout>}
 {!isCheckout && modalActions}</Fragment> );

  const didcontentsubmitted =  <Fragment> <p>successfully order sent</p>
  
  <div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>
      Close
    </button>
  </div>
  
  </Fragment>

 const isSubmittingcontent = <p>sending order data</p>
  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModalcontent}
     {isSubmitting && isSubmittingcontent}
     {!isSubmitting &&  didSubmit && didcontentsubmitted}
    </Modal>
  );
};

export default Cart;
