import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import shortid from 'shortid';

export default class ProblemUploader extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        this.setState({ files: files })
        const filename = shortid.generate();
        const contest_id = 'cikqgkv4q01ck7453ualdn3hn';
        var req = request.post(`/api/contests/${contest_id}/problem/${filename}`);
        req.set('Content-Length', files[0].size);
        req.set('Content-Type', 'application/pdf');
        req.set('Content-Disposition', `attachment; filename=new.pdf`);
        req.attach('file', files[0]);
        req.end();
        // setProblemMetaData(contest_id, filename, {
        //     name:   'New Problem Name',
        //     testCases: { input: [''], output: ['']}
        // })
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
