import React from "react";
import ReactDOM from "react-dom";

import App from "containers/app";

// Styling
import "style/global.less";

// Global (redux like store)
import { StoreProvider } from "easy-peasy";
import { Store } from "store";
import AppLoading from "components/app-loading";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={Store}>
      <div className='todoly-app-layout'>
        <React.Suspense fallback={<AppLoading />}>
          <App />
        </React.Suspense>
      </div>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("todoly-app")
);
