var target,prePos;
cc.Class({
    extends: cc.Component,

    properties: {
        // prePos: new cc.v2(0,0),
    },

    init (tar) {
        this.target = tar;
    },

    upd () {
        this.prePos = this.node.getPosition();
        // cc.log(this.prePos);
        this.node.setPosition(this.target.prePos);
    },

});
