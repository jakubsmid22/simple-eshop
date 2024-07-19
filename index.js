const featuredProductsE = document.getElementById("featuredProducts");
const productTemplate = document.getElementById("productTemplate").content;

const cart =  JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);

function getRandomProducts(products) {
    let result = [];
    let clone = products.slice();
    
    for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * clone.length);
        result.push(clone[index]);
        clone.splice(index, 1);
    }
    
    return result;
}



fetch("https://fakestoreapi.com/products")
    .then(response => {
        if (!response.ok) {
            throw new Error (response.statusText);
        }
        return response.json();
    })
    .then(data => {
        getRandomProducts(data).forEach(product => {
            const {category, description, id, image, price, rating, title} = product;
            const productE = productTemplate.cloneNode(true);
            const titleE = productE.getElementById("title");
            const imgE = productE.getElementById("img");
            const categoryE = productE.getElementById("category");
            const ratingE = productE.getElementById("rating");
            const priceE = productE.getElementById("price");
            const btn = productE.getElementById("btn");

            titleE.textContent = title;
            imgE.src = image;
            categoryE.textContent = category;
            ratingE.textContent = rating.rate;
            priceE.textContent = price + " $";


            featuredProductsE.append(productE);

            btn.addEventListener("click", () => {
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
            })

        });
    })