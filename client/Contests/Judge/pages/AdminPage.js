/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import AdminTable from '../components/AdminTable.js'

/*
 A component to create the components for this page
 */
export default class AdminPage extends React.Component {
  render() {
    return (
      <div>
        <h1> Welcome to the Admin Page </h1>
        <p> Some contest info </p>
        <br/>
        <AdminTable />
      </div>
    );
  }
}
