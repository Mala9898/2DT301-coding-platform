import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import styled from 'styled-components'

import TextEditor from './components/TextEditor'

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
    <TextEditor/>
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
const ProjectFiles = styled.div`
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
const ProjectCodeEditorView = styled.div`
  display:grid;
  /* width: 100%; */
  height: 100%;
  background-color: white;
  /* border: 1px solid black; */
  /* margin: 5px; */
  /* display: block; */
`
const ProjectConsole = styled.div`
  display:grid;
  /* width: 100%; */
  height: 100%;
  background-color: white;
  /* border: 1px solid black; */
  /* margin: 5px; */
  /* display: block; */
`
const Project = () => {

  const meme = "meme"

  return (
     <C1>
       {/* <C2> */}
       <ProjectFiles></ProjectFiles>
        <ProjectCodeEditorView></ProjectCodeEditorView>
        <ProjectConsole></ProjectConsole>
       {/* </C2> */}
        
        {/* <> */}
      {/* <h1>Project {meme}</h1> */}
      {/* <E1></E1> */}
     
      {/* <h2>End</h2> */}
    {/* </> */}
      </C1>
    
    )
} 


export default App;
