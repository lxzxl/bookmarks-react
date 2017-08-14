import * as React from 'react';
import '../styles/App.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <Nav/>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Footer/>
            </div>
        );
    }
}

export default App;
