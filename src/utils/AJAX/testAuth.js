

export async function testAuth(token) {
    if (token) {
        console.log(token);
        try {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }
    
            let response = await fetch('/api/login/test', options)

            console.log('response: ', response);
            let data = await response.json()
            console.log('data: ', data);
            console.log('testAuth sucess');
            return data
            
        } catch (error) {
            console.log(error.message);
        }
    }
    
}


// TODO:
/* Får inte tillbaka json från backenden, får HTML.. */
// följdfel: Requestet går inte genom middleware





