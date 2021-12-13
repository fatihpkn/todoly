import React from "react";
import ReactDOM from "react-dom";

import App from "containers/app";

// Styling
import "style/global.less";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback='loading..'>
      <div className='todoly-app-layout'>
        <App />
      </div>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("todoly-app")
);
