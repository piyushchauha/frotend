//React
import React from 'react';

//React-DOM Client
import ReactDOM from 'react-dom/client';

//App
import App from 'App';

//ReportWebVitals
import reportWebVitals from 'reportWebVitals';

//Persist-Redux
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

//React-Redux
import { Provider } from 'react-redux';

//Store
import Store from 'Store/Store';

const persistor = persistStore(Store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider loading={null} store={Store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
