import{r as v,j as f}from"./markdown-Qw4Jt3t5.js";import{K as T,e as O,ai as $,aj as b,u as x,m as P,l as F}from"./index-2Mm0dNtt.js";import"./calendar-TeNl4l8Y.js";const D="/assets/button-press-1TpjVm7p.wav";function W(e,n=`expected a function, instead received ${typeof e}`){if(typeof e!="function")throw new TypeError(n)}function L(e,n=`expected an object, instead received ${typeof e}`){if(typeof e!="object")throw new TypeError(n)}function V(e,n="expected all items to be functions, instead received the following types: "){if(!e.every(t=>typeof t=="function")){const t=e.map(s=>typeof s=="function"?`function ${s.name||"unnamed"}()`:typeof s).join(", ");throw new TypeError(`${n}[${t}]`)}}var R=e=>Array.isArray(e)?e:[e];function K(e){const n=Array.isArray(e[0])?e[0]:e;return V(n,"createSelector expects all input-selectors to be functions, but received the following types: "),n}function U(e,n){const t=[],{length:s}=e;for(let i=0;i<s;i++)t.push(e[i].apply(null,n));return t}var q=class{constructor(e){this.value=e}deref(){return this.value}},_=typeof WeakRef<"u"?WeakRef:q,G=0,C=1;function k(){return{s:G,v:void 0,o:null,p:null}}function B(e,n={}){let t=k();const{resultEqualityCheck:s}=n;let i,r=0;function c(){var h;let o=t;const{length:a}=arguments;for(let u=0,m=a;u<m;u++){const g=arguments[u];if(typeof g=="function"||typeof g=="object"&&g!==null){let p=o.o;p===null&&(o.o=p=new WeakMap);const y=p.get(g);y===void 0?(o=k(),p.set(g,o)):o=y}else{let p=o.p;p===null&&(o.p=p=new Map);const y=p.get(g);y===void 0?(o=k(),p.set(g,o)):o=y}}const d=o;let l;if(o.s===C?l=o.v:(l=e.apply(null,arguments),r++),d.s=C,s){const u=((h=i==null?void 0:i.deref)==null?void 0:h.call(i))??i;u!=null&&s(u,l)&&(l=u,r!==0&&r--),i=typeof l=="object"&&l!==null||typeof l=="function"?new _(l):l}return d.v=l,l}return c.clearCache=()=>{t=k(),c.resetResultsCount()},c.resultsCount=()=>r,c.resetResultsCount=()=>{r=0},c}function H(e,...n){const t=typeof e=="function"?{memoize:e,memoizeOptions:n}:e,s=(...i)=>{let r=0,c=0,o,a={},d=i.pop();typeof d=="object"&&(a=d,d=i.pop()),W(d,`createSelector expects an output function after the inputs, but received: [${typeof d}]`);const l={...t,...a},{memoize:h,memoizeOptions:u=[],argsMemoize:m=B,argsMemoizeOptions:g=[],devModeChecks:p={}}=l,y=R(u),A=R(g),j=K(i),w=h(function(){return r++,d.apply(null,arguments)},...y),E=m(function(){c++;const I=U(j,arguments);return o=w.apply(null,I),o},...A);return Object.assign(E,{resultFunc:d,memoizedResultFunc:w,dependencies:j,dependencyRecomputations:()=>c,resetDependencyRecomputations:()=>{c=0},lastResult:()=>o,recomputations:()=>r,resetRecomputations:()=>{r=0},memoize:h,argsMemoize:m})};return Object.assign(s,{withTypes:()=>s}),s}var M=H(B),J=Object.assign((e,n=M)=>{L(e,`createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`);const t=Object.keys(e),s=t.map(r=>e[r]);return n(s,(...r)=>r.reduce((c,o,a)=>(c[t[a]]=o,c),{}))},{withTypes:()=>J});const Q="/assets/alarm-digital-cN3k95L_.mp3";function N({asset:e="",volume:n=.5}){const t=new Audio;return t.src=e,t.volume=n,{play:()=>{(t.paused||!t.currentTime)&&t.play().catch(()=>{})},stop:()=>{t.pause()},setVolume:o=>t.volume=o/100,setAudio:o=>{t.src=o}}}const X=()=>{const[e,n]=v.useState(25),[t,s]=v.useState(0),[i,r]=v.useState(!1),c=T(),o=M(u=>u.timer.pomodoro,u=>({...u})),a=O(o);v.useEffect(()=>{console.log(a.mode)},[a]);const d=N({asset:Q}),l=()=>{r(!0)},h=()=>{r(!1)};return v.useEffect(()=>{r(!1),a.mode==="pomodoro"?(n(25),s(0)):a.mode==="shortBreak"?(n(5),s(0)):a.mode==="longBreak"&&(n(15),s(0))},[a.mode]),v.useEffect(()=>{let u=null;if(i){if(Number(e)===0&&Number(t)===0){h(),d.play(),(a.mode==="shortBreak"||a.mode==="longBreak")&&c($()),a.round%3===0&&a.mode==="pomodoro"?c(b("longBreak")):a.mode==="pomodoro"?c(b("shortBreak")):c(b("pomodoro"));return}Number(t)===0&&(s(59),n(m=>m-1)),Number(t)>0&&(u=setInterval(()=>{s(m=>m-1)},1e3))}return()=>clearInterval(u)},[i,e,t]),{minutes:e,seconds:t,isRunning:i,startTimer:l,stopTimer:h,time:a}},Y=x(P.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`,Z=x.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 3rem 1rem;
    border-radius: 6px;
    height: 80%;
    width: 90%;
    margin: auto;
    transition: background 0.5s ease-in-out;
    background-color: ${({mode:e})=>e==="pomodoro"?"#DA534F":e==="shortBreak"?" rgb(56, 133, 138)":"#6366F1"};
    @media (max-width: 768px) {
        height: 80vh;
    }
    p {
        font-family: 'Lilita One', sans-serif;
        font-size: 1.75rem;
        font-weight: 400;
        color: white;
        opacity: 0.6;
    }
`,ee=x.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`,S=x.button`
    background-color: transparent;
    ${({active:e})=>e==="true"&&"background: rgba(84, 57, 57, 0.24);"}
    border: none;
    color: #fff;
    font-size: 1.1rem;
    padding: 2px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
`,te=x.h1`
    font-size: 6rem;
    color: #fff;
    font-weight: 700;
    font-family: 'Lilita One', sans-serif;
    letter-spacing: 4px;
`,oe=x.button`
    padding: 5px;
    background-color: #fff;
    font-size: 1.6rem;
    font-family: 'Lilita One', sans-serif;
    width: 215px;
    border-radius: 6px;
    transition: color 0.5s ease-in-out;
    color: ${({mode:e})=>e==="pomodoro"?"#DA534F":e==="shortBreak"?" rgb(56, 133, 138)":"#6366F1"};
`,ne=N({asset:D}),ce=()=>{const{minutes:e,seconds:n,isRunning:t,startTimer:s,stopTimer:i,time:r}=X(),c=v.useCallback(()=>{ne.play(),t?i():s()},[s,i,t]),o=T();return f.jsx(Y,{...F,children:f.jsxs(Z,{mode:r.mode,children:[f.jsxs(ee,{children:[f.jsx(S,{onClick:()=>o(b("pomodoro")),active:String(r.mode==="pomodoro"),children:"Pomodoro"}),f.jsx(S,{onClick:()=>o(b("shortBreak")),active:String(r.mode==="shortBreak"),children:"Short Break"}),f.jsx(S,{onClick:()=>o(b("longBreak")),active:String(r.mode==="longBreak"),children:"Long Break"})]}),f.jsxs(te,{children:[String(e).padStart(2,"0"),":",String(n).padStart(2,"0")]}),f.jsxs("div",{className:"flex flex-col items-center gap-3",children:[f.jsx(oe,{onClick:c,mode:r.mode,children:t?"PAUSE":"START"}),f.jsxs("p",{children:["Round #",r.round]})]})]})})};export{ce as default};
