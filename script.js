
	 function obterPrevisao() {
            const cidade = document.getElementById('cidade').value;
            document.getElementById('previsao').innerHTML = `Previsão para ${cidade}: Ensolarado, 25°C.`;
        }


        // Função para abrir/fechar o menu de acessibilidade
        function toggleAccessibilityMenu() {
            const menu = document.getElementById("accessibilityMenu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }

        // Funções de acessibilidade
        function changeFontSize(action) {
            const body = document.body;
            if (action === "increase") {
                body.style.fontSize = "1.2em";
            } else {
                body.style.fontSize = "1em";
            }
        }

        function toggleHighContrast() {
            document.body.classList.toggle("high-contrast");
        }

        // Função para converter moeda
        async function convertCurrency() {
            const fromCurrency = document.getElementById("fromCurrency").value;
            const toCurrency = document.getElementById("toCurrency").value;
            let amount = document.getElementById("amount").value.replace(",", ".");  // Ajuste para aceitar vírgula

            // Validar se o valor é numérico
            if (isNaN(amount) || amount <= 0) {
                alert("Por favor, insira um valor válido!");
                return;
            }

            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = (amount * exchangeRate).toFixed(2);

            document.getElementById("currencyResult").innerHTML = `<p><strong>${amount} ${fromCurrency} é equivalente a ${convertedAmount} ${toCurrency}</strong></p>`;
        }

        // Função para carregar gráfico de criptomoedas
        async function fetchCryptoPrices() {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin');
            const data = await response.json();
            const labels = data.map(coin => coin.name);
            const prices = data.map(coin => coin.current_price);

            new Chart(document.getElementById("cryptoChart"), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Preço em USD',
                        data: prices,
                        backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
                    }]
                }
            });
        }

        // Países do G20 e suas informações de fuso horário
        const g20Countries = [
            { name: "Argentina", lat: -38.4161, lon: -63.6167, timezone: "America/Argentina/Buenos_Aires" },
            { name: "Australia", lat: -25.2744, lon: 133.7751, timezone: "Australia/Sydney" },
            { name: "Brazil", lat: -14.2350, lon: -51.9253, timezone: "America/Sao_Paulo" },
            { name: "Canada", lat: 56.1304, lon: -106.3468, timezone: "America/Toronto" },
            { name: "China", lat: 35.8617, lon: 104.1954, timezone: "Asia/Shanghai" },
            { name: "France", lat: 46.6034, lon: 1.8883, timezone: "Europe/Paris" },
            { name: "Germany", lat: 51.1657, lon: 10.4515, timezone: "Europe/Berlin" },
            { name: "India", lat: 20.5937, lon: 78.9629, timezone: "Asia/Kolkata" },
            { name: "Indonesia", lat: -0.7893, lon: 113.9213, timezone: "Asia/Jakarta" },
            { name: "Italy", lat: 41.8719, lon: 12.5674, timezone: "Europe/Rome" },
            { name: "Japan", lat: 36.2048, lon: 138.2529, timezone: "Asia/Tokyo" },
            { name: "Mexico", lat: 23.6345, lon: -102.5528, timezone: "America/Mexico_City" },
            { name: "Russia", lat: 55.7558, lon: 37.6173, timezone: "Europe/Moscow" },
            { name: "Saudi Arabia", lat: 23.8859, lon: 45.0792, timezone: "Asia/Riyadh" },
            { name: "South Africa", lat: -30.5595, lon: 22.9375, timezone: "Africa/Johannesburg" },
            { name: "South Korea", lat: 35.9078, lon: 127.7669, timezone: "Asia/Seoul" },
            { name: "Turkey", lat: 38.9637, lon: 35.2433, timezone: "Europe/Istanbul" },
            { name: "United Kingdom", lat: 55.3781, lon: -3.4360, timezone: "Europe/London" },
            { name: "United States", lat: 37.0902, lon: -95.7129, timezone: "America/New_York" }
        ];

        // Inicializar o mapa com países do G20 e suas horas locais
        async function initializeMap() {
            const map = L.map('map').setView([20, 0], 2);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            for (const country of g20Countries) {
                const response = await fetch(`https://world-time1.p.rapidapi.com/timezone/${country.timezone}`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Host': 'world-time1.p.rapidapi.com',
                        'X-RapidAPI-Key': 'YOUR_API_KEY' // Insira sua chave API aqui
                    }
                });

                const data = await response.json();
                const localTime = new Date(data.date_time_txt);
                const localTimeString = localTime.toLocaleString();

                L.marker([country.lat, country.lon])
                    .addTo(map)
                    .bindPopup(`<b>${country.name}</b><br>Hora Local: ${localTimeString}`);
            }
        }

        // Inicializar todos os componentes
        fetchCryptoPrices();
        initializeMap();


	function obterCotacaoCripto() {
            const cripto = document.getElementById('cryptoSelect').value;
            const cotacaoDolar = 40000; // Exemplo: 40.000 USD para 1 BTC
            const cotacaoReal = cotacaoDolar * 5.20; // Exemplo de conversão para BRL (R$)
            document.getElementById('resultadoCripto').innerHTML = `
                ${cripto.toUpperCase()}:
                <br>USD: $${cotacaoDolar.toFixed(2)} 
                <br>BRL: R$${cotacaoReal.toFixed(2)}
            `;
        }

/// API de Cotação de Criptomoedas (CoinGecko)
      

	 // Função para abrir/fechar a barra de acessibilidade
        function toggleAccessibilityBar() {
            const bar = document.getElementById("accessibilityBar");
            bar.style.display = bar.style.display === "block" ? "none" : "block";
        }

	// Funções de acessibilidade
        function changeFontSize(action) {
            const body = document.body;
            if (action === "increase") {
                body.style.fontSize = "1.2em";
            } else {
                body.style.fontSize = "1em";
            }
        }

        function toggleHighContrast() {
            document.body.classList.toggle("high-contrast");
        }

        function toggleLibras() {
            // Função para ativar/desativar Libras, dependendo da implementação
            alert("Função Libras ativa (em desenvolvimento).");
        }

        function toggleProtanopiaMode() {
            document.body.classList.toggle("protanopia-mode");
        }

        function toggleDeuteranopiaMode() {
            document.body.classList.toggle("deuteranopia-mode");
        }

        function toggleTritanopiaMode() {
            document.body.classList.toggle("tritanopia-mode");
        }

