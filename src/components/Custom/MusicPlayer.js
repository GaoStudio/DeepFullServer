import React, {Component} from 'react';
import styles from './MusicPlayer.less' ;
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
        console.log(this.state.data)
        return (
            <div className={styles.MusicPlayer} >
                <div className={styles.MusicPlayerWrapper} >
                    <div className={styles.MusicPlayerImg} ><img src={this.state.data.music_img} /></div>
                    <div className={styles.MusicPlayerControl}>
                        <div className={styles.MusicPlayerControlLeft}></div>
                        <div className={styles.MusicPlayerControlWrapper}>
                            <div className={styles.MusicPlay}>
                                <div className={styles.MusicPlayButton} onClick={this._play}>
                                    <span  aria-controls="mep_0" title="Play/Pause"></span>
                                </div>
                                <div className={styles.MusicPlayerName}>{this.state.data.music_name} -- {this.state.data.music_star}</div>
                            </div>
                            <div className={styles.SoundPlay}>
                                <div className={styles.MusicPlayButton}>
                                    <span type="button" aria-controls="mep_0" title="Play/Pause"></span>
                                </div>
                                <div className={styles.SoundPlaySlider}>
                                    <div className={styles.total}></div>
                                    <div className={styles.current}></div>
                                    <div className={styles.handle}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.MusicPlayerControlRight}> </div>

                    </div>
                </div>
                <div className={styles.MusicPlayerProgress}>
                    <div className={styles.loaded} ref="buffered"></div>
                    <div className={styles.current} ref="played"></div>
                    <img className={styles.control} src={require('../../assets/handle.png')}></img>
                </div>
                <audio src={this.state.data.music_src} ref={(ref)=>{ this.audio=ref}} crossOrigin="anonymous"></audio>
            </div>
        )
    }
}
export default MusicPlayer