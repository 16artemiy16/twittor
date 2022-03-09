# twittor-back
The backend part of Twittor app.

## First Setup
```
# Set up the venv
python3 -m venv venv

# Activate the venv
source venv/bin/activate 

# Install the dependencies
pip install -r requirements.txt
```

## Start
```
# Activate venv
source venv/bin/activate 

# Start the app
python wsgi.py 
```

### OpenAPI
Swagger can be found here http://localhost:5000/apidocs/

## Tests
```shell
# Run tests
python -m pytest -p  no:warnings -v --capture=tee-sys
# Check test coverage
python -m pytest --cov    
```
