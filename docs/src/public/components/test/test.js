import{L as t,x as e,_ as s,i as o,a as r,b as a,t as l,u as p,n}from"../shared/vendor.js";import{s as i}from"../shared/utilities.js";let c,d,u,h,y,b,m,f,w,g=t=>t,j=(c=l("my-component"),d=n(),u=p(["test"]),c((m=class extends t{constructor(...t){super(...t),a(this,"test",b,this)}render(){return e(f||(f=g`
      test
    `))}connectedCallback(){super.connectedCallback(),this.test="world"}updatedtest(){console.log("updated",this.test)}},s(m,"styles",[i,o(w||(w=g`
      :host {
        color: yellow;
      }
    `))]),y=m,b=r(y.prototype,"test",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"hello"}}),r(y.prototype,"updatedtest",[u],Object.getOwnPropertyDescriptor(y.prototype,"updatedtest"),y.prototype),h=y))||h);export{j as MyComponent};
