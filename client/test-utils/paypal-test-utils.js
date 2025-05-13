import React from 'react';
import { render } from '@testing-library/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Custom render function that wraps components with PayPalScriptProvider
export function renderWithPayPal(ui, options) {
  return render(
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      {ui}
    </PayPalScriptProvider>,
    options
  );
}
