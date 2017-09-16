
class Color {
    constructor(color){
        this.color = color;
    }
    
    toString(){
        return `#${this.color}`;
    }
    
    toHex(){
        return parseInt(this.color, 16);
    }
}

export const COLOR = {
    black: new Color('000000'),
    gray: new Color('555555'),
    red: new Color('bc2600'),
    white: new Color('ffffff')
};

export default Color;