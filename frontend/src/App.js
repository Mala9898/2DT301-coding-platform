import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import styled from 'styled-components'
// import io from 'socket.io-client';
import {initiateSocket, disconnectSocket, socket} from "./service/socket"

// import {socket} from "../src/service/socket"
// import socketIOClient from "socket.io-client"
// import io from 'socket.io-client'
// const SOCKET_SERVER_URL = "http://localhost:5000";
// import { initiateSocket, disconnectSocket,
  // subscribeToChat, sendMessage } from './service/socket';

// import TextEditor from './components/TextEditor'
// import { useSlate } from 'slate-react';

const lightGray = "#f3f3f3";

const StyledNavLink = styled(Link)`
  color: #363636;
  /* background: #256ce1; */
  border-radius: 4px;
  text-decoration: none;
  padding: 5px 5px;
  margin: 1rem 1rem;
  outline: none;
  /* :hover {
    color: #b700ff;
  } */
  transition: all 0.2s ease-in-out;
  :hover {
    transition: all 0.2s ease-in-out;
    /* background: #fff; */
    background: #f3f3f3;
    /* color: #010606; */
    /* color: #ffffff; */
  }
`
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  height: 59px;
  
`
const UlList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  /* background-color: #0d92ff; */
`
const RunCommand = styled.input`

`
const RunCommandInput = styled.input`
  /* border: none; */
  /* max-width: 600px;
  min-width: 200px; */
  height:40px;
  flex-grow: 1;
  text-indent: 10px;
  font-size: 16px;
  outline: 0 none;
  border: 0 none;
  border-radius: 6px;
  background: ${lightGray};
`

const AppView = styled.div`
  /* display: grid; */
  display: grid; // glock level grid
  grid-template-rows: 59px 1fr;
  /* flex-direction: column;
  justify-content: flex-start; */
  height: 100vh;
  width: 100vw;
`

const App = () => {
  return (
    <Router>
      <AppView>
        <nav>
            <UlList>
              <NavMenu>
                <li>
                  <StyledNavLink to="/">Coding Platform</StyledNavLink>
                </li>
              </NavMenu>
              <RunCommandInput placeholder="Run commands"></RunCommandInput>
              <NavMenu>
                <li>
                  <StyledNavLink to="/">Home</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/about">About</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/users">Users</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/project">Project</StyledNavLink>
                </li>
              </NavMenu>
            </UlList>
        </nav>
        <div className="App">
          {/* <p>Welcome to Coding Platform</p> */}

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
              <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/project">
              <Project />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </AppView>
     
    </Router>
    
  );
}
const About = () => <p>About</p>
const Users = () => <p>Users</p>
const Home = () => (
  <>
    <p>hell</p>
    {/* <TextEditor/> */}
    <p>end</p>
  </>
  )
// const C1 = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
//   /* height: 100%;
//   width: 100%;
//   margin: 10px; */
// `
const C1 = styled.div`
  box-sizing: border-box;
  display: grid; // glock level grid
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 2px;
  background-color: {lightGrey};
  /* width: auto; */
  min-height: 100%;
  padding: 2px;
  /* height: 100%; */
  
  /* margin: 10px; */
  /* gap: 10px 10px; */
`
const ProjectFilesStyle = styled.div`
display:grid;
/* grid-column: 1 / 1;  */
/* width: 100%; */
height: 100%;
background-color: white;
/* border: 1px solid black; */
/* border-radius: 5px; */
/* margin: 5px; */
/* display: block; */
`
const tempFiles = [
  {file_id: 1, filename: "test.py"},
  {file_id: 2, filename: "test_2.py"},
  {file_id: 3, filename: "shrek.png"},
]
const ULFileListStyle = styled.ul`
  list-style: none;
  text-align: left;
  /* color: red; */
  padding-left: 0px;
  margin: 2px 10px;
`
const ProjectFiles = () => {
  const [files, setFiles] = useState(tempFiles)
  useEffect(() => {
    // TODO read from server
  }, [])
  return (
    <ProjectFilesStyle>
      <ULFileListStyle>
        {files.map( file => 
          <li key={file.file_id} onClick={() => {alert("you pressed: "+file.filename)}}>{file.filename}</li>  
        )}
      </ULFileListStyle>
    </ProjectFilesStyle>
  )
}

const ProjectCodeEditorView = styled.div`
  display:flex;
  flex-direction: column;
  /* width: 100%; */
  /* height: 100%; */
  background-color: red;
  align-items: stretch;
  /* border: 1px solid black; */
  /* margin: 5px; */
  /* display: block; */
`
const CodeManager = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  background-color: ${lightGray};
  /* margin: 0 0 5px 0; */
