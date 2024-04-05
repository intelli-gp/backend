import{j as e,r as c}from"./markdown-Qw4Jt3t5.js";import{d as m}from"./default-group-image-3LT9wWmd.js";import{u as t,d as p,E as h,j as u,m as x,p as g}from"./index-2Mm0dNtt.js";import{E as f}from"./explore-page-header.component-8lWRY734.js";import"./calendar-TeNl4l8Y.js";const C=t.div`
    height: 80px;
    position: relative;
`,j=t.div`
    width: 75%;
    height: 140px;
    gap: 0.5rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 1.25rem;
    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: var(--indigo-25);
    }
`,w=t(h)`
    max-width: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        max-width: 100px;
    }
`,b=t.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
    justify-content: space-between;
    margin-left: 0.25rem;
    gap: 6px;
`,v=t.time`
    font-size: 0.75rem;
    opacity: 0.9;
    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`,y=t.p`
    font-size: 0.8rem;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
`,G=t.h3`
    ${p}
    font-weight: bold;
    font-size: 1.25rem;
`,I=({ID:r,GroupTitle:a,GroupCoverImage:n})=>{const i=u(),o={Username:"Youmna_Mahmoud",Content:"I am hosting a party this Thursday at 4 PM and I would love for all of you to join me. I am confident that you will have a great time. If you plan on attending, please kindly confirm your presence."};return e.jsxs(j,{onClick:()=>{i(`/app/chat-room/${r}`)},children:[e.jsx(C,{children:e.jsx(w,{src:n||m,alt:a})}),e.jsxs(b,{children:[e.jsx(G,{title:a,children:a}),e.jsxs(y,{children:[e.jsx("span",{className:"font-extrabold",children:o.Username+": "}),o.Content]}),e.jsx(v,{children:"3 minutes ago"})]})]})},S=t(x.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: start;
`,k=t.div`
    font-size: 3.25rem;
    font-weight: bold;
    color: var(--indigo-950);
`,V=()=>{const[r,a]=c.useState(""),n=d=>{a(d)},[i,o]=c.useState([]),{data:s}=g(),l=(s==null?void 0:s.data)??[];return c.useEffect(()=>{o(l)},[l]),e.jsxs(S,{children:[e.jsx(k,{children:" Chats"}),e.jsx(f,{placeholder:"Search chats...",searchValue:r,onSearchValueChange:n,WithoutButton:!0}),i.map(d=>e.jsx(I,{...d}))]})};export{V as ChatsPage,V as default};
