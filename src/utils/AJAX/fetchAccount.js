export default async function fetchAccount(username, password) {
    const baseUrl = '/api/login'

    try {
        let body = {
            name: username,
            password: password
        }
        
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }

        let response
        try {
            response = await fetch(baseUrl, options)
            
        } catch (error) {
            console.log('Server is down');
            throw new Error('Server is down');
        }
        
        let data = await response.json()
        
        // console.log('data: ', data);
        // Data är ett objekt med egenskapen token som är jwt-strängen || ett objekt med egenskapen message som är ett felmeddelande
        return data
    } catch (error) {
        /* Detta catch-block körs endast när servern inte kan nås */
        console.log('Catch response.status: ', response.status);
        console.log( 'error.message: ', error.message);
        return error.message
    }
}

// fetchAccount('JohnDoe', "12345679")