
export function deleteCookie() {
    let d = new Date();
    d.setTime(d.getTime() - (1 * 60 * 60 * 1000));
    
    document.cookie = `user_cookie=; expires=${d.toUTCString()}`;  
}


export function saveCookie(token: string) {
    // Sparar token i cookies
    let d = new Date();
    d.setTime(d.getTime() + 1 * 60 * 60 * 1000);
    document.cookie = `user_cookie=${JSON.stringify(
        token
    )}; expires=${d.toUTCString()}`;
}