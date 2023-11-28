export function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Hämta valfri key från LocalStorage
export function getKeyFromLS(key) {
    try {
        const LsData = localStorage.getItem(key)
        console.log(`LsData (key: ${key}): `, LsData)
        return LsData
    } catch (err) {
        console.log(err)
        return
    }
}

// Ange valfri key från LocalStorage
export function setKeyFromLS(key, value) {
    try {
        const LsData = localStorage.setItem(key, value)
        return LsData
    } catch (err) {
        console.log(err)
        return
    }
}

export function getCartQuantity() {
    let count = 0;
    const cart = JSON.parse(localStorage.getItem('cart'));

    // Check if 'cart' is not null and is an array
    if (cart && Array.isArray(cart)) {
        cart.forEach(item => {
            count = count + item.quantity;
        });
    }

    return count;
}
