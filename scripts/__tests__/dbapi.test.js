import { it, describe, expect } from '@jest/globals'
import { Get } from '../dbapi'

describe('api testing', () => {
  it('should load products data', () => {
    const products = JSON.parse(Get('https://my-json-server.typicode.com/Im-YouGin/Pizzeria/products'))
    const names = []
    products.forEach(element => {
      names.push(element.title)
    })
    const expected = ['Pizza Pepperoni', 'Pizza Margarita', 'Pizza Hawaiian', 'Pizza BBQ', 'Pizza Five Cheeses', 'Pizza Spinach and Feta', 'Pizza MitZZa', 'Pizza Extravaganzza', 'Pizza Toscana', 'Pizza Munich DeLUX', 'Pizza Spicy', 'Pizza BBQ Delux', 'Pizza Country', 'Pizza Veggie Feast', 'Pizza Curry', 'Pizza PaparaZZi']
    expect(names).toEqual(expected)
  })
})
