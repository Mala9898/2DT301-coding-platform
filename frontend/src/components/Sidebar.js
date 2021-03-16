import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

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


const ProjectFiles = ({files, socket, setFilename, setFileType}) => {
    // const [files, setFiles] = useState(tempFiles)
    useEffect(() => {
      // TODO read from server
      console.log("[ PROJECT FILES UPDATES ]")
    }, [files])
    return (
      <ProjectFilesStyle>
          {/* {files} */}
        <ULFileListStyle>
          {files.map( (file, index) => 
            <li key={index} onClick={() => {
                    socket.emit('request_file', {file: file})
                    setFileType(file.split(".")[1])
                    setFilename(file.split(".")[0])
                }}
            >
                {file}
            </li>  
          )}
        </ULFileListStyle>
      </ProjectFilesStyle>
    )
  }


export { ProjectFiles}