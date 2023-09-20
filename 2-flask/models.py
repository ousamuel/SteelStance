from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

user_program = db.Table('user_program',
                        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                        db.Column('program_id', db.Integer, db.ForeignKey('programs.id')),
                        extend_existing=True,

                        )

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean, default=True)
    authenticated = db.Column(db.Boolean, default=False)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    height_ft = db.Column(db.Integer)
    height_in = db.Column(db.Integer)
    weight_lb = db.Column(db.Integer)
    gender = db.Column(db.String)
    hash = db.Column(db.Text, nullable=False)
    records = db.relationship('Record', backref = 'user')
    programs = db.relationship('Program', cascade ='all, delete', secondary=user_program, back_populates='users')
    serialize_rules=('-records.user', '-programs.users')
    def is_active(self):
        return True
    
    def get_id(self):
        return self.id
    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False
class Record(db.Model, SerializerMixin):
    __tablename__ = 'records'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    # type will only be Deadlift, Squat, or Bench
    
    gender = db.Column(db.String)
    weight_lb = db.Column(db.Integer)
    date = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    serialize_rules=('-user.records',)

class Program(db.Model, SerializerMixin):
    __tablename__='programs'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    level = db.Column(db.String, nullable=False)
    # Cycling, Pilates, Kickboxing
    days = db.Column(db.String, default="TBD")
    time = db.Column(db.String, default="TBD")
    users = db.relationship('User', cascade ='all, delete', secondary=user_program, back_populates='programs')
    serialize_rules=('-instructor.programs',)

    instructor_id = db.Column(db.String, db.ForeignKey('instructors.id'))
    
class Instructor(db.Model, SerializerMixin):
    __tablename__='instructors'
    
    id = db.Column(db.Integer,primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)
    programs = db.relationship('Program', backref = 'instructor')

