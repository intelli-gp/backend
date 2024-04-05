import{r as a,j as e,E as _}from"./markdown-Qw4Jt3t5.js";import{h as q}from"./moment-WSJ9un1t.js";import{u as n,C as k,aE as X,E as B,ao as le,y as C,h as ce,B as j,aF as de,f as me,G as he,m as y,af as pe,aG as ue,aH as xe,aI as ge,j as fe,i as je,e as ve,U as we,aJ as ye,aK as Ce,S as ke,l as Ae,ad as be,D as Ie,a5 as V,aL as Le,aM as Ne,s as Y}from"./index-2Mm0dNtt.js";import{p as Z}from"./profileUrlBuilder-lYjeV696.js";import{M as W,a as Me,b as Be}from"./modal.component-cjgN5hw1.js";import{U as Te}from"./user-item.component-QQKWlYGU.js";import"./calendar-TeNl4l8Y.js";const ze="/assets/defaultCover-xk-tO5u3.jpg",Se="/assets/article-love-sound-KOpjskCR.mp3";function N(t){return Intl.NumberFormat("en",{notation:"compact"}).format(t)}const Oe=n(X)`
    color: inherit;
    border-radius: 1.25rem;
    padding: 0.5rem;
    padding-right: 1.5rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(20%);
    width: min(400px, 100%);
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: white;
    gap: 1.25rem;
    box-shadow: 0px 0px 24px 5px rgba(0, 0, 0, 0.25);
    transition: background-color 0.25s ease-in-out;
    &:hover {
        background-color: var(--indigo-50);
    }
`,Pe=n(B)`
    aspect-ratio: 1/1;
    border-radius: 0.75rem;
    object-fit: cover;
    object-position: center;
    box-shadow: var(--gray-shadow);
    height: 135px;
    width: 135px;
`,Ee=n.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    padding: 0.5rem 0;
    overflow: hidden;
    height: 135px;
`,De=n.p`
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.15;
    ${k}
`,$e=n.p`
    font-size: 0.8rem;
    opacity: 0.85;
    line-height: 1;
    ${k}
`;n.span`
    opacity: 0.8;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: -0.5rem;
`;const Ue=({article:t})=>{var c,d,h,l,v;const[r]=le(),[i,m]=a.useState();return a.useEffect(()=>{var g,f;(g=t==null?void 0:t.Author)!=null&&g.Username&&r((f=t==null?void 0:t.Author)==null?void 0:f.Username).unwrap().then(p=>{var w;m((w=p==null?void 0:p.data)==null?void 0:w.user),console.log(i)}).catch(()=>C("Couldn't fetch author data"))},[]),e.jsxs(Oe,{to:Z((c=t==null?void 0:t.Author)==null?void 0:c.Username),children:[e.jsx(Pe,{src:((d=t==null?void 0:t.Author)==null?void 0:d.ProfileImage)??ce,alt:"author profile image"}),e.jsxs(Ee,{children:[e.jsxs("div",{children:[e.jsx(De,{children:(h=t==null?void 0:t.Author)==null?void 0:h.FullName}),e.jsx($e,{children:(l=t==null?void 0:t.Author)==null?void 0:l.Headline})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx(M,{count:N(((v=i==null?void 0:i.Articles)==null?void 0:v.length)??0),title:"articles"}),e.jsx(M,{count:N(200),title:"followers"}),e.jsx(M,{count:N(1500),title:"likes"})]}),e.jsx("div",{className:"flex gap-2",children:e.jsx(j,{className:"text-sm w-full !py-1",children:"Follow"})})]})]})},M=({count:t,title:r})=>e.jsxs("div",{className:"flex flex-col justify-center gap-0",children:[e.jsx("h1",{className:"font-black text-lg leading-none",children:t}),e.jsx("p",{className:"opacity-90 text-xs leading-none",children:r})]}),ee=n.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    &:not(:last-child) {
        border-bottom: 1px solid var(--gray-300);
    }
`,Fe=n(ee)`
    margin-top: auto;
    padding: 0.75rem;
    background-color: white;
`,He=n.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    overflow: hidden;
`,Re=n(B)`
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
`,Ve=n(X)`
    font-size: 1rem;
    line-height: 1;
    color: inherit;
    ${k}
`,Ye=n.p`
    font-size: 0.875rem;
    opacity: 0.75;
    color: inherit;
    ${k}
`,We=n(_.Markdown)`
    font-size: 0.875rem;
    line-height: 1.5;
    word-break: break-word;
    font-family: inherit;
    padding: 1rem;
    border-radius: 0.25rem;
    background-color: var(--gray-100);
    min-height: 100px;
    width: 100%;
