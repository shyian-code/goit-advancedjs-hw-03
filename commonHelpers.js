import{a as i,S as y}from"./assets/vendor-244f816b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();i.defaults.headers.common["x-api-key"]="live_8dopgEoZqjLeDX5BcU4nL2k4qRgKONIXj7FAVN0qokHbLiZxLlebiy9Al26Wgzgs";const h=async()=>{try{u(),p();const r=await i.get("https://api.thecatapi.com/v1/breeds");return c(),r.data}catch(r){throw c(),m(),r}},f=async r=>{try{u(),p();const e=await i.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${r}`);return c(),e.data}catch(e){throw c(),m(),e}},u=()=>{document.querySelector(".loader").style.display="block"},c=()=>{document.querySelector(".loader").style.display="none"},m=()=>{document.querySelector(".error").style.display="block"},p=()=>{document.querySelector(".error").style.display="none"},l=document.querySelector(".breed-select"),d=document.querySelector(".cat-info");document.querySelector(".loader");document.querySelector(".error");const g=new y({select:".breed-select"});document.addEventListener("DOMContentLoaded",async()=>{try{const r=await h();g.setData(r.map(e=>({text:e.name,value:e.id})))}catch(r){console.error("Помилка отримання порід:",r)}});l.addEventListener("change",async()=>{const r=l.value;try{showLoader(),hideError();const e=await f(r);L(e)}catch(e){hideLoader(),showError(),console.error("Помилка отримання інформації про кота:",e)}});const L=r=>{const e=r[0],a=e.url,s=e.breeds[0].name,t=e.breeds[0].description,o=e.breeds[0].temperament,n=document.createElement("img");n.src=a,d.innerHTML=`
    <div>
      <h3>${s}</h3>
      <p><strong>Description:</strong> ${t}</p>
      <p><strong>Temperament:</strong> ${o}</p>
    </div>
  `,d.appendChild(n),hideLoader(),d.style.display="block"};
//# sourceMappingURL=commonHelpers.js.map
