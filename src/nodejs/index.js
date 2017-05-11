﻿function Ctrl8(init) {
    this.__Props = init ? init : {};
    this.__Ctrls = {}
}

Ctrl8.OfClass = Ctrl8;

Ctrl8.ExtendsTo = function (SubClass) {
    function inheritance() { }
    var Root = this.OfClass;
    inheritance.prototype = Root.prototype;
    SubClass.prototype = new inheritance();
    SubClass.prototype.constructor = SubClass;
    SubClass.baseConstructor = Root;
    SubClass.superClass = Root.prototype;
    SubClass.OfClass = SubClass;
    SubClass.ExtendsTo = Root.ExtendsTo;
}

Ctrl8.prototype.Prop = function (name, def, readonly, changefx, compfx, conf) {
    Ctrl8.CreateProp(this, this.__Props, name, def, readonly, compfx, changefx, conf);
};

Ctrl8.prototype.DrillProp = function (name, Storage, CtrlType) {
    CtrlType ? 1 : CtrlType = Ctrl8;
    Ctrl8.CreateProp(this, this.__Ctrls, name, new CtrlType(Storage), true);
}

Ctrl8.prototype.CalcProp = function (name, getfx, setfx, conf) {
    Ctrl8.CalcProp(this, this.__Props, name, getfx, setfx, conf);
}

Ctrl8.DefCompareFx = function (val1, val2) {
    return val1 === val2;
}

Ctrl8.DefChangeFx = function (newval) { }

Ctrl8.CreateProp = function (O, Storage, name, def, readonly, CompareFx, ChangeFx, conf) {
    CompareFx ? 1 : CompareFx = Ctrl8.DefCompareFx;
    ChangeFx ? 1 : ChangeFx = Ctrl8.DefChangeFx;
    var Pair = {
        get: function () {
            return Storage[name];
        },
        configurable: conf ? true : false
    }
    !readonly ? Pair.set = function (val) {
        var yn = CompareFx(Storage[name], val);
        yn ? 0 : (Storage[name] = val, ChangeFx(val));
    } : 1;
    Object.defineProperty(O, name, Pair);
    !Storage.hasOwnProperty(name) && def !== undefined ? Storage[name] = def : 1;
}

Ctrl8.CalcProp = function (O, Storage, name, gfx, sfx, conf) {
    var Pair = {
        get: function () {
            return gfx.call(O, name, Storage);
        },
        configurable: conf ? true : false
    }
    sfx ? Pair.set = function (nval) {
        sfx.call(O, nval, name, Storage);
    } : 1;
    Object.defineProperty(O, name, Pair);
}

function DrillCtrl(init) {
    DrillCtrl.baseConstructor.call(this, init);
    for (var n in this.__Props) {
        var o = this.__Props[n];
        if (typeof o == 'object')
            this.DrillProp(n, DrillCtrl, o)
        else
            this.Prop(n);
    }
}

Ctrl8.ExtendsTo(DrillCtrl);

function EventCtrl(int) {
    EventCtrl.baseConstructor.call(this, int);
    this.__Events = [];
}

Ctrl8.ExtendsTo(EventCtrl);

EventCtrl.prototype.Emit = function () {
    var Args = [].concat.call(arguments);
    var event = Args[0];
    Args.splice(0, 1);
    var A = this.__Events[event];
    A ? A.forEach(function (fx) {
        fx.apply(this, Args);
    }) : 1;
}

EventCtrl.prototype.On = function (event, fx) {
    var A = this.__Events[event] || (this.__Events[event] = []);
    A.indexOf(fx) < 0 ? A.push(fx) : 1;
}

EventCtrl.prototype.Off = function (event, fx) {
    var A = this.__Events[event] || (this.__Events[event] = []);
    var idx = A.indexOf(fx)
    idx >= 0 ? A.splice(idx, 1) : 1;
}