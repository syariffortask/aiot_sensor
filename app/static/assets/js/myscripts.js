$(document).ready(function() {
    // Data Dummy
    const labels = Array.from({ length: 60 }, (_, i) => `${i < 10 ? '0' : ''}${i}:00`);
    // Data Dummy untuk suhu dan kelembaban per menit (60 data)
    const suhuData = Array.from({ length: 60 }, () => (Math.random() * 10 + 20).toFixed(1)); // Suhu antara 20-30 °C
    const kelembabanData = Array.from({ length: 60 }, () => (Math.random() * 20 + 60).toFixed(1)); // Kelembaban antara 60-80%


    // Chart Suhu
    const suhuOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false // Menonaktifkan toolbar
            }
        },
        series: [{
            name: 'Suhu (°C)',
            data: suhuData
        }],
        xaxis: {
            categories: labels
        },stroke: {
            curve: 'smooth'  // Membuat garis smooth
        },
        title: {
            text: 'Suhu per menit',
            align: 'left'
        },
        colors: ['#FF4500'], // Warna Oranye untuk suhu
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        }
    };

    const suhuChart = new ApexCharts(document.querySelector("#Suhu"), suhuOptions);
    suhuChart.render();

    // Chart Kelembaban
    const kelembabanOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false // Menonaktifkan toolbar
            }
        },
        stroke: {
            curve: 'smooth'  // Membuat garis smooth
        },
        series: [{
            name: 'Kelembaban (%)',
            data: kelembabanData
        }],
        xaxis: {
            categories: labels
        },
        title: {
            text: 'Kelembaban per menit',
            align: 'left'
        },
        colors: ['#1E90FF'], // Warna Biru untuk kelembaban
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        }
    };

    const kelembabanChart = new ApexCharts(document.querySelector("#Kelmbaban"), kelembabanOptions);
    kelembabanChart.render();
});