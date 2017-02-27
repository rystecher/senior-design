import React from 'react';
import Dropzone from 'react-dropzone';
import fetch from 'isomorphic-fetch';
import request from 'superagent';

export default class ProblemUploader extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        console.log('Received files: ', files);
        this.setState({ files: files })
        var req = request.post('/api/contests/cikqgkv4q01ck7453ualdn3hn/problem');
        req.set('Content-Length', files[0].size);
        req.set('Content-Type', 'application/pdf');
        req.set('Content-Disposition', `attachment; filename=new.pdf`);
        req.attach('file', files[0]);
        req.end();
    }

    render() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop} multiple={false}>
                    <div>Drag and drop pdf here or click to select files to upload.</div>
                </Dropzone>
            </div>
        );
    }
}
