import { products, loadProductsFetch } from '../data/products.js';
import { totalItems } from '../data/cart.js';
import { orders } from '../data/orders.js';

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


async function renderTracking() {
  await loadProductsFetch();
  const url = new URL(window.location.href);
  
  let requiredProduct;
  let requiredOrder;
  let requiredDeliveryInfo;
  let deliveryProgress;

  products.forEach((product) => {
    if (product.id === url.searchParams.get('productId')) {
      requiredProduct = product;
    }
  });
  orders.forEach((order) => {
    if (order.id === url.searchParams.get('orderId')) {
      requiredOrder = order;
    }
  });
  requiredOrder.products.forEach((product) => {
    if (product.productId === requiredProduct.id){
      requiredDeliveryInfo = product
    }
  });
  
  let html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all Orders
    </a>

    <div class="delivery-date">
      Arriving on ${dayjs(requiredDeliveryInfo.estimatedDeliveryTime).format('MMMM D, YYYY')}
    </div>

    <div class="product-info">
      ${requiredProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${requiredDeliveryInfo.quantity}
    </div>

    <img class="product-image" src="${requiredProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label preparing-label">
        Preparing
      </div>
      <div class="progress-label shipped-label">
        Shipped
      </div>
      <div class="progress-label delivered-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-tracking').innerHTML = html;

  document.querySelector('.cart-quantity').innerHTML = `${totalItems()}`;

  // Delivery Progress Bar
  deliveryProgress = ((dayjs() - dayjs(requiredOrder.orderTime)) / (dayjs(requiredDeliveryInfo.estimatedDeliveryTime) - dayjs(requiredOrder.orderTime))) * 100;

  if (deliveryProgress >= 0 && deliveryProgress < 50){
    document.querySelector('.preparing-label').classList.add('current-status');
  } else if (deliveryProgress >= 50 && deliveryProgress < 100){
    document.querySelector('.preparing-label').classList.remove('current-status');
    document.querySelector('.shipped-label').classList.add('current-status');
  } else {
    document.querySelector('.shipped-label').classList.remove('current-status');
    document.querySelector('.delivered-label').classList.add('current-status');
  }

  document.querySelector('.progress-bar-container').innerHTML = `
    <div class="progress-bar" style="width: ${deliveryProgress}%"></div>
  `;

}

renderTracking();