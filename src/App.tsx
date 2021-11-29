import React from 'react';
import {Route} from "react-router-dom";
import paths from "./router/paths";
import Container from "./components/container/Container";
import DashBoard from "./pages/dashboard/DashBoard";
import Results from "./pages/Results";
import Finalize from "./pages/Finalize";
import './App.css';

const App = () => {
    return <Container>
                <Route exact path={paths.dashboard} component={DashBoard}/>
                <Route path={paths.results.path} component={Results}/>
                <Route path={paths.finalize.path} component={Finalize}/>
            </Container>
}

export default App;
