#!/bin/bash

cd 2-flask
pip install sqlalchemy_serializer
pip install flask_restful
pip install flask_migrate
pip install flask_sqlalchemy
pip install flask-login
pip install cors
pip install flask_cors

npm run dev &

cd ..

cd 1-next
if ! command -v pipenv &> /dev/null; then
    pip install pipenv
fi
pipenv install
pip install next
npm install formik --save
npm install formik yup
npm install @nextui-org/react
npm install use-places-autocomplete
npm install redux react-redux next-redux-wrapper
python app.py &

cd ..
