/**
 * Created by Boudha on 16/09/2017.
 */
import ASSETS from 'assets';


class LoadState extends Phaser.State {
    preload() {
        // On ajoute le text Loading
        this.addLoadingLabel();
        // On ajoute la barre de chargement
        this.addLoadingBar();
        // On charge le reste des assets
        this.loadAssets();
    }
    
    create() {
        // On redirige vers le menu du jeu
        this.game.state.start('menu');
    }
    
    addLoadingLabel(){
        // On ajoute le label au jeu
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
        // On déplace le centre de gravité
        this.loadingLabel.anchor.setTo(0.5, 0.5);
    }
    
    addLoadingBar(){
        // On place la barre de chargement
        this.loadingBar = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY + 10,
            'loading-bar'
        );
        this.loadingBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(this.loadingBar);
    }
    
    loadAssets(){
        // On charge les images
        ASSETS.images.forEach(image => this.loadImage(image));
        // On charge les spritesheets
        ASSETS.spritesheets.forEach(spritesheet => this.loadSpritesheet(spritesheet));
        // On charge les fichiers audio
        ASSETS.audios.forEach(audio => this.loadAudio(audio));
        // On charge les atlas
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