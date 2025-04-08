export let cart ;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem
    }
  })

  if (matchingItem) {
    matchingItem.quantity += Number(quantity)
  } else {
    cart.push({
      productId: productId,
      quantity: Number(quantity),
      deliveryOptionId: '1'
    })
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function emptyCart() {
  cart = [];
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let cartProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId){
      cartProduct = cartItem;
    }
  })
    
  cartProduct.quantity = Number(newQuantity)
  
  saveToStorage()
}

export function totalItems() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })
  return totalQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });
  
  xhr.open('GET', 'https:/supersimplebackend.dev/cart');
  xhr.send();
}
