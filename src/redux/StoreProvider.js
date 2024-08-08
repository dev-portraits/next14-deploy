"use client";

import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadCartFromLocalStorage } from "@/redux/features/cartSlice";

function LoadCart({ onLoaded }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
    onLoaded();
  }, [dispatch, onLoaded]);

  return null;
}

export default function StoreProvider({ children }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Provider store={store}>
      {!loaded ? (
        <LoadCart onLoaded={() => setLoaded(true)} />
      ) : (
        children
      )}
    </Provider>
  );
}
