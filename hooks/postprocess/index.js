"use strict";var e=({filter:e})=>{["Articles","Project","Pages"].forEach((r=>{e(`${r}.items.create`,(async e=>t(e))),e(`${r}.items.update`,(async e=>t(e)))}))};const t=e=>{const t=e;return t.hasOwnProperty("title")&&(t.slug=r(t.title)),t},r=e=>e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase().trim().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g,"-");module.exports=e;
