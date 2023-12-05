import{a}from"./assets/vendor-99c05df3.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();a.defaults.headers.common["x-api-key"]="live_8dopgEoZqjLeDX5BcU4nL2k4qRgKONIXj7FAVN0qokHbLiZxLlebiy9Al26Wgzgs";function h(){return a.get("https://api.thecatapi.com/v1/breeds").then(e=>e.data).catch(e=>{throw console.error("Error fetching breeds:",e),e})}function y(e){return a.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${e}`).then(n=>n.data).catch(n=>{throw console.error("Error fetching cat by breed:",n),n})}const d=document.querySelector("select.breed-select"),i=document.querySelector("div.cat-info"),u=document.querySelector("p.loader"),p=document.querySelector("p.error");function f(){u.style.display="block"}function s(){u.style.display="none"}function m(){p.style.display="block"}function g(){p.style.display="none"}function b(e){d.innerHTML="",e.forEach(n=>{const r=document.createElement("option");r.value=n.id,r.textContent=n.name,d.appendChild(r)})}function L(e){const n=document.createElement("img");n.src=e[0].url;const r=document.createElement("p");r.textContent=`Breed: ${e[0].breeds[0].name}`;const c=document.createElement("p");c.textContent=`Description: ${e[0].breeds[0].description}`;const t=document.createElement("p");t.textContent=`Temperament: ${e[0].breeds[0].temperament}`,i.innerHTML="",i.appendChild(n),i.appendChild(r),i.appendChild(c),i.appendChild(t)}f();h().then(e=>{s(),b(e)}).catch(()=>{s(),m()});d.addEventListener("change",()=>{const e=d.value;e&&(f(),g(),y(e).then(n=>{s(),L(n)}).catch(()=>{s(),m()}))});
//# sourceMappingURL=commonHelpers.js.map
