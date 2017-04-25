import React from 'react';
import ReactDOM from 'react-dom';
import PDF from 'pdfjs-dist/build/pdf.combined.js';

export default class SimplePDF extends React.Component {

    constructor(props) {
        super(props);
        this.loadPDF = this.loadPDF.bind(this);
    }

    loadPDF() {
        const node = ReactDOM.findDOMNode(this).getElementsByClassName('S-PDF-ID')[0];
        node.innerHTML = '';
        node.style.width = '100%';
        node.style.height = '100%';
        node.style.overflowX = 'hidden';
        node.style.overflowY = 'scroll';
        node.style.padding = '0px';

        PDF.getDocument(this.props.file).then(function (pdf) {
            for (var id = 1, i = 1; i <= pdf.numPages; i++) {
                pdf.getPage(i).then(function (page) {
                    const boxWidth = node.clientWidth;
                    const pdfWidth = page.getViewport(1).width;
                    const scale = boxWidth / pdfWidth;
                    const viewport = page.getViewport(scale);

                    const canvas = document.createElement('canvas');
                    canvas.id = 'page-' + id; id++;
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    node.appendChild(canvas);

                    const context = canvas.getContext('2d');
                    const renderContext = {
                        canvasContext: context,
                        viewport,
                    };
                    page.render(renderContext);
                });
            }
        });
    }

    componentDidMount() {
        this.loadPDF();
    }

    componentDidUpdate() {
        this.loadPDF();
    }

    render() {
        return (
            <div className='SimplePDF'>
                <div className='S-PDF-ID'></div>
            </div>
        );
    }
}

module.exports = { SimplePDF };
