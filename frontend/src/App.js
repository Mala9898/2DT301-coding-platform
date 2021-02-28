import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import styled from 'styled-components'

import TextEditor from './components/TextEditor'

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
  /* border: 0 none; */
  border-radius: 10px;
`



const App = () => {
  return (
    <Router>
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
            </NavMenu>
          </UlList>
        </nav>
      <div className="App">
        <p>Welcome to Coding Platform</p>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
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

export default App;
