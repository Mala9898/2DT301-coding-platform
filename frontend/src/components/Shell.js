import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {initiateSocket, disconnectSocket, socket} from "../service/socket"

const ProjectShellStyle = styled.div`
display:grid;
/* width: 100%; */
height: 100%;
background-color: white;
/* border: 1px solid black; */
/* margin: 5px; */
/* display: block; */
`
const ShellEditorStyle = styled.textarea`
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

const ProjectShell = ({stdout}) => {
    // const [response, setResponse] = useState("")
    const [shellText, setShellText] = useState("")
    useEffect(() => {
      setShellText(stdout)
      // return () => {
      //   cleanup
      // }
    }, [stdout])
    useEffect(() => {
      
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
        <ShellEditorStyle value={shellText} onChange={onShellChange} wrap="off" onKeyDown={onKeyDownHandler}></ShellEditorStyle>
      </ProjectShellStyle>
    )
  }
  
  export default ProjectShell;