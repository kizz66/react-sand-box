import React, { Component } from 'react';
import _ from 'lodash';
import {
    Table
} from 'semantic-ui-react';

export default class ResultsTable extends Component {
    
    renderRow = () => {
        const { items } = this.props;
        
        return _.map ( items, ( item )=> {
            console.log ( item );
            
            return (
                <Table.Row>
                    <Table.Cell>
                        <div>{item.name}</div>
                        <div style={{fontSize:10,color:'#999'}}> {item.full_name}</div>
                    </Table.Cell>
                    <Table.Cell>
                        <div> {item.address_name}</div>
                        <div style={{fontSize:10,color:'#999'}}> {item.address_comment}</div>
                    </Table.Cell>
                    <Table.Cell>null</Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
            )
        } );
    };
    
    render () {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Contacts</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.renderRow ()}
                </Table.Body>
            </Table>
        )
    }
}