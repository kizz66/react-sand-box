import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ResultsTable from './components/index';
import getTypes from './components/types';
import getFields from './components/fields';

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
        loading : false,
        totalItems : null,
        error : '',
        q : 'авто',
        items : {}
    };
    
    /**
     *
     * @param props
     */
    constructor ( props ) {
        super ( props );
        this.state = this.defaultParams;
    }
    
    handleChange = ( event ) => {
        this.setState ( { q : event.target.value } );
    };
    
    handleClick = ()=> {
       
        this.setState ( { loading : true, totalItems : null } );
        axios.get ( URL, {
            params : {
                page : 1,
                page_size : 50,
                region_id : 1,
                type : getTypes (),
                fields : getFields (),
                q : this.state.q,
                key : 'ruoedw9225'
            }
        } ).then ( response => {
            const { meta, result } = response.data;
            if ( meta.error ) {
                this.setState ( { error : meta.error.message, loading : false } );
            } else {
                this.setState ( { totalItems : result.total, items : result.items, loading : false } );
            }
        } ).catch ( error => this.setState ( { loading : false, error : error } ) );
    };
    
    render () {
        const styles = {
            label : {
                cursor : 'default'
            }
        };
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
                    <Label as='a' color='blue' ribbon style={styles.label}>
                        Query results
                    </Label>
                    {this.state.loading && (
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                    )}
                    
                    {this.state.totalItems && (
                        <Label as='a' color='blue' style={styles.label}>
                            found {this.state.totalItems} items
                        </Label>
                    )}
                    
                    <Divider/>
                    {this.state.error && (
                        <Message
                            negative
                            header='Response error'
                            content={this.state.error}
                        />
                    )}
                    <ResultsTable items={this.state.items}/>
                </Segment>
            </Container>
        )
    }
}

ReactDOM.render ( <App />, document.querySelector ( '#app' ) );