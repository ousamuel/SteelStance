from models import db, User, Record, Program, Instructor
from flask_restful import Api, Resource
from flask import Flask, make_response, request
from flask_cors import CORS as FlaskCors
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_session import Session
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import timedelta


app = Flask(__name__)
f_bcrypt = Bcrypt(app)
Session(app)
import os, bcrypt
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
HEX_SEC_KEY= 'd5fb8c4fa8bd46638dadc4e751e0d68d'
app.config['SECRET_KEY']=HEX_SEC_KEY
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=60)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = FlaskCors(app, origins=["http://localhost:3000"], supports_credentials=True)
app.config['REMEMBER_COOKIE_DOMAIN']= "http://localhost:3000"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
migrate = Migrate(app, db)
db.init_app(app)
api=Api(app)
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class CurrentUser(Resource):
    @login_required
    def get(self):
        user = current_user
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"message": "User not found"}, 404)
    def patch(self):
        user = current_user
        data = request.get_json()
        
        if data.get('email'):
            emailuser = Uaser.query.filter(User.email == data["email"]).one_or_none()
            if emailuser:
                return make_response("user with email exists", 401)
        if data.get('username'):
            usernameuser = User.query.filter(User.username == data["username"]).one_or_none()
            if usernameuser:
                return make_response('user with username exists', 403)
        for attr in data:
            setattr(user, attr, data[attr])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)
    @login_required
    def delete(self):
        user = current_user
        
        if user:
            records_to_delete = Record.query.filter(Record.user_id == user.id).all()
            for record in records_to_delete:
                db.session.delete(record)
                db.session.commit()
            db.session.delete(user)
            db.session.commit()
            return make_response("deleted", 204)
        else:
            return make_response({"message": "User not found"}, 404)
api.add_resource(CurrentUser,'/currentUser')

class UserProgram(Resource):
    @login_required
    def post(self):
        user = current_user
        program_id = request.json.get('program_id', None)
        program = Program.query.get(program_id)
        
        if program not in user.programs:
            user.programs.append(program)
        else: 
            user.programs.remove(program)
            
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(only=('programs',)), 202)
api.add_resource(UserProgram, '/userProgram')
class Users(Resource):
    def get(self):
        users = User.query.all()
        users_ser = [user.to_dict() for user in users]
        return make_response(users_ser, 200)
api.add_resource(Users,'/users')

# class UserById(Resource):
#     def patch(self, id):
#         height_ft = request.json.get('height_ft', None)
#         weight_lb = request.json.get('weight_lb', None)
#         pass;
# api.add_resource(UserById, '/user/<int:id>')

class Signups(Resource):
    def post(self):
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        username = request.json.get('username', None)
        height_ft = request.json.get('height_ft', None)
        weight_lb = request.json.get('weight_lb', None)
        if not email:
            return 'Missing Email', 400
        if not password:
            return 'Missing password', 400
        if not username:
            return 'Missing username', 400
        hashed = f_bcrypt.generate_password_hash(password).decode('utf-8')
        emailuser = User.query.filter(User.email == email).one_or_none()
        usernameuser = User.query.filter(User.username == username).one_or_none()
        if usernameuser:
            return make_response('user with username exists', 403)
        if emailuser:
            return make_response("user with email exists", 401)
        user = User(email=email,authenticated=True, hash=hashed, username = username, height_ft=height_ft, weight_lb = weight_lb)
        try:
            db.session.add(user)
            db.session.commit()
            login_user(user, remember=True)
            return make_response(user.to_dict(), 200)
        
        except IntegrityError:
            db.session.rollback() 
            return make_response({"message": "A user with this email or username already exists."}, 405)
api.add_resource(Signups, '/signup')

class Logins(Resource):
    def post(self):
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email:
            return make_response('Missing Email', 400)
        if not password:
            return 'Missing password', 400
        
        user = User.query.filter(User.email==email).first()
        if not user:
            return make_response("User not found", 404)
        
        if f_bcrypt.check_password_hash(user.hash, password):
            user.authenticated=True
            db.session.add(user)
            db.session.commit()
            login_user(user, remember=True)
            return make_response(user.to_dict(), 200)
        else:
            return make_response('wrong password', 401)
api.add_resource(Logins, '/login')

class Logout(Resource):
   @login_required
   def post(self):
      user = current_user
      user.authenticated = False
      db.session.add(user)
      db.session.commit()
      logout_user()
      return 'You are logged out'
api.add_resource(Logout, '/logout')

class Records(Resource):
    def get(self):
        records = Record.query.all()
        records_ser=[r.to_dict(rules=('-user',)) for r in records]
        return make_response(records_ser, 200)
    @login_required
    def post(self):
        data=request.get_json()
        record = Record()
        for attr in data:
            setattr(record, attr, data[attr])
        db.session.add(record)
        db.session.commit()
        return make_response(record.to_dict(), 200)
api.add_resource(Records, "/records")

class Programs(Resource):
    def get(self):
        programs = Program.query.all()
        programs_ser=[p.to_dict() for p in programs]
        return make_response(programs_ser, 200)
api.add_resource(Programs, '/programs')
if __name__ == "__main__":

    app.run(port=5555, debug = True )
    