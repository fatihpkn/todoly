import React from "react";
import ReactDOM from "react-dom";

import App from "containers/app";

// Styling
import "style/global.less";

// Global (redux like store)
import { StoreProvider } from "easy-peasy";
import { Store } from "store";
import AppLoading from "components/app-loading";
import { QueryClientProvider, QueryClient, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const RQClient = new QueryClient({
  queryCache: new QueryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={RQClient}>
      <ReactQueryDevtools />
      <StoreProvider store={Store}>
        <div className='todoly-app-layout'>
          <React.Suspense fallback={<AppLoading />}>
            <App />
          </React.Suspense>
        </div>
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("todoly-app")
);
