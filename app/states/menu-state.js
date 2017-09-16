/**
 * Created by Matthieu Dolez on 17/09/2017.
 */

import StringFactory from 'utils/string-factory';
import Classic from 'levels/classic';


class MenuState extends Phaser.State {
    
    create(){
        this.titleLabel = StringFactory.build(this.game, {
            text: 'God Defense'
        });
        
        this.chooseMapLabel = StringFactory.build(this.game, {
            text: 'Choose a map',
            y: 30,
            size: 16
        });
        
        this.classicLabel = StringFactory.build(this.game, {
            text: Classic.name,
            x: this.game.world.centerX,
            y: this.game.world.centerY - 50,
            size: 50
        });
        this.classicLabel.anchor.setTo(0.5, 1);
        this.classicLabel.inputEnabled = true;
        this.classicLabel.input.useHandCursor = true;
        this.classicLabel.events.onInputDown.add(this.clickedLabel, this);
        this.classicLabel.events.onInputOver.add(MenuState.hoverLabel, this);
        this.classicLabel.events.onInputOut.add(MenuState.outLabel, this);
    }
    
    clickedLabel(label){
        if(label === this.classicLabel){
            this.selectLevel(Classic);
        }
    }
    
    static hoverLabel(label){
        label.alpha = 0.5;
    }
    
    static outLabel(label){
        label.alpha = 1;
    }
    
    selectLevel(map){
        this.game.level = map;
        this.game.state.start('play');
    }
    
}

export default MenuState;