/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import AdminTable from '../components/AdminTable.js'
import {fetchSubmissions} from '../../ContestActions.js';

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contest_id: "cikqgkv4q01ck7453ualdn3hn"
    };
  }

  componentDidMount(){
    fetchSubmissions(this.state.contest_id).then(res => {
      this.setState({
        submissions: res
      });
    });
  }

  render() {
    const adminTable = this.state.submissions ? <AdminTable submissions={this.state.submissions}/> : null;
    return (
      <div>
        <h1> Welcome to the Admin Page </h1>
        <br/>
        {adminTable}
      </div>
    );
  }
}
