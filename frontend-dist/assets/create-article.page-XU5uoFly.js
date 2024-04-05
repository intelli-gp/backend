import{r as b,j as e,E as oe,d as le,e as ce}from"./markdown-Qw4Jt3t5.js";import{u as c,m as de,B as n,K as $,N as Q,O as Y,Q as G,R as ue,j as ge,U as pe,V as me,W as he,e as xe,i as fe,X as we,Y as ye,Z as ve,$ as V,a0 as L,a1 as O,a2 as M,a3 as D,a4 as je,l as Ce,P as Ie,a5 as w,D as Ae,a6 as Te,a7 as be,o as Se,y as s,s as P,_ as y,a8 as B,a9 as De}from"./index-2Mm0dNtt.js";import{R as z}from"./index.esm-VMS9YxoW.js";import{M as F}from"./modal.component-cjgN5hw1.js";import{u as Ee,O as ke}from"./uploadImage.hook-2i8OurMw.js";import"./calendar-TeNl4l8Y.js";const Ne="/assets/camera2-D7ttSn89.png",Me=c(de.div)`
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (max-width: 500px) {
        padding: 1rem;
    }
`,Pe=c.div`
    width: 100%;
    position: relative;
`;c.img`
    width: 100%;
    min-height: 250px;
    max-height: 400px;
    object-fit: cover;
    cursor: pointer;
`;c(n)`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1rem;
    color: var(--gray-800);
    padding: 0.5rem;
    border-radius: 0;
`;const ze=c.textarea`
    font-size: 2rem;
    font-weight: 700;
    border: none;
    border-bottom: 2px solid var(--gray-500);
    padding: 0.5rem 0;
    width: 100%;
    outline: none;
    color: var(--gray-700);
`,q=c.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;c.div`
    border-radius: 10px;
    display: flex;
    background-color: var(--indigo-100);
    flex-direction: column;
    position: absolute;
    height: fit-content;
    bottom: 100%;
    right: 120%;
    box-shadow: var(--black-shadow);
    padding: 0.5rem;
`;c.li`
    color: var(--indigo-800);
    font-weight: bold;
    border-radius: 14px;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: var(--indigo-200);
    }
`;const Ue=c.img`
    object-fit: contain;
    min-height: 250px;
    max-height: 400px;
    background-color: var(--indigo-50);
    cursor: pointer;
`,Re=({section:a})=>{const o=b.useRef(null),m=$(),{Value:v,ID:j}=a,g=h=>{const C=new FileReader;C.onload=()=>{m(G({targetSectionId:j,newValue:C.result}))},C.readAsDataURL(h.target.files[0])},d=()=>{var h;(h=o.current)==null||h.click()};return e.jsxs(q,{children:[e.jsxs("div",{className:"absolute top-0 right-0 z-30",children:[e.jsx(n,{select:"warning",className:"!p-2 !rounded-none !text-[var(--gray-800)]",title:"Click to choose an image",onClick:d,children:e.jsx(Q,{size:14})}),e.jsx(n,{select:"danger",title:"Delete this section",className:"z-30 !p-2 !rounded-none",onClick:()=>{m(Y(a.ID))},children:e.jsx(z,{size:14})})]}),e.jsx("input",{type:"file",ref:o,onChange:g,hidden:!0}),e.jsx(Ue,{src:v||Ne,title:"Click to change the image",onClick:d})]})},Ve=({value:a,onChange:o,onDelete:m})=>{const v={name:"delete",keyCommand:"delete",buttonProps:{"aria-label":"Delete section"},icon:e.jsx("span",{title:"Delete this section",className:"flex mx-2 text-red-600",children:e.jsx(z,{})}),execute:m},j={...le,icon:e.jsxs("span",{className:"flex font-semibold gap-1 mx-2",children:[e.jsx(ue,{})," Preview"]})},g={...ce,icon:e.jsxs("span",{className:"flex font-semibold gap-1 mx-2",children:[e.jsx(Q,{})," Edit"]})},d=[j,g,v];return e.jsx(oe,{"data-color-mode":"light",height:300,tabSize:4,preview:"edit",value:a,onChange:o,extraCommands:d})},Ye=()=>{const a=$(),o=ge(),m=b.useRef(null),[v]=pe(),[j,g]=b.useState(!1),{data:d}=me(),[h,{isLoading:C}]=he(),{isLoading:K,trigger:E,reset:k}=Ee(),{tags:x,sections:I,title:A,cover:T,deleteSectionModalIsOpen:W}=xe(t=>t["article-creator"]),p=new URL(window.location.href).pathname.includes("edit"),{articleId:U}=fe(),[X,{data:N}]=we(),l=N==null?void 0:N.data,[Z]=ye(),_=(t,r)=>{a(G({targetSectionId:t,newValue:r}))},H=()=>{a(M({ContentType:w.Markdown}))},J=()=>{a(M({ContentType:w.Image}))},R=()=>A.trim()?!x.length||y.intersection(x,["we-are-examples","don't-forget-to","delete-us"]).length?(s("Please select at least one tag, and remove the default tags!"),!1):I.length?!0:(s("Please add at least one section!"),!1):(s("Please add a title for your article!"),!1),ee=async()=>{if(!R())return;const t={tags:x,title:A};try{if(!T){s("Please add a cover image for your article!");return}t.coverImageUrl=await E(T)}catch{s("Error uploading cover image while publishing article!");return}finally{k()}let r=[];for(const i of I)if(i.Value)if(i.ContentType===w.Image)try{let S=await E(i.Value);r.push([S,i.ContentType])}catch{s("Error uploading image while publishing article!");return}finally{k()}else i.ContentType===w.Markdown&&r.push([i.Value,i.ContentType]);t.sections=r;try{let i=await h(t).unwrap();P("Article created successfully!"),o(`/app/articles/${i.data.ID}`),a(D())}catch(i){console.log(i),s("Error creating article!")}},te=async()=>{if(!R())return;let t=y.difference(x,l.ArticleTags),r=y.difference(l.ArticleTags,x),i=A!==l.Title,S=T!==l.CoverImage,ne=!y.isEqual(l.Sections,I.map(f=>y.omit(f,"ID"))),u={};if(t.length&&(u.addedTags=t),r.length&&(u.removedTags=r),i&&(u.title=A),S)try{u.coverImageUrl=await E(T)}catch{s("Error uploading cover image while updating article!");return}finally{k()}if(ne&&(u.sections=I.map(f=>[f.Value,f.ContentType])),y.isEmpty(u)){s("No changes detected!"),o(`/app/articles/${l.ID}`),a(D());return}console.log(u);try{await Z({id:l.ID,...u}).unwrap(),P("Article updated successfully!"),o(`/app/articles/${l.ID}`),a(D())}catch{s("Error updating article!")}},ae=async()=>{let t=l.ID;try{await v(t).unwrap(),P("Article deleted successfully!"),o("/app/articles")}catch{s("Error occurred while deleting the article.")}};b.useLayoutEffect(()=>{!p||!U||X(+U).unwrap().then(t=>{const r=t.data;a(ve()),a(V(r.Title)),a(L(r.CoverImage)),a(O(r.ArticleTags)),r.Sections.forEach(i=>{a(M({ContentType:i.ContentType,Value:i.Value}))})})},[]),b.useEffect(()=>()=>{p&&a(D())},[]);const ie=e.jsx(F,{isOpen:W,setIsOpen:t=>{a(B(t))},title:"Are you sure you want to delete this section?",width:"lg",children:e.jsxs("div",{className:"flex gap-4 flex-row-reverse",children:[e.jsx(n,{className:"!px-8",select:"danger",outline:!0,onClick:()=>a(De()),children:"Yes"}),e.jsx(n,{className:"!px-6",onClick:()=>a(B(!1)),children:"Cancel"})]})}),re=e.jsx(F,{isOpen:j,setIsOpen:g,title:"Are you sure you want to delete this Article?",width:"lg",children:e.jsxs("div",{className:"flex gap-4 flex-row-reverse",children:[e.jsx(n,{className:"!px-8",select:"danger",outline:!0,onClick:ae,children:"Yes"}),e.jsx(n,{className:"!px-6",onClick:()=>g(!1),children:"Cancel"})]})}),se=e.jsx("div",{className:"flex flex-col gap-2",children:e.jsx(je,{label:"Topics related to this article",updateSelectedTags:t=>{a(O(t))},availableTags:(d==null?void 0:d.data)??[],selectedTags:x??[],wrapperClassName:"!border-[var(--gray-400)]"})});return e.jsxs(Me,{...Ce,children:[ie,re,e.jsx(Ie,{children:p?"Edit Article":"Create New Article"}),e.jsx(Pe,{children:e.jsx(ke,{value:T,onChange:t=>{a(L(t))},editButton:!0,height:"350px"})}),e.jsx(ze,{rows:1,placeholder:"Type article title...",value:A,onChange:t=>{a(V(t.target.value))}}),se,I.map(t=>{if(t.ContentType===w.Markdown)return e.jsx(q,{children:e.jsx(Ve,{value:t.Value,onChange:r=>_(t.ID,r),onDelete:()=>{a(Y(t.ID))}},t.ID)});if(t.ContentType===w.Image)return e.jsx(Re,{section:t})}),e.jsxs("div",{className:"flex flex-col items-center gap-2 fixed bottom-4 right-4 z-40",children:[e.jsx(Ae,{options:[{option:"Markdown",handler:H},{option:"Image",handler:J}],bottom:"90%",right:"90%",children:e.jsx(n,{className:"h-[50px] w-[50px] !rounded-full justify-center",title:"Add New section",ref:m,children:e.jsx(Te,{size:18})})}),e.jsx(n,{select:"success",className:"h-[50px] w-[50px] !rounded-full items-center justify-center",onClick:p?te:ee,loading:K||C,title:p?"Save changes":"Publish article",children:p?e.jsx(be,{size:18}):e.jsx(Se,{size:18})}),p&&e.jsx(n,{select:"danger",className:"h-[50px] w-[50px] !rounded-full items-center justify-center",onClick:()=>g(!0),loading:!1,title:"Delete this article",children:e.jsx(z,{size:18})})]})]})};export{Ye as default};
