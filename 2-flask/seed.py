from app import app, f_bcrypt

from models import db, User, Program, Instructor, Record
from werkzeug.security import generate_password_hash

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()
        Record.query.delete()
        Program.query.delete()
        print("seeding users")
        
        # pw_hash = bcrypt.generate_password_hash(‘hunter2’).decode(‘utf-8’)
        pass1 = f_bcrypt.generate_password_hash('man1pass').decode('utf-8')
        pass2 = f_bcrypt.generate_password_hash('man2pass').decode('utf-8')
        pass3 = f_bcrypt.generate_password_hash('man3pass').decode('utf-8')
        pass4 = f_bcrypt.generate_password_hash('man4pass').decode('utf-8')
        pass5 = f_bcrypt.generate_password_hash('man5pass').decode('utf-8')
        pass6 = f_bcrypt.generate_password_hash('man6pass').decode('utf-8')

        # pass1 = generate_password_hash('man1pass', method='scrypt')
        # pass2 = generate_password_hash('man2pass', method='scrypt')
        # pass3 = generate_password_hash('man3pass', method='scrypt')
        # pass4 = generate_password_hash('man4pass', method='scrypt')
        # pass5 = generate_password_hash('man5pass', method='scrypt')
        # pass6 = generate_password_hash('man6pass', method='scrypt')
        
        man1 = User(username="woman1", email="man1@gmail.com", height_ft=65, weight_lb = 150, hash=pass1, gender='Female')
        man2 = User(username="man2", email="man2@gmail.com", height_ft=75, weight_lb = 160, hash=pass2, gender='Male')
        man3 = User(username="woman3", email="man3@gmail.com", height_ft=54, weight_lb = 140, hash=pass3, gender='Female')
        man4 = User(username="man4", email="man4@gmail.com", height_ft=62, weight_lb = 155, hash=pass4, gender='Male')
        man5 = User(username="woman5", email="man5@gmail.com", height_ft=71, weight_lb = 135, hash=pass5, gender='Female')
        man6 = User(username="man6", email="man6@gmail.com", height_ft=66, weight_lb = 185, hash=pass6, gender='Male')
        users = [man1,man2,man3,man4,man5,man6]
        db.session.add_all(users)
        db.session.commit()
        
        rec1 = Record(type='Squat', gender='Male', weight_lb=300, date='2023-08-15', user_id=2)
        rec6 = Record(type='Deadlift', gender='Male', weight_lb=515, date='2018-11-05', user_id=4)
        rec11 = Record(type='Bench', gender='Female', weight_lb=240, date='2014-02-25', user_id=1)
        rec2 = Record(type='Bench', gender='Male', weight_lb=200, date='2023-01-15', user_id=2)
        rec7 = Record(type='Squat', gender='Male', weight_lb=140, date='2019-05-14', user_id=6)
        rec4 = Record(type='Squat', gender='Male', weight_lb=340, date='2019-03-14', user_id=4)
        rec12 = Record(type='Deadlift', gender='Female', weight_lb=415, date='2017-02-11', user_id=1)
        rec9 = Record(type='Deadlift', gender='Male', weight_lb=215, date='2014-12-19', user_id=6)
        rec5 = Record(type='Bench', gender='Male', weight_lb=250, date='2021-06-25', user_id=4)
        rec10 = Record(type='Squat', gender='Female', weight_lb=295, date='2011-05-14', user_id=1)
        rec8 = Record(type='Bench', gender='Male', weight_lb=100, date='2021-12-25', user_id=6)
        rec3 = Record(type='Deadlift', gender='Male', weight_lb=450, date='2020-10-15', user_id=2)
        recs = [rec1,rec2,rec3,rec4,rec5,rec6,rec7,rec8,rec9,rec10,rec11,rec12]
        db.session.add_all(recs)
        db.session.commit()
        
        # yoga1 = Program(type="Yoga", days=[])
        print("Done seeding")


# class Program(db.Model, SerializerMixin):
#     __tablename__='programs'
    
#     id = db.Column(db.Integer, primary_key=True)
#     type = db.Column(db.String, nullable=False)
#     date = db.Column(db.String, default="TBD")
#     time = db.Column(db.String, default="TBD")
#     users = db.relationsh

