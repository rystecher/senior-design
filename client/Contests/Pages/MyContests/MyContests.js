import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import ContestList from '../../Create/ContestList';

// Import Actions
import {fetchNotMyContests, deleteContestRequest} from '../../ContestActions';

// Import Selectors
import { getNotMyContests } from '../../ContestReducer';

class MyContestsPage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchNotMyContests());
    }

    handleDeleteContest = contest => {
        if (confirm('Do you want to delete this contest')) { // eslint-disable-line
          this.props.dispatch(deleteContestRequest(contest));
        }
    };

    render() {
        return (
            <div>
                <ContestList
                    handleDeleteContest={this.handleDeleteContest}
                    contests={this.props.myContests}
                />
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
MyContestsPage.need = [() => { return fetchNotMyContests(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    myContests: getNotMyContests(state),
  };
}

MyContestsPage.propTypes = {
  myContests: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

MyContestsPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(MyContestsPage);