`
const ProjectRunButton = styled.button`
  display: flex;
  border-radius: 4px;
  border: 0;
  text-decoration: none;
  padding: 10px 30px;
  /* margin: 1rem 1rem; */
  outline: none;
  background-color: ${props => props.default ? "white": "#8FD16E"};
  /* color: white; */
  /* background-color: white; */
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;


  transition: all 0.2s ease-in-out;
  :hover {
    
    /* background: #fff; */
    
    /* color: #010606; */
    /* color: #ffffff; */
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  }
  :active {
    transition: all 0s ease-in-out;
    background-color: ${props => props.default ? "#E5E5E5": "#5BA237"};
  }

`
const CodeEditorStyled = styled.textarea`
  display: flex;
  flex: 1 1 auto;
  border: 0px;
  resize: none;
  box-shadow: none;
  outline: none;
  /* min-height: 100%; */
  /* height: auto; */
  min-height: auto;
  box-sizing: border-box;
  /* background-color: green; */
  /* wrap: off; */
`

const ProjectShell = () => {
  // const [response, setResponse] = useState("")
  const [shellText, setShellText] = useState("")
  useEffect(() => {

    // let socket = io('http://localhost:5000', { secure: true, reconnection: true, rejectUnauthorized: false });
    // socket = io('http://localhost:5000', { secure: true,    reconnection: true, rejectUnauthorized: false });
    
    console.log(`Connecting socket...`);
    initiateSocket(300)
    console.log(`post Connecting socket...`);
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on("reee", (data) => {
      const resp = JSON.parse(data);
      // setResponse(resp.data)
      console.log(` prev: ${shellText} to add: ${resp.data}`)
      setShellText(shellText => shellText+"\n"+resp.data)
    });

    return () => {
      disconnectSocket();
        // if(socket) 
        //   socket.disconnect()
    }
  }, [])
  const onKeyDownHandler = (e) => {
    switch (e.key) {
      case 'Tab':
        console.log("tab")
        e.preventDefault();
        break;
      case 'Enter':
        e.preventDefault()
        const toExecute = shellText.split('\n').pop()
        socket.emit('run shell', {command: toExecute});
        // document.execCommand('insertText', false, "\n");
        console.log("enter")
      case 'u':
        if (e.ctrlKey) {
          
          setShellText(shellText => {
            let shellTextLines = shellText.split("\n")
            shellTextLines.pop()  
            return shellTextLines.join("\n").concat("\n")
          })
        }
        break;
      case 'l':
        if (e.ctrlKey) {
          setShellText("")
          console.log("ctrl + l")
        }
        break;
      default:
        break;
    }
  }
  const onShellChange = (event) => {
    setShellText(event.target.value)
    // console.log(`onShellChange: ${shellText}`)
  }
  return (
    <ProjectShellStyle>
      {/* <p>
        response: {response}
      </p> */}
      <CodeEditorStyled value={shellText} onChange={onShellChange} wrap="off" onKeyDown={onKeyDownHandler}></CodeEditorStyled>
    </ProjectShellStyle>
  )
}
const ProjectShellStyle = styled.div`
  display:grid;
  /* width: 100%; */
  height: 100%;
  background-color: white;
  /* border: 1px solid black; */
  /* margin: 5px; */
  /* display: block; */
`
const CodeEditor = () => {
  return (
    <>
      <textarea>

      </textarea>
    </>
  )
}
const ParagraphSimple = styled.p`
  margin: 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
`
const Project = () => {

  const [code, setCode] = useState(`import time\n\nprint(f"{time.time()}")`)

  useEffect(() => {
    socket.on('code output', (data) => {
      console.log(`stdout: ${JSON.parse(data)['stdout']}`)
    })
    // return () => {
    //   cleanup
    // }
  }, [])
  const onKeyDownHandler = (e) => {
    if(e.key == 'Tab' && !e.shiftKey) {
      document.execCommand('insertText', false, "    ");
      e.preventDefault();
      return false;
    }
  }

  const runCode = (event) => {
    const submission = {
      code: code
    }
    socket.emit('run code', submission);
    // console.log(event)
  }
  const onCodeChange = (event) => {
    setCode(event.target.value)
  }
  
  return (
    <>
      <C1>
        <ProjectFiles>

        </ProjectFiles>

        <ProjectCodeEditorView>
          <CodeManager>
            <ProjectRunButton default>testa.py</ProjectRunButton>
            <ProjectRunButton onClick={runCode}>run</ProjectRunButton>
          </CodeManager>
          
        <CodeEditorStyled value={code} onChange={onCodeChange} wrap="off" onKeyDown={onKeyDownHandler}></CodeEditorStyled>
        </ProjectCodeEditorView>

        <ProjectShell>

        </ProjectShell>
       
      </C1>
    </>
     
    
    )
} 


export default App;
