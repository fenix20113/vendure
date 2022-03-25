(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{eSfC:function(e,n,t){"use strict";t.r(n),t.d(n,"LoginComponent",function(){return b}),t.d(n,"LoginModule",function(){return y}),t.d(n,"loginRoutes",function(){return v}),t.d(n,"LoginGuard",function(){return f});var r=t("t9nd"),c=t("fXoL"),a=t("tyNb"),o=t("3Pt+"),s=t("8MG2"),i=t("Bzlx"),l=t("ofXK"),d=t("sYmb");function g(e,n){1&e&&(c.hc(0,"span"),c.Vc(1,"-"),c.gc())}function h(e,n){if(1&e&&(c.hc(0,"span"),c.Vc(1),c.Tc(2,g,2,0,"span",12),c.gc()),2&e){const e=c.rc();c.Qb(1),c.Xc("",e.brand," "),c.Qb(1),c.yc("ngIf",!e.hideVendureBranding||!e.hideVersion)}}function p(e,n){1&e&&(c.hc(0,"span"),c.Vc(1,"vendure"),c.gc())}function u(e,n){if(1&e&&(c.hc(0,"span"),c.Vc(1),c.gc()),2&e){const e=c.rc();c.Qb(1),c.Xc("v",e.version,"")}}class b{constructor(e,n){this.authService=e,this.router=n,this.username="",this.password="",this.rememberMe=!1,this.version=r.a,this.brand=Object(r.U)().brand,this.hideVendureBranding=Object(r.U)().hideVendureBranding,this.hideVersion=Object(r.U)().hideVersion}logIn(){this.errorMessage=void 0,this.authService.logIn(this.username,this.password,this.rememberMe).subscribe(e=>{switch(e.__typename){case"CurrentUser":const n=this.getRedirectRoute();this.router.navigateByUrl(n||"/");break;case"InvalidCredentialsError":case"NativeAuthStrategyError":this.errorMessage=e.message}})}getRedirectRoute(){let e;const n=new RegExp(`${r.b}=(.*)`);try{const t=window.location.search.match(n);t&&1<t.length&&(e=atob(decodeURIComponent(t[1])))}catch(t){}return e}}b.\u0275fac=function(e){return new(e||b)(c.bc(r.k),c.bc(a.e))},b.\u0275cmp=c.Vb({type:b,selectors:[["vdr-login"]],decls:25,vars:24,consts:[[1,"login-wrapper"],[1,"login"],[1,"title"],["src","assets/logo-300px.png"],[1,"login-group"],["type","text","name","username","id","login_username",1,"username",3,"ngModel","placeholder","ngModelChange"],["name","password","type","password","id","login_password",1,"password",3,"ngModel","placeholder","ngModelChange"],[1,"login-error",3,"clrAlertType","clrAlertClosable"],[1,"alert-text"],["type","checkbox","clrCheckbox","","id","rememberme","name","rememberme",3,"ngModel","ngModelChange"],["type","submit",1,"btn","btn-primary",3,"disabled","click"],[1,"version"],[4,"ngIf"]],template:function(e,n){1&e&&(c.hc(0,"div",0),c.hc(1,"form",1),c.hc(2,"label",2),c.cc(3,"img",3),c.gc(),c.hc(4,"div",4),c.hc(5,"input",5),c.pc("ngModelChange",function(e){return n.username=e}),c.sc(6,"translate"),c.gc(),c.hc(7,"input",6),c.pc("ngModelChange",function(e){return n.password=e}),c.sc(8,"translate"),c.gc(),c.hc(9,"clr-alert",7),c.hc(10,"clr-alert-item"),c.hc(11,"span",8),c.Vc(12),c.gc(),c.gc(),c.gc(),c.hc(13,"clr-checkbox-wrapper"),c.hc(14,"input",9),c.pc("ngModelChange",function(e){return n.rememberMe=e}),c.gc(),c.hc(15,"label"),c.Vc(16),c.sc(17,"translate"),c.gc(),c.gc(),c.hc(18,"button",10),c.pc("click",function(){return n.logIn()}),c.Vc(19),c.sc(20,"translate"),c.gc(),c.gc(),c.hc(21,"div",11),c.Tc(22,h,3,2,"span",12),c.Tc(23,p,2,0,"span",12),c.Tc(24,u,2,1,"span",12),c.gc(),c.gc(),c.gc()),2&e&&(c.Qb(5),c.yc("ngModel",n.username)("placeholder",c.tc(6,16,"common.username")),c.Qb(2),c.yc("ngModel",n.password)("placeholder",c.tc(8,18,"common.password")),c.Qb(2),c.Tb("visible",n.errorMessage),c.yc("clrAlertType","danger")("clrAlertClosable",!1),c.Qb(3),c.Xc(" ",n.errorMessage," "),c.Qb(2),c.yc("ngModel",n.rememberMe),c.Qb(2),c.Wc(c.tc(17,20,"common.remember-me")),c.Qb(2),c.yc("disabled",!n.username||!n.password),c.Qb(1),c.Xc(" ",c.tc(20,22,"common.login")," "),c.Qb(3),c.yc("ngIf",n.brand),c.Qb(1),c.yc("ngIf",!n.hideVendureBranding),c.Qb(1),c.yc("ngIf",!n.hideVersion))},directives:[o.E,o.q,o.r,s.u,i.a,o.b,o.p,o.s,s.f,s.g,s.h,s.k,o.a,s.i,l.o],pipes:[d.d],styles:[".login-wrapper[_ngcontent-%COMP%]{background:var(--login-page-bg);background-size:auto;justify-content:center}.title[_ngcontent-%COMP%]{text-align:center}.version[_ngcontent-%COMP%]{flex:1;display:flex;align-items:flex-end;justify-content:center;color:var(--color-grey-300)}.version[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] + span[_ngcontent-%COMP%]{margin-left:5px}.login-error[_ngcontent-%COMP%]{max-height:0;overflow:hidden}.login-error.visible[_ngcontent-%COMP%]{max-height:46px;transition:max-height .2s;-webkit-animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;animation:shake .82s cubic-bezier(.36,.07,.19,.97) both;-webkit-animation-delay:.2s;animation-delay:.2s;transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;perspective:1000px}@-webkit-keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}"]});var m=t("lJxs");class f{constructor(e,n){this.router=e,this.authService=n}canActivate(e){return this.authService.checkAuthenticatedStatus().pipe(Object(m.a)(e=>(e&&this.router.navigate(["/"]),!e)))}}f.\u0275fac=function(e){return new(e||f)(c.lc(a.e),c.lc(r.k))},f.\u0275prov=c.Xb({token:f,factory:f.\u0275fac,providedIn:"root"});const v=[{path:"",component:b,pathMatch:"full",canActivate:[f]}];class y{}y.\u0275fac=function(e){return new(e||y)},y.\u0275mod=c.Zb({type:y}),y.\u0275inj=c.Yb({imports:[[r.J,a.i.forChild(v)]]})}}]);
//# sourceMappingURL=9-es2015.ec03ea9f0b45b2c001a1.js.map