import{j as e}from"./markdown-Qw4Jt3t5.js";import{u as t,C as a,aE as l,E as c,B as d,q as p}from"./index-2Mm0dNtt.js";import{h}from"./moment-WSJ9un1t.js";import{p as x}from"./profileUrlBuilder-lYjeV696.js";const f=t.li`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 0.25rem;
    &:not(:last-child) {
        border-bottom: 1px solid var(--gray-300);
    }
`,g=t(l)`
    color: inherit;
    display: block;
    ${a}
`,u=t.p`
    font-size: 0.875rem;
    opacity: 0.8;
    margin-top: -0.4rem;
    ${a}
`,j=t(c)`
    width: 42px;
    height: 42px;
    aspect-ratio: 1/1;
    border-radius: 50%;
`,U=t(d)`
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    margin-left: auto;
`,y=t.time`
    margin-left: auto;
    font-size: 0.75rem;
    opacity: 0.8;
`,w=({FullName:r,Username:s,ProfileImage:n,timeInfo:o,action:i,actionHandler:m})=>e.jsxs(f,{children:[e.jsx(j,{src:n,alt:"user profile image"}),e.jsxs("div",{className:"overflow-hidden",children:[e.jsx(g,{to:x(s),title:r,children:r}),e.jsxs(u,{children:["@",s]})]}),i&&e.jsx(U,{onClick:m,children:p.capitalize(i)}),o&&e.jsx(y,{children:h(o).fromNow()})]});export{w as U};
