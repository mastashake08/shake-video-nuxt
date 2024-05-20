<template>
    <div>
        <div id="express-checkout-element" class="text-center my-2">
            <!-- A Stripe Element will be inserted here. -->
            <p>
            Support the project and get a playlist file with over 5000 free IPTV channels!
            </p>
            <button class="rounded-md bg-green-500 px-5 my-2 text-center" @click="buy">Click HERE!</button>
    
        </div>

        <div id="error-message">
        <!-- Display error message to your customers here -->
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  const route = useRoute()
  // Call the composable to get the Stripe instance
  const stripe = await useClientStripe();
  const buy = async() => {
    
    const appearance = { /* appearance */ }
    const options = { /* options */
        buttonType: {
            applePay: 'buy',
            googlePay: 'buy',
        }
     }
    const elements = stripe.value.elements({
    mode: 'payment',
    amount: 299,
    currency: 'usd',
    appearance,
    })
    const expressCheckoutElement = elements.create('expressCheckout', options)
    expressCheckoutElement.mount('#express-checkout-element')
    const handleError = (error) => {
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
    }

    expressCheckoutElement.on('confirm', async (event) => {
    const {error: submitError} = await elements.submit();
    if (submitError) {
        handleError(submitError);
        return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const res = await fetch('/api/create-intent', {
        method: 'POST',
    });
    const {client_secret: clientSecret } = await res.json();

    const {error} = await stripe.value.confirmPayment({
        // `elements` instance used to create the Express Checkout Element
        elements,
        // `clientSecret` from the created PaymentIntent
        clientSecret,
        confirmParams: {
        return_url: location.href
        }
    });

    if (error) {
        // This point is only reached if there's an immediate error when
        // confirming the payment. Show the error to your customer (for example, payment details incomplete)
        handleError(error);
    } else {
        // The payment UI automatically closes with a success animation.
        // Your customer is redirected to your `return_url`.
    }
    });

}
buy()
  // Use the Stripe instance to interact with the stripe.js library
  // https://docs.stripe.com/js
  </script>
  