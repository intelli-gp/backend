import{b as m,u as r,F as l,z as x,A as f,E as w,_ as g,B as y}from"./index-2Mm0dNtt.js";import{j as o}from"./markdown-Qw4Jt3t5.js";const C=m.injectEndpoints({endpoints:t=>({getRecommendedCourses:t.query({query:({limit:s,offset:e})=>({url:`/courses?${s?`limit=${s}`:""}${e?`&offset=${e}`:""}
                `,method:"GET"})}),searchCourses:t.query({query:({query:s,category:e,limit:n,offset:i})=>({url:`/courses/search?query=${encodeURIComponent(s)}${e?`&category=${encodeURIComponent(e)}`:""}${n?`&limit=${n}`:""}${i?`&offset=${i}`:""}`,method:"GET"})}),getCoursesPreview:t.query({query:()=>({url:"/courses/preview",method:"GET"})})})}),{useSearchCoursesQuery:Q,useLazySearchCoursesQuery:_,useGetRecommendedCoursesQuery:B,useLazyGetRecommendedCoursesQuery:D,useGetCoursesPreviewQuery:H,usePrefetch:U}=C,b=r.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    * {
        /* border: 1px solid red; */
    }
`,j=r.p`
    font-size: 1rem;
`,v=r.div`
    display: flex;
    gap: 0.1rem;
`,R=r(l)`
    font-size: 1.2rem;
    fill: #fcd53f;
`,$=r.p`
    font-size: 0.7rem;
    color: var(--gray-600);
`,k=(t,s,e)=>s>=t?x:s-t>=-.7&&s<e?f:l,z=({value:t,numParticipants:s,referenceValue:e=5})=>o.jsxs(b,{children:[o.jsx(j,{children:t<e?t.toPrecision(e.toString().length+1):e}),o.jsx(v,{children:[...Array(5)].map((n,i)=>o.jsx(R,{as:k(i+1,t,e)},i))}),o.jsxs($,{children:["(",s,")"]})]}),E=r.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 320px;
    height: 500px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;

    &:hover {
        background-color: #f9f9f9;
    }
`,P=r(w)`
    width: 100%;
    object-fit: cover;
    height: 200px;
    border-radius: 5px 5px 0 0;
`,S=r.div`
    display: flex;
    height: calc(100% - 270px);
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 1rem;
`,T=r.h2`
    cursor: pointer;
    font-weight: 600;
    font-size: 1.3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`,q=r.p`
    font-size: 1rem;
    color: var(--gray-700);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`,I=r.p`
    font-size: 0.8rem;
    color: var(--gray-600);
    white-space: nowrap; /* Prevent text from wrapping to the next line */
    overflow: hidden; /* Hide any overflowing content */
    text-overflow: ellipsis; /* Display an ellipsis (...) when text overflows */
`,G=r.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    position: absolute;
    bottom: 0;
`,A=r.div`
    font-size: 1.3rem;
    font-weight: 600;
`,N=({thumbnailUrl:t,redirectUrl:s,title:e,description:n,instructors:i,avgRating:c,numReviews:d,price:p})=>{const u=h=>{window.open(h,"_blank","noopener,noreferrer")},a=()=>{u(`https://www.udemy.com${s}`)};return o.jsxs(E,{children:[o.jsx(P,{src:t,alt:"Course Thumbnail"}),o.jsxs(S,{children:[o.jsx(T,{title:e,onClick:a,children:g.startCase(e)}),o.jsx(q,{title:n,children:n}),o.jsx(I,{title:i==null?void 0:i.join(", "),children:i==null?void 0:i.join(", ")}),o.jsx(z,{value:c,numParticipants:d})]}),o.jsxs(G,{children:[o.jsx(y,{title:"Enroll In this Course",type:"submit",select:"secondary",onClick:a,children:"Enroll now"}),o.jsx(A,{children:p})]})]})};export{N as C,B as a,H as b,_ as c,D as d,U as u};
