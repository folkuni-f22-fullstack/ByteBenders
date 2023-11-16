

export async function testAuth(token) {

    try {
        if (!token) {
            throw new Error("Missing token");
        }
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


