import React, { Component } from 'react';
import Timr from './timr.js';
import { ToastContainer, toast } from 'react-toastify';
import ReactHowler from 'react-howler';

class Notification extends Component
{
    constructor()
    {
        super();

        this.state = { time: '10:00', playing: false, }
        this.handlePlay = this.handlePlay.bind(this);
    }

    notify = () => toast("Time to go and catch that bus!");

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

    stopSound()
    {
        this.setState ({ playing: false })
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

        return <div className="container">
            <div className="focus">
                <h6 className="textReal">Set Notification</h6>

                <hr/>
                <br></br>
                <br></br>
                <br></br>

                <div style={{margin: "0 auto", textAlign: "center", fontSize: "100px"}}>
                    {this.state.time}
                </div>

                <div className="controls">
                    {['mm:ss'].map(formatOutput => (
                        <label style={{ display: "block", margin: "80px auto", width: "1000px auto"}} >
                            <span style={{ color: "#ffffff", display: "block"}} >{formatOutput}</span>
                            <input
                                onChange={ev => {
                                    return this.handleChange(formatOutput, ev.target.value);
                                }}
                                type="range"
                                min="1"
                                max="1200"
                                defaultValue="600"

                                style={{ transform: "rotate(180deg)", width: "100%"}}
                            />
                        </label>
                    ))}
                </div>

                <div style={{margin: "0 auto", textAlign: "center" }}>
                    <button onClick={() => this.timer.start()} style={{ background: "none", border: "2px solid goldenrod",
                        borderRadius: "15px", cursor: "pointer", padding: "10px", transition: "all .2s linear", display: "block",
                        margin: "20px auto", width: "200px auto", fontSize: "17px"}} >
                        Start Notification
                    </button>

                    <button onClick={() => this.timer.stop()} style={{ background: "none", border: "2px solid goldenrod",
                        borderRadius: "15px", cursor: "pointer", padding: "10px", transition: "all .2s linear", display: "block",
                        margin: "20px auto", width: "200px auto", fontSize: "17px"}}>
                        Stop Notification
                    </button>

                    <br />
                    <br />

                    <button onClick={() => this.stopSound()} style={{ background: "none", border: "2px solid goldenrod",
                        borderRadius: "15px", cursor: "pointer", padding: "10px", transition: "all .2s linear", display: "block",
                        margin: "20px auto", width: "200px auto", fontSize: "17px"}}>
                        Pause Sound
                    </button>
                </div>

                <ToastContainer
                    position="bottom-right"
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
    }
}

export default Notification;