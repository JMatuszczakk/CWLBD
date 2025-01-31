import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return flask.send_from_directory('.', 'index.html')
@app.route('/<path:path>')
def send_js(path):
    return flask.send_from_directory('.', path)

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')