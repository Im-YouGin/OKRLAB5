function Get (yourUrl) {
  const Httpreq = new XMLHttpRequest() // a new request
  Httpreq.open('GET', yourUrl, false)
  Httpreq.send(null)
  return Httpreq.responseText
}

const products = JSON.parse(Get('https://my-json-server.typicode.com/Im-YouGin/Pizzeria/products'))

const names = []
products.forEach(element => {
  names.push(element.title)
})

const indexes = JSON.parse(Get('https://my-json-server.typicode.com/Im-YouGin/Pizzeria/indexes'))

export { Get, products, indexes }
