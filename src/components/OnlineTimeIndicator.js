import React from 'react';

export default class OnlineTimeIndicator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onlineTime: 0,
        };
    }
    formatTime(time) {
        var h = Math.floor(time / 3600).toString();
        var m = Math.floor((time / 60) % 60).toString();
        var s = Math.floor(time % 60).toString();
        return [h.padStart(2, '0'), m.padStart(2, '0'), s.padStart(2, '0')].join(':');
    }
    componentDidMount() {
        this.ticker = setInterval(() => {
            this.setState({ onlineTime: this.state.onlineTime + 1 });
            //this.render();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.ticker);
    }
    render() {
        const style = { textAlign: 'center' };
        return <div style={style}>Online Time：{this.formatTime(this.state.onlineTime)}</div>;
    }
}
