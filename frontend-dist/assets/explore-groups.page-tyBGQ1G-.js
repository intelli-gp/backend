import{r as p,j as e}from"./markdown-Qw4Jt3t5.js";import{aa as L,V as D,f as I,a4 as k,B as y,y as S,s as N,u as r,C as B,d as P,j as z,ab as A,ac as M,ad as O,m as U,ae as V,e as J,S as $,l as q,P as F,J as Q}from"./index-2Mm0dNtt.js";import{u as R,O as H}from"./uploadImage.hook-2i8OurMw.js";import{M as K}from"./modal.component-cjgN5hw1.js";import{d as W}from"./default-group-image-3LT9wWmd.js";import{E as X}from"./explore-page-header.component-8lWRY734.js";import"./calendar-TeNl4l8Y.js";import"./index.esm-VMS9YxoW.js";const Y=({isOpen:u,setIsOpen:s})=>{const[h,i]=p.useState(""),[o,d]=p.useState(""),[c,g]=p.useState(""),[n,x]=p.useState([]),[f,{isLoading:C,reset:G}]=L(),{isLoading:t,trigger:m}=R(),{data:a}=D();let v=a==null?void 0:a.data;const j=()=>{i(""),d(""),g(""),x([])},w=()=>{if(n.length===0)return"Please select at least one tag";if(!c)return"Please add a group cover image"},E=async l=>{l.preventDefault();let b=w();if(b)return S(b);try{const T=await m(c);await f({GroupTitle:h,GroupDescription:o,GroupTags:n,GroupCoverImageUrl:T}).unwrap(),N("Group created successfully"),s(!1),j()}catch{S("Error occurred while creating group")}finally{G()}};return e.jsxs(K,{className:"flex flex-col gap-4",isOpen:u,setIsOpen:s,title:"Create New Group",width:"lg",children:[e.jsx(H,{height:"250px",width:"100%",value:c,onChange:l=>g(l),editButton:!0}),e.jsxs("form",{className:"flex flex-col gap-4",onSubmit:E,children:[e.jsx(I,{required:!0,label:"Group Name",placeholder:"Enter group name...",value:h,onChange:l=>i(l.target.value)}),e.jsx(I,{required:!0,multiline:!0,limit:512,label:"Group Description",placeholder:"Describe what this groups is about...",maxLength:512,rows:5,value:o,onChange:l=>d(l.target.value)}),e.jsx(k,{label:"Tags",availableTags:v,selectedTags:n,updateSelectedTags:l=>{x(l)}}),e.jsxs("div",{className:"flex gap-4 mt-8 justify-end",children:[e.jsx(y,{type:"submit",loading:t||C,children:"Create"}),e.jsx(y,{select:"danger",outline:!0,onClick:()=>{j(),s(!1)},title:"Discard group creation",children:"Discard"})]})]})]})},Z=r.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 225px;
    height: fit-content;
    height: -moz-fit-content;
    border-radius: 0.5rem;
    transition: all 0.25s ease-in-out;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;

    &:hover {
        background-color: var(--indigo-25);
    }
`,_=r.div`
    background-color: var(--gray-100);
    width: 100%;
    height: 120px;
    position: relative;
`,ee=r.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`,te=r.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 0.5rem;
    width: 95%;
    margin: 0 auto;
`;r.div`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.8),
        rgba(255, 255, 255, 0)
    );
`;const re=r.h3`
    font-weight: 700;
    letter-spacing: -0.5px;
    font-size: 1rem;
    ${B}
`,ae=r.p`
    font-size: 0.75rem;
    opacity: 0.8;
    margin-top: -0.25rem;
    display: flex;
    gap: 0.125rem;
    align-items: center;
`,oe=r.div`
    display: flex;
    gap: 0.25rem;
    max-width: 100%;
    overflow: auto;
`,se=r.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-bottom: 1rem;
    & button {
        border-radius: 99rem;
        padding: 0.25rem 0;
        width: 90%;
        margin: 0 auto;
        font-size: 0.875rem;
        &:hover {
            filter: brightness(0.95);
        }
    }
`;r.p`
    font-size: 0.875rem;
    opacity: 0.8;
    ${P}
`;const ie=({ID:u,GroupTitle:s,GroupCoverImage:h,GroupTags:i,GroupMembers:o})=>{const d=z(),[c]=A(),g=async()=>{try{await c(u).unwrap(),d(`/app/chat-room/${u}`)}catch{S("Error occurred while joining the group")}};return e.jsxs(Z,{onClick:()=>{d(`/app/groups/${u}`)},children:[e.jsx(_,{children:e.jsx(ee,{src:h||W,alt:s})}),e.jsxs(te,{children:[e.jsx(re,{title:s,children:s}),e.jsxs(ae,{children:[(o==null?void 0:o.length)??0," Members ",e.jsx(M,{})," Online group"]}),e.jsx(oe,{children:i==null?void 0:i.slice(0,2).map(n=>e.jsx(O,{text:n,size:"xs"},n))}),e.jsx(se,{children:e.jsx(y,{select:"primary500",title:"Become a member of this group",onClick:g,children:"Join group"})})]})]})},ne=r(U.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`,le=r.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 225px);
    justify-content: center;
    gap: 1rem;
`,fe=()=>{const[u,s]=p.useState(""),[h,i]=p.useState(!1),{data:o,isLoading:d}=V();let c=(o==null?void 0:o.data)??[];const g=J(t=>{var m,a;return(a=(m=t==null?void 0:t.auth)==null?void 0:m.user)==null?void 0:a.ID}),[n,x]=p.useState([]),f=c.filter(t=>!t.GroupMembers.some(a=>(a==null?void 0:a.ID)===g));p.useEffect(()=>{x(f)},[c,g]);const C=t=>{s(t);const m={keys:["GroupTitle"],includeScore:!0,threshold:.5},v=new Q(f,m).search(u),j=t===""?f:v.map(w=>w.item);x(j)},G=()=>{i(!0)};return d?e.jsx($,{}):e.jsxs(ne,{...q,children:[e.jsx(F,{className:"text-center",children:"Explore Groups"}),e.jsx(Y,{isOpen:h,setIsOpen:i}),e.jsx(X,{placeholder:"Search groups...",searchValue:u,onSearchValueChange:C,onCreateButtonClick:G}),e.jsx(le,{children:n.map(t=>e.jsx(ie,{...t}))})]})};export{fe as default};