`,Ge=({comment:t})=>e.jsxs(ee,{"data-color-mode":"light",children:[e.jsxs(He,{children:[e.jsx(Re,{src:t.Commenter.ProfileImage}),e.jsxs("div",{className:"flex flex-col gap-0",children:[e.jsx(Ve,{to:Z(t.Commenter.Username),children:t.Commenter.FullName}),e.jsx(Ye,{children:q(t.CreatedAt).fromNow()})]})]}),e.jsx(We,{source:t.Content})]}),Ke=({articleId:t})=>{const[r,i]=a.useState(""),[m,{isLoading:c,reset:d}]=de(),h=async()=>{if(r.trim())try{await m({content:r,id:t}),i("")}catch(l){console.error(l),C("Failed to add comment")}finally{d()}};return e.jsxs(Fe,{children:[e.jsx(me,{value:r,limit:512,maxLength:512,multiline:!0,rows:3,onChange:l=>i(l.target.value),placeholder:"Write a comment...",className:"resize-none"}),e.jsxs("div",{className:"text-sm flex gap-1",children:[e.jsx(j,{onClick:h,loading:c,children:"Post"}),e.jsx(j,{select:"danger",outline:!0,onClick:()=>i(""),loading:c,children:"Reset"})]})]})};function Qe(t){return he({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"}}]})(t)}const Je=n(y.div)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`,_e=n.div`
    position: relative;
    height: 30vh;
`,qe=n(B)`
    width: 100%;
    height: 100%;
    filter: brightness(0.75);
`,Xe=n.header`
    width: min(750px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`,Ze=n.div`
    width: min(750px, 100%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 6rem;
    padding: 2.5rem 1rem;
`,et=n.h1`
    font-size: 2.75rem;
    letter-spacing: -1px;
    font-weight: 700;
    line-height: 1.1;
    font-family: 'Merriweather', serif;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 2.25rem;
    }
`,tt=n.img`
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
`,ot=n.p`
    margin-top: -0.5rem;
    font-size: 0.875rem;
    text-align: center;
`,nt=n.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 1rem 0.5rem;
`,G=n.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`,K=n.div`
    width: 1px;
    height: 100%;
    background-color: var(--gray-400);
`,Q=n.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gray-600);
    cursor: pointer;
    border: none;
    background-color: transparent;
    user-select: none;
    &:hover {
        text-decoration: underline;
    }
`,A=pe`
    cursor: pointer;
    stroke: var(--gray-600);
    transition: color 0.1s ease-in-out;
`,st=n(ue)`
    ${A}
    color: ${({active:t})=>t?"#f03e3e":"transparent"};
    stroke-width: ${({active:t})=>t?0:25}px;
    &:hover {
        stroke-width: 0;
        color: #f03e3e;
    }
`,rt=n(xe)`
    ${A}
    color: ${({active:t})=>t?"#5c940d":"transparent"};
    stroke-width: ${({active:t})=>t?0:25}px;
    &:hover {
        stroke-width: 0;
        color: #5c940d;
    }
`,it=n(ge)`
    ${A}
    color: var(--gray-600);
    stroke-width: 0;
    &:hover {
        color: inherit;
    }
`,at=n(Qe)`
    ${A}
    color: ${({active:t})=>t?"inherit":"transparent"};
    stroke-width: ${({active:t})=>t?0:1}px;
    &:hover {
        stroke-width: 0;
        color: inherit;
    }
`,J=n.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gray-600);
`,lt=n.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`,ct=n.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -100%;
    width: min(500px, 100%);
    height: 100%;
    background-color: white;
    z-index: 100;
    transition: right 0.25s ease-in-out;
    &.open {
        right: 0;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
`,dt=n.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 1.25rem;
    color: var(--gray-500);
    width: 100%;
`,mt=n.ul`
    display: flex;
    flex-direction: column;
