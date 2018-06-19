import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Form,
    Grid,
    Container,
    Label,
    Segment,
    Divider,
    Header,
    Icon
} from 'semantic-ui-react';

import './base.scss';
import './semant-ui-styles/semantic.scss';

class App extends Component {
    defaultParams = {
        q: 'test'
    };

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = this.defaultParams;
    }

    /**
     *
     * @param event
     */
    handleChange = (event) => {
        this.setState({q: event.target.value});
    };

    handleClick = ()=> {
        console.log(this.state);
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <Container>
                <Divider />
                <Segment>
                    <Header as='h4'>
                        <Icon name='settings'/>
                        <Header.Content>
                            Query Settings
                            <Header.Subheader>Build your query</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Divider />
                    <Form>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field inline>
                                        <Label>Searching string</Label>
                                        <input value={this.state.q} onChange={this.handleChange}/>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column></Grid.Column>
                                <Grid.Column></Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button.Group floated={"right"}>
                                        <Button onClick={()=>this.setState(this.defaultParams)}>Reset form</Button>
                                        <Button.Or />
                                        <Button onClick={this.handleClick} positive>Submit</Button>
                                    </Button.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
            </Container>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));