import React from 'react';

export default class ProgressBar extends React.Component {
    render () {
        const {progress} = this.props;
        return (
            <div className="progress">
                <div className="progress-bar"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{width: progress + "%"}}>
                    {progress.toFixed(0)}%
                </div>
            </div>
        );
    }
}
