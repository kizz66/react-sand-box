import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Grid} from 'semantic-ui-react';

import './base.scss';
import './semant-ui-styles/semantic.scss';

class App extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {q: '555'};
    }

    /**
     *
     * @param event
     */
    handleChange = (event) => {
        this.setState({q: event.target.value});
    }

    handleClick = ()=> {
        console.log(this.state);
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <Form>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <label>Строка поиска</label>
                                <input value={this.state.q} onChange={this.handleChange}/>
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            <Button onClick={this.handleClick}>Submit</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));