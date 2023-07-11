import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
// import {store, persistor} from './store/index.jsx'
import store from './store/index.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import { TaskContextProvider } from './Context/TaskContext.jsx'
import { CollectionContextProvider } from './Context/CollectionContext.jsx'
import { SearchContextProvider } from './Context/SearchContext.jsx'
// import { persistor, store } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <UserContextProvider>
      <CollectionContextProvider>
        <TaskContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </TaskContextProvider>
      </CollectionContextProvider>
    </UserContextProvider>
    {/* </PersistGate> */}
  </Provider>
  // </React.StrictMode>,
)
