from flask import Flask, render_template
from flask_socketio import SocketIO
import json
import subprocess
import sys
import os
from flask_cors import CORS, cross_origin
import time
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'meme'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

project_code = base64.b64decode('aW1wb3J0IHRpbWUNCg0KcHJpbnQoZiJ7dGltZS50aW1lKCl9IikNCnByaW50KCJoZWxsbyB3b3JsZCEiKQ==').decode("utf8")

@app.route('/emit')
def emit():
    socketio.emit('reee', json.dumps({"data": f"{time.strftime('%I:%M:%S %p', time.localtime())}", "error": "none"}), broadcast=True)
    return "emitted"

@cross_origin()
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
    # socketio.emit('my response', result, callback=messageReceived)

    socketio.emit('reee', json.dumps({"data": result, "error": "none"}), broadcast=True)

    # actual_shell = json.loads(json_data)
    # print('to run in shell' +str(json_data))
    # print(f"{actual_shell['command']}")
    # print(actual_shell.command)
    # socketio.emit('my response', json, callback=messageReceived)

@socketio.on('run code')
def handle_run_code(data, methods=['GET', 'POST']):
    filename = data['filename']
    fileType = data['fileType']
    if fileType == "py":
        print("It's PYTHON!")
        try:
            result = subprocess.run([sys.executable, "-c", data['code']],
                            capture_output=True, 
                            timeout=5)
            if(result.stderr):
                result_stderr = result.stderr.decode("utf8")
                print(f"stderr: {result_stderr}")
                
                socketio.emit('code output', json.dumps({"stdout": "", "error": "yes", "stderr": result_stderr}), broadcast=True)
            else:
                result_std_out = result.stdout.decode("utf8")
                print(f"stdout: {result_std_out}")
                socketio.emit('code output', json.dumps({"stdout": result_std_out, "error": "none", "stderr": ""}), broadcast=True)
        except:
            print("sum ting went wong")
    elif fileType == "java":
        print("It's JAVA!")
        try:
            f = open(f"{filename}.java", "w")
            f.write(data['code'])
            f.close()

            result = subprocess.run('find . -name "*.java" > sources.txt && javac @sources.txt ', capture_output=True, text=True, shell=True)
            print("The exit code was: %d" % result.returncode)
            print(f"stdout: {result.stdout}")
            print(f"stderr: {result.stderr}")

            if(result.stderr):
                result_stderr = result.stderr #.decode("utf8")
                print(f"stderr: {result_stderr}")
                
                socketio.emit('code output', json.dumps({"stdout": "", "error": "yes", "stderr": result_stderr}), broadcast=True)
            else:
                print("[ running program ] ")
                result2 = subprocess.run('java Main', capture_output=True, text=True, shell=True)
                
                print("The exit code was: %d" % result2.returncode)
                print(f"stdout: {result2.stdout}")
                print(f"stderr: {result2.stderr}")

                if(result2.stderr):
                    print("[result2 error]")
                    result_stderr = result2.stderr #.decode("utf8")
                    print(f"stderr: {result_stderr}")
                    
                    socketio.emit('code output', json.dumps({"stdout": "", "error": "yes", "stderr": result_stderr}), broadcast=True)
                else:
                    print("[reuslt2 is fine]")
                    result_std_out = result2.stdout #.decode("utf8")
                    print(f"stdout: {result_std_out}")
                    socketio.emit('code output', json.dumps({"stdout": result_std_out, "error": "none", "stderr": ""}), broadcast=True)
                
        except Exception as e:
            print(f"sum ting went wong: {e}")
    elif fileType == "c":
        try:
            f = open(f"{filename}.c", "w")
            f.write(data['code'])
            f.close()

            result = subprocess.run(f"gcc {filename}.c", capture_output=True, text=True, shell=True)
            print("The exit code was: %d" % result.returncode)
            print(f"stdout: {result.stdout}")
            print(f"stderr: {result.stderr}")

            if(result.stderr):
                result_stderr = result.stderr #.decode("utf8")
                print(f"stderr: {result_stderr}")
                
                socketio.emit('code output', json.dumps({"stdout": "", "error": "yes", "stderr": result_stderr}), broadcast=True)
            else:
                print("[ running program ] ")
                result2 = subprocess.run('./a.out', capture_output=True, text=True, shell=True)
                
                print("The exit code was: %d" % result2.returncode)
                print(f"stdout: {result2.stdout}")
                print(f"stderr: {result2.stderr}")

                if(result2.stderr):
                    print("[result2 error]")
                    result_stderr = result2.stderr #.decode("utf8")
                    print(f"stderr: {result_stderr}")
                    
                    socketio.emit('code output', json.dumps({"stdout": "", "error": "yes", "stderr": result_stderr}), broadcast=True)
                else:
                    print("[reuslt2 is fine]")
                    result_std_out = result2.stdout #.decode("utf8")
                    print(f"stdout: {result_std_out}")
                    socketio.emit('code output', json.dumps({"stdout": result_std_out, "error": "none", "stderr": ""}), broadcast=True)
                
        except Exception as e:
            print(f"sum ting went wong: {e}")
        

    print(f"run code: {data['code']}")

    

@socketio.on('user_join_request')
def handle_user_join(data, methods=['GET', 'POST']):
    print(f"user join request: current code: {project_code}")
    socketio.emit('user_join', json.dumps({
            "status": "OK",
            "code": project_code 
        })
    )
@socketio.on('set_code')
def handle_set_code(data, methods=['GET, POST']):
    global project_code
    project_code = data['code']
    print(f"code updated!: {project_code}")
    socketio.emit('code_updated_notification', json.dumps({
        "clientId": data['clientId'],
        "code": project_code
    }), broadcast=True)

# @socketio.on('request_code')
# def handle_request_code(data, methods=['GET, POST']):
#     sock

@socketio.on('request_files')
def handle_request_files(data, methods=['GET, POST']):
    result = subprocess.run("ls", capture_output=True, text=True, shell=True)
    print("The exit code was: %d" % result.returncode)
    print(f"stdout: {result.stdout}")
    print(f"stderr: {result.stderr}")

    result_files = result.stdout.split("\n")
    socketio.emit('request_files_result', json.dumps({
        "files": result_files
    }), broadcast=True)

@socketio.on('request_file')
def handle_request_files(data, methods=['GET, POST']):
    result = subprocess.run(f"cat {data['file']}", capture_output=True, text=True, shell=True)
    print("The exit code was: %d" % result.returncode)
    print(f"stdout: {result.stdout}")
    print(f"stderr: {result.stderr}")

    result_files = result.stdout.split("\n")
    socketio.emit('request_file_result', json.dumps({
        "file": result.stdout,
        "clientId": data['clientId']
    }), broadcast=True)


# upload_file
@socketio.on('upload_file')
def handle_upload_file(data, methods=['GET, POST']):
    print(f"uploaded file: {data['file']}")


if __name__ == '__main__':
    socketio.run(app, debug=True)


#     list_files = subprocess.run("ls -lsh", capture_output=True, text=True, shell=True)
# print("The exit code was: %d" % list_files.returncode)
# print(f"{list_files.stdout}")