"use strict";var e=({filter:e})=>{e("Articles.items.create",(async e=>t(e))),e("Articles.items.update",(async e=>t(e))),e("Project.items.create",(async e=>t(e))),e("Project.items.update",(async e=>t(e)))};const t=async e=>(e.hasOwnProperty("title")&&(e.slug=await a(e.title)),e.hasOwnProperty("body")&&console.log(e.body),e),a=e=>e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase().trim().replace(/[^a-z0-9 ]/g,"").replace(/\s+/g,"-");module.exports=e;
