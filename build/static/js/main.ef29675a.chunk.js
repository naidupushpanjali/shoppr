(this.webpackJsonpshopify=this.webpackJsonpshopify||[]).push([[0],{19:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),a=n(12),r=n.n(a),o=(n(19),n(5)),i=n.n(o),u=n(11),j=n(9),p=n(6),b=n(42),f=n(10),l=n.n(f),O=n(1),h=s.a.lazy((function(){return n.e(3).then(n.bind(null,44))})),d=function(){var e=Object(c.useState)([]),t=Object(p.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(!0),r=Object(p.a)(a,2),o=r[0],d=r[1],m=Object(c.useState)(1),g=Object(p.a)(m,2),x=g[0],v=g[1],_=Object(c.useState)(!0),w=Object(p.a)(_,2),y=w[0],k=w[1];Object(c.useEffect)((function(){y&&S()}),[n]);var S=function(){var e=Object(j.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:setTimeout(Object(j.a)(i.a.mark((function e(){var t,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://beingfoxy.publshr.io/wp-json/shoppr/v1/get_instagram_posts?page_no=".concat(x,"&per_page=10"));case 2:return t=e.sent,e.next=5,t.json();case 5:c=e.sent,v(x+1),c.instagram_post_details.length>0?(k(!0),s((function(){return[].concat(Object(u.a)(n),Object(u.a)(c.instagram_post_details))})),d(!0)):(k(!1),d(!1));case 8:case"end":return e.stop()}}),e)}))),1e3);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){}),[o]);return Object(O.jsx)("div",{className:"container",children:Object(O.jsx)("div",{className:"row",children:Object(O.jsxs)("div",{className:"col-sm-12",children:[Object(O.jsx)(f.ResponsiveMasonry,{columnsCountBreakPoints:{350:3,750:3,900:3},children:Object(O.jsx)(l.a,{columnsCount:3,gutter:"15px",children:n.map((function(e){return Object(O.jsx)(c.Suspense,{fallback:Object(O.jsx)(b.a,{animation:"wave"}),children:Object(O.jsx)(h,{src:e.post_meta.social_post_image})},e.id)}))})}),o&&Object(O.jsx)("p",{children:"Loading..."})]})})})},m=(n(28),function(e){e&&e instanceof Function&&n.e(4).then(n.bind(null,43)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))});r.a.render(Object(O.jsx)(d,{}),document.getElementById("root")),m()}},[[29,1,2]]]);
//# sourceMappingURL=main.ef29675a.chunk.js.map