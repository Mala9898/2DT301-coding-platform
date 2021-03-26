import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ProjectFilesStyle = styled.div`
display:flex;
flex-direction: column;
justify-content: flex-start;
/* grid-column: 1 / 1;  */
/* width: 100%; */
height: 100%;
background-color: white;
/* border: 1px solid black; */
/* border-radius: 5px; */
/* margin: 5px; */
/* display: block; */
`

const ULFileListStyle = styled.ul`
  list-style: none;
  text-align: left;
  /* color: red; */
  padding-left: 0px;
  margin: 2px 10px;
`

const tempFiles = [
    // {file_id: 1, filename: "test.py"},
    // {file_id: 2, filename: "test_2.py"},
    // {file_id: 3, filename: "shrek.png"},
]


const ProjectFiles = ({files, socket, setFilename, setFileType, clientId}) => {

    const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
    function handleUpload(event) {
        event.preventDefault();

        setFile(event.target.files[0]);
        
        const formData = new FormData();

        formData.append("file", file);

        Main();
    }
    // const [files, setFiles] = useState(tempFiles)
    useEffect(() => {
      // TODO read from server
      console.log("[ PROJECT FILES UPDATES ]")
    }, [files])

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    async function Main() {
       const bfile = file
       console.log(await toBase64(bfile));
       socket.emit('upload_file', {file: bfile})
    }
    const FileStyle = styled.div`
      display: flex;
      justify-content: space-between;
    `
    const TestRunButton = styled.button`
      border-radius: 4px;
      border: 0;
      text-decoration: none;
      height: 20px;
      /* padding: 10px 30px; */
      /* margin: 1rem 1rem; */
      outline: none;
      background-color: #8FD16E;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    `
    return (
      <ProjectFilesStyle>
        <input type="file" onChange={handleUpload} />
        <ULFileListStyle>
          {files.map( (currentElement, index) => 

            
                  <li key={index} onClick={() => {
                    socket.emit('request_file', {file: currentElement, clientId: clientId})
                    setFileType(currentElement.split(".")[1])
                    setFilename(currentElement.split(".")[0])
                  }}
                  >
                    {currentElement}
                  </li>  
               
            
          )}
        </ULFileListStyle>
      </ProjectFilesStyle>
    )
  }

  //  <FileStyle>
  //                         <p>{currentElement}</p>
  //                         <TestRunButton>Run Tests</TestRunButton>
  //                       </FileStyle>

export { ProjectFiles}