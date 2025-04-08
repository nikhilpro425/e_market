import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage() {       // Makes a function return a promise
  try {
    // throw 'Error 1';
    
    await loadProductsFetch();      // Waits for func to finish. await only used in async

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  
  } catch (error) {
    console.log('Unexpected error occurred here!');
  }

  
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage()

/*
Promise.all([                     // Run promises at the same time
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {      // Run promises in order one after the other
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value)
  
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/


// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
