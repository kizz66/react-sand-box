import React, { Component } from 'react';
import _ from 'lodash';
import {
    Table
} from 'semantic-ui-react';
const SOCIAL = [
    'vkontakte',
    'facebook',
    'instagram',
    'youtube',
    'odnoklassniki'
];
export default class ResultsTable extends Component {
    
    /**
     * @param item
     * @param typesArray
     * @returns {boolean}
     * @private
     */
    _checkContactsAsExist = ( item, typesArray ) => {
        let result = false;
        if ( item.contact_groups && item.contact_groups.length > 0 ) {
            _.forEach ( item.contact_groups, ( contactGroup )=> {
                _.forEach ( contactGroup.contacts, ( contact )=> {
                    if ( typesArray.includes ( contact.type ) ) {
                        result = true;
                    }
                } );
            } );
        }
        return result;
    };
    
    /**
     *
     * @param item
     * @param typesArray
     * @param nowrapParam
     * @param asLinkParam
     * * @private
     */
    _renderContacts = ( item, typesArray, nowrapParam, asLinkParam ) => {
        let nowrap = nowrapParam || false;
        let asLink = asLinkParam || false;
        
        if ( item.contact_groups && item.contact_groups.length > 0 ) {
            
            let result = [];
            
            _.forEach ( item.contact_groups, ( contactGroup )=> {
                let items = _.map ( contactGroup.contacts, ( contact )=> {
                    if ( ! typesArray.includes ( contact.type ) ) {
                        return null;
                    }
                    
                    if ( asLink ) {
                        return (<div style={{whiteSpace: nowrap ? 'nowrap': 'normal'}}>
                            <a href={contact.text}>{contact.text}</a>
                        </div>);
                    } else {
                        return (<div style={{whiteSpace: nowrap ? 'nowrap': 'normal'}}>{contact.text}</div>);
                    }
                } );
                result.push ( items );
            } );
            return result;
        } else {
            return null;
        }
    };
    
    /**
     *
     * @param item
     */
    renderItem = ( item ) => {
        return (
            <Table.Row>
                <Table.Cell>
                    <div>{item.name}</div>
                    <div style={{fontSize:10,color:'#999'}}> {item.full_name}</div>
                    <div> {item.address_name}</div>
                    <div style={{fontSize:10,color:'#999'}}> {item.address_comment}</div>
                </Table.Cell>
                <Table.Cell>
                    {this._renderContacts ( item, [ 'phone' ], true )}
                </Table.Cell>
                <Table.Cell>
                    {this._renderContacts ( item, [ 'website' ], true )}
                    {this._renderContacts ( item, [ 'email' ], true )}
                </Table.Cell>
                <Table.Cell>
                    {this._renderContacts ( item, SOCIAL, false, true )}
                </Table.Cell>
            </Table.Row>
        );
    };
    
    /**
     *
     * @param item
     * @param filter
     * @returns {boolean}
     */
    checkFilter = ( item, filter )=> {
        
        if ( filter.site === 'off' && filter.social === 'off' ) {
            return true;
        }
        
        let
            socialResult = true,
            siteResult   = true;
        
        switch ( filter.site ) {
            case 'include':
                siteResult = this._checkContactsAsExist ( item, [ 'website' ] );
                break;
            
            case 'exclude':
                siteResult = ! this._checkContactsAsExist ( item, [ 'website' ] );
        }
        
        switch ( filter.social ) {
            case 'include':
                socialResult = this._checkContactsAsExist ( item, SOCIAL );
                break;
            
            case 'exclude':
                socialResult = ! this._checkContactsAsExist ( item, SOCIAL );
        }
        
        return socialResult && siteResult;
    };
    
    /**
     *
     * @returns {*}
     */
    renderRow = () => {
        const { items, filter } = this.props;
        return _.map ( items, ( item )=> {
            return this.checkFilter ( item, filter ) ? this.renderItem ( item ) : null;
        } );
    };
    
    render () {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name / Address</Table.HeaderCell>
                        <Table.HeaderCell>Phones</Table.HeaderCell>
                        <Table.HeaderCell>Site / Email</Table.HeaderCell>
                        <Table.HeaderCell>Social net</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.renderRow ()}
                </Table.Body>
            </Table>
        )
    }
}