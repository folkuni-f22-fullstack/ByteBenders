



// Returnerar en tid som maträtten bör vara klar på
export function finishedTime(count) {
    
    if (
        !localStorage.getItem('ETA') 
        ) {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        
        let newMinutes = currentMinutes + count;
        let newHours = currentHour + Math.floor(newMinutes / 60);

        newMinutes = newMinutes % 60;
        newHours = newHours % 24;

        const formattedMinutes = newMinutes < 10 ? `0${newMinutes}` : `${newMinutes}`;
        const formattedHours = newHours < 10 ? `0${newHours}` : `${newHours}`;

        const ETA = `${formattedHours}:${formattedMinutes}`;
        
        localStorage.setItem('ETA', ETA);
        return ETA;
    } else {
        return localStorage.getItem('ETA');
    }
}


export function checkIfDishIsFinished(count, setCurrentOrder) {
    let orderTime = localStorage.getItem('ETA');

    if (orderTime) {
        // Hämtar aktuell tid
        let currentDate = new Date();
        let orderDate = new Date();
        let [hours, minutes] = orderTime.split(':');
        
        orderDate.setHours(hours);
        orderDate.setMinutes(minutes);
        
        // Jämför hela datumet och tiden för att se om ordern är klar
        if (currentDate >= orderDate) {
            setCurrentOrder({ isOrdered: true, isWaiting: false });
        }
    }
}
