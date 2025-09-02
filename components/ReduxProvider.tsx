// "use client"
// import { store } from "@/redux";
// import { Provider } from "react-redux";
// import { persistStore } from "redux-persist";
// import { PersistGate } from 'redux-persist/integration/react'

// let persistor = persistStore(store)

// export const ReduxProvider=({children}:{children:React.ReactNode})=>{
//     return(
//         <Provider store={store}>
//             <PersistGate loading={null} persistor={persistor}>
//                   {children}
//             </PersistGate>
      
//         </Provider>
//     )
// }
"use client"
import { store } from "@/redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store); // ✅ use const instead of let

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
