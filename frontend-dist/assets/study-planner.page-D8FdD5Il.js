import{r as i,j as e,R as le}from"./markdown-Qw4Jt3t5.js";import{G as se,u as y,m as ce,av as de,y as g,s as H,f as E,aw as ae,B,ax as ue,ay as fe,az as me,aA as W,aB as xe,S as he,l as pe,aC as ge,aD as we,J as be}from"./index-2Mm0dNtt.js";import{h as n}from"./moment-WSJ9un1t.js";import{m as De,C as je,n as X}from"./calendar-TeNl4l8Y.js";import{a as Z}from"./index.esm-VMS9YxoW.js";import{M as ie}from"./modal.component-cjgN5hw1.js";function ve(t){return se({tag:"svg",attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"}}]})(t)}function ye(t){return se({tag:"svg",attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"}}]})(t)}const ee="/assets/no-task-oY6xol1K.png",Se=y(ce.div)`
    .rbc-time-view .rbc-row:first-child {
        font-size: 1rem;
        min-height: 3rem !important;
        flex-grow: 3 !important;
    }
    .rbc-header {
        padding: 10px 0 0 0 !important;

        color: #1b2547;
        border-bottom: 0px solid !important;
        font-size: larger;
        font-weight: 400;
    }
    .rbc-header + .rbc-today {
        color: #312e81;
    }
    .rbc-label {
        color: #868e96;
    }
    .rbc-allday-cell {
        visibility: hidden !important;
        height: 0 !important;
    }
    .rbc-time-header-gutter {
        border-style: solid;

        border-width: 0 !important;
    }
    .rbc-today {
        background-color: #e9eafd;
    }

    .rbc-event {
        padding: 0px !important;
        border-radius: 0px !important;
        border: none !important;
        background-color: transparent !important;
        z-index: 2;
        position: relative;
    }

    .rbc-background-event {
        padding: 0px !important;
        border-radius: 0px !important;
        border: none !important;
        background-color: transparent !important;
    }

    .rbc-event-label {
        display: none !important;
    }

    .rbc-timeslot-group {
        min-height: 80px !important;
        border-color: transparent !important;
    }

    .rbc-events-container {
        @media (min-width: 1441px) {
            margin-right: 0px !important;
        }
    }
    input[type='time']::-webkit-calendar-picker-indicator {
        display: none;
    }
    .rbc-current-time-indicator {
        background-color: #312e81 !important;
    }

    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    @media (min-width: 1280px) {
        flex-direction: row;
    }
`,ne=y.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    line-height: 1.8;
    color: #141414;

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`,Te=t=>{if(!t)return;let d=parseInt(t.slice(1,3),16),s=parseInt(t.slice(3,5),16),l=parseInt(t.slice(5,7),16);return`${d}, ${s}, ${l}`},re=y.div`
    border-color: ${t=>t.color};
    background-color: rgba(${t=>Te(t.color)}, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
    width: 98%;
    border-style: solid;
    border-width: 0 0 0 6px;
    border-radius: 6px;
    padding: 10px;
    padding-right: 14px;
    & > div:first-child {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    p {
        color: ${t=>t.color};
    }
`,ke=y.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 12px;
    width: 100%;
    padding: 0.3rem;
`,Ne=y.div`
    display: flex;
    flex-basis: 18%;
    height: 100%;
    flex-direction: column;
    border-left: 2px solid #cbd5e0;
    padding: 1.8rem;
    @media (max-width: 1024px) {
        display: none;
    }
    & > div:first-child {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        justify-items: center;
        justify-content: center;
        width: 100%;
    }
`,te=y.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    flex-direction: column;
    gap: 1rem;
`,Ce=y.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 3.8rem;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1.5rem;
    gap: 1rem;

    @media (min-width: 1250px) {
        display: none;
    }
`,Ee=y.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media (min-width: 1025px) {
        flex-basis: 82%;
    }
`,Me=y.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    padding-left: 8px;
    border-radius: 36px;
    background: #f4f4f5;
    border: 2px solid #f4f4f5;
    transition: background 0.25s;
    input {
        font-size: 0.875rem;
        margin-left: 8px;
        margin-right: 4px;
        background: transparent;
        outline: none;
        border: none;
        flex: 1;
    }
    &:focus-within {
        border: 2px solid #4f46e5;
    }
`,Ie=y.button`
    width: 25%;
    background-color: var(--indigo-900);
    border-radius: 0.5rem 0 0 0.5rem;
    border-right: 1px solid white;
    display: flex;
    padding: 8px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`,Ve=y.button`
    width: 50%;
    background-color: var(--indigo-900);
    color: white;
    font-size: 0.75rem;
    padding: 5px;

    @media (min-width: 768px) {
        font-size: 0.875rem;
    }
`,ze=y.button`
    width: 25%;
    padding: 8px;
    background-color: var(--indigo-900);
    border-left: 1px solid white;
    border-radius: 0 0.5rem 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`,Be=({Tasks:t,showModal:d,setShowModal:s})=>{let l=new Date;const[x,a]=i.useState(""),[u,M]=i.useState(""),[T,S]=i.useState("#0369a1"),[w,k]=i.useState(n(l).format().slice(0,10)),[b,I]=i.useState(n(l).format().slice(11,16)),[D,V]=i.useState(n(l).add(1,"hours").format().slice(11,16)),[N,F]=i.useState(""),C=c=>{const o=c.target.value;I(o),o>D&&V(o)},z=c=>{const o=c.target.value;o>=b&&V(o)},[L,{isSuccess:$,isError:f,isLoading:j,error:m}]=de();i.useEffect(()=>{f&&g("Error creating a task!",m),$&&H("Task created successfully!")},[$,f]);const r=async c=>{c.preventDefault();const o=new Date(`${w}T${b}`),v=new Date(`${w}T${D}`),R=new Date;if(n(o).add(1,"days").diff(n(R),"months")>=1){g("Date exceeds 1 month ahead!");return}if(b===D){g("Start and due date can not match!");return}if(o<R){g("This is an old date!!");return}for(const A of t)if(A.DueDate&&A.StartDate){const P=new Date(A.StartDate),q=new Date(A.DueDate);if(o>=P&&o<q){g("Task start time overlaps with another task. Please choose a different time.");return}if(v>=P&&v<q){g("Task end time overlaps with another task. Please choose a different time.");return}if(o<=P&&v>=P&&v>=q){g("Task duration overlaps with another task. Please adjust the start or end time.");return}}const O={Title:x,Description:u,DueDate:w+"T"+D,StartDate:w+"T"+b,Status:N,Color:T};await L(O).unwrap(),s(!1),a(""),M(""),k(n(l).format().slice(0,10)),I(n(l).format().slice(11,16)),V(n(l).add(1,"hours").format().slice(11,16)),S("#0369a1"),F("")};return e.jsx(ie,{isOpen:d,setIsOpen:s,title:"Add task",width:"lg",children:e.jsx(ne,{children:e.jsxs("form",{onSubmit:r,children:[e.jsx("div",{className:"w-full",children:e.jsx(E,{required:!0,label:"Task name",type:"text",value:x,onChange:c=>{var o;return a((o=c.target)==null?void 0:o.value)}})}),e.jsxs("div",{className:"flex w-full justify-between pt-[6px] gap-6",children:[e.jsx("div",{className:"w-1/2",children:e.jsx(E,{required:!0,label:"Status",type:"text",value:N,onChange:c=>F(c.target.value)})}),e.jsx("div",{className:"w-1/2",children:e.jsx(E,{required:!0,label:"Select color",id:"color",className:"rounded border  border-slate-400 p-2 w-full h-[49px] bg-white focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2",type:"color",value:T,onChange:c=>S(c.target.value)})})]}),e.jsxs("div",{className:"flex w-full justify-between pt-[6px] gap-6",children:[e.jsx("div",{className:"w-1/2 flex flex-col justify-between",children:e.jsx(E,{required:!0,value:w,type:"date",label:"Due date",onChange:c=>k(c.target.value)})}),e.jsxs("div",{className:"flex flex-row justify-between w-1/2 mt-auto",children:[e.jsx("input",{type:"time",className:"rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 mr-1",value:b,onChange:C}),e.jsx("span",{className:"text-xl pt-3",children:e.jsx(ae,{})}),e.jsx("input",{type:"time",className:"rounded border ml-1 border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2",value:D,onChange:z})]})]}),e.jsx("div",{className:"flex flex-col gap-2 pt-[6px]",children:e.jsx(E,{label:"Description",value:u,onChange:c=>M(c.target.value),multiline:"true",placeholder:"Enter description...",maxLength:1e3,cols:33,rows:4})}),e.jsxs("div",{className:"w-full flex flex-row gap-4 justify-end items-end pt-5",children:[e.jsx(B,{type:"submit",select:"primary",className:"w-1/4",loading:j,children:"Create"}),e.jsx(B,{select:"danger",outline:!0,onClick:()=>s(!1),className:"w-1/4 border-white",children:"Cancel"})]})]})})})},Fe=(t,d)=>{const s={};s.ID=t.ID,t.Title!==d.Title&&(s.Title=t.Title),t.Description!==d.Description&&(s.Description=t.Description);const l=n(d.DueDate).format().slice(0,16),x=n(d.StartDate).format().slice(0,16);return(t.DueDate!==l||t.StartDate!==x)&&(s.DueDate=t.DueDate,s.StartDate=t.StartDate),t.Status!==d.Status&&(s.Status=t.Status),t.Color!==d.Color&&(s.Color=t.Color),s},$e=({Tasks:t,showModal:d,setShowModal:s,ID:l})=>{const{data:x}=ue(l),a=(x==null?void 0:x.data)||[],u=a,M=l,[T,S]=i.useState(a.Title),[w,k]=i.useState(a.Description),[b,I]=i.useState((a==null?void 0:a.Color)||"#000ff3"),[D,V]=i.useState(n(a.DueDate).format().slice(0,10)),[N,F]=i.useState(n(a.StartDate).format().slice(11,16)),[C,z]=i.useState(n(a.DueDate).format().slice(11,16)),[L,$]=i.useState(a.Status);i.useEffect(()=>{S(a.Title),k(a.Description),I(a.Color),V(n(a.DueDate).format().slice(0,10)),F(n(a.StartDate).format().slice(11,16)),z(n(a.DueDate).format().slice(11,16)),$(a.Status)},[a]);const f=h=>{const p=h.target.value;F(p),p>C&&z(p)},j=h=>{const p=h.target.value;p>=N&&z(p)},[m,{isSuccess:r,isError:c,isLoading:o,error:v}]=fe();i.useEffect(()=>{c&&g("Error editing task!",v),r&&H("Task edited successfully!")},[r,c]);const[R,{isSuccess:_,isError:O,error:A}]=me();i.useEffect(()=>{O&&g("Error deleting the task!",A),_&&H("Task deleted successfully!")},[_,O]);const P=async()=>{await R(l).unwrap(),s(!1)},q=async h=>{h.preventDefault();const p=new Date(`${D}T${N}`),Y=new Date(`${D}T${C}`),J=new Date;if(n(p).add(1,"days").diff(n(J),"months")>=1){g("Date exceeds 1 month ahead!");return}if(N===C){g("Start and due date can not match!");return}if(p<J){g("This is an old date!!");return}for(const G of t)if(G.DueDate&&G.StartDate){const U=new Date(G.StartDate),Q=new Date(G.DueDate);if(p>=U&&p<Q){g("Task start time overlaps with another task. Please choose a different time.");return}if(Y>=U&&Y<Q){g("Task end time overlaps with another task. Please choose a different time.");return}if(p<=U&&Y>=U&&Y>=Q){g("Task duration overlaps with another task. Please adjust the start or end time.");return}}const oe={ID:M,Title:T,Description:w,DueDate:D+"T"+C,StartDate:D+"T"+N,Status:L,Color:b},K=Fe(oe,u);if(Object.keys(K).length===1){s(!1);return}await m(K).unwrap(),s(!1)};return e.jsx(ie,{isOpen:d,setIsOpen:s,title:"Edit Task",width:"lg",children:e.jsx(ne,{children:e.jsxs("form",{onSubmit:q,children:[e.jsx("div",{className:"w-full",children:e.jsx(E,{required:!0,label:"Task name",type:"text",value:T,onChange:h=>{var p;return S((p=h.target)==null?void 0:p.value)}})}),e.jsxs("div",{className:"flex w-full justify-between pt-[6px] gap-6",children:[e.jsx("div",{className:"w-1/2",children:e.jsx(E,{required:!0,label:"Status",type:"text",value:L,onChange:h=>$(h.target.value)})}),e.jsx("div",{className:"w-1/2",children:e.jsx(E,{required:!0,label:"Select color",id:"color",className:"rounded border  border-slate-400 p-2 w-full h-[49px] bg-white focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2",type:"color",value:b,onChange:h=>I(h.target.value)})})]}),e.jsxs("div",{className:"flex w-full justify-between pt-[6px] gap-6",children:[e.jsx("div",{className:"w-1/2 flex flex-col justify-between",children:e.jsx(E,{required:!0,value:D,type:"date",label:"Due date",onChange:h=>V(h.target.value)})}),e.jsxs("div",{className:"flex flex-row justify-between mt-auto w-1/2",children:[e.jsx("input",{type:"time",className:"rounded border border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 mr-1",value:N,onChange:f}),e.jsx("span",{className:"text-xl pt-3",children:e.jsx(ae,{})}),e.jsx("input",{type:"time",className:"rounded border ml-1 border-slate-400 p-2 min-w-0 focus-visible:outline-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2",value:C,onChange:j})]})]}),e.jsx("div",{className:"flex flex-col gap-2 pt-[6px]",children:e.jsx(E,{label:"Description",value:w,onChange:h=>k(h.target.value),multiline:"true",placeholder:"Enter description...",maxLength:1e3,cols:33,rows:4})}),e.jsxs("div",{className:"w-full flex flex-row gap-4 justify-end items-end pt-5",children:[e.jsx(B,{type:"submit",select:"primary",className:"!w-[25%] border-2 border-indigo-900 ",loading:o,children:"Save"}),e.jsx(B,{select:"danger",outline:!0,onClick:P,className:"!w-[25%]",children:"Delete"})]})]})})})};function Le({times:t,className:d}){const s=W("relative","overflow-hidden","bg-gray-200","rounded","mb-2.5",d),l=W("animate-shimmer","absolute","inset-0","-translate-x-full","bg-gradient-to-r","from-gray-200","via-white","to-gray-200");return Array(t).fill(0).map((a,u)=>e.jsx("div",{className:s,children:e.jsx("div",{className:l})},u))}function Ae({title:t,status:d,description:s,due_date:l,color:x}){return e.jsx("div",{children:e.jsx(re,{color:x,children:e.jsxs("div",{className:"flex flex-col justify-between items-left",children:[e.jsxs("p",{className:"text-sm text-[#0369A1] ",children:[t," ",e.jsx("span",{className:"text-sm opacity-50",children:d})]}),e.jsx("p",{className:"text-[13px] pt-[3px] text-[#0369A1] break-all",children:s}),e.jsx("div",{className:"pt-6",children:e.jsx("p",{className:"text-[10px] pt-[2px] text-[#0369A1] opacity-50",children:l})})]})})})}const Pe={weekdayFormat:"ddd",dayFormat:"ddd"},Re=De(n),qe=t=>{const[d,s]=i.useState("week"),l=()=>{t.onView("day"),s("day")},x=()=>{t.onView("month"),s("month")},a=()=>{t.onView("week"),s("week")},u=()=>{t.onNavigate(X.PREVIOUS)},M=()=>{t.onNavigate(X.NEXT)},T=[a,l,x],[S,w]=i.useState(0);function k(){w((S+1)%T.length);const b=T[S];b()}return e.jsxs("div",{className:"flex flex-column justify-between pt-[1rem]",children:[e.jsx("div",{className:"flex flex-row gap-3 pb-4  w-2/5 px-2",children:d=="day"?e.jsxs(e.Fragment,{children:[e.jsx("label",{className:"lg:text-4xl text-3xl text-indigo-900 font-semibold",children:n(t.date).format("DD ")}),e.jsx("label",{className:"lg:text-4xl text-3xl text-indigo-900 font-normal",children:n(t.date).format("dddd")})]}):e.jsxs(e.Fragment,{children:[e.jsx("label",{className:"lg:text-4xl text-3xl text-indigo-900 font-semibold",children:n(t.date).format("MMMM ")}),e.jsx("label",{className:"lg:text-4xl text-3xl text-indigo-900 font-light",children:n(t.date).format("YYYY ")})]})}),e.jsx("div",{className:"flex flex-row justify-end items-center	justify-items-center lg:w-1/5 w-[10%] lg:mb-0 mb-4 ",children:e.jsxs("div",{className:"flex flex-row justify-items-center ",children:[e.jsx(Ie,{onClick:u,children:e.jsx(ve,{color:"white",size:"12"})}),e.jsx(Ve,{onClick:k,children:d.charAt(0).toUpperCase()+d.slice(1)}),e.jsx(ze,{onClick:M,children:e.jsx(ye,{color:"white",size:"12"})})]})})]})};function Je(){const[t,d]=i.useState(!1),s=()=>{d(f=>!f)},{data:l,error:x,isLoading:a}=xe(void 0),u=(l==null?void 0:l.data)||[],[M,T]=i.useState(0),[S,w]=i.useState(!1),[k,b]=i.useState(u),[I,D]=i.useState(""),[V,N]=i.useState(!0),F=f=>{const j=f.target.value;D(j),N(j==="");const m={keys:["Title"],includeScore:!0},c=new be(u,m).search(I),o=j===""?u:c.map(v=>v.item);b(o)},C=f=>{T(f),w(j=>!j)};i.useEffect(()=>{b(u)},[u]);const[z,L]=i.useState(null);i.useEffect(()=>{let f;a?f=e.jsx("div",{className:"h-auto w-full",children:e.jsx(Le,{times:3,className:"h-20 w-full"})}):x?f=e.jsxs(te,{children:[e.jsx("img",{alt:"",src:ee,className:"w-[90%]"}),e.jsx("div",{className:"flex flex-col w-full justify-center items-center mr-6",children:e.jsx("p",{className:"text-txt text-lg font-extrabold",children:"Error loading..."})})]}):f=(r=>{const c=new Date;return r.filter(o=>new Date(o.DueDate)>c).sort((o,v)=>new Date(o.DueDate).getTime()-new Date(v.DueDate).getTime())})(k).map(r=>{function c(v){return new Date(v).toLocaleString("en-US",{month:"long",day:"numeric",hour:"numeric",minute:"numeric",hour12:!0})}const o=c(r.DueDate);return e.jsx("div",{className:"w-full",onClick:()=>C(r.ID),children:e.jsx(Ae,{id:r.ID,title:r.Title+" | ",status:r.Status,description:r.Description,DueDate:r.DueDate,StartDate:r.StartDate,due_date:"Due: "+o,color:r.Color},r.ID)})}),L(f)},[a,x,k]);const $=f=>{let j=[];return a||x||(j=u==null?void 0:u.map(m=>({start:n(m.StartDate).toDate(),end:n(m.DueDate).toDate(),data:{task:{id:m.ID,status:m.Status,courseName:m.Title,start:n(m.StartDate).format("LT"),end:n(m.DueDate).format("LT"),color:m.Color}}}))),e.jsx(je,{popup:!0,...f,events:j,formats:Pe,localizer:Re,defaultView:"week",max:n("2023-12-24T23:59:00").toDate(),min:n("2023-12-24T08:00:00").toDate(),components:{toolbar:qe,event:({event:m})=>{const r=m==null?void 0:m.data;return r!=null&&r.task?e.jsx(re,{color:r.task.color,onClick:()=>C(r.task.id),className:"h-full",children:e.jsxs("div",{children:[e.jsxs("p",{className:"text-[10px] pb-[4px] font-bold",children:[e.jsx("span",{children:r.task.start+" - "}),e.jsx("span",{children:r.task.end})]}),e.jsx("p",{className:"text-xs text-[#0369A1] font-bold",children:r.task.courseName})]})}):null}}})};return a?e.jsx(he,{}):e.jsxs(Se,{...pe,children:[e.jsxs(Ee,{children:[e.jsx($,{className:"w-[95%] h-full"}),e.jsxs(Ce,{children:[e.jsx(B,{select:"primary300",rounded:!0,onClick:f=>{f.stopPropagation(),s()},className:"!w-[55px] !h-[55px]",children:e.jsx(ge,{size:"28",color:"#0D062D"})}),e.jsx(B,{select:"primary",rounded:!0,className:"!w-[55px] !h-[55px]",children:e.jsx(Z,{size:"24",color:"white"})})]})]}),e.jsxs(Ne,{children:[e.jsxs("div",{children:[e.jsxs(Me,{children:[e.jsx(we,{color:"#312E81",size:"20"}),e.jsx("input",{type:"search",id:"default-search",value:I,onChange:F})]}),V&&e.jsxs(e.Fragment,{children:[e.jsx(B,{select:"primary300",onClick:s,className:"!text-txt",children:"+ Add a task"}),e.jsxs(B,{select:"primary",className:"flex flex-row gap-2 py-[10px]",children:[e.jsx(Z,{size:"16",color:"white"}),e.jsx("span",{className:"text-sm",children:"Make plan"})]})]})]}),e.jsx("div",{className:"flex flex-col mt-8 items-center justify-center w-full ",children:e.jsxs(ke,{children:[" ",le.Children.count(z)!==0?z:e.jsxs(te,{children:[e.jsx("img",{src:ee,className:"w-[90%]"}),e.jsxs("div",{className:"flex flex-col w-full justify-center items-center mr-6",children:[e.jsx("p",{className:"text-txt text-lg font-extrabold",children:"No tasks"}),e.jsx("p",{className:"text-slate-400 text-sm text-center",children:"You have no tasks to do."})]})]})]})})]}),S&&e.jsx($e,{Tasks:u,showModal:S,setShowModal:w,ID:M}),t&&e.jsx(Be,{Tasks:u,showModal:t,setShowModal:d})]})}export{Je as default};
