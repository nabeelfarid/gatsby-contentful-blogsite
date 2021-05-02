/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import RootLayout from "./src/components/rootLayout"

export const wrapRootElement = ({ element }) => {
  return <RootLayout>{element}</RootLayout>
}
