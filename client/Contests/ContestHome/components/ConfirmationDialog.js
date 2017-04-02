import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '600px',
    },
};

export default class ConfirmationDialog extends React.Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.showDialog}
                    onRequestClose={this.props.closeModal}
                    style={customStyles}
                    contentLabel='Confirmation Modal'
                >
                    <h2 className='modal-header modal-title'>{this.props.title}</h2>
                    <div className='modal-body'>{this.props.text}</div>
                    <div className='modal-footer'>
                        <button
                            onClick={this.props.closeModal}
                            className='btn btn-outline-danger'
                        >Cancel</button>
                        <button
                            onClick={this.props.confirm}
                            className='btn confirm'
                        >{this.props.confirmText}</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

ConfirmationDialog.propTypes = {
    closeModal: React.PropTypes.func,
    confirm: React.PropTypes.func,
    confirmText: React.PropTypes.string,
    showDialog: React.PropTypes.bool,
    text: React.PropTypes.string,
    title: React.PropTypes.string,
};
