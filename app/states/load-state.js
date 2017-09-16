/**
 * Created by Boudha on 16/09/2017.
 */
import ASSETS from 'assets';


class LoadState extends Phaser.State {
    preload() {
        this.addLoadingLabel();
        this.addLoadingBar();
        this.loadAssets();
    }
    
    create() {
    
    }
    
    addLoadingLabel(){
        this.loadingLabel = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 10,
            'LOADING',
            {
                font: `16px 'Raleway'`,
                fill: '#777777',
                fontWeight: 'bold'
            }
    );
        this.loadingLabel.anchor.setTo(0.5, 0.5);
    }
    
    addLoadingBar(){
        this.loadingBar = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY + 10,
            'loading-bar'
        );
        this.loadingBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(this.loadingBar);
    }
    
    loadAssets(){
        ASSETS.images.forEach(image => this.loadImage(image));
    }
    
    loadImage(name){
        this.game.load.image(name, `img/${name}.png`);
    }
}

export default LoadState;