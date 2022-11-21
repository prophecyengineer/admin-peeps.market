import { Router } from "@reach/router"
import React from "react"
import GiftCardDetails from "./details"
import ManageGiftCard from "./manage"
import FilterProductsSwipper from "./filterProductsSwipper"

const FilterProducts = () => {
  return (
    <Router>
      <FilterProductsSwipper path="/" />
      {/* <GiftCardDetails path="/:id" /> */}
      {/* <ManageGiftCard path="manage" /> */}
    </Router>
  )
}

export default FilterProducts
