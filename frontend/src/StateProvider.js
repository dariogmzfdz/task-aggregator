import { createContext, useContext }  from "react";

 export const StateContext =createContext();

export const StateProvider = ({children}) => (
    <StateContext.Consumer>
        {children}
    </StateContext.Consumer>
);

export const useStateValue = () => useContext(StateContext);