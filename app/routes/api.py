from flask import Blueprint, jsonify
from app.models.models import SensorData

api_bp = Blueprint('api', __name__)

@api_bp.route('/api/data-permenit')
def get_data_permenit():
    # Mengambil 30 data terakhir yang diurutkan berdasarkan waktu terbaru
    data = SensorData.query.order_by(SensorData.waktu.desc()).limit(30).all()
    
    # Mengonversi setiap entri menjadi dictionary
    data_json = [{
        'suhu': entry.suhu,
        'kelembaban': entry.kelembaban,
        'waktu': entry.waktu
    } for entry in data]
    
    return jsonify(data_json)
