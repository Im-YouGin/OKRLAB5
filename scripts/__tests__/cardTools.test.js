import { it, describe, expect } from '@jest/globals'
import { ProductsManager } from '../cardTools'

describe('cardTools testet', () => {
  it('should create cards from product desc', () => {
    const cont = (
            `
            <div class="product-list"></div>
            `
    )
    document.body.innerHTML = cont
    const det = [
      {
        title: 'Pizza Pepperoni',
        desc: 'Mozarella, Peperoni, Tomatoes, BBQ sauce',
        price: '92.99',
        weight: '350 g',
        prodUrl: 'product/pepperonitomato',
        imgPath: './imgs/pepperonitomato.jpg',
        category: 'classic'
      }
    ]

    const manager = new ProductsManager({ el: document.body.querySelector('.product-list'), products: det })

    expect(manager.el.querySelector('.product-block__title-text').getAttribute('href')).toBe('#' + det[0].prodUrl)
    expect(manager.el.querySelector('.product-block__weight').innerHTML).toBe(det[0].weight)
    expect(manager.el.querySelector('.product-block__toppings-row span').innerHTML).toBe(det[0].desc)
    expect(manager.el.querySelector('.product-block__price').innerHTML).toBe(det[0].price)
    expect(manager.el.querySelector('.product-block__title-text').innerHTML).toBe(det[0].title)
  })
})
