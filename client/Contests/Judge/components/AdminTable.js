/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';
import Submission from './Submission.js';
import Styles from './Admin.css';

var AdminTable = React.createClass({


  onSelect: function() {

  },
  /*


   <Submission sub={this.props.submissions[0]} />
   <Submission sub={this.props.submissions[1]} />
   <Submission sub={this.props.submissions[2]} />

   creates buttons with color labing based on the
   status field passed in


   // compile list of submissions
   let submissionsList;
   console.log("length = " + this.props.submissions.length);
   {Object.keys(this.props.submissions).map((key) => {
   submissionsList +=  this.props.submissions[key];
   })};
   // Team Name // Problem Name // Override Score # // Time data // Send Feedback // Option to view submission (link to problem page)
   */
  render: function () {

    //compile submissions
    /*
    currently gives a warning that each submissions needs a key, since teams
    can have more than one submission per problem, submissions are not unique
    in that sense...2 rows with same key only show up once
     */
    let i = 0;
    const listItems = this.props.submissions.map((numSubs) =>
        <Submission sub={numSubs}/>
    );

    return (
      <div>
        <table className={Styles}>
          <tr>
            <th>Team</th>
            <th>Problem Name</th>
            <th>Correct</th>
            <th>Feedback/Sugessted</th>
            <th>Change/Override</th>
            <th>Send Change Button</th>
          </tr>
          {listItems}
        </table>
      </div>
    );
  }

});

export default AdminTable;
