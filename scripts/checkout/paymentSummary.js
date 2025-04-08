import { cart, totalItems , emptyCart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { addOrder } from "../../data/orders.js";
import formatCurrency from "../utils/money.js";


export function renderPaymentSummary(){
  let totalPrices = 0;
  let totalShipping = 0;
  let estTax = 0;
  let orderTotal = 0;
  
  cart.forEach((cartItem) => {
    let itemPrice = 0;
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        itemPrice = product.priceCents;
      } 
    })

    totalPrices += itemPrice * cartItem.quantity;

    deliveryOptions.forEach((option) => {
      if (option.id === cartItem.deliveryOptionId) {
        totalShipping += option.priceCents;
      }
    })

  });

  estTax = (totalPrices+totalShipping)/10;
  orderTotal = (totalPrices+totalShipping) + estTax

  let newHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems()}) :</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrices)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency((totalPrices+totalShipping))}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%) :</div>
            <div class="payment-summary-money">$${formatCurrency(estTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>  `
  document.querySelector('.payment-summary').innerHTML = newHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
      
        const order = await response.json();
        addOrder(order); 
        emptyCart();
    
      } catch(error) {
      console.log('Unexpected Error! Try again later.')
    }

    window.location.href = 'orders.html';
  });

}