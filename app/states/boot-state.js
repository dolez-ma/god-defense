
class BootState  extends Phaser.State {
    
    preload(){
        this.game.load.image('loading-bar', 'img/loading-bar.png');
    }
    
    create(){
        this.game.stage.backgroundColor = '#000';
        this.game.state.start('load');
    }
    
}

export default BootState;