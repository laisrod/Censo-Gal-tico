const apiURL = 'https://swapi.dev/api/planets/?format=json';

async function fetchPlanets() {
    try {
        const response = await fetch('https://swapi.dev/api/planets/?format=json');
        const data = await response.json();
        const planets = data.results;

        const body = document.body;

        console.log(planets);


        planets.forEach(planet => {
            const button = document.createElement('button');
            button.textContent = planet.name;
            document.body.appendChild(button);

            button.addEventListener('click', () => {
                displayPlanetDetails(planet);
            });

            body.appendChild(button);
        });
    } catch (error) {
        console.error('Erro ao buscar planetas:', error);
    }
}

async function displayPlanetDetails(planet) {

    const previousInfo = document.querySelector('.planet-info');
    if (previousInfo) {
        previousInfo.remove();
    }

    const planetInfo = document.createElement('div');
    planetInfo.classList.add('planet-info');

    planetInfo.innerHTML = `
        <h2>${planet.name}</h2>
        <p><strong>Clima:</strong> ${planet.climate}</p>
        <p><strong>População:</strong> ${planet.population}</p>
        <p><strong>Terreno:</strong> ${planet.terrain}</p>
        <h3>Habitantes Famosos:</h3>
        <ul id="residents-list">Carregando...</ul>
    `;

    document.body.appendChild(planetInfo);

    const residentsList = document.getElementById('residents-list');
    if (planet.residents.length === 0) {
        residentsList.innerHTML = '<li>Não há habitantes famosos.</li>';
    } else {
        residentsList.innerHTML = '';
        for (const residentURL of planet.residents) {
            try {
                const residentResponse = await fetch(residentURL + '?format=json');
                const residentData = await residentResponse.json();
                const listItem = document.createElement('table');
                listItem.textContent = `${residentData.name} - Nascimento: ${residentData.birth_year}`;
                residentsList.appendChild(listItem);
            } catch (error) {
                console.error('Erro ao buscar habitante:', error);
            }
        }
    }
}

document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;

    if (query) {
        try {
            const response = await fetch('https://swapi.dev/api/planets/?format=json');
            const data = await response.json();
            if (data.results.length > 0) {
                displayPlanetDetails(data.results[0]);
            } else {
                alert('Planeta não encontrado!');
            }
        } catch (error) {
            console.error('Erro ao buscar planeta:', error);
        }
    }
});

fetchPlanets();
