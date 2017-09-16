
import { COLOR } from 'utils/color';

class StringFactory {
    
    static build(game, options){
        const font = 'Raleway';
        let color = COLOR.black;
        let size = 20;
        
        if(options.color){
            color = options.color;
        }
        
        if(options.size){
            size = options.size;
        }
        
        return game.add.text(options.x, options.y, options.text, {
            font: `${size}px '${font}'`,
            fill: color.toString()
        });
    }
    
}

export default StringFactory;