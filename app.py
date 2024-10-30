from app import create_app, db
from app.mqtt import start_mqtt_thread


app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Membuat semua tabel di database jika belum ada
    
    # Memulai thread MQTT
    start_mqtt_thread()
    
    app.run(debug=False, host='0.0.0.0')  # Menjalankan aplikasi di mode debug
