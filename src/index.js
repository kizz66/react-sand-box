import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Grid} from 'semantic-ui-react';

import './base.scss';
import './semant-ui-styles/semantic.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "777"};
    }
    handleSubmit(e, form) {
        console.log(form);
        console.log(e.target);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <label>First Name</label>
                                <input placeholder='First Name' value={this.state.name}/>
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            <Button type='submit'>Submit</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));