import{L as t,x as e,_ as s,s as o,i as r,h as a,j as l,t as p,u as n,n as c}from"./shared.js";let d,i,u,h,y,b,m,w,f,g=t=>t,j=(d=p("my-component"),i=c(),u=n(["test"]),d((m=class extends t{constructor(...t){super(...t),l(this,"test",b,this)}render(){return e(w||(w=g`test`))}connectedCallback(){super.connectedCallback(),this.test="world"}updatedtest(){console.log("updated",this.test)}},s(m,"styles",[o,r(f||(f=g`
      :host {
        color: yellow;
      }
    `))]),y=m,b=a(y.prototype,"test",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"hello"}}),a(y.prototype,"updatedtest",[u],Object.getOwnPropertyDescriptor(y.prototype,"updatedtest"),y.prototype),h=y))||h);export{j as MyComponent};
