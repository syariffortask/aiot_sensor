from flask import Blueprint,render_template,redirect,request,url_for,flash,session

from app.models.models import db,User

auth_bp = Blueprint('auth',__name__)

@auth_bp.route('/', methods=['GET', 'POST'])
def login():
    if session.get('username'):
        flash('Anda sudah login', 'success')
        return redirect(url_for('dashboard.home'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            session['username'] = user.username
            flash('Login berhasil!', 'success')
            return redirect(url_for('dashboard.home'))
        else:
            flash('Username atau password tidak valid.', 'error')
    
    return render_template('auth/login.html')
@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password1 = request.form['password1']
        password2 = request.form['password2']

        if not username or not password1 or not password2:
            flash('Please fill in all fields.', 'error')
            return redirect(url_for('auth.register'))
        
        if password1 != password2:
            flash('Passwords tidak sama.', 'error')
            return redirect(url_for('auth.register'))
        
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username sudah ada. mohon gunakan username yang lain.', 'error')
            return redirect(url_for('auth.register'))
        
        new_user = User(username=username)
        new_user.set_password(password1)
        db.session.add(new_user)
        db.session.commit()
        flash('Registrasi berhasil!', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/register.html')

@auth_bp.route('/logout')
def logout():
    session.pop('username', None)
    flash('Anda berhasil keluar', 'success')
    return redirect(url_for('auth.login'))