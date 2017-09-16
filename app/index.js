/**
 * @Author Matthieu Dolez
 */
import BootState from 'states/boot-state';
import LoadState from 'states/load-state';
import MenuState from 'states/menu-state';
import PlayState from 'states/play-state';

class GodDefense extends Phaser.Game {
    
    constructor(){
        super(1024, 768, Phaser.AUTO, 'content', null, true, false);
        this.level = null;
        
        this.state.add('boot', BootState, false);
        this.state.add('load', LoadState, false);
        this.state.add('menu', MenuState, false);
        this.state.add('play', PlayState, false);
        
        this.state.start('boot');
    }
    
}

new GodDefense();
