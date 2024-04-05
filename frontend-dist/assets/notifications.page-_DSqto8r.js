import{j as e,r as d}from"./markdown-Qw4Jt3t5.js";import{u as a,af as m,E as p,m as c,j as g,P as l,ag as h}from"./index-2Mm0dNtt.js";import{E as u}from"./explore-page-header.component-8lWRY734.js";import{h as x}from"./moment-WSJ9un1t.js";import{E as f}from"./view-group.styles-nQqXY7f-.js";import"./calendar-TeNl4l8Y.js";const I=a.div`
    display: flex;
    position: relative;
    gap: 1rem;
    border-radius: 0.5rem;
    padding: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
    cursor: pointer;
    background-color: ${({read:r})=>r?"white":"var(--indigo-50)"};
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: var(--indigo-25);
    }

    ${({read:r})=>r?"":m`
            &:after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 0.35rem;
                height: 100%;
                background-color: var(--indigo-500);
                border-radius: 0 0.5rem 0.5rem 0;
            }
        `}
`,j=a(p)`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    aspect-ratio: 1/1;
`,T=a.p`
    font-weight: 700;
    line-height: 1;
`,U=a.time`
    font-size: 0.75rem;
`,A=a.div`
    display: flex;
    flex-direction: column;
    gap: 0;
`,C=({Read:r,UserImage:o,Username:i,Action:n,CreatedAt:t})=>{let s="";switch(n){case"starred":s="starred your article";break;case"commented":s="commented on your article";break;case"followed":s="followed you";break;case"created":s="created a new article";break;default:s="performed an action";break}return e.jsxs(I,{read:r,children:[e.jsx(j,{src:o,alt:"User"}),e.jsxs(A,{children:[e.jsxs(T,{children:["@",i]}),e.jsx("p",{children:s}),e.jsx(U,{children:x(t).fromNow()})]})]})},b=a(c.div)`
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    height: 100%;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
    }
`,w=a.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: min(500px, 100%);
    margin: 0 auto;
    border-left: 1px solid var(--gray-200);
    border-right: 1px solid var(--gray-200);
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
    background-color: var(--gray-50);
`,v=[{Username:"ahmed",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"starred",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"1"},{Username:"ahmed",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"commented",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"2"},{Username:"ahmed",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"followed",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"3"},{Username:"Khaled",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"created",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"4"},{Username:"Khaled",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"starred",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"1"},{Username:"Khaled",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"commented",Read:!1,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"2"},{Username:"Khaled",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"followed",Read:!1,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"3"},{Username:"Khaled",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"created",Read:!1,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"4"},{Username:"Khaled",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"starred",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"1"},{Username:"Khaled",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"commented",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"2"},{Username:"user3",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"followed",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"3"},{Username:"user4",UserImage:"https://randomuser.me/api/portraits/men/10.jpg",Action:"created",Read:!0,CreatedAt:"2021-07-01T12:00:00Z",TargetID:"4"}],E=()=>{const r=g(),[o,i]=d.useState(""),n=t=>{i(t)};return e.jsxs(b,{children:[e.jsxs("div",{className:"flex justify-between items center",children:[e.jsx(l,{children:"Notification Center"}),e.jsx(f,{onClick:()=>r("/app/settings"),children:e.jsx(h,{size:24})})]}),e.jsx(u,{WithoutButton:!0,searchValue:o,onSearchValueChange:n}),e.jsx(w,{children:v.map(t=>e.jsx(C,{...t},t.TargetID))})]})};export{E as default};
