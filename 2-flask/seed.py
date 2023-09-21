from app import app, f_bcrypt

from models import db, User, Program, Instructor, Record, user_program
# from werkzeug.security import generate_password_hash

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()
        Record.query.delete()
        Program.query.delete()
        Instructor.query.delete()
        db.session.execute(user_program.delete())
        db.session.commit()
        print("seeding")
        
        # pw_hash = bcrypt.generate_password_hash(‘hunter2’).decode(‘utf-8’)
        pass1 = f_bcrypt.generate_password_hash('man1pass').decode('utf-8')
        pass2 = f_bcrypt.generate_password_hash('man2pass').decode('utf-8')
        pass3 = f_bcrypt.generate_password_hash('man3pass').decode('utf-8')
        pass4 = f_bcrypt.generate_password_hash('man4pass').decode('utf-8')
        pass5 = f_bcrypt.generate_password_hash('man5pass').decode('utf-8')
        pass6 = f_bcrypt.generate_password_hash('man6pass').decode('utf-8')

        # pass1 = generate_password_hash('man1pass', method='scrypt')
        
        man1 = User(username="man1", email="man1@gmail.com", height_ft=6, height_in=1, weight_lb = 180, hash=pass1, gender='Male')
        man2 = User(username="man2", email="man2@gmail.com", height_ft=5, height_in=8, weight_lb = 175, hash=pass2, gender='Male')
        man3 = User(username="woman3", email="man3@gmail.com", height_ft=5, height_in=5, weight_lb = 130, hash=pass3, gender='Female')
        man4 = User(username="man4", email="man4@gmail.com", height_ft=6, height_in=4, weight_lb = 255, hash=pass4, gender='Male')
        man5 = User(username="woman5", email="man5@gmail.com", height_ft=5, height_in=3, weight_lb = 115, hash=pass5, gender='Female')
        man6 = User(username="man6", email="man6@gmail.com", height_ft=5, height_in=9, weight_lb = 185, hash=pass6, gender='Male')
        users = [man1,man2,man3,man4,man5,man6]
        db.session.add_all(users)
        db.session.commit()
        rec1 = Record(type='Squat', gender='Male', body_weight= 150, weight_lb=300, date='2023-08-15', user_id=2)
        rec6 = Record(type='Deadlift', gender='Male', body_weight= 244,weight_lb=515, date='2018-11-05', user_id=4)
        rec11 = Record(type='Bench', gender='Female', body_weight= 155,weight_lb=240, date='2014-02-25', user_id=1)
        rec2 = Record(type='Bench', gender='Male', body_weight= 130, weight_lb=200, date='2023-01-15', user_id=2)
        rec7 = Record(type='Squat', gender='Male', body_weight= 115, weight_lb=140, date='2019-05-14', user_id=6)
        rec4 = Record(type='Squat', gender='Male', body_weight= 175,weight_lb=340, date='2019-03-14', user_id=4)
        rec12 = Record(type='Deadlift', gender='Female',body_weight= 182, weight_lb=415, date='2017-02-11', user_id=1)
        rec9 = Record(type='Deadlift', gender='Male', body_weight= 190,weight_lb=215, date='2014-12-19', user_id=6)
        rec5 = Record(type='Bench', gender='Male', body_weight= 165,weight_lb=250, date='2021-06-25', user_id=4)
        rec10 = Record(type='Squat', gender='Female', body_weight= 145,weight_lb=295, date='2011-05-14', user_id=1)
        rec8 = Record(type='Bench', gender='Male', body_weight= 145,weight_lb=215, date='2021-12-25', user_id=6)
        rec3 = Record(type='Deadlift', gender='Male', body_weight= 158,weight_lb=450, date='2020-10-15', user_id=2)
        recs = [rec1,rec2,rec3,rec4,rec5,rec6,rec7,rec8,rec9,rec10,rec11,rec12]
        db.session.add_all(recs)
        db.session.commit()
        
        in1 = Instructor(first_name="John", bio="Avid enthusiast of health and fitness. I also love hiking and outdoor sports, boxing teacher")
        in2 = Instructor(first_name="Emily", bio="Love to talk")
        in3 = Instructor(first_name="Max", bio="my name is max, ex-pro boxer + HIT")
        in4 = Instructor(first_name="Kevin", bio="my name is kevin, abcdef kevin, my name is kevin, abcdef kevin")
        in5 = Instructor(first_name="Stephanie", bio="Also an vid enthusiast of outdoor sports")
        in6 = Instructor(first_name="Steven", bio="Default bio with text. Extended to see wrap effect or prolonged text onto next lines")
        ins = [in1, in2, in3, in4, in5, in6]
        db.session.add_all(ins)
        db.session.commit()
        
        box1 = Program(type="Boxing", level="Beginner", color="lime", src="/images/boxing1.jpg", days="Tuedays & Thursdays", time="3:30PM - 5:00PM", instructor_id=1)
        box2 = Program(type="Boxing",level="Intermediate", color="yellow", src="/images/boxing2.jpg", days="Tuedays & Thursdays", instructor_id=1)
        box3 = Program(type="Boxing",level="Expert",  color="red", src="/images/boxing3.jpg", time="6:30PM - 8:00PM", instructor_id=3)
        yoga0 = Program(type="Yoga",level="Introduction",  color="lime", src="/images/yoga0.jpg", time="6:30PM - 8:00PM", instructor_id=2)
        yoga1 = Program(type="Yoga",level="Vinyasa",  color="gold", src="/images/yoga2.jpg", time="6:30PM - 8:00PM", instructor_id=4)
        yoga2 = Program(type="Yoga",level="Yin",  color="dodgerblue", src="/images/yoga3.jpg", time="6:30PM - 8:00PM", instructor_id=2)
        yoga3 = Program(type="Yoga",level="Iyengar",  color="pink", src="/images/yoga4.jpg", time="6:30PM - 8:00PM", instructor_id=4)
        yoga4 = Program(type="Yoga",level="Ashtanga",  color="red", src="/images/yoga1.jpg", time="6:30PM - 8:00PM", instructor_id=5)
        cycle1 = Program(type="Cycling",level="Beginner",  color="lime", src="/images/cycling1.png", time="6:30PM - 8:00PM", instructor_id=5)
        cycle2 = Program(type="Cycling",level="Intermediate",  color="yellow", src="/images/cycling2.jpg", time="6:30PM - 8:00PM", instructor_id=6)
        cycle3 = Program(type="Cycling",level="Expert",  color="red", src="/images/cycling3.jpg", time="6:30PM - 8:00PM", instructor_id=6)
        progs = [box1, box2, box3,yoga0, yoga1, yoga2, yoga3, yoga4, cycle1, cycle2, cycle3]
        db.session.add_all(progs)
        db.session.commit()
        print("Done seeding")


