from flask import Flask, render_template
from flask_socketio import SocketIO
import json
import subprocess
import sys
import os
from flask_cors import CORS
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'meme'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/emit')
def emit():
    socketio.emit('reee', json.dumps({"data": f"{time.strftime('%I:%M:%S %p', time.localtime())}", "error": "none"}), broadcast=True)
    return "emitted"

@app.route('/')
def sessions():
    return render_template('session.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)

@socketio.on('run shell')
def handle_my_custom_event(json_data, methods=['GET', 'POST']):
    command = json_data['command']
    print(f"Command to run: {command}")
    list_files = subprocess.run(command, capture_output=True, text=True, shell=True)
    # print("The exit code was: %d" % list_files.returncode)
    result = list_files.stdout
    print(f"ran command. stdout: {list_files.stdout} \n stderr:{list_files.stderr}")
    socketio.emit('my response', result, callback=messageReceived)

    # actual_shell = json.loads(json_data)
    # print('to run in shell' +str(json_data))
    # print(f"{actual_shell['command']}")
    # print(actual_shell.command)
    # socketio.emit('my response', json, callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, debug=True)


#     list_files = subprocess.run("ls -lsh", capture_output=True, text=True, shell=True)
# print("The exit code was: %d" % list_files.returncode)
# print(f"{list_files.stdout}")