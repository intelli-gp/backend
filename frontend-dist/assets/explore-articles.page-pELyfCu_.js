import{r,j as t}from"./markdown-Qw4Jt3t5.js";import{u as f,m as S,j,H as C,S as E,l as A,P,J as k}from"./index-2Mm0dNtt.js";import{E as w}from"./explore-page-header.component-8lWRY734.js";import{W as V}from"./wide-article-item.component-_L6y3M4S.js";import"./calendar-TeNl4l8Y.js";import"./moment-WSJ9un1t.js";import"./profileUrlBuilder-lYjeV696.js";const v=f(S.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`,F=()=>{const[i,c]=r.useState(""),n=j(),{data:a,isLoading:l}=C(),[m,o]=r.useState([]),s=(a==null?void 0:a.data)??[];r.useEffect(()=>{o(s)},[a]);const p=e=>{c(e);const d={keys:["Title"],includeScore:!0,threshold:.5},x=new k(s,d).search(i),h=e===""?s:x.map(g=>g.item);o(h)},u=()=>{n("/app/articles/create")};return l?t.jsx(E,{}):t.jsxs(v,{...A,children:[t.jsx(P,{className:"text-center",children:"Explore Articles"}),t.jsx(w,{searchValue:i,onSearchValueChange:p,onCreateButtonClick:u}),m.map(e=>t.jsx(V,{...e,onClick:()=>n(`/app/articles/${e.ID}`)}))]})};export{F as default};
