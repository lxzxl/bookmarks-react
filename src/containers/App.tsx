import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from './Main';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default App;
