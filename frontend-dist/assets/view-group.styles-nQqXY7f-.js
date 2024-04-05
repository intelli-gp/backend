import{u as i,m as t}from"./index-2Mm0dNtt.js";const a=i(t.div)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
`,o=i.div`
    height: 30vh;
    position: relative;
    width: 100%;
`,r=i.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    left: 4rem;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 1024px) {
        gap: 15px;
        left: 3rem;
    }
`,n=i.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
    filter: brightness(50%);

    @media (max-width: 768px) {
        max-height: 300px;
    }
`,d=i.img`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease-in-out;
    object-fit: cover;

    box-shadow: var(--black-shadow);
    &:hover {
        opacity: 0.1;
        cursor: pointer;
    }
`,p=i.div`
    flex: 1;
    display: grid;
    grid-template-columns: 6fr 3fr;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`,s=i.div`
    padding: 2rem;
    margin: 0 auto;
    width: min(600px, 100%);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
    @media (max-width: 768px) {
        padding: 1rem;
        grid-row: 2;
    }
`,m=i.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`,l=i.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.25rem;
    h2 {
        font-size: 1.5rem;
        font-weight: 700;
    }
`,c=i.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    @media (max-width: 768px) {
        width: 100%;
    }
`,g=i.div`
    padding: 15px;
    box-shadow: 0px 0px 60px 5px rgba(39, 31, 75, 0.07);
    background: white;
    height: 100%;
    @media (max-width: 768px) {
        padding: 1rem;
        grid-row: 1;
    }
`,x=i.p`
    margin: 0px 15px 0px 5px;
    font-size: 15px;
    font-weight: 600;
    color: var(--gray-700);
`,h=i.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 12px;
    gap: 1rem;
    width: 100%;
    @media (max-width: 1284px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
`,f=i.button`
    cursor: pointer;
    opacity: 0.8;
    color: var(--gray-700);
    padding: 0.75rem;
    border-radius: 5rem;
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: 1;
        background-color: var(--indigo-50);
    }
`;export{f as E,o as G,s as L,a as P,g as R,x as S,n as a,d as b,r as c,p as d,m as e,l as f,c as g,h};
