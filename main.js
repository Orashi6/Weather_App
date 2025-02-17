const weather = async (city) => {
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

        const card = document.querySelector('.card');
        card.classList.add('card'); // Ensure the class is added

        card.innerHTML = `
            <div>
                <input class="input" type="text" value="${result.location.name}">
                <button class="chek">Check</button>
            </div>
            <img src="${result.current.condition.icon}" alt="Weather Icon">
            <p class="country">${result.location.name}</p>
            <p class="gradus">Temperature: ${result.current.temp_c}</p>
            <p class='humiditiy'>Humidity: ${result.current.humidity}</p>
            <p class='wind'>Wind: ${result.current.wind_kph}</p>
        `;

        // Event listener setup *after* the card is populated
        const btn = card.querySelector('.chek');
        const input = card.querySelector('.input');

        btn.addEventListener('click', () => {
            const newCity = input.value;
            weather(newCity); // Call weather with the new city
        });

    } catch (error) {
        console.error("Error fetching weather:", error);
        const card = document.querySelector('.card'); // Select the card correctly
        if (card) { // Check if the card element exists before trying to modify it.
          card.innerHTML = "<p>Error fetching weather data. Please check the city name and your API key.</p>";
        } else {
          console.error("Card element not found!"); // Log an error if the card isn't found.
        }
    }
};


// Get the initial city from the input field on page load
window.addEventListener('DOMContentLoaded', () => {
    const initialInput = document.querySelector('.input'); // Select your input field
    if (initialInput) {
        const initialCity = initialInput.value;
        weather(initialCity);
    } else {
      console.error("Initial input field not found!");
      // Perhaps provide a default city or a way for the user to enter one.
      weather('tashkent'); // Or some default city.
    }
});