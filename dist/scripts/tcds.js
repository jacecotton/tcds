!function(){"use strict";function t(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var e=function(){function e(t,a){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.props=a,this.backgroundImages=this.element.getAttribute("data-background-images")&&this.element.getAttribute("data-background-images").trim().split(" "),this.backgroundImages.length&&(this.backgroundImages.forEach((function(t){(new Image).src=t})),requestAnimationFrame((function(){n.rotateBackgrounds()}))),this.props.parallax&&window.addEventListener("scroll",(function(){n.parallax()}))}var a,n;return a=e,(n=[{key:"rotateBackgrounds",value:function(){var t=this;clearTimeout();var e=0;this.backgroundImages.forEach((function(a,n){setTimeout((function(){t.element.style.backgroundImage="url(".concat(t.backgroundImages[e],")"),e+1===t.backgroundImages.length?setTimeout((function(){t.rotateBackgrounds()}),t.props.interval):e++}),t.props.interval*n)}))}},{key:"parallax",value:function(){var t=50+.1*window.pageYOffset;this.element.style.backgroundPosition="center ".concat(t,"%")}}])&&t(a.prototype,n),Object.defineProperty(a,"prototype",{writable:!1}),e}();document.querySelectorAll("[data-component=Hero]").forEach((function(t){new e(t,{interval:t.getAttribute("data-interval")||1e4,parallax:t.classList.contains("Hero--parallax")})}))}();