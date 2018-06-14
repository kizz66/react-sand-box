import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';

import './base.scss';
import './semant-ui-styles/semantic.scss';

class App extends Component {
    render() {
        return (
            <div>
                
               <Button>click</Button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));