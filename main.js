const weather = async (city) => {  // Accept city as a parameter
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': `f6ca4d723dmsh661656e56ac8eb5p1a6e0bjsn4cc36dda1471`, // Replace with your actual key if needed
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        const card = document.querySelector('.card'); // Select the card element
        card.classList.add('card');

        card.innerHTML = `
          <div> <input class="input" type="text" value="${result.location.name}"> <button class="chek">Check</button></div> 
            <img src="${result.current.condition.icon}" alt="Weather Icon">
            <p class="gradus">temperature:${result.location.name}</p>
            <p class="country">${result.current.temp_c}</p>
            <p class='humiditiy'>humidity:${result.current.humidity}</p>
             <p class='wind'>wind:${result.current.wind_kph}</p>
        `;

        // Attach event listener AFTER the card is populated and the input is available
        const btn = card.querySelector('.chek');  // Get the button inside the card.
        const input = card.querySelector('.input'); // Get the input inside the card.

        btn.addEventListener('click', () => {
             weather(input.value); // Call weather with the new city
        });


    } catch (error) {
        console.error("Error fetching weather:", error);
        const card = document.querySelector('div');
        card.innerHTML = "<p>Error fetching weather data. Please check the city name and your API key.</p>";
    }
};

// Initial call (e.g., for Tashkent)
weather('tashkent');