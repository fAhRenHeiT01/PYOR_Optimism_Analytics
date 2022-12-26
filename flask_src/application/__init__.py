import logging
import json
from flask import Flask

with open('./config/config.json') as file:
    config = json.load(file)

logger = logging.getLogger(config['app']['name'])
logger.setLevel(logging.DEBUG)

app = Flask(config['app']['name'])
app.config['SECRET_KEY'] = config['app']['SECRET_KEY']
