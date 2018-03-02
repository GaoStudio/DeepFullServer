import React, {Component} from 'react';
import './MusicPlayer.css';
class MusicPlayer extends Component {
    constructor(props){
        super(props)
        this.state={
            data:this.props.data,
            totalTime:0,
            playedLeft:0,
            volumnLeft:0,
            remainTime:0,
            isPlayed:false,
            isPaused:false,
        }
        this.audio = null;
    }
    componentDidMount(){
        let audio = this.audio;
        audio.addEventListener('canplay',()=>{
            //获取总时间
            let totalTime = parseInt(this.refs.audio.duration);
            this.setState({
                totalTime:this.getTime(totalTime),
                remainTime:this.getTime(totalTime),
                playedLeft:this.refs.played.getBoundingClientRect().left,
                volumnLeft:this.refs.totalVolume.getBoundingClientRect().left
            });
            //
        })
        //设置初始音量
        //this.refs.volumeProgress.style.width = "50%";
        audio.volume = 0.5

    }
    _play=()=>{
        console.log('play')
        let audio = this.audio;
        console.log(audio)
        audio.play()

    }
    render() {
        return (
            <div className="MusicPlayer">
                <div className="MusicPlayerWrapper">
                    <div className="MusicPlayerImg" ><img src={this.state.data.tmusic_img} /></div>
                    <div className="MusicPlayerControl">
                        <div className="MusicPlayerControlLeft"></div>
                        <div className="MusicPlayerControlWrapper">
                            <div className="MusicPlay">
                                <div className="MusicPlayButton" onClick={this._play}>
                                    <span  aria-controls="mep_0" title="Play/Pause"></span>
                                </div>
                                <div className="MusicPlayerName">{this.state.data.tmusic_name} -- {this.state.data.tmusic_star}</div>
                            </div>
                            <div className="SoundPlay">
                                <div className="MusicPlayButton">
                                    <span type="button" aria-controls="mep_0" title="Play/Pause"></span>
                                </div>
                                <div className="SoundPlaySlider">
                                    <div className="total"></div>
                                    <div className="current"></div>
                                    <div className="handle"></div>
                                </div>
                            </div>
                        </div>
                        <div className="MusicPlayerControlRight"> </div>

                    </div>
                </div>
                <div className="MusicPlayerProgress">
                    <div className="loaded" ref="buffered"></div>
                    <div className="current" ref="played"></div>
                    <img className="control" src={require('../images/handle.png')}></img>
                </div>
                <audio src={this.state.data.tmusic_src} ref={(ref)=>{ this.audio=ref}} crossOrigin="anonymous"></audio>
            </div>
        )
    }
}
export default MusicPlayer