/**
 * Created by courtneybolivar on 21/02/2017.
 */
import React from 'react';

var AdminTable = React.createClass({

  /*
   creates buttons with color labing based on the
   status field passed in

   // Team Name // Problem Name // Override Score # // Time data // Send Feedback // Option to view submission (link to problem page)
   */
  render: function () {
    return (
      <table>
        <tr>
          <th>Team</th>
          <th>Problem Number</th>
          <th>Status</th>
          <th colSpan="2">Diff</th>
          <th>Contact</th>
        </tr>
        <tr>
          <td>Team 1</td>
          <td>Hat Problem</td>
          <td>Correct</td>
          <td>Team's output</td>
          <td>Correct output</td>
          <td>
            <select>
              <option value="0">0: Compiler Error</option>
              <option value="1">1: Bad Math</option>
              <option value="2">2: Bad Format</option>
              <option value="3">3: Correct</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Team 2</td>
          <td>Hat Problem</td>
          <td>Incorrect</td>
          <td>Team's output</td>
          <td>Correct output</td>
          <td>Click</td>
        </tr>
        <tr>
          <td>Team 2</td>
          <td>Shirt Problem</td>
          <td>Compilor Error</td>
          <td>Team's output</td>
          <td>Correct output</td>
          <td>Click</td>
        </tr>
        <tr>
          <td>Team 3</td>
          <td>Problem 4</td>
          <td>Correct</td>
          <td>Team's output</td>
          <td>Correct output</td>
          <td>Click</td>
        </tr>
        <tr>
          <td>Team 4</td>
          <td>Problem 12</td>
          <td>Correct</td>
          <td>Team's output</td>
          <td>Correct output</td>
          <td>Click</td>
        </tr>
      </table>

    );
  }
});

export default AdminTable;
