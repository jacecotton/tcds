import{L as t,_ as e,b as s,c as o,s as r}from"./shared.js";import{html as c,css as d}from"lit";import"lit/decorators.js";let a,l,n,p,i,u,m,h,y,b,x=t=>t;new(l=class extends t{constructor(...t){super(...t),e(this,"test",(i(this),m(this,"hello"))),h(this)}render(){return c(n||(n=x`test`))}connectedCallback(){super.connectedCallback(),this.test="world"}updatedtest(){console.log("updated",this.test)}},({e:[m,h,i],c:[b,u]}=s(l,[customElement("my-component")],[[property(),0,"test"],[updated("test"),2,"updatedtest"]],0,void 0,t)),y=l,a=class extends o{constructor(){super(b),e(this,"styles",[r,d(p||(p=x`
      * {
        color: red;
      }
    `))]),u()}},e(a,y,void 0),a);export{b as MyComponent};
