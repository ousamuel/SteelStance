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
