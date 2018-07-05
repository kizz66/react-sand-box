import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ResultsTable from './components/index';
import getTypes from './components/types';
import getFields from './components/fields';
import regionMap  from './components/regions';
import InputMask from 'react-input-mask';
import ScrollToTop from 'react-scroll-up';

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
    Popup,
    Checkbox
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
        pageFieldDisable : false,
        pageSize : 50,
        pagesTotal : null,
        regionId : 1,
        regionName : 'Новосибирск',
        key : localStorage.getItem ( 'requestKey' ) || 'ruoedw9225',
        items : {},
        filter : {
            site : 'off',
            social : 'off'
        }
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
        value = parseInt ( value );
        let regionId = value ? value : 1;
        this.setState ( {
            regionId : regionId,
            regionName : regionMap[ regionId ] ? regionMap[ regionId ] : 'не определен'
        } );
    };
    
    handleClick = ()=> {
        localStorage.setItem ( 'requestKey', this.state.key );
        
        this.setState ( {
            loading : true,
            totalItems : null,
            error : null,
            pagesTotal : null,
            filter : { site : 'off', social : 'off' }
        } );

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
            let pagesTotal = null;
            
            if ( meta.error ) {
                this.setState ( { error : meta.error.message, loading : false, items : {} } );
            } else {
                let pageFieldDisable;
                if ( result.total <= this.state.pageSize ) {
                    pageFieldDisable = true;
                } else {
                    pageFieldDisable = false;
                    pagesTotal = Math.ceil ( result.total / this.state.pageSize );
                }
                this.setState ( {
                    totalItems : result.total,
                    items : result.items,
                    loading : false,
                    pagesTotal : pagesTotal,
                    pageFieldDisable : pageFieldDisable
                } );
            }
        } ).catch ( error => this.setState ( { loading : false, error : error, items : {} } ) );
    };
    
    /**
     *
     * @param field  string
     * @param value string
     */
    handleFilterChange = ( field, value ) => {
        const { filter } = this.state;
        filter[ field ] = value;
        this.setState ( { filter : filter } );
    };
    
    filterControlRender = () => {
        const
            { filter } = this.state,
            style = { marginRight : 20 };
        
        return (
            <Segment style={{minWidth:500}}>
                <Form.Field inline>
                    <Label> <Icon name='filter'/> Filtering by sites&nbsp;</Label>
                    <Checkbox
                        style={style}
                        radio
                        label='off'
                        checked={filter.site === 'off'}
                        onChange={()=>{this.handleFilterChange('site','off')}}
                    />
                    <Checkbox
                        style={style}
                        radio
                        label='including'
                        checked={filter.site === 'include'}
                        onChange={()=>{this.handleFilterChange('site','include')}}
                    />
                    <Checkbox
                        style={style}
                        radio
                        label='excluding'
                        checked={filter.site === 'exclude'}
                        onChange={()=>{this.handleFilterChange('site','exclude')}}
                    />
                </Form.Field>
                <Divider horizontal>And</Divider>
                <Form.Field inline>
                    <Label> <Icon name='filter'/> Filtering by social</Label>
                    <Checkbox
                        style={style}
                        radio
                        label='off'
                        checked={filter.social === 'off'}
                        onChange={()=>{this.handleFilterChange('social','off')}}
                    />
                    <Checkbox
                        style={style}
                        radio
                        label='including'
                        checked={filter.social === 'include'}
                        onChange={()=>{this.handleFilterChange('social','include')}}
                    />
                    <Checkbox
                        style={style}
                        radio
                        label='excluding'
                        checked={filter.social === 'exclude'}
                        onChange={()=>{this.handleFilterChange('social','exclude')}}
                    />
                </Form.Field>
            </Segment>
        );
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
                                                   mask="9999" maskChar={null} style={{width:70}}
                                                   disabled={this.state.pageFieldDisable}/>
                                        { this.state.pagesTotal && (
                                            <Label color="blue">из {this.state.pagesTotal}</Label>
                                        )}
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
                                    {this.filterControlRender ()}
                                </Grid.Column>
                                <Grid.Column verticalAlign='bottom'>
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
                    <ResultsTable items={this.state.items} filter={this.state.filter}/>
                </Segment>
                <ScrollToTop showUnder={260}>
                    <Icon name={'arrow circle up'} size={'big'} color={'blue'} style={{opacity:0.5}}/>
                </ScrollToTop>
            </Container>
        )
    }
}

ReactDOM.render ( <App />, document.querySelector ( '#app' ) );