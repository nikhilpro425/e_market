import { products as allProducts, loadProductsFetch }  from "../data/products.js";
import { orders } from "../data/orders.js";
import { addToCart, totalItems } from "../data/cart.js";
import formatCurrency from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


async function renderAllOrders(){
  await loadProductsFetch();
  
  let html = ``;
  orders.forEach((order) => {
    html += `
      <div class="order-container">
        
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dayjs(order.orderTime).format('MMMM D, YYYY')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
  
        <div class="order-details-grid js-products-container">
          ${renderOrder(order)}
        </div>
      </div>
    `
  });

  document.querySelector('.js-order-container').innerHTML = html;

  document.querySelector('.cart-quantity').innerHTML = `${totalItems()}`;

  document.querySelectorAll('.buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.value, 1);
      document.querySelector('.cart-quantity').innerHTML = `${totalItems()}`;
    })
  })
}



function renderOrder(order) {
  let orderHTML=``;
  
  order.products.forEach((product) => {
    let requiredProduct;

    allProducts.forEach((allProduct) => {
      if (allProduct.id === product.productId){
        requiredProduct = allProduct;
      }
    })
    
    orderHTML += `
        <div class="product-image-container">
          <img src="${requiredProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${requiredProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D, YYYY')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary" value="${requiredProduct.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy Again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${requiredProduct.id}">
            <button class="track-package-button button-secondary">
              Track Package
            </button>
          </a>
        </div>
    `;
  });
  return orderHTML;
}


// Render Page
renderAllOrders();

