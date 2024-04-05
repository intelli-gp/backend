import{j as e}from"./markdown-Qw4Jt3t5.js";import{u as n,B as x,ah as l,a6 as c}from"./index-2Mm0dNtt.js";const p=n.div`
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-300);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    gap: 1rem;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
`,m=n(x)`
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
`,u=n.div`
    background-color: transparent;
    display: flex;
    width: 100%;
    max-width: 750px;
    min-width: 0px;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`,b=({searchValue:t,onSearchValueChange:o,searchHandler:a,onCreateButtonClick:s,placeholder:i,WithoutButton:d})=>e.jsxs(u,{children:[e.jsxs(p,{children:[e.jsx(l,{}),e.jsx("input",{className:"border-none outline-none focus-visible:outline-none flex-1",placeholder:i??"Search...",value:t,onChange:r=>o(r.target.value),onKeyDown:r=>{r.key==="Enter"&&a&&a(t)}})]}),d?e.jsx(e.Fragment,{}):e.jsxs(m,{select:"primary200",onClick:s,children:[e.jsx(c,{size:12,className:"mr-1"})," Create"]})]});export{b as E};
