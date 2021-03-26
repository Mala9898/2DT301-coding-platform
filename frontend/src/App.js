import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import styled from 'styled-components'
// import io from 'socket.io-client';
import {initiateSocket, disconnectSocket, socket} from "./service/socket"
// import 

import ProjectShell from "./components/Shell"
import {CodeEditorStyle, ProjectCodeEditorView, CodeManager, ProjectRunButton} from "./components/Code"
import {ProjectFiles} from "./components/Sidebar"

// import {socket} from "../src/service/socket"
// import socketIOClient from "socket.io-client"
// import io from 'socket.io-client'
// const SOCKET_SERVER_URL = "http://localhost:5000";
// import { initiateSocket, disconnectSocket,
  // subscribeToChat, sendMessage } from './service/socket';

// import TextEditor from './components/TextEditor'
// import { useSlate } from 'slate-react';

import {lightGray} from "./styles/Constants"

const clientId = Math.floor(Math.random() * 0xFFFFFFFFFFFF);

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

  const [files, setFiles] = useState([])
  const [filename, setFilename] = useState("program")
  const [fileType, setFileType] = useState("c")
  const [code, setCode] = useState(`import time\n\nprint(f"{time.time()}")`)
  const [stdout, setStdout] = useState("")

  useEffect(() => {
      if (localStorage.getItem('client_id') !== null) {
        console.log(`client id exists: ${localStorage.getItem('client_id')}`)
      } else {
        const clientId = Math.floor(Math.random() * 0xFFFFFFFFFFFF)
        console.log(`client id not found. setting client_id to ${clientId}`)
        localStorage.setItem('client_id', clientId)
      }

    socket.on('code output', (data) => {
      console.log(data)
      if (JSON.parse(data)['error'] === "none") {
        const stdd = JSON.parse(data)['stdout']
        console.log(`stdout: ${stdd}`)
        setStdout(stdd)
      } else if (JSON.parse(data)['error'] === "yes") {
        const stdd = JSON.parse(data)['stderr']
        console.log(`stderr: ${stdd}`)
        setStdout(stdd)
      }
    })
    socket.on("user_join", data => {
      const parsed = JSON.parse(data)
      if (parsed['status'] === "OK") {
        console.log("user_join status OK")
        console.log(`code: ${parsed['code']}`)
        setCode(parsed['code'])
      } else {
        console.log(`user_join ???: ${data}`)
      }
    })
    socket.on("set_code", data => {
      console.log(`set_code: ${data}`)
    })
    socket.on("code_updated_notification", data => {
      const parsed = JSON.parse(data)
      console.log("code updated");
      if (parsed['clientId'] !== clientId) {
        setCode(parsed['code'])
      } 
    })
    socket.on("request_files_result", data => {
      console.log("requestd files are here!")
      const parsed = JSON.parse(data)
      console.log(parsed['files'])
      setFiles(parsed['files'])
    })
    socket.on("request_file_result", data => {
      console.log("requestd file are here!")
      const parsed = JSON.parse(data)
      console.log(parsed['file'])
      if(parsed['clientId'] == clientId){
        setCode(parsed['file'])
      }
        
    })
    socket.emit('request_files', {})
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

  
  const onCodeChange = (event) => {
    setCode(event.target.value)
    socket.emit('set_code', {clientId: clientId, code: event.target.value})
  }
  const runCode = (event) => {
    const submission = {
      code: code,
      fileType: fileType,
      filename: filename,
    }
    socket.emit('run code', submission);
    // console.log(event)
  }
  

  
  return (
    <>
      <C1>
        <ProjectFiles 
          files={files} 
          socket={socket} 
          setFilename={setFilename}
          setFileType={setFileType}  
          clientId={clientId}
        >

        </ProjectFiles>

        <ProjectCodeEditorView> 

            {/* run code, tabs etc */}
            <CodeManager>
                <ProjectRunButton default>{filename}.{fileType}</ProjectRunButton>
                {(fileType === "py" || fileType === "java" || fileType === "c") && <ProjectRunButton onClick={runCode}>run</ProjectRunButton>}
                
            </CodeManager>
          
            {/* actual code view */}
            <CodeEditorStyle value={code} onChange={onCodeChange} wrap="off"   onKeyDown={onKeyDownHandler}></CodeEditorStyle>
        </ProjectCodeEditorView>

        <ProjectShell stdout={stdout}>

        </ProjectShell>
       
      </C1>
    </>
     
    
    )
} 


export default App;
