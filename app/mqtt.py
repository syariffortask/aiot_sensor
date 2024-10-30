import paho.mqtt.client as mqtt
import json
from app.models.models import db, SensorData
from threading import Thread
from app import create_app

app = create_app()

# Fungsi yang dipanggil saat terhubung ke broker
def on_connect(client, userdata, flags, rc):
    print("Terhubung ke broker MQTT dengan kode status:", rc)
    client.subscribe("AIOT/data")  # Berlangganan pada topik yang benar

# Fungsi yang dipanggil saat menerima pesan
def on_message(client, userdata, message):
    print(f"Menerima pesan dari topik: {message.topic}")
    try:
        # Mengurai payload JSON
        data = json.loads(message.payload.decode())
        suhu = float(data.get("suhu"))
        kelembaban = float(data.get("kelembaban"))

        # Menggunakan konteks aplikasi saat menyimpan data ke database
        with app.app_context():
            # Menyimpan data ke database
            sensor_data = SensorData(suhu=suhu, kelembaban=kelembaban)
            db.session.add(sensor_data)
            db.session.commit()
            print("Data berhasil disimpan:", sensor_data)

    except Exception as e:
        print(f"Error saat memproses pesan: {e}")

# Fungsi untuk menjalankan client MQTT
def run_mqtt():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    # Ganti dengan informasi broker Anda
    client.connect("mqtt-dashboard.com", 1883, 60)  # Port default MQTT

    client.loop_forever()  # Mulai loop untuk mendengarkan pesan

# Memulai MQTT dalam thread terpisah
def start_mqtt_thread():
    mqtt_thread = Thread(target=run_mqtt)
    mqtt_thread.start()
