

export default function checkLoginState(isLoggedIn: object, setIsLoggedIn: (value: object) => void) {
    
    let cookie = document.cookie
    if (cookie) {

        if (cookie) {
            const tokenFromCookie = JSON.parse(cookie.split("=")[1])
            setIsLoggedIn({loggedIn: true, token: tokenFromCookie})
            
        } else {
            setIsLoggedIn({loggedIn: false, token: ''})
        }
    }
}
