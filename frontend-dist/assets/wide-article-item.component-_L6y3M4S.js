import{j as i}from"./markdown-Qw4Jt3t5.js";import{h as x}from"./moment-WSJ9un1t.js";import{u as a,C as r,d as f,E as o,j as g,h,ad as w}from"./index-2Mm0dNtt.js";import{p as j}from"./profileUrlBuilder-lYjeV696.js";const b=a.article`
    margin: 0 auto;
    width: min(800px, 100%);
    flex: 1;
    background-color: white;
    cursor: pointer;
    border-radius: 1rem;
    padding: 0.5rem;
    padding-right: 1rem;
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
    background-color: white;
    transition: background-color 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    &:hover {
        background-color: var(--indigo-25);
    }

    @media (max-width: 768px) {
        gap: 0.75rem;
    }
`,y=a.header`
    display: flex;
    align-items: center;
    align-self: flex-start;
    font-size: 0.875rem; // 14px
    font-weight: 500;
    gap: 0.75rem;
    width: 100%;

    &:hover {
        span {
            border-color: var(--indigo-800);
        }
    }
`,v=a.p`
    line-height: 1.15;
    transition: border-color 0.2s ease-in-out;
    border-bottom: 1px solid transparent;
    ${r}
`,u=a.p`
    line-height: 1.15;
    font-size: 0.75rem;
    opacity: 0.8;
    ${r}
    margin-top: -0.15rem;
`,z=a.h1`
    hyphens: auto;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.15;
    ${f}
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`,C=a(o)`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    aspect-ratio: 1/1;
`;a.main`
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;const N=a.footer`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`,k=a.div`
    display: flex;
    gap: 0.5rem;
    @media (max-width: 768px) {
        display: none;
    }
`,U=a.time`
    font-size: 0.8rem;
    opacity: 0.9;
    @media (max-width: 768px) {
        font-size: 0.75rem;
    }
`,D=a(o)`
    width: 200px;
    border-radius: 0.5rem;
    aspect-ratio: 1/1;
    @media (max-width: 768px) {
        width: 150px;
    }
`,Y=({Author:e,CoverImage:l,ArticleTags:s,Title:n,UpdatedAt:d,CreatedAt:m,onClick:c})=>{const p=g();return i.jsxs(b,{onClick:c,title:n,children:[i.jsx(D,{src:l,alt:"thumbnail"}),i.jsxs("div",{className:"flex flex-col justify-between flex-1 overflow-hidden py-3",children:[i.jsxs(y,{onClick:t=>{t.stopPropagation(),p(j(e==null?void 0:e.Username))},title:`View ${e==null?void 0:e.FullName}'s profile`,children:[i.jsx(C,{src:(e==null?void 0:e.ProfileImage)??h,alt:"user profile picture"}),i.jsxs("div",{className:"overflow-hidden",children:[i.jsx(v,{children:e==null?void 0:e.FullName}),i.jsxs(u,{className:"!text-inherit",children:["@",e==null?void 0:e.Username]})]})]}),i.jsx(z,{lines:2,children:n}),i.jsxs(N,{children:[i.jsx(k,{children:s==null?void 0:s.slice(0,3).map(t=>i.jsx(w,{text:t,size:"xs"}))}),i.jsx(U,{children:x(new Date(d||m)).format("DD MMM, YYYY")})]})]})]})};export{Y as W};
