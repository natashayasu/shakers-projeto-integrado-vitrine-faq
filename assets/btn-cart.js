let selectedOptions = []
let selectedVariant = null

const selects = document.querySelectorAll("select")
const priceProduct = document.querySelector(".product-price")
const productImage = document.querySelector(".product-image")

selects.forEach((select, index) => {

  select.addEventListener("change", () => {

    selectedOptions[index] = select.value

    console.log("Opções:", selectedOptions)

    selectedVariant = variants.find(variant => {
      return variant.options.every((opt, i) => opt === selectedOptions[i])
    })

    console.log("Variant:", selectedVariant)

    if(selectedVariant && priceProduct){
      const price = (selectedVariant.price / 100).toFixed(2)
      priceProduct.innerText = `R$ ${price}`
    }

    if(selectedVariant && productImage){
      if(selectedVariant.featured_image){
        productImage.src = selectedVariant.featured_image.src
      }
    }

  })

})


document.addEventListener("click", function(e) {

  if(e.target.classList.contains("btn-cart")){

    if(!selectedVariant){
      alert("Selecione uma variante")
      return
    }

    fetch('/cart/add.js', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: selectedVariant.id,
        quantity: 1
      })
    })
    .then(() => fetch('/cart.js'))
    .then(res => res.json())
    .then(cart => {

      const cartCount = document.getElementById("cart-count")

      if(cartCount){
        cartCount.innerText = cart.item_count
      }

      console.log("Carrinho atualizado:", cart.item_count)

      alert("Produto adicionado ao carrinho")
    })
    .catch(error => {
      console.error("Erro:", error)
    })

  }

})