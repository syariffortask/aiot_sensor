# app/routes/dashboard.py
from flask import Blueprint, render_template, session, redirect, url_for, flash

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard')
def home():
    if not session.get('username'):
        flash('Anda belum login', 'error')
        return redirect(url_for('auth.login'))
    
    return render_template('dashboard.html',)