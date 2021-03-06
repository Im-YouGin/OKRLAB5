
import {
  ActionsManager,
  actions
} from './actions.js'

import {
  classicPizzaProds,
  premiumPizzaProds,
  legendPizzaProds,
  customPizzaProds,
  bestPriceProds,
  recommendedProds
} from './products.js'

import { ProductsManager, getCartSum } from './cardTools.js'
import { products } from './dbapi.js'

import { CartManager } from './cartProdTools.js'

document.onreadystatechange = function () {
  try {
    if (document.readyState !== 'complete') {
      document.querySelector('.page-wrapper').style.visibility = 'hidden'
      document.querySelector('#loader').style.visibility = 'visible'
    } else {
      document.querySelector('#loader').style.display = 'none'
      document.querySelector('.page-wrapper').style.visibility = 'visible'
    }
  } catch (error) {

  }
}

const cart = document.querySelector('.shopping-cart')
if (cart) {
  cart.setAttribute('onclick', "location.href='#cart'")
}

const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('#header .nav-bar .nav-list ul')
const menuItem = document.querySelectorAll('#header .nav-bar .nav-list ul li a')

if (hamburger) {
  hamburger.addEventListener('click', () => {
    console.log(1)
    hamburger.classList.toggle('active')
    mobileMenu.classList.toggle('active')
  })
}

if (menuItem) {
  menuItem.forEach((item) => {
    item.addEventListener('click', () => {
      hamburger.classList.toggle('active')
      mobileMenu.classList.toggle('active')
    })
  })
}

const actionsSection = (
    `
    <section id="actions">
        <div class="actions container">
            <div class="section-title">Discounts</div>
            <div class="all-actions"></div>
        </div>
    </section>
    `
)

const homeSection = (
    `
    <section id="pizza">
        <div class="pizza container">
            <div class="section-title">Pizza Menu</div>
            <div class="discounts-slider">
                <div class="slides">
                    <input type="radio" name="radio-btn" id="radio1">
                    <input type="radio" name="radio-btn" id="radio2">
                    <input type="radio" name="radio-btn" id="radio3">

                    <a href="#actions" class="details-btn">Details</a>

                    <div class="slide first">
                        <img src="{{aimg1}}" alt="">
                    </div>
                    <div class="slide">
                        <img src="{{aimg2}}" alt="">
                    </div>
                    <div class="slide">
                        <img src="{{aimg3}}" alt="">
                    </div>

                    <div class="slides-auto">
                        <div class="auto-btn1"></div>
                        <div class="auto-btn2"></div>
                        <div class="auto-btn3"></div>
                    </div>

                    <div class="slides-manual">
                        <label for="radio1" class="manual-btn"></label>
                        <label for="radio2" class="manual-btn"></label>
                        <label for="radio3" class="manual-btn"></label>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section id='best-price'>
        <div class="best-price container">
            <div class="section-title">Best Price</div>
            <div class="product-list"></div>   
        </div>
    </section>

    <section id="recommendations">
        <div class="recommendations container">
            <div class="section-title">We Recommend</div>
            <div class="product-list"></div>
        </div>                
    </section>
    `.replace('{{aimg1}}', actions[0].imgPath).replace('{{aimg2}}', actions[1].imgPath).replace('{{aimg3}}', actions[2].imgPath)
)

const productsSection = (
    `
    <section id="classic-pizza">
        <div class="classic-pizza container">
            <div class="section-title">Classic Pizza</div>
            <div class="product-list"></div>
        </div>                
    </section>
    
    <section id="premium-pizza">
        <div class="premium-pizza container">
            <div class="section-title">Premium Pizza</div>
            <div class="product-list"></div>
        </div>
    </section>

    <section id='legend-pizza'>
        <div class="legend-pizza container">
            <div class="section-title">Legend Pizza</div>
            <div class="product-list"></div>
        </div>
    </section>

    <section id='custom-pizza'>
        <div class="custom-pizza container">
            <div class="section-title">Custom Pizza</div>
            <div class="product-list"></div>
        </div>
    </section>
    `
)

