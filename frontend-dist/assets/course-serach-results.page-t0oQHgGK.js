import{j as r,r as P}from"./markdown-Qw4Jt3t5.js";import{u as h,r as G,t as V,v as K,w as Q,G as Y,m as H,l as Z,x as $,y as I,S as J}from"./index-2Mm0dNtt.js";import{C as W,c as _,d as X,u as A}from"./course-card.component-i_DhhfCf.js";import{E as R}from"./explore-page-header.component-8lWRY734.js";import"./calendar-TeNl4l8Y.js";const ee="/assets/search-not-found-4M9Jo6av.svg",re=h.div`
    /* width: 100%; */
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid red; */
`,oe=h.img`
    width: 70%;
`,te=h.h1`
    font-size: 2rem;
    font-weight: 500;
    color: var(--gray-);
`,se=h.h2`
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--gray-500);
`,ne=()=>r.jsxs(re,{children:[r.jsx(oe,{src:ee,alt:"No Results Found"}),r.jsx(te,{children:"No results found"}),r.jsx(se,{children:"Try searching for something else"})]}),ie=h.div`
    min-width: 70%;
    max-width: 70%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 320px);
    gap: 1.5rem;
    place-items: center;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`,ce=({courseResults:o})=>o.length===0?r.jsx(ne,{}):r.jsx(ie,{children:o.map((s,l)=>r.jsx(W,{title:s.Title,description:s.Headline,instructors:s.Instructors,avgRating:s.AvgRating,numReviews:s.NumReviews,price:s.Price,thumbnailUrl:s.Thumbnail,redirectUrl:s.RedirectUrl},`course-${l}`))}),N="...",T=(o,s)=>{const l=s-o+1;return Array.from({length:l},(i,g)=>g+o)},le=({totalCount:o,pageSize:s,siblingCount:l=1,currentPage:i})=>P.useMemo(()=>{const m=Math.ceil(o/s);if(l+5>=m)return T(1,m);const b=Math.max(i-l,1),d=Math.min(i+l,m),a=b>2,f=d<m-2,x=1,p=m;if(!a&&f){const y=3+2*l;return[...T(1,y),N,m]}if(a&&!f){const y=3+2*l,v=T(m-y+1,m);return[x,N,...v]}if(a&&f){const y=T(b,d);return[x,N,...y,N,p]}},[o,s,l,i]),me=h.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;

    @media (max-width: 425px) {
        transform: scale(0.9);
        margin-bottom: 4.5rem;
    }
`,ae=h.ul`
    display: flex;
    gap: 1rem;
`,B=h.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    font-size: 1.2rem;
    font-weight: 500;
    // TODO: do active color
    background-color: ${({active:o})=>o?"var(--indigo-200)":""};
    cursor: pointer;
    transition: color 0.3s;
    color: var(--indigo-800);

    &:hover {
        background-color: var(--indigo-200);
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        width: 1.5rem;
        height: 1.5rem;
    }
`,M=h.div`
    display: flex;
    gap: -2rem;
`,z=h.button`
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    cursor: pointer;

    transition: color 0.3s;
    color: var(--indigo-800);

    &:hover {
        background-color: var(--indigo-200);
    }

    &:disabled {
        color: var(--gray-500);
        pointer-events: none;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        width: 1.5rem;
        height: 1.5rem;   
    }
`,he=({totalCount:o,pageSize:s,siblingCount:l=1,currentPage:i,onPageChange:g,onPageHover:m})=>{const u=le({totalCount:o,pageSize:s,siblingCount:l,currentPage:i});if(i===0||Number(u==null?void 0:u.length)<2)return null;const b=()=>{g(i+1)},d=()=>{g(i-1)},a=(u==null?void 0:u[u.length-1])||0;return r.jsxs(me,{children:[r.jsxs(M,{children:[r.jsx(z,{disabled:i===1,children:r.jsx(G,{})}),r.jsx(z,{disabled:i===1,onClick:d,children:r.jsx(V,{})})]}),r.jsx(ae,{children:u&&u.map((f,x)=>f===N?r.jsx(B,{children:"…"},x):r.jsx(B,{onClick:()=>g(+f),onMouseEnter:()=>m(+f),active:f===i,children:f},x))}),r.jsxs(M,{children:[r.jsx(z,{disabled:i===a,onClick:b,children:r.jsx(K,{})}),r.jsx(z,{disabled:i===a,children:r.jsx(Q,{})})]})]})};function ue(o){return Y({tag:"svg",attr:{viewBox:"0 0 256 256",fill:"currentColor"},child:[{tag:"path",attr:{d:"M184,216a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,216Zm45.66-101.66-96-96a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,32,128H72v56a8,8,0,0,0,8,8h96a8,8,0,0,0,8-8V128h40a8,8,0,0,0,5.66-13.66Z"}}]})(o)}const fe=h(H.button)`
    z-index: 1000;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: var(--indigo-500);
    color: white;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    &:hover {
        box-shadow: var(--tag-shadow);
    }

    @media (max-width: 600px) {
        bottom: 1rem;
        right: 0.5rem;
    }
`,ge=({pageHeaderElement:o})=>{const[s,l]=P.useState(!1);P.useEffect(()=>{const g=new IntersectionObserver(([m])=>{l(!m.isIntersecting)},{threshold:.5});return o&&g.observe(o),()=>{o&&g.unobserve(o)}},[o]);const i=()=>{o.scrollIntoView({behavior:"smooth"})};return s?r.jsx(fe,{...Z,onClick:i,children:r.jsx(ue,{})}):null},de=h.h1`
    user-select: none;
    line-height: 1.25;
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: -1.5px;
`,xe=h.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    #container {
        margin: 1rem;
    }

    .items {
        margin-bottom: 1rem;
    }
