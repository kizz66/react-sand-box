import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ResultsTable from './components/index';
import getTypes from './components/types';
import getFields from './components/fields';
import regionMap  from './components/regions';
import InputMask from 'react-input-mask';

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
    Message,
    Popup
} from 'semantic-ui-react';

import './base.scss';
import './semant-ui-styles/semantic.scss';

const URL = 'https://catalog.api.2gis.ru/3.0/items';
class App extends Component {
    
    defaultParams = {
        loading : false,
        totalItems : null,
        error : '',
        q : '',
        page : 1,
        pageSize : 50,
        regionId : 1,
        regionName : 'Новосибирск',
        key : localStorage.getItem ( 'requestKey' ) || 'ruoedw9225',
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
    
    handleQChange = ( event ) => {
        this.setState ( { q : event.target.value } );
    };
    
    handlePageChange = ( event ) => {
        let { value }  = event.target;
        this.setState ( { page : value } );
    };
    
    handleKeyChange = ( event ) => {
        let { value }  = event.target;
        this.setState ( { key : value } );
    };
    
    handleRegionIdChange = ( event ) => {
        let { value }  = event.target;
        value = parseInt(value);
        let regionId = value ? value : 1;
        this.setState ( {
            regionId : regionId,
            regionName : regionMap[ regionId ] ? regionMap[ regionId ] : 'не определен'
        } );
    };
    
    handleClick = ()=> {
        localStorage.setItem ( 'requestKey', this.state.key );
        
        this.setState ( { loading : true, totalItems : null, error : null } );
        axios.get ( URL, {
            params : {
                page : this.state.page,
                page_size : this.state.pageSize,
                region_id : this.state.regionId,
                type : getTypes (),
                fields : getFields (),
                q : this.state.q,
                key : this.state.key
            }
        } ).then ( response => {
            const { meta, result } = response.data;
            if ( meta.error ) {
                this.setState ( { error : meta.error.message, loading : false, items : {} } );
            } else {
                this.setState ( { totalItems : result.total, items : result.items, loading : false } );
            }
        } ).catch ( error => this.setState ( { loading : false, error : error, items : {} } ) );
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
                                        <Label>Page</Label>
                                        <InputMask value={this.state.page} onChange={this.handlePageChange}
                                                   mask="9999" maskChar={null} style={{width:70}}/>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field inline>
                                        <Label><Icon name='globe'/>Region ID</Label>
                                        <InputMask value={this.state.regionId} onChange={this.handleRegionIdChange}
                                                   mask="99" maskChar={null} style={{width:70}}/>&nbsp;
                                        <Label>{this.state.regionName}</Label>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field inline>
                                        <Label> <Icon name='key'/>Key</Label>
                                        <input value={this.state.key} onChange={this.handleKeyChange}/>&nbsp;
                                        <Popup
                                            trigger={<Icon name='question circle outline' color='orange'  />}
                                            content="This key will be stored in browser's local storage, when you pushed submit button"
                                            position='top right'
                                        />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field inline>
                                        <Label> <Icon name='search'/>Searching string</Label>
                                        <input value={this.state.q} onChange={this.handleQChange}/>
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button.Group floated={"right"}>
                                        <Button onClick={this.handleClick} positive>Submit</Button>
                                        <Button.Or />
                                        <Button onClick={()=>this.setState(this.defaultParams)}>Reset
                                            form</Button>
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