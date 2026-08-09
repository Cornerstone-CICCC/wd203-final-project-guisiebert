// The price in JSON is as a string, this function converts it to a number so it can be calculated.
export function adaptProducts(json) {
  return json.products.map((product) => ({
    ...product,
    price: Number(product.price),
  }))
}

// This function formats the price to be displayed on the page.
export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}
