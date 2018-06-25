import React, { Component } from 'react';
import _ from 'lodash';
import {
    Table
} from 'semantic-ui-react';

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
            return _.map ( item.contact_groups[ 0 ][ 'contacts' ], ( contact )=> {
                if ( typesArray.includes ( contact.type ) ) {
                    return (<div style={{whiteSpace: nowrap ? 'nowrap': 'normal'}}>{contact.text}</div>);
                }
            } );
        } else {
            return null;
        }
    };
    
    renderRow = () => {
        const { items } = this.props;
        return _.map ( items, ( item )=> {
            console.info ( item );
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
                        {this._renderContacts ( item, [
                            'vkontakte',
                            'facebook',
                            'instagram',
                            'youtube'
                        ], false )}
                    </Table.Cell>
                </Table.Row>
            )
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