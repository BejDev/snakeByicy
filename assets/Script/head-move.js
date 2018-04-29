var Direction = require('direction');
var ongoing;
cc.Class({
    extends: cc.Component,

    properties: {
        dir: 0,
        dist: 0,
        timeBlock: 0,
        up: {
            type: cc.Node,
            default: null,
        },
        down: {
            type: cc.Node,
            default: null,
        },
        left: {
            type: cc.Node,
            default: null,
        },
        right: {
            type: cc.Node,
            default: null,
        },
        body: {
            type: cc.Prefab,
            default: null,
        },
        walls: {
            type: cc.Prefab,
            default: null,
        },
        over: {
            type: cc.Label,
            default: null,
        },
        scoreString: {
            type: cc.Label,
            default: null,
        },
        wallString: {
            type: cc.Label,
            default: null,
        },
        bodysize: 0,
        wallList: [require('wall')],
        bodyList: [require('body-follow')],
    },

    start () {
        var dir_checking;
        this.ongoing = true;
        this.dir_checking = this.dir;
        this.mouse();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var i = 1; i <= this.bodysize; i++){
            this.plusLength(this.node.x, this.node.y);
        }
        for (var i in this.bodyList) {
            if (i == 0) { this.bodyList[i].init(this); }
            else { this.bodyList[i].init(this.bodyList[i-1]); }
        }
        this.schedule(this.upd, this.timeBlock);
    },

    upd () {
    	if(this.ongoing == false){
    		return;
    	}
        this.score = this.bodyList.length;
        this.scoreString.string = 'Length: ' + this.score.toString();
        this.wallSum = this.wallList.length;
        this.wallString.string =  'Walls: ' + this.wallSum.toString();
        this.dir = this.dir_checking;
        this.prePos = this.node.getPosition();

        if (this.dir == Direction.up) {
            this.node.y += this.dist;
        }
        else if (this.dir == Direction.left) {
            this.node.x -= this.dist;
        }
        else if (this.dir == Direction.down) {
            this.node.y -= this.dist;
        }
        else if (this.dir == Direction.right) {
            this.node.x += this.dist;
        }
        else {
            cc.log('err');
        }

        if (this.node.x > 460){
            this.node.x = -460;
        }
        else if(this.node.x < -460){
            this.node.x = 460;
        }
        else if(this.node.y > 300){
            this.node.y = -300;
        }
        else if(this.node.y < -300){
            this.node.y = 300;
        }

        for (var i in this.bodyList) {
            this.bodyList[i].upd();
        }
        for (var i in this.bodyList) {
            var delNode;
            if(this.node.x == this.bodyList[i].node.x && this.node.y == this.bodyList[i].node.y){
                // console.clear();
                while(this.bodyList[this.bodyList.length-1].node.x != this.node.x || this.bodyList[this.bodyList.length-1].node.y != this.node.y){
                    delNode = this.bodyList.pop();
                    cc.log(delNode.node.x, delNode.node.y);
                    this.addWall(delNode.node.x, delNode.node.y);
                    delNode.node.destroy();
                }
                delNode = this.bodyList.pop();
                delNode.node.destroy();
            }
        }
        for (var i in this.wallList) {
            if(this.node.x == this.wallList[i].node.x && this.node.y == this.wallList[i].node.y){
                this.gameover();
            }
        }
    },
    mouse () {
        this.up.on('mouseenter', function (event) {
            if (this.check(Direction.up, this.dir)) {
                this.dir_checking = Direction.up;
            }
        }, this);
        this.down.on('mouseenter', function (event) {
            if (this.check(Direction.down, this.dir)) {
                this.dir_checking = Direction.down;
            }
        }, this);
        this.left.on('mouseenter', function (event) {
            if (this.check(Direction.left, this.dir)) {
                this.dir_checking = Direction.left;
            }
        }, this);
        this.right.on('mouseenter', function (event) {
            if (this.check(Direction.right, this.dir)) {
                this.dir_checking = Direction.right;
            }
        }, this);
    },

    addWall (x,y) {
        var scene,nodes;
        scene = cc.find('Canvas');
        nodes = cc.instantiate(this.walls);
        cc.log(this.walls,nodes);
        nodes.parent = scene;
        nodes.setPosition(x,y);
        this.wallList.push(nodes.getComponent('wall'));
    },


    gameover () {
        for(var i in this.bodyList){
            this.bodyList[i].node.destroy();
        }
        for(var i in this.wallList){
            this.wallList[i].node.destroy();
        }
        this.up.active = false;
        this.down.active = false;
        this.left.active = false;
        this.right.active = false;
        this.over.node.active = true;
        this.node.destroy();
    },

    plusLength (x,y) {
        var scene,nodes;
        scene = cc.find('Canvas');
        nodes = cc.instantiate(this.body);
        nodes.parent = scene;
        nodes.setPosition(x,y);
        nodes.getComponent('body-follow').target = this.bodyList[this.bodyList.length-1];
        nodes.getComponent('body-follow').prePos = nodes.getPosition();
        this.bodyList.push(nodes.getComponent('body-follow'));
    },

    onKeyDown (event) {
        if (event.keyCode == cc.KEY.up) {
            if (this.check(Direction.up, this.dir)) {
                this.dir_checking = Direction.up;
            }
        }
        else if (event.keyCode == cc.KEY.left) {
            if (this.check(Direction.left, this.dir)) {
                this.dir_checking = Direction.left;
            }
        }
        else if (event.keyCode == cc.KEY.down) {
            if (this.check(Direction.down, this.dir)) {
                this.dir_checking = Direction.down;
            }
        }
        else if (event.keyCode == cc.KEY.right) {
            if (this.check(Direction.right, this.dir)) {
                this.dir_checking = Direction.right;
            }
        }
        else if (event.keyCode == cc.KEY.space) {
        	this.ongoing = this.ongoing ^ 1;
        }
    },

    check (dir_1, dir_2) {
        if ((dir_1+2) % 4 == dir_2 % 4) { return false; }
        else { return true; }
    }

});
