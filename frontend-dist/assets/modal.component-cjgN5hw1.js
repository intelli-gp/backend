import{r as s,j as e}from"./markdown-Qw4Jt3t5.js";import{R as p}from"./calendar-TeNl4l8Y.js";import{u as t,m as c,C as x,aW as g,aM as h}from"./index-2Mm0dNtt.js";const y=t(c.div)`
    inset: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    inset: 0;
`,b=t(c.div)`
    user-select: none;
    width: ${({width:o})=>{switch(o){case"sm":return"min(100%, 350px)";case"md":case void 0:return"min(100%, 450px)";case"lg":return"min(100%, 650px)"}}};
    max-height: 90vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 0.5rem;
    gap: 1rem;
`,j=t.h2`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
`,v=t.span`
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    ${x}
`,M=t.div`
    padding: 1rem 1.5rem;
    max-height: 70vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`,k=t.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    color: #000;
    padding: 0.25rem;
    border-radius: 10rem;
    transition: background 0.3s;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`,R=({isOpen:o,setIsOpen:n,children:d,className:l,width:m,title:r,cleanupFn:a})=>{const i=s.useRef(null),u=f=>{i.current===f.target&&(n(!1),a&&a())};return s.useEffect(()=>(o&&(document.body.style.overflow="hidden"),()=>{document.body.style.overflow="unset"}),[o]),p.createPortal(e.jsx(g,{children:o&&e.jsx(y,{onClick:u,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},ref:i,children:e.jsxs(b,{width:m,initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},exit:{opacity:0,y:25},children:[r&&e.jsxs(j,{children:[e.jsx(v,{children:r}),e.jsx(k,{onClick:()=>n(!1),children:e.jsx(h,{size:28})})]}),e.jsx(M,{className:l??"",children:d})]})})}),document.getElementById("modal-container"))};export{R as M,j as a,k as b};
