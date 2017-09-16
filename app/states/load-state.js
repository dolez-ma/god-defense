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
        ASSETS.spritesheets.forEach(spritesheet => this.loadSpritesheet(spritesheet));
        ASSETS.audios.forEach(audio => this.loadAudio(audio));
        ASSETS.atlases.forEach(atlas => this.loadAtlas(atlas));
    }
    
    loadImage(name){
        this.game.load.image(name, `img/${name}.png`);
    }
    
    loadSpritesheet(spritesheet){
        this.game.load.spritesheet(spritesheet.name, `img/${spritesheet.name}.png`, spritesheet.width, spritesheet.height);
    }
    
    loadAudio(audio){
        this.game.load.audio(audio.name, audio.files.map(file => `audio/${file}`));
    }
    
    loadAtlas(atlas){
        this.game.load.atlas(atlas, `img/${atlas}.png`, `img/${atlas}.xml`, null, Phaser.Loader.TEXTURE_ATLAS_XML_STARLING);
    }
}

export default LoadState;