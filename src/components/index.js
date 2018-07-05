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
     *
     * @param item
     * @param typesArray
     * @param nowrapParam
     * @returns {*}
     * @private
     */
    _renderContacts = ( item, typesArray, nowrapParam ) => {
        let nowrap = nowrapParam || false;
        if ( item.contact_groups && item.contact_groups.length > 0 ) {
            
            let result = [];
            
            _.forEach ( item.contact_groups, ( contactGroup )=> {
                let items = _.map ( contactGroup.contacts, ( contact )=> {
                    if ( typesArray.includes ( contact.type ) ) {
                        return (<div style={{whiteSpace: nowrap ? 'nowrap': 'normal'}}>{contact.text}</div>);
                    } else {
                        return null;
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
     * @returns {XML}
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
                    {this._renderContacts ( item, SOCIAL, false )}
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
                //      console.log ( item.contact_groups );
                // console.log ( item.contact_groups.length );
                break;
            
            case 'exclude':
            
        }
        
        if ( filter.social === 'off' ) {
            if ( filter.site === 'include' ) {
                return true
            } else if ( filter.site === 'exclude' ) {
                return true
            }
            return false;
        }
        //todo
        return false;
    };
    
    /**
     *
     * @returns {*}
     */
    renderRow = () => {
        const { items, filter } = this.props;
        return _.map ( items, ( item )=> {
            console.info ( item );
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