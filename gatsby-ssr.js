/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from "react"
import RootLayout from "./src/components/rootLayout"

export const wrapRootElement = ({ element }) => {
  return <RootLayout>{element}</RootLayout>
}
