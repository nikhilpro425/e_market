import {cart, removeFromCart, totalItems, updateQuantity, updateDeliveryOption} from '../../data/cart.js'
import {products} from '../../data/products.js'
import {deliveryOptions} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import formatCurrency from '../utils/money.js';

export function renderOrderSummary() {
  updateCartQuantity(); //updates header
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    
    products.forEach((product) => {
      if (productId === product.id){
        matchingProduct = product;
      }
    })
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    })

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    )
    const dateString = deliveryDate.format(('dddd, MMMM D'))

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="../${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type="number" class="quantity-input">
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(productId, cartItem)}
        </div>
      </div>
    </div>
    `
  })

  function deliveryOptionsHTML(productId, cartItem) {
    let html = ''

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = deliveryDate.format(('dddd, MMMM D'))

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} - `
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;  
      
      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${productId}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked':''}
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    })

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      renderOrderSummary();
      updateCartQuantity();
      renderPaymentSummary()
    })
  })

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.add('is-editing-quantity');
    })
  })

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      
      const productId = link.dataset.productId;
      // Switching between Update and Save functions using CSS
      document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove('is-editing-quantity');
      
        // Update Cart values
      let newQuantity = document.querySelector(`.js-cart-item-container-${productId} .quantity-input`).value;
      document.querySelector(`.js-cart-item-container-${productId} .quantity-input`).value = ''
      updateQuantity(productId, newQuantity);
      
      // Update the HTML values
      document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).innerHTML = newQuantity; 
      updateCartQuantity();
      renderPaymentSummary()
    })
  })

  function updateCartQuantity() {
    document.querySelector('.return-to-home-link').innerHTML = `${totalItems()} items`
  }


  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}
