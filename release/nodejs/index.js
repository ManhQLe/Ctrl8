function Ctrl8(a){this._={};this._.Props=a?a:{};this._.Ctrls={}}Ctrl8.ExtendsTo=function(a){function c(){}c.prototype=this.prototype;a.prototype=new c;a.prototype.constructor=a;a.baseConstructor=this;a.superClass=this.prototype;a.ExtendsTo=this.ExtendsTo};Ctrl8.prototype.Prop=function(a,c,b,d,e,f,g,h){Ctrl8.CreateProp(this,g||this._.Props,a,c,b,e,d,f,h)};Ctrl8.prototype.EProp=function(a,c,b,d,e,f,g){Ctrl8.CreateProp(this,g||this._.Props,a,c,b,e,d,f,1)};
Ctrl8.prototype.DrillProp=function(a,c,b){b?1:b=Ctrl8;Ctrl8.CreateProp(this,this._.Ctrls,a,new b(c),!0)};Ctrl8.prototype.CpxProp=function(a,c,b){Ctrl8.CalcProp(this,this._.Props,a,function(a,b){return new c(b[a]||(b[a]={}))},b?null:function(a,c,b){b[c]=a},!1)};Ctrl8.prototype.CalcProp=function(a,c,b,d,e,f){Ctrl8.CalcProp(this,e||this._.Props,a,c,b,d,f)};Ctrl8.prototype.ECalcProp=function(a,c,b,d,e){Ctrl8.CalcProp(this,e||this._.Props,a,c,b,d,1)};
Ctrl8.prototype.CalcOnceProp=function(a,c,b,d,e){Ctrl8.CalcProp(this,d||this._.Props,a,function(a,b){return b[a]||(b[a]=c.call(this,a,b))},null,b,e)};Ctrl8.prototype.ECalcOnceProp=function(a,c,b,d){Ctrl8.CalcProp(this,d||this._.Props,a,function(a,b){return b[a]||(b[a]=c.call(this,a,b))},null,b,1)};Ctrl8.DefCompareFx=function(a,c){return a===c};Ctrl8.DefChangeFx=function(a){};
Ctrl8.CreateProp=function(a,c,b,d,e,f,g,h,k){f?1:f=Ctrl8.DefCompareFx;g?1:g=Ctrl8.DefChangeFx;h={get:function(){return c[b]},configurable:h?!0:!1,eenumerable:k?!0:!1};e?1:h.set=function(a){f.call(this,c[b],a)?0:(c[b]=a,g.call(this,a))};Object.defineProperty(a,b,h);c.hasOwnProperty(b)||void 0===d?1:c[b]=d};Ctrl8.CalcProp=function(a,c,b,d,e,f,g){f={get:function(){return d.call(this,b,c)},configurable:f?!0:!1,enumerable:g?!0:!1};e?f.set=function(a){e.call(this,a,b,c)}:1;Object.defineProperty(a,b,f)};
function DrillCtrl(a){DrillCtrl.baseConstructor.call(this,a);for(var c in this._.Props)a=this._.Props[c],"object"==typeof a?this.DrillProp(c,DrillCtrl,a):this.Prop(c)}Ctrl8.ExtendsTo(DrillCtrl);function EventCtrl(a){EventCtrl.baseConstructor.call(this,a);this._.Events={}}Ctrl8.ExtendsTo(EventCtrl);EventCtrl.prototype.Emit=function(){var a=Array.prototype.slice.call(arguments),c=a[0];a.splice(0,1);(c=this._.Events[c])?c.forEach(function(b){b.apply(this,a)},this):1};
EventCtrl.prototype.On=function(a,c){var b=this._.Events[a]||(this._.Events[a]=[]);0>b.indexOf(c)?b.push(c):1};EventCtrl.prototype.Off=function(a,c){var b=this._.Events[a]||(this._.Events[a]=[]),d=b.indexOf(c);0<=d?b.splice(d,1):1};module.exports={EventCtrl:EventCtrl,Ctrl8:Ctrl8};
