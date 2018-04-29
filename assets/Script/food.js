cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            type: require('head-move'),
            default : null,
        }    
    },

    reset () {
        this.node.setPosition(this.getRandomPos());
    },

    getRandomPos () {
        var x, y;
        do {
            x = Math.floor(cc.random0To1() * 22 - 11) * 40 -20;
            y = Math.floor(cc.random0To1() * 14 - 7) * 40 -20;
        } while(this.checkPos(x, y));
        return cc.v2(x,y);
    },

    checkPos (x,y) {
        if(x == this.head.node.x && y == this.head.node.y) {
            return true;
        }
        for(var i in this.head.bodyList) {
            if(x == this.head.bodyList[i].node.x && y == this.head.bodyList[i].node.y){
                return true;
            }
        }
        for(var i in this.head.wallList) {
            if(x == this.head.wallList[i].node.x && y ==  this.head.wallList[i].node.y){
                return true;
            }
        }
        return false;
    },

    update () {
        if(this.head == null){
            this.node.destroy();
            return;
        }
        if(cc.isValid(this.head.node) == false){
            this.node.destroy();
            return;
        }
        if(this.checkPos(this.node.x,this.node.y)) {
            this.head.plusLength(this.head.bodyList[this.head.bodyList.length-1].node.x,this.head.bodyList[this.head.bodyList.length-1].node.y);
            this.reset();
        }
    },

    start () {
        this.reset();

    },

});