`,wt=()=>{var O,P,E,D,$,U,F;const t=fe(),{articleId:r}=je(),i=a.useRef(null),m=a.useRef(null),[c,d]=a.useState(!1),[h,l]=a.useState(!1),[v,g]=a.useState(!1),[f,p]=a.useState(!1),[w,ht]=a.useState(!1),u=ve(s=>s.auth.user),[te]=we(),[oe]=ye(),{data:b,isLoading:I,isFetching:T}=Ce(+r),o=b==null?void 0:b.data,ne=((O=o==null?void 0:o.Author)==null?void 0:O.Username)===(u==null?void 0:u.Username),L=[{option:"Copy Link",handler:()=>{navigator.clipboard.writeText(window.location.href),Y("Link copied to clipboard!")}}];ne&&(L.push({option:"Edit",handler:()=>t(`/app/article/edit/${r}`)}),L.push({option:"Delete",handler:()=>l(!0)}));const z=()=>{var s;(s=i.current)==null||s.classList.add("open"),d(!0)},S=()=>{var s;(s=i.current)==null||s.classList.remove("open"),d(!1)},se=async()=>{try{await te(+r).unwrap(),Y("Article deleted successfully!"),t("/app/articles")}catch{C("Error occurred while deleting the article.")}},re=async()=>{try{f||(new Audio(Se).play(),p(!0)),await oe(+r).unwrap()}catch{C("Error occurred while toggling like")}},ie=e.jsx(W,{isOpen:h,setIsOpen:l,title:"Are you sure you want to delete this Article?",width:"lg",children:e.jsxs("div",{className:"flex gap-4 flex-row-reverse",children:[e.jsx(j,{className:"!px-8",select:"danger",outline:!0,onClick:se,children:"Yes"}),e.jsx(j,{className:"!px-6",onClick:()=>l(!1),children:"Cancel"})]})}),ae=e.jsxs(W,{title:"This article is liked by",width:"sm",isOpen:v,setIsOpen:g,children:[((P=o==null?void 0:o.LikedBy)==null?void 0:P.length)===0&&e.jsx(dt,{children:"Nobody, yet."}),((E=o==null?void 0:o.LikedBy)==null?void 0:E.length)>0&&e.jsx(mt,{children:(D=o==null?void 0:o.LikedBy)==null?void 0:D.map(s=>e.jsx(Te,{FullName:s.FullName,Username:s.Username,ProfileImage:s.ProfileImage}))})]});return a.useEffect(()=>{var s;I||T||p((s=o==null?void 0:o.LikedBy)==null?void 0:s.some(x=>x.ID===(u==null?void 0:u.ID)))},[I,T]),a.useEffect(()=>{const s=x=>{var H,R;!((H=m.current)!=null&&H.contains(x.target))&&!((R=i.current)!=null&&R.contains(x.target))&&S()};return document.addEventListener("click",s),()=>{document.removeEventListener("click",s)}},[]),I?e.jsx(ke,{}):e.jsxs(Je,{...Ae,children:[ie,ae,e.jsxs(_e,{children:[e.jsx(qe,{src:(o==null?void 0:o.CoverImage)??ze,alt:"article cover image"}),e.jsx(Ue,{article:o})]}),e.jsxs(Ze,{"data-color-mode":"light",children:[e.jsxs(Xe,{children:[e.jsx(et,{children:o==null?void 0:o.Title}),e.jsx(ot,{children:q(o==null?void 0:o.UpdatedAt).format("DD MMMM, YYYY")}),e.jsx("div",{className:"flex gap-2 justify-center",children:o==null?void 0:o.ArticleTags.map(s=>e.jsx(be,{text:s}))})]}),e.jsxs(nt,{className:"flex justify-between",children:[e.jsxs(G,{children:[e.jsxs(J,{children:[e.jsx(y.span,{whileTap:{scale:1.25},children:e.jsx(st,{size:28,title:"Like",active:f,onClick:re})}),e.jsx(Q,{title:"View how liked this article",onClick:()=>g(!0),children:(($=o==null?void 0:o.LikedBy)==null?void 0:$.length)??0})]}),e.jsx(K,{}),e.jsx(y.span,{whileTap:{scale:1.25},children:e.jsx(rt,{size:24,title:"Bookmark",active:w})})]}),e.jsxs(G,{children:[e.jsxs(J,{ref:m,children:[e.jsx(y.span,{whileTap:{scale:1.25},children:e.jsx(at,{size:24,title:"Comments",active:c,onClick:z})}),e.jsx(Q,{onClick:z,children:((U=o==null?void 0:o.Comments)==null?void 0:U.length)??0})]}),e.jsx(K,{}),e.jsx(Ie,{right:"0",menuWidth:"8rem",options:L,children:e.jsx(it,{size:24,title:"Options"})})]})]}),o==null?void 0:o.Sections.map((s,x)=>{if(s.ContentType===V.Image)return e.jsx(tt,{src:s.Value,alt:"article section"},x);if(s.ContentType===V.Markdown)return e.jsx(_.Markdown,{source:s.Value})}),e.jsx("hr",{}),e.jsx(lt,{children:e.jsx("p",{className:"font-bold text-xl",children:"More from the same preference and author"})})]}),e.jsxs(ct,{ref:i,children:[e.jsxs(Me,{children:[e.jsx(Le,{children:"Comments"}),e.jsx(Be,{onClick:S,children:e.jsx(Ne,{size:28})})]}),e.jsx("div",{className:"flex-1 overflow-auto p-2",children:(F=o==null?void 0:o.Comments)==null?void 0:F.map(s=>e.jsx(Ge,{comment:s}))}),e.jsx(Ke,{articleId:+r})]})]})};export{wt as default};