const prodByCatSection = (
    `
    <section id="{{cat}}-pizza">
        <div class="{{cat}}-pizza container">
            <div class="section-title">{{cat}} Pizza</div>
            <div class="product-list"></div>
        </div>                
    </section>
    `
)

const prodDetSection = (
    `
    <section id="product-det">
        <div class="product-det">
            <div class="product-det__col1">
                <div class="product-get__col1-img-wrap">
                    <img src="{{imgPath}}" alt="" class="product-det-img">
                </div>  
            </div>
            <div class="product-det__col2">
                <div class="product-det__col2-title">{{title}}</div>
                <div class="product-det-toppings">Toppings:</div>
                <div class="product-det__col2-desc">
                    <p>{{desc}}</p>
                </div>
                <div class="product-block__price-block">
                    <span class="product-block__price">{{price}}</span>
                    <span class="product-block__currency">Uah</span>
                </div>
                <a href="#{{href}}" class="to-cart-btn">Add to Cart</a>

            </div>
        </div>
        
    </section>
    `
)

const cartProdSection = (
    `
    <div class="cart-container">
        <div class="cart-title">Your Order</div>
        <div class="cart-container__order">
            <div class="cart-container__body"></div>
            <div class="cart-container__price-row"></div>
        </div>
        <div class="cart-total-cost"></div>
        <div class="submit-btn">
            <a href="#order">Submit</a>
        </div>
    </div>
    `
)

const checkoutForm = (
    `
    <div class="checkout">
        <div class="checkout-title">Delivery</div>
        <div class="checkout-form">
            <div id="error"></div>
            <form method="POST" id="checkout-form">
                <div class="fields-cont">
                    <label class="form-label" for="FirstName">First Name</label>
                    <br>
                    <input class='form-input' type="text" id="FirstName" name='FirstName' placeholder="First Name" required>
                </div>
                <div class="fields-cont">
                    <label class="form-label" for="LastName">Last Name</label>
                    <br>
                    <input class='form-input' type="text" id="LastName" name='LastName' placeholder="Last Name" required>
                </div>
                <div class="fields-cont">
                    <label class="form-label" for="Phone">Phone Number</label>
                    <br>
                    <input class='form-input' type="tel" id="Phone" name='Phone' placeholder="Ex: 044 111 11 11" pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}" required>
                </div>
                <div class="fields-cont">
                    <label class="form-label" for="Email">Email</label>
                    <br>
                    <input class='form-input' type="email" id="Email" name='Email' placeholder="someone@example.com" required>

                </div>
                <div class="fields-cont">
                    <label class="form-label" for="DeliveryTime">Delivery Time</label>
                    <br>
                    <input class='form-input' type="datetime-local" id="DeliveryTime" name="DeliveryTime" min="{{minDate}}T00:00" max="{{maxDate}}T00:00">

                </div>
                <div class="fields-cont">
                    <label class="form-label" for="Address">Address</label>
                    <br>
                    <input class='form-input' type="text" id="Address" name='Address' placeholder="Address" required>
                </div>
                <!-- <label for="PaymentType">Address</label> -->
                <div class="fields-cont">
                    <label class="form-label" for="PaymentType">Payment Type</label>
                    <br>
                    <input class='form-input' type="text" id="PaymentType" name='PaymentType' placeholder="Cash / Online" pattern="Cash|Online" required>
                </div>

                <button class='submit-btn' type="submit">Submit</button>
            </form>
        </div>
    </div>
    `
)

const submittedTemplate = (
    `
    <div class="order-submitted">
        <div class="section-title">You Submitted the Order!</div>
        <div class="submitted-details">
            <div class="submitted-row"><span>First name      : {{fname}}</span></div>
            <div class="submitted-row"><span>Last name       : {{lname}}</span></div>
            <div class="submitted-row"><span>Phone number    : {{pnumber}}</span></div>
            <div class="submitted-row"><span>Email           : {{email}}</span></div>
            <div class="submitted-row"><span>Address         : {{address}}</span></div>
            <div class="submitted-row"><span>Delivery time   : {{dtime}}</span></div>
            <div class="submitted-row"><span>Payment type    : {{payment}}</span></div>
            <div class="submitted-row"><p>Ordered products: {{products}}</p></div>
            <div class="submitted-row"><span>Total cost: {{total}} UAH</span></div>
        </div>
        <div class="submit-btn">
            <a href="#products">to catalog</a>
        </div>
    </div>
    `
)

