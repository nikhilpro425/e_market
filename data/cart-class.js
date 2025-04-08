class Cart {                    // Pascal Case for things that generate objects
  cartItems;                    // Public Property
  #localStorageKey;             //  Private Property

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItem = cartItem
      }
    })
  
    if (matchingItem) {
      matchingItem.quantity += Number(quantity)
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: Number(quantity),
        deliveryOptionId: '1'
      })
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId){
        matchingItem = cartItem
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let cartProduct;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId){
        cartProduct = cartItem;
      }
    })
      
    cartProduct.quantity = Number(newQuantity)
    
    this.saveToStorage()
  }

  totalItems() {
    let totalQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    })
    return totalQuantity;
  }
};    


// Generate objects using class
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');   //accepts parameters of the constructor method



// Works same as copy pasting and making objects separately
console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart)     // Check if an object is instance of a class
