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
        // console.log(`LsData (key: ${key}): `, LsData)
        return LsData
    } catch (err) {
        console.log(err)
        return
    }
}