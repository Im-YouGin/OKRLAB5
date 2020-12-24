import { it, describe, expect } from '@jest/globals'
import { ActionsManager } from '../actions'

describe('actions tester', () => {
  it('should render actions', () => {
    const cont = (
            `
            <div class="all-actions"></div>
            `
    )
    document.body.innerHTML = cont
    const det = [
      {
        title: 'Black Friday -50% for pizza!',
        desc: 'Black Friday at Domino`s! And, therefore, all fluffy paws will receive a profitable discount on your favorite pizza! From 27.11. to 29.11. buy every second pizza with a discount of -50%!',
        imgPath: './imgs/blackfriday.jpg',
        id: 1
      }
    ]

    const manager = new ActionsManager({ el: document.body.querySelector('.all-actions'), products: det })
    // console.log(manager.el.querySelector('.action-info').querySelector('h1').innerHTML)
    expect(manager.el.querySelector('.action-info h1').innerHTML).toBe(det[0].title)
    expect(manager.el.querySelector('.action-info p').innerHTML).toBe(det[0].desc)
    expect(manager.el.querySelector('.action-img img').getAttribute('src')).toBe(det[0].imgPath)
  })
})
