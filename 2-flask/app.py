from models import db, User, Record, Program, Instructor
from flask_restful import Api, Resource
from flask import Flask, make_response, request
from flask_cors import CORS as FlaskCors
from flask_migrate import Migrate
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_session import Session
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError


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
    # return User.Query.get(user_id)

class CurrentUser(Resource):
    @login_required
    def get(self):
        user = current_user
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"message": "User not found"}, 404)
api.add_resource(CurrentUser,'/currentUser')

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_ser = [user.to_dict() for user in users]
        return make_response(users_ser, 200)
    
    # def post(self):
    #     user=User()
    #     data=request.get_json()
    #     for attr in data:
    #         setattr(user, attr, data[attr])
    #     db.session.add(user)
    #     db.session.commit()
api.add_resource(Users,'/users')

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
        # hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        # pw_hash = bcrypt.generate_password_hash(‘hunter2’).decode(‘utf-8’)
        hashed = f_bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(email=email,authenticated=True, hash=hashed, username = username, height_ft=height_ft, weight_lb = weight_lb)
        try:
            db.session.add(user)
            db.session.commit()
            login_user(user, remember=True)
            return make_response(user.to_dict(), 200)
        
        except IntegrityError:
            db.session.rollback() 
            return make_response({"message": "A user with this email or username already exists."}, 400)
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
        
        user.authenticated=True
        if f_bcrypt.check_password_hash(user.hash, password):
            login_user(user, remember=True)
            return make_response(user.to_dict(), 200)
        else:
            return make_response('wrong password', 401)
api.add_resource(Logins, '/login')

class Logout(Resource):
   @login_required
   def post(self):
    #   user = current_user
    #   user.authenticated = False
    #   db.session.add(user)
    #   db.session.commit()
    #   Session.clear()
      logout_user()
      return 'You are logged out'
api.add_resource(Logout, '/logout')

class Records(Resource):
    def get(self):
        records = Record.query.all()
        records_ser=[r.to_dict() for r in records]
        return make_response(records_ser, 200)
    def post(self):
        record = Record()
        data=request.get_json()
        for attr in data:
            setattr(record, attr, data[attr])
        db.session.add(record)
        db.session.commit()
        return make_response(record.to_dict(), 204)
api.add_resource(Records, "/records")


if __name__ == "__main__":

    app.run(port=5555, debug = True )