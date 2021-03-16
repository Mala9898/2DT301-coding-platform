import styled from 'styled-components'
import React, { useState, useEffect } from 'react'


import {lightGray} from "../styles/Constants"

const CodeEditorStyle = styled.textarea`
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



// const ProjectCode = ({code, socket}) => {

//     const runCode = (event) => {
//         const submission = {
//           code: code
//         }
//         socket.emit('run code', submission);
//         // console.log(event)
//     }

//     return (
//         <ProjectCodeEditorView> 

//             {/* run code, tabs etc */}
//             <CodeManager>
//                 <ProjectRunButton default>testa.py</ProjectRunButton>
//                 <ProjectRunButton onClick={runCode}>run</ProjectRunButton>
//             </CodeManager>
          
//             {/* actual code view */}
//             <CodeEditorStyle value={code} onChange={onCodeChange} wrap="off"   onKeyDown={onKeyDownHandler}></CodeEditorStyle>
//         </ProjectCodeEditorView>
//     )
// }

export {CodeEditorStyle, ProjectCodeEditorView, CodeManager, ProjectRunButton}