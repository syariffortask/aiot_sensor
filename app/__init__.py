from flask import Flask
from flask_migrate import Migrate
from app.models.models import db
import threading

def create_app():
    app = Flask(__name__)
    
    # App Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://remote_user:superadmin@localhost/aiot'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = '1nt4l2012'
    
    db.init_app(app)
    Migrate(app, db)
    

    # Register App Route Blueprints
    from app.routes.auth import auth_bp
    from app.routes.dashboard import dashboard_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)

    return app
