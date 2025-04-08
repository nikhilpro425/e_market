import {cart, addToCart, totalItems} from '../data/cart.js'
import {products, loadProductsFetch} from '../data/products.js'
import formatCurrency from './utils/money.js';


loadProductsFetch().then(() => {
  renderProductsGrid();
})

function renderProductsGrid(){
  updateCartQuantity();
  const productsGrid = document.querySelector(".products-grid")

  // Search functioning
  const searchBar = document.querySelector('.search-bar')
  const searchButton = document.querySelector('.search-button')
  let searchValue;
  
  searchButton.addEventListener('click', () => {
    searchValue = searchBar.value;
    searchBar.value = '';
    window.location.href = `index.html?search=${searchValue}`;
    console.log(searchValue);
  })
  
  const url = new URL(window.location.href);
  let searchParam = url.searchParams.get('search');    // searchValue
  if (searchParam === null) { 
    searchParam = '';
  } else {
    searchParam = searchParam.toLowerCase();
  } 
  
  products.forEach((product) => {
    if ((product.name.toLowerCase()).includes(searchParam)){
      productsGrid.innerHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">${product.name}</div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart added-message-${product.id} ">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    }
  })

  function updateCartQuantity() {
    document.querySelector('.cart-quantity').innerHTML = totalItems()
  }

  let intervalId;
  function showMessage(productId){
    let message = document.querySelector(`.added-message-${productId}`);
    message.classList.add('now-visible');
    clearInterval(intervalId);
    intervalId = setTimeout(() => {
      message.classList.remove('now-visible')
    }, 1000);
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantity = document.querySelector(`.quantity-selector-${productId}`).value
          
        addToCart(productId, quantity)
        updateCartQuantity()
        showMessage(productId)
      })
    })



  }
