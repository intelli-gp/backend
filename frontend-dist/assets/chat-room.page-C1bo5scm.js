import{r as u,j as t}from"./markdown-Qw4Jt3t5.js";import{E as K}from"./emoji-uaCF0qrC.js";import{c as X,a as F,G as Y,b as Z,g as f,u as l,C as H,d as ee,E as S,e as V,f as W,B as O,h as P,D as J,I as te,M as se,m as ae,i as ne,j as oe,k as re,l as ie,T as le,n as ce,L as de,o as pe,s as ue}from"./index-2Mm0dNtt.js";import{d as me}from"./default-group-image-3LT9wWmd.js";import{M as z}from"./modal.component-cjgN5hw1.js";import{U as ge}from"./user-item.component-QQKWlYGU.js";import{p as L}from"./profileUrlBuilder-lYjeV696.js";import"./calendar-TeNl4l8Y.js";import"./moment-WSJ9un1t.js";var D=function(){return D=Object.assign||function(e){for(var r,a=1,o=arguments.length;a<o;a++){r=arguments[a];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},D.apply(this,arguments)},he=function(e,r){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&r.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)r.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(a[o[n]]=e[o[n]]);return a},xe=X("BeatLoader","50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}","beat");function fe(e){var r=e.loading,a=r===void 0?!0:r,o=e.color,n=o===void 0?"#000000":o,i=e.speedMultiplier,c=i===void 0?1:i,m=e.cssOverride,g=m===void 0?{}:m,y=e.size,w=y===void 0?15:y,d=e.margin,v=d===void 0?2:d,I=he(e,["loading","color","speedMultiplier","cssOverride","size","margin"]),j=D({display:"inherit"},g),h=function(x){return{display:"inline-block",backgroundColor:n,width:F(w),height:F(w),margin:F(v),borderRadius:"100%",animation:"".concat(xe," ").concat(.7/c,"s ").concat(x%2?"0s":"".concat(.35/c,"s")," infinite linear"),animationFillMode:"both"}};return a?u.createElement("span",D({style:j},I),u.createElement("span",{style:h(1)}),u.createElement("span",{style:h(2)}),u.createElement("span",{style:h(3)})):null}function ye(e){return Y({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M899.4 638.2h-27.198c-2.2-.6-4.2-1.6-6.4-2-57.2-8.8-102.4-56.4-106.2-112.199-4.401-62.4 31.199-115.2 89.199-132.4 7.6-2.2 15.6-3.8 23.399-5.8h27.2c1.8.6 3.4 1.6 5.4 1.8 52.8 8.6 93 46.6 104.4 98.6.8 4 2 8 3 12v27.2c-.6 1.8-1.6 3.6-1.8 5.4-8.4 52-45.4 91.599-96.801 103.6-5 1.2-9.6 2.6-14.2 3.8zM130.603 385.8l27.202.001c2.2.6 4.2 1.6 6.4 1.8 57.6 9 102.6 56.8 106.2 113.2 4 62.2-32 114.8-90.2 131.8-7.401 2.2-15 3.8-22.401 5.6h-27.2c-1.8-.6-3.4-1.6-5.2-2-52-9.6-86-39.8-102.2-90.2-2.2-6.6-3.4-13.6-5.2-20.4v-27.2c.6-1.8 1.6-3.6 1.8-5.4 8.6-52.2 45.4-91.6 96.8-103.6 4.8-1.201 9.4-2.401 13.999-3.601zm370.801.001h27.2c2.2.6 4.2 1.6 6.4 2 57.4 9 103.6 58.6 106 114.6 2.8 63-35.2 116.4-93.8 131.4-6.2 1.6-12.4 3-18.6 4.4h-27.2c-2.2-.6-4.2-1.6-6.4-2-57.4-8.8-103.601-58.6-106.2-114.6-3-63 35.2-116.4 93.8-131.4 6.4-1.6 12.6-3 18.8-4.4z"}}]})(e)}const we=Z.injectEndpoints({endpoints:e=>({getGroupMessages:e.query({queryFn:()=>({data:[]}),async onCacheEntryAdded(r,{updateCachedData:a,cacheEntryRemoved:o}){try{let n=await f();n.emit("joinRoom",{ChatGroupId:r}),n.on("allMessages",i=>{a(()=>i)}),n.on("newMessage",i=>{a(c=>{c.push(i)})}),await o,n.emit("leaveRoom",{ChatGroupId:r}),n.off("allMessages"),n.off("newMessage")}catch(n){console.error(n)}},keepUnusedDataFor:1}),sendMessage:e.mutation({queryFn:()=>({data:[]}),async onCacheEntryAdded(r){try{(await f()).emit("createMessage",r)}catch(a){console.error(a)}}}),sendTyping:e.mutation({queryFn:()=>({data:[]}),async onCacheEntryAdded(r){try{(await f()).emit("typing",r)}catch(a){console.error(a)}}}),receiveTyping:e.query({queryFn:()=>({data:[]}),async onCacheEntryAdded(r,{updateCachedData:a,cacheEntryRemoved:o}){try{let n=await f();n.on("isTyping",i=>{a(c=>{let m=c.findIndex(g=>g===i.Username);m===-1&&c.push(i.Username),m>-1&&!i.IsTyping&&c.splice(m,1)})}),await o,n.off("isTyping")}catch(n){console.error(n)}},keepUnusedDataFor:1}),deleteMessage:e.mutation({queryFn:()=>({data:[]}),async onCacheEntryAdded(r){try{(await f()).emit("deleteMessage",r)}catch(a){console.error(a)}}}),updateMessage:e.mutation({queryFn:()=>({data:[]}),async onCacheEntryAdded(r){try{(await f()).emit("editMessage",r)}catch(a){console.log(a)}}}),getMessageInfo:e.query({queryFn:()=>({data:[]}),async onCacheEntryAdded(r,{cacheEntryRemoved:a}){try{let o=await f();await a,o.emit("leaveMessageInfoRoom",{MessageID:r}),o.off("newMessageReadInfo"),o.off("messageInfo")}catch(o){console.error(o)}},async onQueryStarted(r,{updateCachedData:a}){try{let o=await f();o.emit("getMessageInfo",{MessageID:r}),o.on("messageInfo",n=>{a(()=>n)}),o.on("newMessageReadInfo",n=>{a(()=>n)})}catch(o){console.error(o)}},keepUnusedDataFor:0})})}),{useGetGroupMessagesQuery:ve,useSendMessageMutation:je,useReceiveTypingQuery:be,useSendTypingMutation:Ie,useUpdateMessageMutation:Me,useDeleteMessageMutation:Ce,useGetMessageInfoQuery:at,useLazyGetMessageInfoQuery:ke}=we,Ne=l.div`
    display: flex;
    align-self: ${({isMine:e})=>e?"flex-end":"flex-start"};
    background-color: ${({isMine:e})=>e?"var(--indigo-700)":"var(--gray-200)"};
    padding: 1rem;
    border-radius: ${({isMine:e})=>e?"16px 16px 0px 16px":"16px 16px 16px 0px"};
    display: flex;
    flex-direction: column;
    max-width: 70%;
    min-width: 20%;
    gap: 0.5rem;
    position: relative;

    .options-button {
        transition: opacity 0.2s ease-in-out;
        opacity: 0;
    }
    &:hover {
        .options-button {
            opacity: 1;
        }
    }
`,Oe=l.header`
    display: ${({isMine:e})=>e?"none":"flex"};
    gap: 0.5rem;
    align-items: center;
`,Se=l(S)`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    aspect-ratio: 1/1;
`,De=l.h2`
    color: var(--gray-700);
    display: ${({isMine:e})=>e?"none":""};
    font-weight: 700;
    font-size: 0.75rem;
    ${H}
`,Ee=l.main`
    margin-top: 0rem;
    font-size: 0.85rem;
    color: ${({isMine:e})=>e?"white":" var(--gray-800)"};
    opacity: ${({isDeleted:e})=>e?.5:1};
    word-break: break-all;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    ${ee}
`,Ue=l.p`
    display: flex;
    justify-content: flex-end;
    font-size: 0.6rem;
    color: ${({isMine:e})=>e?"white":"var(--gray-800)"};
    opacity: 0.85;
    user-select: none;
`,Te=l.button`
    color: white;
    padding: 0.5rem;
    border-top-right-radius: 1rem;
    background-color: var(--indigo-700);
`,Ge=l.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`,Fe=l.div`
    display: flex;
    flex-direction: column;
`,ze=l.ul`
    overflow-y: auto;
`,Le=l.label`
    font-size: 0.875rem;
    opacity: 0.6;
    border-bottom: 1px solid var(--gray-300);
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
`,$=({message:e,enableOptions:r=!0,className:a})=>{const{user:o}=V(p=>p.auth),n=e.User.ID===o.ID,[i,c]=u.useState(!1),[m,g]=u.useState(!1),[y,w]=u.useState(!1),[d,v]=u.useState(e.Content),[I]=Me(),[j]=Ce(),[h,{data:x}]=ke(),M=async()=>{try{if(d===e.Content)return;console.log(d),await I({MessageID:e.MessageID,Content:d}).unwrap()}catch(p){console.log(p)}finally{c(!1),v(e.Content)}},C=async()=>{try{await j({MessageID:e.MessageID}).unwrap()}catch(p){console.log(p)}finally{g(!1)}},E=async()=>{w(!0),await h(e.MessageID).unwrap()},U=async()=>{h(e.MessageID).unsubscribe()};let k=[{option:"Edit",handler:()=>c(!0)},{option:"Delete",handler:()=>g(!0)},{option:"Info",handler:E}];const T=t.jsxs(z,{isOpen:i,setIsOpen:c,title:`Edit message (${e.MessageID})`,children:[t.jsx($,{message:e,enableOptions:!1,className:"!max-w-full w-full"}),t.jsx(W,{value:d,onChange:p=>v(p.target.value),multiline:!0,rows:5}),t.jsxs("div",{className:"flex gap-4 flex-row-reverse",children:[t.jsx(O,{onClick:M,children:"Save"}),t.jsx(O,{outline:!0,select:"danger",onClick:()=>{c(!1),v(e.Content)},children:"Discard"})]})]}),N=t.jsx(z,{isOpen:m,setIsOpen:g,className:"flex flex-col gap-8",title:"Are you sure you want to delete this message?",children:t.jsxs("div",{className:"flex gap-4 justify-center",children:[t.jsx(O,{outline:!0,select:"danger",onClick:C,children:"Delete"}),t.jsx(O,{onClick:()=>{g(!1)},children:"Cancel"})]})}),G=t.jsxs(z,{isOpen:y,setIsOpen:w,cleanupFn:U,title:`Message Info ${e.MessageID}`,children:[t.jsx($,{message:e,enableOptions:!1,className:"!max-w-full w-full mb-4"}),t.jsx(Ge,{children:t.jsxs(Fe,{children:[t.jsx(Le,{children:"Read by"}),t.jsx(ze,{children:x==null?void 0:x.map(p=>t.jsx(ge,{FullName:p.FullName,ProfileImage:p.ProfileImage,Username:p.Username,timeInfo:p.ReadAt},p.UserID))})]})})]});return t.jsxs(Ne,{isMine:n,className:a||"",children:[T,N,G,t.jsxs(Oe,{isMine:n,children:[t.jsx(Se,{alt:"sender profile image",src:e.User.ProfileImage??P}),t.jsx(De,{title:e.User.FullName,isMine:n,width:"90%",children:e.User.FullName})]}),n&&r&&!e.IsDeleted&&t.jsx(J,{options:k,mainElementClassName:"!absolute top-0 right-0",right:"100%",top:"10%",left:"auto",menuWidth:"8rem",children:t.jsx(Te,{title:"Options",className:"options-button",children:t.jsx(te,{size:18})})}),t.jsxs(Ee,{isMine:n,isDeleted:e.IsDeleted,children:[e.IsDeleted&&t.jsx(se,{size:18})," ",e.Content]}),t.jsx(Ue,{isMine:n,children:new Date(e.CreatedAt??Date.now()).toLocaleString()})]})},Pe=l(ae.div)`
    display: flex;
    gap: 0.5rem;
    height: 100%;
    background: var(--indigo-50);
    padding: 1rem;

    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`,$e=l.div`
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 100vh;
    justify-content: space-between;
    @media (max-width: 1024px) {
        width: 100%;
    }
`,Ae=l.div`
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    background: white;
    display: flex;
    flex-direction: row;
    padding: 1rem 2rem;
    align-items: center;
    gap: 1rem;
`,Re=l.h1`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 24ch;
    font-weight: 700;
    font-size: 1rem;
`,qe=l.p`
    font-size: 0.8rem;
`,_e=l(S)`
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
`,Be=l.div`
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    padding: 2rem;
    flex-grow: 1;
    gap: 0.25rem;
    background-color: white;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 1024px) {
        padding: 1rem;
    }
`,Qe=l.div`
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    width: 100%;
    background: white;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 0.5rem;
`,He=l.div`
    height: 100%;
    width: max(20%, 250px);
    transition: right 0.35s ease-in-out;
    @media (max-width: 1024px) {
        height: 100%;
        position: fixed;
        right: -100%;
        top: 0;
        width: 250px;
        &.open {
            right: 0;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
            z-index: 100;
        }
    }
`,Ve=l.div`
    height: 100%;
    width: 100%;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 22px 10px rgba(99, 102, 241, 0.07);
    padding: 2rem 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 1024px) {
        border-radius: 0;
    }
`,q=l.div`
    width: 100%;
    cursor: pointer;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    img {
        border-radius: 50%;
        height: 48px;
        width: 48px;
    }
    span {
        display: flex;
        flex-direction: column;
    }

    &:hover {
        background-color: var(--indigo-50);
    }
`,_=l.h2`
    font-size: 0.8rem;
    ${H}
`,B=l.span`
    &::after {
        content: '';
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 5rem;
        background-color: ${({online:e})=>e?"#44b700":"#D30000"};
    }
`,Q=l.button`
    cursor: pointer;
    opacity: 0.8;
    color: var(--gray-700);
    padding: 0.75rem;
    border-radius: 5rem;
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 1;
        background-color: var(--indigo-50);
    }
`,nt=()=>{var A,R;const{id:e}=ne(),r=oe(),a=u.useRef(null),{user:o}=V(s=>s.auth),{data:n}=re(+e,{pollingInterval:3e4}),i=n==null?void 0:n.data[0],{data:c}=ve(Number(e)),m=c,[g]=je(),[y]=Ie(),{data:w}=be(),d=w,v=((A=i==null?void 0:i.GroupMembers)==null?void 0:A.filter(s=>s.Connected||s.ID===o.ID))??[],I=((R=i==null?void 0:i.GroupMembers)==null?void 0:R.filter(s=>!s.Connected&&s.ID!==o.ID))??[],[j,h]=u.useState(""),[x,M]=u.useState(!1),[C,E]=u.useState(),[U,k]=u.useState(!1),T=s=>{h(b=>b+s.emoji),M(!1)},N=async s=>{s==null||s.preventDefault(),j.trim()&&(h(""),await g({Content:j,GroupID:+e}).unwrap())},G=s=>{h(s.target.value),C&&clearTimeout(C),y({IsTyping:!0,GroupID:+e});let b=setTimeout(()=>{y({IsTyping:!1,GroupID:+e})},1e3);E(b)},p=[{option:"View Group",handler:()=>r(`/app/groups/${e}`)},{option:"Copy Link",handler:()=>{navigator.clipboard.writeText(window.location.href.replace("/chat-room","/groups")),ue("Link copied to clipboard","right-bottom")}}];return u.useEffect(()=>{var s,b;(b=a==null?void 0:a.current)==null||b.scrollTo({top:(s=a==null?void 0:a.current)==null?void 0:s.scrollHeight,behavior:"instant"})},[c]),u.useEffect(()=>{const s=()=>{k(!1)};return document.addEventListener("click",s),()=>{document.removeEventListener("click",s)}},[]),t.jsx(Pe,{...ie,children:t.jsxs("div",{className:"my-0 mx-auto max-w-[1200px] w-full flex gap-2",children:[t.jsxs($e,{children:[t.jsxs(Ae,{children:[t.jsx(_e,{src:(i==null?void 0:i.GroupCoverImage)??me}),t.jsxs("div",{className:"flex flex-col",children:[t.jsx(Re,{children:(i==null?void 0:i.GroupTitle)??"Wait i'm loading..."}),t.jsx(qe,{children:d!=null&&d.length?t.jsxs("div",{className:"flex gap-1 items-center",children:[t.jsx(fe,{color:"var(--gray-800)",size:6}),t.jsx("span",{className:"font-bold",children:d==null?void 0:d.join(" ,")}),` ${d.length===1?"is":"are"}  `,"typing..."]}):t.jsx("span",{className:"text-[var(--gray-900)]",children:"Idle"})})]}),t.jsxs("div",{className:"flex gap-2 ml-auto justify-center",children:[t.jsx(J,{options:p,right:"50%",top:"100%",left:"auto",bottom:"auto",menuWidth:"10rem",children:t.jsx(Q,{title:"Group options",children:t.jsx(ye,{size:20})})}),t.jsx(Q,{title:"View users",className:"flex lg:hidden",onClick:s=>{s.stopPropagation(),k(!0)},children:t.jsx(le,{size:20})})]})]}),t.jsxs(Be,{ref:a,children:[t.jsx("div",{}),m==null?void 0:m.map(s=>t.jsx($,{enableOptions:!0,message:s},s.MessageID))]}),t.jsxs(Qe,{children:[x&&t.jsx("div",{className:"absolute bottom-[110%] left-0",children:t.jsx(K,{onEmojiClick:T})}),t.jsxs("div",{className:"flex gap-0",children:[t.jsx(ce,{className:"fill-[var(--indigo-800)] cursor-pointer box-content p-2 rounded-full hover:bg-indigo-100",size:20,onClick:()=>M(!x)}),t.jsx(de,{color:"var(--indigo-800)",className:"cursor-pointer box-content p-2 rounded-full hover:bg-indigo-100",size:20})]}),t.jsx("form",{className:"flex gap-2 flex-1",onSubmit:N,children:t.jsx(W,{className:"bg-[var(--gray-100)] !border-none focus-visible:!outline-none",placeholder:"Type a message...",value:j,onChange:G})}),t.jsx(pe,{title:"Send message",className:"fill-[var(--indigo-800)] cursor-pointer box-content p-2  rounded-full hover:bg-indigo-100",size:20,onClick:N})]})]}),t.jsx(He,{className:`${U&&"open"}`,children:t.jsxs(Ve,{children:[t.jsx("h1",{className:"font-bold",children:"ONLINE USERS"}),v.map(s=>t.jsxs(q,{onClick:()=>{r(L(s.Username))},children:[t.jsx(S,{className:"!w-[48px] !h-[48px] rounded-full object-cover aspect-square",alt:"username",src:(s==null?void 0:s.ProfileImage)??P}),t.jsxs("div",{className:"overflow-hidden",children:[t.jsx(_,{title:s.FullName,onClick:()=>{r(L(s.Username))},children:s.FullName}),t.jsxs("div",{className:"flex gap-1 items-center",children:[t.jsx(B,{online:!0}),t.jsx("p",{className:"text-xs text-[var(--gray-600)]",children:"online"})]})]})]},s.ID)),t.jsx("h1",{className:"mt-8 font-bold",children:"OFFLINE USERS"}),I.map(s=>t.jsxs(q,{onClick:()=>{r(L(s.Username))},children:[t.jsx(S,{className:"!w-[48px] !h-[48px] rounded-full object-cover aspect-square",alt:"username",src:(s==null?void 0:s.ProfileImage)??P}),t.jsxs("div",{className:"overflow-hidden",children:[t.jsx(_,{title:s.FullName,children:s.FullName}),t.jsxs("div",{className:"flex flex-row gap-1 items-center",children:[t.jsx(B,{online:!1}),t.jsx("p",{className:"text-xs text-[var(--gray-600)]",children:"offline"})]})]})]},s.ID))]})})]})})};export{nt as ChatroomPage,nt as default};
