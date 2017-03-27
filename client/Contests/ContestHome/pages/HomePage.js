import React from 'react';
import { getContestInfo } from '../../ContestActions';
import './home.css';

export default class ContestHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getContestInfo(this.props.params.contest_id).then(res => {
            if (res.name) {
                const { name, about, rules } = res;
                this.setState({ name, about, rules });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.contest_id !== this.props.params.contest_id) {
            getContestInfo(this.props.params.contest_id).then(res => {
                let { name, about, rules } = res;
                this.setState({ name, about, rules });
            });
        }
    }



    render() {
        const { userRole, admin } = this.state;
        if (!this.state.name) {
            return null;
        }
        return (
            <div>
                <div id='header-banner'>
                    <h1>{this.state.name}</h1>
                    {userRole & userRole !== 'admin' ?
                        `<h3>Created by ${this.admin}</h3>` : null
                    }
                </div>
                <div className='contest-home'>
                    <h2>About</h2>
                    <div>{this.state.about}</div>
                    <h2>Rules</h2>
                    <div>{this.state.rules}</div>
                </div>
            </div>
        );
    }
}
