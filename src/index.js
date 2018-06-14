import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './base.scss'

class App extends Component {
    render() {
        return (
            <div className={'test'}>
                5555555555555555
                <h2>Hello World6666666!</h2>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));