$(document).ready(function() {
    // Fungsi untuk mengambil data dari API dan menggambar chart
    function fetchDataAndRenderCharts() {
        $.ajax({
            url: '/api/data-permenit', // Endpoint API
            method: 'GET',
            success: function(data) {
                // Menyiapkan data untuk chart
                const suhuData = data.map(entry => entry.suhu);
                const kelembabanData = data.map(entry => entry.kelembaban);
                const labels = data.map(entry => new Date(entry.waktu).toLocaleTimeString()); // Format waktu

                // Opsi untuk chart suhu
                const suhuOptions = {
                    chart: {
                        type: 'area',
                        height: 350,
                        toolbar: {
                            show: false // Menonaktifkan toolbar
                        },
                        zoom: {
                            enabled: false // Menonaktifkan zoom
                        }
                    },
                    series: [{
                        name: 'Suhu (°C)',
                        data: suhuData
                    }],
                    xaxis: {
                        categories: labels
                    },
                    stroke: {
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

                // Opsi untuk chart kelembaban
                const kelembabanOptions = {
                    chart: {
                        type: 'area',
                        height: 350,
                        toolbar: {
                            show: false // Menonaktifkan toolbar
                        },
                        zoom: {
                            enabled: false // Menonaktifkan zoom
                        }
                    },
                    series: [{
                        name: 'Kelembaban (%)',
                        data: kelembabanData
                    }],
                    xaxis: {
                        categories: labels
                    },
                    stroke: {
                        curve: 'smooth'  // Membuat garis smooth
                    },
                    title: {
                        text: 'Kelembaban per menit',
                        align: 'left'
                    },
                    colors: ['#00BFFF'], // Warna Biru untuk kelembaban
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

                // Menggambar chart suhu
                if (window.chartSuhu) {
                    window.chartSuhu.updateOptions(suhuOptions);
                } else {
                    window.chartSuhu = new ApexCharts(document.querySelector("#Suhu"), suhuOptions);
                    window.chartSuhu.render();
                }

                // Menggambar chart kelembaban
                if (window.chartKelembaban) {
                    window.chartKelembaban.updateOptions(kelembabanOptions);
                } else {
                    window.chartKelembaban = new ApexCharts(document.querySelector("#Kelmbaban"), kelembabanOptions);
                    window.chartKelembaban.render();
                }
            },
            error: function(error) {
                console.error("Error fetching data:", error);
            }
        });
    }

    // Panggil fungsi untuk mengambil data dan menggambar chart saat halaman dimuat
    fetchDataAndRenderCharts();

    // Memperbarui chart setiap 5 detik
    setInterval(fetchDataAndRenderCharts, 5000);
});