`,Pe=h.div`
    width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 1.5rem;
`,be=()=>{const o=P.useRef(null),[s,l]=$(),[i,g]=_(),[m,u]=X(),[b,d]=P.useState([]),[a,f]=P.useState(""),[x,p]=P.useState(""),[y,v]=P.useState(1),[k,j]=P.useState(0),[C,E]=P.useState(24),L=A("searchCourses"),F=A("getRecommendedCourses"),U=()=>{var t;(t=o==null?void 0:o.current)==null||t.scrollIntoView({behavior:"smooth"})};P.useEffect(()=>{const t=s.get("query"),n=s.get("category"),e=s.get("offset")||"1",S=s.get("limit")||"24";if(console.log({searchQuery:t,searchCategoryParam:n,pageParam:e,limitParam:S}),v(+e),E(+S),f(t),t||x)switch(t){case"Recommended For You":{m({limit:+S,offset:+e}).unwrap().then(c=>{const w=c==null?void 0:c.data;j(w.NumPages),d(w.Results),F({limit:w.LimitPerPage,offset:w.NextPageNum}),console.log(c)}).catch(c=>{I("Error fetching recommended courses"),console.error("Error fetching recommended courses:",c)});break}default:{p(n),i({query:t,category:n,limit:+C,offset:+e}).unwrap().then(c=>{const w=c==null?void 0:c.data;j(w.NumPages),d(w.Results),f(t),L({query:t,category:n,limit:w.LimitPerPage,offset:w.NextPageNum}),console.log(c)}).catch(c=>{I("Error fetching search results"),console.error("Error fetching search results:",c)});break}}},[]);const O=t=>{d([]),p(""),i({query:t,limit:C,offset:y}).unwrap().then(n=>{const e=n==null?void 0:n.data,S=String(e==null?void 0:e.CurrentPageNum),c=String(e==null?void 0:e.LimitPerPage);v(e==null?void 0:e.CurrentPageNum),j(e==null?void 0:e.NumPages),d(e==null?void 0:e.Results),l({query:t,limit:c,offset:S},{replace:!0}),L({query:t,limit:e==null?void 0:e.LimitPerPage,offset:e==null?void 0:e.NextPageNum}),console.log(n)}).catch(n=>{I("Error fetching search results"),console.error("Error fetching search results:",n)})},D=t=>{U(),d([]),v(t),console.log({searchTerm:a}),a==="Recommended For You"?m({limit:C,offset:t}).unwrap().then(n=>{const e=n==null?void 0:n.data,S=String(e==null?void 0:e.CurrentPageNum),c=String(e==null?void 0:e.LimitPerPage);v(e==null?void 0:e.CurrentPageNum),j(e==null?void 0:e.NumPages),d(e==null?void 0:e.Results),l({limit:c,offset:S},{replace:!0}),F({limit:e==null?void 0:e.LimitPerPage,offset:e==null?void 0:e.NextPageNum},{ifOlderThan:60*60}),console.log(n)}):i({query:a,category:x,limit:C,offset:t}).unwrap().then(n=>{const e=n==null?void 0:n.data,S=String(e==null?void 0:e.LimitPerPage),c=String(e==null?void 0:e.CurrentPageNum);v(e==null?void 0:e.CurrentPageNum),j(e==null?void 0:e.NumPages),d(e==null?void 0:e.Results),l({query:a,category:x,limit:S,offset:c},{replace:!0}),L({query:a,category:x,limit:e==null?void 0:e.LimitPerPage,offset:e==null?void 0:e.NextPageNum},{ifOlderThan:60*60}),console.log(n)})},q=t=>{t>=k||(a==="Recommended For You"?(console.log(" Here "),F({limit:C,offset:t},{ifOlderThan:60*60})):L({query:a,category:x,limit:C,offset:t}))};return r.jsxs(xe,{children:[r.jsxs(Pe,{ref:o,children:[r.jsx(de,{children:"Explore Courses"}),r.jsx(R,{placeholder:"Search Courses...",WithoutButton:!0,searchValue:a,onSearchValueChange:t=>f(t),searchHandler:O})]}),g.isFetching||u.isFetching||g.isLoading||u.isLoading?r.jsx(J,{}):r.jsx(ce,{courseResults:b}),r.jsx(he,{currentPage:y,onPageChange:D,onPageHover:q,totalCount:k,pageSize:C,siblingCount:1}),r.jsx(ge,{pageHeaderElement:o==null?void 0:o.current})]})};export{be as CoursesSearchResultsPage,be as default};
