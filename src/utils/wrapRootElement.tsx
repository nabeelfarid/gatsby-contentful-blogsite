import React from "react";
import RootLayout from "../components/rootLayout";
import IdentityContextProvider from "./IdentityContextProvider";
import ApolloClientProvider from "./ApolloClientProvider";

export const wrapRootElement = ({ element }) => {
  console.info(`inside wrapRootElement`);

  return (
    <RootLayout>
      <IdentityContextProvider>
        <ApolloClientProvider>{element}</ApolloClientProvider>
      </IdentityContextProvider>
    </RootLayout>
  );
};
