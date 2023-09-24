#!/bin/bash
cd 1-next
# if ! command -v pipenv &> /dev/null; then
#     pip install pipenv
# fi
# pipenv install
npm install next
# npm install formik --save
npm install formik yup
npm install @nextui-org/react

cd ..

cd 2-flask
pip install sqlalchemy_serializer
pip install flask_restful
pip install flask_migrate
pip install flask_sqlalchemy
pip install flask-login
pip install flask_cors


cd ..

