import { products, indexes } from './dbapi.js'

const classicPizzaInd = indexes.classic
const premiumPizzaInd = indexes.premium
const legendPizzaInd = indexes.legend
const customPizzaInd = indexes.custom
const bestPriceInd = indexes.bestPrice
const recommendedInd = indexes.recommended

const bestPriceProds = bestPriceInd.map(i => { return products[i] })
const recommendedProds = recommendedInd.map(i => { return products[i] })
const classicPizzaProds = classicPizzaInd.map(i => { return products[i] })
const premiumPizzaProds = premiumPizzaInd.map(i => { return products[i] })
const legendPizzaProds = legendPizzaInd.map(i => { return products[i] })
const customPizzaProds = customPizzaInd.map(i => { return products[i] })

export {
  bestPriceProds, recommendedProds, classicPizzaProds, premiumPizzaProds, legendPizzaProds, customPizzaProds,
  classicPizzaInd, premiumPizzaInd, legendPizzaInd, customPizzaInd, bestPriceInd, recommendedInd
}
