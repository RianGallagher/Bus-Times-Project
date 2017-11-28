import React, { Component } from 'react';
import Timr from './timr.js';
import { ToastContainer, toast } from 'react-toastify';
import ReactHowler from 'react-howler'
import './Notification.css';

class Notification extends Component
{
    constructor()
    {
        super();

        this.state = { time: '10:00', playing: false, show: false }
        this.handlePlay = this.handlePlay.bind(this);
        this.doSomething = this.doSomething.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }

    notify = () => toast("Time to go and catch that bus!");

    doSomething(e)
    {
        e.preventDefault();
        console.log(e.target.innerHTML);
    }

    toggleShow()
    {
        this.setState ({show: !this.state.show});
    }

    handlePlay()
    {
        this.setState ({ playing: true })
    }

    switchState()
    {
        if(this.state.playing = true)
        {
            this.setState ({ playing: false })
        }
        else
        {
            this.setState ({ playing: true })
        }
    }

    componentDidMount()
    {
        this.timer = Timr('24h');

        this.timer = Timr(this.state.time)

            .ticker(
                ({ formattedTime, percentDone }) =>
                {
                    this.setState({ time: formattedTime, });
                    this.switchState();
                }
            )

            .onStop(self =>
                {
                    this.setState({ time: self.getFt(), });
                    this.notify();
                    this.handlePlay();
                }
            );
    }

    handleChange(formatOutput, time)
    {
        this.timer
            .changeOptions({ formatOutput })
            .setStartTime(time);

        this.setState({ time: this.timer.getFt() })
        this.switchState();
    }

    render()
    {
        const { showing } = this.state;

        return(
            <div className="container">
                <div classname="focus">
                    <h6 className="textReal">Set Notification</h6>

                    <hr/>
                    <br></br>
                    <br></br>
                    <br></br>

                    <div classname="time">
                        {this.state.time}
                    </div>

                    <div classname="controls">
                        {[ 'mm:ss' ].map(formatOutput => (
                            <label>
                                <span>{formatOutput}</span>
                                <input
                                    onChange={ev =>
                                    {
                                        return this.handleChange(formatOutput, ev.target.value);
                                    }}
                                    type="range"
                                    min="1"
                                    max="1200"
                                    defaultValue="600"
                                />
                            </label>
                        ))}
                        </div>

                        <div className="but">
                            <button onClick={() => this.timer.start()} className="start">
                                Start
                            </button>

                            <button onClick={() => this.timer.stop()} className="stop">
                                Stop
                            </button>

                            <button onClick={() => this.timer.pause()} className="pause">
                                Pause Sound
                            </button>
                        </div>

                    <ToastContainer
                        position="top-right"
                        type="default"
                        autoClose={16000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                    />

                    <ReactHowler
                        src="http://www.freesfx.co.uk/rx2/mp3s/6/18146_1464355204.mp3"
                        playing={this.state.playing}
                        ref={(ref) => (this.player = ref)}
                    />

                </div>
            </div>
        );
    }
}

export default Notification;