function formatDate (date) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) { month = '0' + month }
  if (day.length < 2) { day = '0' + day }

  return [year, month, day].join('-')
}

function calcTotalCost (existing) {
  let totalCost = 0
  for (const key in existing) {
    const t = key.split(',')[0]
    const dd = products.filter((prod) => { return prod.title === t })[0]
    const price = parseFloat(dd.price)
    totalCost = totalCost + price * existing[key]
  }
  totalCost = Number(totalCost.toFixed(3))
  return totalCost
}

let counter = 1

setInterval(function () {
  try {
    document.getElementById('radio' + counter).checked = true
  } catch (error) {
    return
  }

  counter++
  if (counter > 3) {
    counter = 1
  }
}, 5000)

location.hash = '#'

const pageCont = document.querySelector('.main-container')

function renderHome () {
  if (pageCont) {
    pageCont.innerHTML = homeSection
  }

  new ProductsManager({
    el: document.querySelector('#best-price .product-list'),
    products: bestPriceProds
  })

  new ProductsManager({
    el: document.querySelector('#recommendations .product-list'),
    products: recommendedProds
  })
}
renderHome()

const allowedProdDetHash = products.map(x => x.prodUrl)
const allowedProdCats = products.map(x => 'category/' + x.category)

function hashChange () {
  const hash = window.location.hash.split('#')[1]
  const pageCont = window.document.querySelector('.main-container')
  let existing = localStorage.getItem('cart')
  existing = existing ? JSON.parse(existing) : {}
  const cartNumber = document.querySelector('.shopping-cart-number')
  if (cartNumber) {
    cartNumber.innerHTML = getCartSum(existing)
  }
  // ACTIONS PAGE
  if (hash === 'actions') {
    pageCont.innerHTML = actionsSection
    new ActionsManager({
      el: window.document.querySelector('#actions .all-actions'),
      products: actions
    })
  } else if (hash === 'products') {
    pageCont.innerHTML = productsSection

    new ProductsManager({
      el: window.document.querySelector('#classic-pizza .product-list'),
      products: classicPizzaProds
    })

    new ProductsManager({
      el: window.document.querySelector('#premium-pizza .product-list'),
      products: premiumPizzaProds
    })

    new ProductsManager({
      el: window.document.querySelector('#legend-pizza .product-list'),
      products: legendPizzaProds
    })

    new ProductsManager({
      el: window.document.querySelector('#custom-pizza .product-list'),
      products: customPizzaProds
    })
  } else if (allowedProdDetHash.includes(hash)) {
    const prod = products.filter((prod) => { return prod.prodUrl === hash })[0]
    const tmpDet = prodDetSection.replace('{{imgPath}}', prod.imgPath).replace('{{title}}', prod.title).replace('{{desc}}', prod.desc).replace('{{price}}', prod.price).replace('{{href}}', prod.prodUrl)
    pageCont.innerHTML = tmpDet

    // ADD TO CART CLICK
    const addToCart = document.querySelector('.to-cart-btn')
    addToCart.onclick = () => {
      let existing = localStorage.getItem('cart')
      existing = existing ? JSON.parse(existing) : {}
      // console.log(existing);
      const k = prod.title + ',Medium,Standard'
      if (k in existing) {
        existing[k] += 1
      } else {
        existing[k] = 1
      }

      localStorage.setItem('cart', JSON.stringify(existing))
      document.querySelector('.shopping-cart-number').innerHTML = getCartSum(existing)
    }
  } else if (allowedProdCats.includes(hash)) {
    const cat = hash.split('/')[1]
    const tmpCat = prodByCatSection.replace(/{{cat}}/g, cat)
    const tmpProds = products.filter((prod) => { return prod.category === cat })
    pageCont.innerHTML = tmpCat

    new ProductsManager({
      el: window.document.querySelector('#{{cat}}-pizza .product-list'.replace('{{cat}}', cat)),
      products: tmpProds
    })
  } else if (hash === 'cart') {
    if (pageCont) {
      pageCont.innerHTML = cartProdSection
      document.querySelector('.submit-btn').setAttribute('onclick', "location.href='#order'")
      existing = localStorage.getItem('cart')
      existing = existing ? JSON.parse(existing) : {}
      const a = getCartSum(existing)

      const totalCost = calcTotalCost(existing)
      document.querySelector('.cart-total-cost').innerHTML = 'Total cost: ' + Number(totalCost.toFixed(3)).toString()
      if (!a) {
        pageCont.innerHTML = (
                  `
                  <div class="cart-container">
                      <div class="cart-title">Your Cart is Empty</div>
                  
                  </div>
                  `
        )
      }

      // window.document.querySelector('.order-submit-btn').innerHTML = '';
    }
    const cartProds = []
    for (const key in existing) {
      const t = key.split(',')[0]
      const features = key.split(',').slice(1).join(', ')
      const pr = {}
      const dd = products.filter((prod) => { return prod.title === t })[0]
      Object.assign(pr, dd)
      pr.features = features
      pr.quatity = existing[key]
      cartProds.push(pr)
    }
    new CartManager({
      el: window.document.querySelector('.cart-container__body'),
      products: cartProds
    })
  } else if (hash === 'order') {
    const mindt = formatDate(new Date())
    let maxdt = new Date()
    maxdt.setDate(maxdt.getDate() + 7)
    maxdt = formatDate(maxdt)
    pageCont.innerHTML = checkoutForm.replace('{{minDate}}', mindt).replace('{{minDate}}', maxdt)
    const checkForm = document.querySelector('#checkout-form')
    checkForm.addEventListener('submit', function (event) {
      event.preventDefault()
      const fname = document.querySelector('#FirstName').value
      const lname = document.querySelector('#LastName').value
      const phone = document.querySelector('#Phone').value
      const email = document.querySelector('#Email').value
      const dtime = document.querySelector('#DeliveryTime').value
      const address = document.querySelector('#Address').value
      const ptype = document.querySelector('#PaymentType').value
      if (!fname || !lname || !phone || !email || !dtime || !address || !ptype) {
        return
      }
      const newOrder = {
        FirstName: fname,
        LastName: lname,
        Phone: phone,
        Email: email,
        DeliveryTime: dtime,
        Address: address,
        PaymentType: ptype,
        Products: localStorage.getItem('cart')
      }
      // console.log(newOrder)
      fetch('https://my-json-server.typicode.com/Im-YouGin/Pizzeria/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      })
        .then(response => response.json())
        .then(data => {
          const orderId = data.id
          history.pushState({}, null, '#order/' + orderId.toString())
          const orderedProds = localStorage.getItem('cart').replace('{', '').replace('}', '').replace(/,/g, ', ').replace(/:/g, ': ')
          const totalCost = calcTotalCost(existing)
          const tmpTpl = submittedTemplate.replace('{{fname}}', fname)
            .replace('{{lname}}', lname)
            .replace('{{pnumber}}', phone)
            .replace('{{email}}', email)
            .replace('{{address}}', address)
            .replace('{{dtime}}', dtime.replace('T', ' '))
            .replace('{{payment}}', ptype)
            .replace('{{products}}', orderedProds)
            .replace('{{total}}', totalCost)
          pageCont.innerHTML = tmpTpl
          localStorage.setItem('cart', JSON.stringify({}))
        })
    }, false)
  } else {
    location.hash = '#'
    pageCont.innerHTML = homeSection

    new ProductsManager({
      el: document.querySelector('#best-price .product-list'),
      products: bestPriceProds
    })

    new ProductsManager({
      el: document.querySelector('#recommendations .product-list'),
      products: recommendedProds
    })
  }
}

window.addEventListener('hashchange', function () {
  hashChange()
}, false)

window.addEventListener('load', function () {
  let existing = localStorage.getItem('cart')
  existing = existing ? JSON.parse(existing) : {}

  document.querySelector('.shopping-cart-number').innerHTML = getCartSum(existing)
})

export { productsSection, cartProdSection, pageCont, hashChange, calcTotalCost, renderHome, formatDate }
