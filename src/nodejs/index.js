function Ctrl8(init) {
    this._ = {};

    this._.Props = init ? init : {};
    this._.Ctrls = {}
}

Ctrl8.ExtendsTo = function (SubClass) {
    function inheritance() { }
    var Root = this;
    inheritance.prototype = Root.prototype;
    SubClass.prototype = new inheritance();
    SubClass.prototype.constructor = SubClass;
    SubClass.baseConstructor = Root;
    SubClass.superClass = Root.prototype;
    SubClass.ExtendsTo = Root.ExtendsTo;
}

Ctrl8.prototype.Prop = function (name, def, readonly, changefx, compfx, conf,CustomStorage) {
    Ctrl8.CreateProp(this, CustomStorage || this._.Props, name, def, readonly, compfx, changefx, conf);
};

Ctrl8.prototype.DrillProp = function (name, Storage, CtrlType) {
    CtrlType ? 1 : CtrlType = Ctrl8;
    Ctrl8.CreateProp(this, this._.Ctrls, name, new CtrlType(Storage), true);
}

Ctrl8.prototype.CpxProp = function (name, CtrlType, ReadOnly) {

    Ctrl8.CalcProp(this, this._.Props, name, function (name, Storage) {
        return new CtrlType(Storage[name] || (Storage[name] = {}));
    }, ReadOnly ? null : function (nval, name, Storage) {   
            Storage[name] = nval;         
    })
}

Ctrl8.prototype.CalcProp = function (name, getfx, setfx, conf, CustomStorage) {
    Ctrl8.CalcProp(this, CustomStorage || this._.Props, name, getfx, setfx, conf);
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
        var yn = CompareFx.call(this,Storage[name], val);
        yn ? 0 : (Storage[name] = val, ChangeFx.call(this, val));
    } : 1;
    Object.defineProperty(O, name, Pair);
    !Storage.hasOwnProperty(name) && def !== undefined ? Storage[name] = def : 1;
}

Ctrl8.CalcProp = function (O, Storage, name, gfx, sfx, conf) {
    var Pair = {
        get: function () {
            return gfx.call(this, name, Storage);
        },
        configurable: conf ? true : false
    }
    sfx ? Pair.set = function (nval) {
        sfx.call(this, nval, name, Storage);
    } : 1;
    Object.defineProperty(O, name, Pair);
}

function DrillCtrl(init) {
    DrillCtrl.baseConstructor.call(this, init);
    for (var n in this._.Props) {
        var o = this._.Props[n];
        if (typeof o == 'object')
            this.DrillProp(n, DrillCtrl, o)
        else
            this.Prop(n);
    }
}

Ctrl8.ExtendsTo(DrillCtrl);

function EventCtrl(int) {
    EventCtrl.baseConstructor.call(this, int);
    this._.Events = {};
}

Ctrl8.ExtendsTo(EventCtrl);

EventCtrl.prototype.Emit = function () {
    var Args = Array.prototype.slice.call(arguments);
    var event = Args[0];
    Args.splice(0, 1);
    var A = this._.Events[event];
    A ? A.forEach(function (fx) {
        fx.apply(this, Args);
    }, this) : 1;
}

EventCtrl.prototype.On = function (event, fx) {
    var A = this._.Events[event] || (this._.Events[event] = []);
    A.indexOf(fx) < 0 ? A.push(fx) : 1;
}

EventCtrl.prototype.Off = function (event, fx) {
    var A = this._.Events[event] || (this._.Events[event] = []);
    var idx = A.indexOf(fx)
    idx >= 0 ? A.splice(idx, 1) : 1;
}

module.exports = {
    "EventCtrl": EventCtrl,
    "Ctrl8": Ctrl8
}