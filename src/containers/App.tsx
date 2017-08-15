import * as React from 'react';
import '../styles/App.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Main from './Main';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <Nav/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default App;
