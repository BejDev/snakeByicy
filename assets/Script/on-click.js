// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        main: {
            type: cc.Node,
            default: null,
        },
        note: {
            type: cc.Node,
            default: null,
        },
        mover: {
            type: cc.Node,
            default: null,
        },
        pre: {
            type: cc.Node,
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on('mousedown', function (event) {
            this.continue();
        }, this);
        this.node.on('touchstart', function (event) {
            this.continue();
        }, this);
    },

    continue () {
        this.main.active = true;
        this.note.active = true;
        this.mover.active = true;
        this.pre.active = false;
        this.node.destroy();
    },

    onKeyDown () {
        if (event.keyCode == cc.KEY.enter) {
            this.continue();
        }
    },
    // update (dt) {},
});
