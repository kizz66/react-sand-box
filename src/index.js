import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Button,
    Form,
    Grid,
    Container,
    Label,
    Segment,
    Divider,
    Header,
    Icon,
    Dimmer,
    Loader,
    Message
} from 'semantic-ui-react';

import './base.scss';
import './semant-ui-styles/semantic.scss';

const URL = 'https://catalog.api.2gis.ru/3.0/items';
class App extends Component {

    defaultParams = {
        loading: false,
        error: '',
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
        //   console.log(this.state);
        this.setState({loading: true});
        axios.get(URL, {
            params: {
                page: 1,
                page_size:50,
                q:'авто',
                key:'ruoedw9225'

            }
        })
            .then(response => {
                const {meta, result} = response.data;
                this.setState({loading: false});
                if (meta.error) {
                    this.setState({error: meta.error.message});
                }
            })
            .catch(error => this.setState({loading: false, error: error}));
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <Container>
                <Divider hidden/>
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
                <Divider/>
                <Segment>
                    {this.state.loading && (
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                    )}
                    <h3>Query result</h3>
                    {this.state.error && (
                        <Message
                            negative
                            header='Response error'
                            content={this.state.error}
                        />
                    )}
                </Segment>
            </Container>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));