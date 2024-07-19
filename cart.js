const cartProductsE = document.getElementById("cartProducts");
const productTemplate = document.getElementById("productTemplate").content;
const totalPriceE = document.getElementById("totalPrice");
const discountForm = document.querySelector("form");
const discountInput = document.getElementById("discountInput");
const discountE = document.getElementById("discount");
const couponBtn = document.getElementById("couponBtn");
const voucherInput = document.getElementById("voucherInput");
const voucherBtn = document.getElementById("voucherBtn");
const activeCoupons = [
    {text: "15%", value: 15},
    {text: "50%", value: 50},
    {text: "90%", value: 90}
];

const vouchers = [
    {text: "ASDJW", value: 50},
    {text: "OFJWOAF", value: 100},
    {text: "FSSAFAWSF", value: 250}
];


let totalDiscount = 0;
let couponAccepted = false;
let voucherAccepted = false;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let productsInCart = [];

cart.forEach(product => {
    const {category, id, image, price, rating, title} = product;
    if (productsInCart.includes(id)) {
        document.querySelectorAll(".count").forEach((productCount, i) => {
            if (productCount.key === id) {
                productCount.textContent++;
                document.querySelectorAll(".price")[i].textContent = (productCount.textContent * price).toFixed(2)  ;
            }
        });
    } else {
        const productE = productTemplate.cloneNode(true);
        const container = productE.querySelector(".container");
        const titleE = productE.getElementById("title");
        const imgE = productE.getElementById("img");
        const priceE = productE.getElementById("price");
        const deleteBtn = productE.getElementById("deleteProduct");
        const addBtn = productE.getElementById("addProduct");
        const removeBtn = productE.getElementById("removeProduct");
        const productCount = productE.getElementById("productCount");
    
        titleE.textContent = title;
        imgE.src = image;
        productCount.textContent = 1;
        priceE.textContent = price;
        productCount.key = id;
        productsInCart.push(id);
    
        container.setAttribute("data-id", id);

            
        cartProductsE.append(productE); 

        deleteBtn.addEventListener("click", () => {
            console.log(productsInCart.indexOf(id));
            productsInCart.splice(productsInCart.indexOf(id), 1);

            const productElement = cartProductsE.querySelector(`[data-id="${id}"]`);
            if (productElement) {
                cartProductsE.removeChild(productElement);
            }

            cart = cart.filter(e => {
                return e.id !== id;
            })

            localStorage.setItem("cart", JSON.stringify(cart));
            getTotalPrice();
        });

        addBtn.addEventListener("click", () => {
            productCount.textContent++;
            priceE.textContent = (productCount.textContent * price).toFixed(2);
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            getTotalPrice();
        })

        removeBtn.addEventListener("click", () => {
            console.log(productCount.textContent);
            if (productCount.textContent > 1) {
                productCount.textContent--;
                priceE.textContent = (productCount.textContent * price).toFixed(2);
                cart.splice(id, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                getTotalPrice();
            }
        })
    }
});

discountForm.addEventListener("submit", (e) => {
    e.preventDefault();
})

couponBtn.addEventListener("click", () => {
    activeCoupons.forEach(coupon => {
        if (coupon.text === discountInput.value) {
            alert("Coupon accepted");
            couponAccepted = true;
            couponBtn.disabled = true;
            const discount = coupon.value;
            const price = parseFloat(totalPriceE.textContent);
            const couponDiscount = ((price / 100) * discount);
            totalDiscount += couponDiscount;
            discountE.textContent = totalDiscount.toFixed(2) + " $";
            getTotalPrice();
        }
    })

    !couponAccepted && alert("Invalid coupon");
})

voucherBtn.addEventListener("click", () => {
    vouchers.forEach(voucher => {
        if (voucher.text === voucherInput.value) {
            alert(`${voucher.value}$ voucher accepted`);
            voucherAccepted = true;
            const discount = voucher.value;
            const price = parseFloat(totalPriceE.textContent);
            const voucherDiscount = price - discount < 0 ? price : discount;
            totalDiscount += voucherDiscount;
            discountE.textContent = totalDiscount.toFixed(2) + " $";
            getTotalPrice();
        }
    })

    !voucherAccepted && alert("Invalid voucher");
})


const getTotalPrice = () => {
    let price = 0;
    document.querySelectorAll(".price").forEach(e => {
        price += parseInt(e.textContent);
    })

    totalPriceE.textContent = ((price + ((price / 100) * 21)) - totalDiscount ) < 0 ? 0 : ((price + ((price / 100) * 21)) - totalDiscount ).toFixed(2);
}

getTotalPrice();