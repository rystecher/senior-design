import React, { PropTypes } from 'react';

// Import Components
//import PostListItem from './PostListItem/PostListItem';

function ContestList(props) {
    if (!props.contests.length || props.contests.length === 0)
        return (<div>Nothing</div>);
    return (
        <div className="listView">
            {
                props.contests.map(contest => (
                    <div key={contest.cuid}>
                        {contest.name}
                    </div>
                ))
            }
        </div>
    );
}

// ContestList.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired,
//   })).isRequired,
//   handleDeletePost: PropTypes.func.isRequired,
// };

export default ContestList;
