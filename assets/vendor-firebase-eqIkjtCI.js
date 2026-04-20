const Vy=()=>{};var Vh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ky=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Lf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|l>>6,E=l&63;u||(E=64,o||(g=64)),r.push(t[f],t[p],t[g],t[E])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Mf(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ky(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||p==null)throw new Dy;const g=i<<2|c>>4;if(r.push(g),l!==64){const E=c<<4&240|l>>2;if(r.push(E),p!==64){const C=l<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Dy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ny=function(n){const e=Mf(n);return Lf.encodeByteArray(e,!0)},Po=function(n){return Ny(n).replace(/\./g,"")},Ff=function(n){try{return Lf.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xy=()=>Uf().__FIREBASE_DEFAULTS__,Oy=()=>{if(typeof process>"u"||typeof Vh>"u")return;const n=Vh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},My=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ff(n[1]);return e&&JSON.parse(e)},Xo=()=>{try{return Vy()||xy()||Oy()||My()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Bf=n=>{var e,t;return(t=(e=Xo())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},qf=n=>{const e=Bf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},zf=()=>{var n;return(n=Xo())==null?void 0:n.config},jf=n=>{var e;return(e=Xo())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ly{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Po(JSON.stringify(t)),Po(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Fy(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function Gf(){var e;const n=(e=Xo())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Uy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function By(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function qy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zy(){const n=Ae();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Kf(){return!Gf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Hf(){return!Gf()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Wf(){try{return typeof indexedDB=="object"}catch{return!1}}function jy(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function UP(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y="FirebaseError";class Et extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=$y,Object.setPrototypeOf(this,Et.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ii.prototype.create)}}class Ii{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Gy(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Et(s,c,r)}}function Gy(n,e){return n.replace(Ky,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ky=/\{\$([^}]+)}/g;function Hy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ut(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(kh(i)&&kh(o)){if(!ut(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function kh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Bs(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function qs(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Wy(n,e){const t=new Qy(n,e);return t.subscribe.bind(t)}class Qy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Jy(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Za),s.error===void 0&&(s.error=Za),s.complete===void 0&&(s.complete=Za);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Jy(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Za(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy=1e3,Xy=2,Zy=14400*1e3,eI=.5;function BP(n,e=Yy,t=Xy){const r=e*Math.pow(t,n),s=Math.round(eI*r*(Math.random()-.5)*2);return Math.min(Zy,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Zo(n){return(await fetch(n,{credentials:"include"})).ok}class cn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Ly;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(rI(e))try{this.getOrInitializeService({instanceIdentifier:xn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=xn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=xn){return this.instances.has(e)}getOptions(e=xn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:nI(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=xn){return this.component?this.component.multipleInstances?e:xn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function nI(n){return n===xn?void 0:n}function rI(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new tI(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(X||(X={}));const iI={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},oI=X.INFO,aI={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},cI=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=aI[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class nu{constructor(e){this.name=e,this._logLevel=oI,this._logHandler=cI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in X))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?iI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...e),this._logHandler(this,X.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...e),this._logHandler(this,X.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,X.INFO,...e),this._logHandler(this,X.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,X.WARN,...e),this._logHandler(this,X.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...e),this._logHandler(this,X.ERROR,...e)}}const uI=(n,e)=>e.some(t=>n instanceof t);let Dh,Nh;function lI(){return Dh||(Dh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hI(){return Nh||(Nh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Qf=new WeakMap,yc=new WeakMap,Jf=new WeakMap,ec=new WeakMap,ru=new WeakMap;function dI(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(rn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Qf.set(t,n)}).catch(()=>{}),ru.set(e,n),e}function fI(n){if(yc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});yc.set(n,e)}let Ic={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return yc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Jf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return rn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function pI(n){Ic=n(Ic)}function mI(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(tc(this),e,...t);return Jf.set(r,e.sort?e.sort():[e]),rn(r)}:hI().includes(n)?function(...e){return n.apply(tc(this),e),rn(Qf.get(this))}:function(...e){return rn(n.apply(tc(this),e))}}function gI(n){return typeof n=="function"?mI(n):(n instanceof IDBTransaction&&fI(n),uI(n,lI())?new Proxy(n,Ic):n)}function rn(n){if(n instanceof IDBRequest)return dI(n);if(ec.has(n))return ec.get(n);const e=gI(n);return e!==n&&(ec.set(n,e),ru.set(e,n)),e}const tc=n=>ru.get(n);function _I(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=rn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(rn(o.result),u.oldVersion,u.newVersion,rn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const yI=["get","getKey","getAll","getAllKeys","count"],II=["put","add","delete","clear"],nc=new Map;function xh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(nc.get(e))return nc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=II.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||yI.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return nc.set(e,i),i}pI(n=>({...n,get:(e,t,r)=>xh(e,t)||n.get(e,t,r),has:(e,t)=>!!xh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(EI(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function EI(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Tc="@firebase/app",Oh="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct=new nu("@firebase/app"),wI="@firebase/app-compat",vI="@firebase/analytics-compat",AI="@firebase/analytics",RI="@firebase/app-check-compat",bI="@firebase/app-check",SI="@firebase/auth",PI="@firebase/auth-compat",CI="@firebase/database",VI="@firebase/data-connect",kI="@firebase/database-compat",DI="@firebase/functions",NI="@firebase/functions-compat",xI="@firebase/installations",OI="@firebase/installations-compat",MI="@firebase/messaging",LI="@firebase/messaging-compat",FI="@firebase/performance",UI="@firebase/performance-compat",BI="@firebase/remote-config",qI="@firebase/remote-config-compat",zI="@firebase/storage",jI="@firebase/storage-compat",$I="@firebase/firestore",GI="@firebase/ai",KI="@firebase/firestore-compat",HI="firebase",WI="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Co="[DEFAULT]",QI={[Tc]:"fire-core",[wI]:"fire-core-compat",[AI]:"fire-analytics",[vI]:"fire-analytics-compat",[bI]:"fire-app-check",[RI]:"fire-app-check-compat",[SI]:"fire-auth",[PI]:"fire-auth-compat",[CI]:"fire-rtdb",[VI]:"fire-data-connect",[kI]:"fire-rtdb-compat",[DI]:"fire-fn",[NI]:"fire-fn-compat",[xI]:"fire-iid",[OI]:"fire-iid-compat",[MI]:"fire-fcm",[LI]:"fire-fcm-compat",[FI]:"fire-perf",[UI]:"fire-perf-compat",[BI]:"fire-rc",[qI]:"fire-rc-compat",[zI]:"fire-gcs",[jI]:"fire-gcs-compat",[$I]:"fire-fst",[KI]:"fire-fst-compat",[GI]:"fire-vertex","fire-js":"fire-js",[HI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si=new Map,JI=new Map,Ec=new Map;function Mh(n,e){try{n.container.addComponent(e)}catch(t){Ct.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Wn(n){const e=n.name;if(Ec.has(e))return Ct.debug(`There were multiple attempts to register component ${e}.`),!1;Ec.set(e,n);for(const t of si.values())Mh(t,n);for(const t of JI.values())Mh(t,n);return!0}function ns(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function YI(n,e,t=Co){ns(n,e).clearInstance(t)}function je(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},sn=new Ii("app","Firebase",XI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new cn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw sn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=WI;function eT(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Co,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw sn.create("bad-app-name",{appName:String(s)});if(t||(t=zf()),!t)throw sn.create("no-options");const i=si.get(s);if(i){if(ut(t,i.options)&&ut(r,i.config))return i;throw sn.create("duplicate-app",{appName:s})}const o=new sI(s);for(const u of Ec.values())o.addComponent(u);const c=new ZI(t,r,o);return si.set(s,c),c}function su(n=Co){const e=si.get(n);if(!e&&n===Co&&zf())return eT();if(!e)throw sn.create("no-app",{appName:n});return e}function qP(){return Array.from(si.values())}function gt(n,e,t){let r=QI[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ct.warn(o.join(" "));return}Wn(new cn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tT="firebase-heartbeat-database",nT=1,ii="firebase-heartbeat-store";let rc=null;function Yf(){return rc||(rc=_I(tT,nT,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ii)}catch(t){console.warn(t)}}}}).catch(n=>{throw sn.create("idb-open",{originalErrorMessage:n.message})})),rc}async function rT(n){try{const t=(await Yf()).transaction(ii),r=await t.objectStore(ii).get(Xf(n));return await t.done,r}catch(e){if(e instanceof Et)Ct.warn(e.message);else{const t=sn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ct.warn(t.message)}}}async function Lh(n,e){try{const r=(await Yf()).transaction(ii,"readwrite");await r.objectStore(ii).put(e,Xf(n)),await r.done}catch(t){if(t instanceof Et)Ct.warn(t.message);else{const r=sn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ct.warn(r.message)}}}function Xf(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sT=1024,iT=30;class oT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new cT(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Fh();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>iT){const o=uT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ct.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Fh(),{heartbeatsToSend:r,unsentEntries:s}=aT(this._heartbeatsCache.heartbeats),i=Po(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Ct.warn(t),""}}}function Fh(){return new Date().toISOString().substring(0,10)}function aT(n,e=sT){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Uh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Uh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class cT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Wf()?jy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await rT(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Lh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Lh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Uh(n){return Po(JSON.stringify({version:2,heartbeats:n})).length}function uT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lT(n){Wn(new cn("platform-logger",e=>new TI(e),"PRIVATE")),Wn(new cn("heartbeat",e=>new oT(e),"PRIVATE")),gt(Tc,Oh,n),gt(Tc,Oh,"esm2020"),gt("fire-js","")}lT("");function Zf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const hT=Zf,ep=new Ii("auth","Firebase",Zf());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new nu("@firebase/auth");function dT(n,...e){Vo.logLevel<=X.WARN&&Vo.warn(`Auth (${ar}): ${n}`,...e)}function po(n,...e){Vo.logLevel<=X.ERROR&&Vo.error(`Auth (${ar}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,...e){throw ou(n,...e)}function ot(n,...e){return ou(n,...e)}function iu(n,e,t){const r={...hT(),[e]:t};return new Ii("auth","Firebase",r).create(e,{appName:n.name})}function St(n){return iu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function fT(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&nt(n,"argument-error"),iu(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ou(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return ep.create(n,...e)}function j(n,e,...t){if(!n)throw ou(e,...t)}function vt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw po(e),new Error(e)}function Vt(n,e){n||vt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function pT(){return Bh()==="http:"||Bh()==="https:"}function Bh(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mT(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pT()||By()||"connection"in navigator)?navigator.onLine:!0}function gT(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,t){this.shortDelay=e,this.longDelay=t,Vt(t>e,"Short delay should be less than long delay!"),this.isMobile=Fy()||qy()}get(){return mT()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(n,e){Vt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;vt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;vt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;vt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _T={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],IT=new Ei(3e4,6e4);function yn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function xt(n,e,t,r,s={}){return np(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=Ti({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...i};return Uy()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&_n(n.emulatorConfig.host)&&(l.credentials="include"),tp.fetch()(await rp(n,n.config.apiHost,t,c),l)})}async function np(n,e,t){n._canInitEmulator=!1;const r={..._T,...e};try{const s=new ET(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw no(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw no(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw no(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw no(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw iu(n,f,l);nt(n,f)}}catch(s){if(s instanceof Et)throw s;nt(n,"network-request-failed",{message:String(s)})}}async function wi(n,e,t,r,s={}){const i=await xt(n,e,t,r,s);return"mfaPendingCredential"in i&&nt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function rp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?au(n.config,s):`${n.config.apiScheme}://${s}`;return yT.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function TT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ET{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ot(this.auth,"network-request-failed")),IT.get())})}}function no(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ot(n,e,r);return s.customData._tokenResponse=t,s}function qh(n){return n!==void 0&&n.enterprise!==void 0}class wT{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return TT(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function vT(n,e){return xt(n,"GET","/v2/recaptchaConfig",yn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AT(n,e){return xt(n,"POST","/v1/accounts:delete",e)}async function ko(n,e){return xt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function RT(n,e=!1){const t=ee(n),r=await t.getIdToken(e),s=cu(r);j(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ks(sc(s.auth_time)),issuedAtTime:Ks(sc(s.iat)),expirationTime:Ks(sc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function sc(n){return Number(n)*1e3}function cu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return po("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ff(t);return s?JSON.parse(s):(po("Failed to decode base64 JWT payload"),null)}catch(s){return po("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function zh(n){const e=cu(n);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Et&&bT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function bT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ks(this.lastLoginAt),this.creationTime=Ks(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Do(n){var p;const e=n.auth,t=await n.getIdToken(),r=await xr(n,ko(e,{idToken:t}));j(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?sp(s.providerUserInfo):[],o=CT(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),l=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new vc(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,f)}async function PT(n){const e=ee(n);await Do(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function CT(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function sp(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VT(n,e){const t=await np(n,{},async()=>{const r=Ti({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await rp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&_n(n.emulatorConfig.host)&&(u.credentials="include"),tp.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function kT(n,e){return xt(n,"POST","/v2/accounts:revokeToken",yn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=zh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await VT(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new Pr;return r&&(j(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(j(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pr,this.toJSON())}_performRefresh(){return vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(n,e){j(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class st{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new ST(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new vc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await xr(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return RT(this,e)}reload(){return PT(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new st({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Do(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(je(this.auth.app))return Promise.reject(St(this.auth));const e=await this.getIdToken();return await xr(this,AT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:E,providerData:C,stsTokenManager:k}=t;j(p&&k,e,"internal-error");const V=Pr.fromJSON(this.name,k);j(typeof p=="string",e,"internal-error"),Gt(r,e.name),Gt(s,e.name),j(typeof g=="boolean",e,"internal-error"),j(typeof E=="boolean",e,"internal-error"),Gt(i,e.name),Gt(o,e.name),Gt(c,e.name),Gt(u,e.name),Gt(l,e.name),Gt(f,e.name);const L=new st({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:E,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:V,createdAt:l,lastLoginAt:f});return C&&Array.isArray(C)&&(L.providerData=C.map(B=>({...B}))),u&&(L._redirectEventId=u),L}static async _fromIdTokenResponse(e,t,r=!1){const s=new Pr;s.updateFromServerResponse(t);const i=new st({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Do(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?sp(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Pr;c.updateFromIdToken(r);const u=new st({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new vc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jh=new Map;function At(n){Vt(n instanceof Function,"Expected a class definition");let e=jh.get(n);return e?(Vt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,jh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ip.type="NONE";const $h=ip;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(n,e,t){return`firebase:${n}:${e}:${t}`}class Cr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=mo(this.userKey,s.apiKey,i),this.fullPersistenceKey=mo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ko(this.auth,{idToken:e}).catch(()=>{});return t?st._fromGetAccountInfoResponse(this.auth,t,e):null}return st._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Cr(At($h),e,r);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||At($h);const o=mo(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const f=await l._get(o);if(f){let p;if(typeof f=="string"){const g=await ko(e,{idToken:f}).catch(()=>{});if(!g)break;p=await st._fromGetAccountInfoResponse(e,g,f)}else p=st._fromJSON(e,f);l!==i&&(c=p),i=l;break}}catch{}const u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Cr(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new Cr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(up(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(op(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hp(e))return"Blackberry";if(dp(e))return"Webos";if(ap(e))return"Safari";if((e.includes("chrome/")||cp(e))&&!e.includes("edge/"))return"Chrome";if(lp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function op(n=Ae()){return/firefox\//i.test(n)}function ap(n=Ae()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function cp(n=Ae()){return/crios\//i.test(n)}function up(n=Ae()){return/iemobile/i.test(n)}function lp(n=Ae()){return/android/i.test(n)}function hp(n=Ae()){return/blackberry/i.test(n)}function dp(n=Ae()){return/webos/i.test(n)}function uu(n=Ae()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function DT(n=Ae()){var e;return uu(n)&&!!((e=window.navigator)!=null&&e.standalone)}function NT(){return zy()&&document.documentMode===10}function fp(n=Ae()){return uu(n)||lp(n)||dp(n)||hp(n)||/windows phone/i.test(n)||up(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pp(n,e=[]){let t;switch(n){case"Browser":t=Gh(Ae());break;case"Worker":t=`${Gh(Ae())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ar}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OT(n,e={}){return xt(n,"GET","/v2/passwordPolicy",yn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT=6;class LT{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??MT,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kh(this),this.idTokenSubscription=new Kh(this),this.beforeStateQueue=new xT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ep,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=At(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Cr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ko(this,{idToken:e}),r=await st._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(je(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Do(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=gT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(je(this.app))return Promise.reject(St(this));const t=e?ee(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return je(this.app)?Promise.reject(St(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return je(this.app)?Promise.reject(St(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(At(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await OT(this),t=new LT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ii("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await kT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&At(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await Cr.create(this,[At(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&dT(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function In(n){return ee(n)}class Kh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Wy(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ea={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function UT(n){ea=n}function mp(n){return ea.loadJS(n)}function BT(){return ea.recaptchaEnterpriseScript}function qT(){return ea.gapiScript}function zT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class jT{constructor(){this.enterprise=new $T}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class $T{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const GT="recaptcha-enterprise",gp="NO_RECAPTCHA";class KT{constructor(e){this.type=GT,this.auth=In(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{vT(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new wT(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;qh(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(gp)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new jT().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&qh(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=BT();u.length!==0&&(u+=c),mp(u).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function Hh(n,e,t,r=!1,s=!1){const i=new KT(n);let o;if(s)o=gp;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ac(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Hh(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Hh(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HT(n,e){const t=ns(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ut(i,e??{}))return s;nt(s,"already-initialized")}return t.initialize({options:e})}function WT(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(At);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function QT(n,e,t){const r=In(n);j(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=_p(e),{host:o,port:c}=JT(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(ut(l,r.config.emulator)&&ut(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,_n(o)?Zo(`${i}//${o}${u}`):YT()}function _p(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function JT(n){const e=_p(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Wh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Wh(o)}}}function Wh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function YT(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return vt("not implemented")}_getIdTokenResponse(e){return vt("not implemented")}_linkToIdToken(e,t){return vt("not implemented")}_getReauthenticationResolver(e){return vt("not implemented")}}async function XT(n,e){return xt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZT(n,e){return wi(n,"POST","/v1/accounts:signInWithPassword",yn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eE(n,e){return wi(n,"POST","/v1/accounts:signInWithEmailLink",yn(n,e))}async function tE(n,e){return wi(n,"POST","/v1/accounts:signInWithEmailLink",yn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi extends lu{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new oi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new oi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ac(e,t,"signInWithPassword",ZT);case"emailLink":return eE(e,{email:this._email,oobCode:this._password});default:nt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ac(e,r,"signUpPassword",XT);case"emailLink":return tE(e,{idToken:t,email:this._email,oobCode:this._password});default:nt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vr(n,e){return wi(n,"POST","/v1/accounts:signInWithIdp",yn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nE="http://localhost";class Qn extends lu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Qn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new Qn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Vr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vr(e,t)}buildRequest(){const e={requestUri:nE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ti(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rE(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function sE(n){const e=Bs(qs(n)).link,t=e?Bs(qs(e)).deep_link_id:null,r=Bs(qs(n)).deep_link_id;return(r?Bs(qs(r)).link:null)||r||t||e||n}class hu{constructor(e){const t=Bs(qs(e)),r=t.apiKey??null,s=t.oobCode??null,i=rE(t.mode??null);j(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=sE(e);try{return new hu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(){this.providerId=rs.PROVIDER_ID}static credential(e,t){return oi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=hu.parseLink(t);return j(r,"argument-error"),oi._fromEmailAndCode(e,r.code,r.tenantId)}}rs.PROVIDER_ID="password";rs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";rs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends du{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends vi{constructor(){super("facebook.com")}static credential(e){return Qn._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qt.credential(e.oauthAccessToken)}catch{return null}}}Qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt extends vi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Qn._fromParams({providerId:Jt.PROVIDER_ID,signInMethod:Jt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Jt.credentialFromTaggedObject(e)}static credentialFromError(e){return Jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Jt.credential(t,r)}catch{return null}}}Jt.GOOGLE_SIGN_IN_METHOD="google.com";Jt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt extends vi{constructor(){super("github.com")}static credential(e){return Qn._fromParams({providerId:Yt.PROVIDER_ID,signInMethod:Yt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yt.credentialFromTaggedObject(e)}static credentialFromError(e){return Yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yt.credential(e.oauthAccessToken)}catch{return null}}}Yt.GITHUB_SIGN_IN_METHOD="github.com";Yt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt extends vi{constructor(){super("twitter.com")}static credential(e,t){return Qn._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Xt.credential(t,r)}catch{return null}}}Xt.TWITTER_SIGN_IN_METHOD="twitter.com";Xt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iE(n,e){return wi(n,"POST","/v1/accounts:signUp",yn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await st._fromIdTokenResponse(e,r,s),o=Qh(r);return new Jn({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Qh(r);return new Jn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Qh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No extends Et{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,No.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new No(e,t,r,s)}}function yp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?No._fromErrorAndOperation(n,i,e,r):i})}async function oE(n,e,t=!1){const r=await xr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Jn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aE(n,e,t=!1){const{auth:r}=n;if(je(r.app))return Promise.reject(St(r));const s="reauthenticate";try{const i=await xr(n,yp(r,s,e,n),t);j(i.idToken,r,"internal-error");const o=cu(i.idToken);j(o,r,"internal-error");const{sub:c}=o;return j(n.uid===c,r,"user-mismatch"),Jn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&nt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ip(n,e,t=!1){if(je(n.app))return Promise.reject(St(n));const r="signIn",s=await yp(n,r,e),i=await Jn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function cE(n,e){return Ip(In(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tp(n){const e=In(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function zP(n,e,t){if(je(n.app))return Promise.reject(St(n));const r=In(n),o=await Ac(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",iE).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Tp(n),u}),c=await Jn._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function jP(n,e,t){return je(n.app)?Promise.reject(St(n)):cE(ee(n),rs.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Tp(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uE(n,e){return xt(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $P(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=ee(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await xr(r,uE(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function lE(n,e,t,r){return ee(n).onIdTokenChanged(e,t,r)}function hE(n,e,t){return ee(n).beforeAuthStateChanged(e,t)}function GP(n,e,t,r){return ee(n).onAuthStateChanged(e,t,r)}function KP(n){return ee(n).signOut()}const xo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xo,"1"),this.storage.removeItem(xo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dE=1e3,fE=10;class wp extends Ep{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);NT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,fE):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},dE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}wp.type="LOCAL";const pE=wp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp extends Ep{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}vp.type="SESSION";const Ap=vp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mE(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ta(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async l=>l(t.origin,i)),u=await mE(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ta.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const l=fu("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(){return window}function _E(n){_t().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(){return typeof _t().WorkerGlobalScope<"u"&&typeof _t().importScripts=="function"}async function yE(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function IE(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function TE(){return Rp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="firebaseLocalStorageDb",EE=1,Oo="firebaseLocalStorage",Sp="fbase_key";class Ai{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function na(n,e){return n.transaction([Oo],e?"readwrite":"readonly").objectStore(Oo)}function wE(){const n=indexedDB.deleteDatabase(bp);return new Ai(n).toPromise()}function Rc(){const n=indexedDB.open(bp,EE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Oo,{keyPath:Sp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Oo)?e(r):(r.close(),await wE(),e(await Rc()))})})}async function Jh(n,e,t){const r=na(n,!0).put({[Sp]:e,value:t});return new Ai(r).toPromise()}async function vE(n,e){const t=na(n,!1).get(e),r=await new Ai(t).toPromise();return r===void 0?null:r.value}function Yh(n,e){const t=na(n,!0).delete(e);return new Ai(t).toPromise()}const AE=800,RE=3;class Pp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Rc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>RE)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Rp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ta._getInstance(TE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await yE(),!this.activeServiceWorker)return;this.sender=new gE(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||IE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Rc();return await Jh(e,xo,"1"),await Yh(e,xo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Jh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>vE(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Yh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=na(s,!1).getAll();return new Ai(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),AE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pp.type="LOCAL";const bE=Pp;new Ei(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cp(n,e){return e?At(e):(j(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu extends lu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function SE(n){return Ip(n.auth,new pu(n),n.bypassAuthState)}function PE(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),aE(t,new pu(n),n.bypassAuthState)}async function CE(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),oE(t,new pu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return SE;case"linkViaPopup":case"linkViaRedirect":return CE;case"reauthViaPopup":case"reauthViaRedirect":return PE;default:nt(this.auth,"internal-error")}}resolve(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VE=new Ei(2e3,1e4);async function HP(n,e,t){if(je(n.app))return Promise.reject(ot(n,"operation-not-supported-in-this-environment"));const r=In(n);fT(n,e,du);const s=Cp(r,t);return new zn(r,"signInViaPopup",e,s).executeNotNull()}class zn extends Vp{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,zn.currentPopupAction&&zn.currentPopupAction.cancel(),zn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return j(e,this.auth,"internal-error"),e}async onExecution(){Vt(this.filter.length===1,"Popup operations only handle one event");const e=fu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ot(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ot(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ot(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,VE.get())};e()}}zn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE="pendingRedirect",go=new Map;class DE extends Vp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=go.get(this.auth._key());if(!e){try{const r=await NE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}go.set(this.auth._key(),e)}return this.bypassAuthState||go.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function NE(n,e){const t=ME(e),r=OE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function xE(n,e){go.set(n._key(),e)}function OE(n){return At(n._redirectPersistence)}function ME(n){return mo(kE,n.config.apiKey,n.name)}async function LE(n,e,t=!1){if(je(n.app))return Promise.reject(St(n));const r=In(n),s=Cp(r,e),o=await new DE(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FE=600*1e3;class UE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!BE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!kp(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(ot(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=FE&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xh(e))}saveEventToCache(e){this.cachedEventUids.add(Xh(e)),this.lastProcessedEventTime=Date.now()}}function Xh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function kp({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function BE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return kp(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qE(n,e={}){return xt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,jE=/^https?/;async function $E(n){if(n.config.emulator)return;const{authorizedDomains:e}=await qE(n);for(const t of e)try{if(GE(t))return}catch{}nt(n,"unauthorized-domain")}function GE(n){const e=wc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!jE.test(t))return!1;if(zE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE=new Ei(3e4,6e4);function Zh(){const n=_t().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function HE(n){return new Promise((e,t)=>{var s,i,o;function r(){Zh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Zh(),t(ot(n,"network-request-failed"))},timeout:KE.get()})}if((i=(s=_t().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=_t().gapi)!=null&&o.load)r();else{const c=zT("iframefcb");return _t()[c]=()=>{gapi.load?r():t(ot(n,"network-request-failed"))},mp(`${qT()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw _o=null,e})}let _o=null;function WE(n){return _o=_o||HE(n),_o}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QE=new Ei(5e3,15e3),JE="__/auth/iframe",YE="emulator/auth/iframe",XE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ZE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ew(n){const e=n.config;j(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?au(e,YE):`https://${n.config.authDomain}/${JE}`,r={apiKey:e.apiKey,appName:n.name,v:ar},s=ZE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Ti(r).slice(1)}`}async function tw(n){const e=await WE(n),t=_t().gapi;return j(t,n,"internal-error"),e.open({where:document.body,url:ew(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:XE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=ot(n,"network-request-failed"),c=_t().setTimeout(()=>{i(o)},QE.get());function u(){_t().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},rw=500,sw=600,iw="_blank",ow="http://localhost";class ed{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function aw(n,e,t,r=rw,s=sw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...nw,width:r.toString(),height:s.toString(),top:i,left:o},l=Ae().toLowerCase();t&&(c=cp(l)?iw:t),op(l)&&(e=e||ow,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[E,C])=>`${g}${E}=${C},`,"");if(DT(l)&&c!=="_self")return cw(e||"",c),new ed(null);const p=window.open(e||"",c,f);j(p,n,"popup-blocked");try{p.focus()}catch{}return new ed(p)}function cw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uw="__/auth/handler",lw="emulator/auth/handler",hw=encodeURIComponent("fac");async function td(n,e,t,r,s,i){j(n.config.authDomain,n,"auth-domain-config-required"),j(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ar,eventId:s};if(e instanceof du){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Hy(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof vi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),l=u?`#${hw}=${encodeURIComponent(u)}`:"";return`${dw(n)}?${Ti(c).slice(1)}${l}`}function dw({config:n}){return n.emulator?au(n,lw):`https://${n.authDomain}/${uw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic="webStorageSupport";class fw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ap,this._completeRedirectFn=LE,this._overrideRedirectResult=xE}async _openPopup(e,t,r,s){var o;Vt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await td(e,t,r,wc(),s);return aw(e,i,fu())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await td(e,t,r,wc(),s);return _E(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Vt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await tw(e),r=new UE(e);return t.register("authEvent",s=>(j(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ic,{type:ic},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[ic];i!==void 0&&t(!!i),nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=$E(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fp()||ap()||uu()}}const pw=fw;var nd="@firebase/auth",rd="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function _w(n){Wn(new cn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pp(n)},l=new FT(r,s,i,u);return WT(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Wn(new cn("auth-internal",e=>{const t=In(e.getProvider("auth").getImmediate());return(r=>new mw(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),gt(nd,rd,gw(n)),gt(nd,rd,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yw=300,Iw=jf("authIdTokenMaxAge")||yw;let sd=null;const Tw=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Iw)return;const s=t==null?void 0:t.token;sd!==s&&(sd=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function WP(n=su()){const e=ns(n,"auth");if(e.isInitialized())return e.getImmediate();const t=HT(n,{popupRedirectResolver:pw,persistence:[bE,pE,Ap]}),r=jf("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Tw(i.toString());hE(t,o,()=>o(t.currentUser)),lE(t,c=>o(c))}}const s=Bf("auth");return s&&QT(t,`http://${s}`),t}function Ew(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}UT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=ot("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Ew().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});_w("Browser");var id=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var on,Dp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function I(){}I.prototype=_.prototype,T.F=_.prototype,T.prototype=new I,T.prototype.constructor=T,T.D=function(v,w,S){for(var y=Array(arguments.length-2),qe=2;qe<arguments.length;qe++)y[qe-2]=arguments[qe];return _.prototype[w].apply(v,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,_,I){I||(I=0);const v=Array(16);if(typeof _=="string")for(var w=0;w<16;++w)v[w]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(w=0;w<16;++w)v[w]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=T.g[0],I=T.g[1],w=T.g[2];let S=T.g[3],y;y=_+(S^I&(w^S))+v[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[1]+3905402710&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[2]+606105819&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[3]+3250441966&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(S^I&(w^S))+v[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[5]+1200080426&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[6]+2821735955&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[7]+4249261313&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(S^I&(w^S))+v[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[9]+2336552879&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[10]+4294925233&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[11]+2304563134&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(S^I&(w^S))+v[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(w^_&(I^w))+v[13]+4254626195&4294967295,S=_+(y<<12&4294967295|y>>>20),y=w+(I^S&(_^I))+v[14]+2792965006&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(_^w&(S^_))+v[15]+1236535329&4294967295,I=w+(y<<22&4294967295|y>>>10),y=_+(w^S&(I^w))+v[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[6]+3225465664&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[11]+643717713&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[0]+3921069994&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^S&(I^w))+v[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[10]+38016083&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[15]+3634488961&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[4]+3889429448&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^S&(I^w))+v[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[14]+3275163606&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[3]+4107603335&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[8]+1163531501&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(w^S&(I^w))+v[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(_^I))+v[2]+4243563512&4294967295,S=_+(y<<9&4294967295|y>>>23),y=w+(_^I&(S^_))+v[7]+1735328473&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(w^S))+v[12]+2368359562&4294967295,I=w+(y<<20&4294967295|y>>>12),y=_+(I^w^S)+v[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[8]+2272392833&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[11]+1839030562&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[14]+4259657740&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^S)+v[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[4]+1272893353&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[7]+4139469664&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[10]+3200236656&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^S)+v[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[0]+3936430074&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[3]+3572445317&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[6]+76029189&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(I^w^S)+v[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^w)+v[12]+3873151461&4294967295,S=_+(y<<11&4294967295|y>>>21),y=w+(S^_^I)+v[15]+530742520&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^_)+v[2]+3299628645&4294967295,I=w+(y<<23&4294967295|y>>>9),y=_+(w^(I|~S))+v[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[7]+1126891415&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[14]+2878612391&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[5]+4237533241&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~S))+v[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[3]+2399980690&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[10]+4293915773&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[1]+2240044497&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~S))+v[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[15]+4264355552&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[6]+2734768916&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[13]+1309151649&4294967295,I=w+(y<<21&4294967295|y>>>11),y=_+(w^(I|~S))+v[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~w))+v[11]+3174756917&4294967295,S=_+(y<<10&4294967295|y>>>22),y=w+(_^(S|~I))+v[2]+718787259&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~_))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+S&4294967295}r.prototype.v=function(T,_){_===void 0&&(_=T.length);const I=_-this.blockSize,v=this.C;let w=this.h,S=0;for(;S<_;){if(w==0)for(;S<=I;)s(this,T,S),S+=this.blockSize;if(typeof T=="string"){for(;S<_;)if(v[w++]=T.charCodeAt(S++),w==this.blockSize){s(this,v),w=0;break}}else for(;S<_;)if(v[w++]=T[S++],w==this.blockSize){s(this,v),w=0;break}}this.h=w,this.o+=_},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;_=this.o*8;for(var I=T.length-8;I<T.length;++I)T[I]=_&255,_/=256;for(this.v(T),T=Array(16),_=0,I=0;I<4;++I)for(let v=0;v<32;v+=8)T[_++]=this.g[I]>>>v&255;return T};function i(T,_){var I=c;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=_(T)}function o(T,_){this.h=_;const I=[];let v=!0;for(let w=T.length-1;w>=0;w--){const S=T[w]|0;v&&S==_||(I[w]=S,v=!1)}this.g=I}var c={};function u(T){return-128<=T&&T<128?i(T,function(_){return new o([_|0],_<0?-1:0)}):new o([T|0],T<0?-1:0)}function l(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return V(l(-T));const _=[];let I=1;for(let v=0;T>=I;v++)_[v]=T/I|0,I*=4294967296;return new o(_,0)}function f(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return V(f(T.substring(1),_));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=l(Math.pow(_,8));let v=p;for(let S=0;S<T.length;S+=8){var w=Math.min(8,T.length-S);const y=parseInt(T.substring(S,S+w),_);w<8?(w=l(Math.pow(_,w)),v=v.j(w).add(l(y))):(v=v.j(I),v=v.add(l(y)))}return v}var p=u(0),g=u(1),E=u(16777216);n=o.prototype,n.m=function(){if(k(this))return-V(this).m();let T=0,_=1;for(let I=0;I<this.g.length;I++){const v=this.i(I);T+=(v>=0?v:4294967296+v)*_,_*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(k(this))return"-"+V(this).toString(T);const _=l(Math.pow(T,6));var I=this;let v="";for(;;){const w=G(I,_).g;I=L(I,w.j(_));let S=((I.g.length>0?I.g[0]:I.h)>>>0).toString(T);if(I=w,C(I))return S+v;for(;S.length<6;)S="0"+S;v=S+v}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(let _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function k(T){return T.h==-1}n.l=function(T){return T=L(this,T),k(T)?-1:C(T)?0:1};function V(T){const _=T.g.length,I=[];for(let v=0;v<_;v++)I[v]=~T.g[v];return new o(I,~T.h).add(g)}n.abs=function(){return k(this)?V(this):this},n.add=function(T){const _=Math.max(this.g.length,T.g.length),I=[];let v=0;for(let w=0;w<=_;w++){let S=v+(this.i(w)&65535)+(T.i(w)&65535),y=(S>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);v=y>>>16,S&=65535,y&=65535,I[w]=y<<16|S}return new o(I,I[I.length-1]&-2147483648?-1:0)};function L(T,_){return T.add(V(_))}n.j=function(T){if(C(this)||C(T))return p;if(k(this))return k(T)?V(this).j(V(T)):V(V(this).j(T));if(k(T))return V(this.j(V(T)));if(this.l(E)<0&&T.l(E)<0)return l(this.m()*T.m());const _=this.g.length+T.g.length,I=[];for(var v=0;v<2*_;v++)I[v]=0;for(v=0;v<this.g.length;v++)for(let w=0;w<T.g.length;w++){const S=this.i(v)>>>16,y=this.i(v)&65535,qe=T.i(w)>>>16,Sn=T.i(w)&65535;I[2*v+2*w]+=y*Sn,B(I,2*v+2*w),I[2*v+2*w+1]+=S*Sn,B(I,2*v+2*w+1),I[2*v+2*w+1]+=y*qe,B(I,2*v+2*w+1),I[2*v+2*w+2]+=S*qe,B(I,2*v+2*w+2)}for(T=0;T<_;T++)I[T]=I[2*T+1]<<16|I[2*T];for(T=_;T<2*_;T++)I[T]=0;return new o(I,0)};function B(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function F(T,_){this.g=T,this.h=_}function G(T,_){if(C(_))throw Error("division by zero");if(C(T))return new F(p,p);if(k(T))return _=G(V(T),_),new F(V(_.g),V(_.h));if(k(_))return _=G(T,V(_)),new F(V(_.g),_.h);if(T.g.length>30){if(k(T)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,v=_;v.l(T)<=0;)I=H(I),v=H(v);var w=Q(I,1),S=Q(v,1);for(v=Q(v,2),I=Q(I,2);!C(v);){var y=S.add(v);y.l(T)<=0&&(w=w.add(I),S=y),v=Q(v,1),I=Q(I,1)}return _=L(T,w.j(_)),new F(w,_)}for(w=p;T.l(_)>=0;){for(I=Math.max(1,Math.floor(T.m()/_.m())),v=Math.ceil(Math.log(I)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),S=l(I),y=S.j(_);k(y)||y.l(T)>0;)I-=v,S=l(I),y=S.j(_);C(S)&&(S=g),w=w.add(S),T=L(T,y)}return new F(w,T)}n.B=function(T){return G(this,T).h},n.and=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)&T.i(v);return new o(I,this.h&T.h)},n.or=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)|T.i(v);return new o(I,this.h|T.h)},n.xor=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let v=0;v<_;v++)I[v]=this.i(v)^T.i(v);return new o(I,this.h^T.h)};function H(T){const _=T.g.length+1,I=[];for(let v=0;v<_;v++)I[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(I,T.h)}function Q(T,_){const I=_>>5;_%=32;const v=T.g.length-I,w=[];for(let S=0;S<v;S++)w[S]=_>0?T.i(S+I)>>>_|T.i(S+I+1)<<32-_:T.i(S+I);return new o(w,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Dp=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=f,on=o}).apply(typeof id<"u"?id:typeof self<"u"?self:typeof window<"u"?window:{});var ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Np,zs,xp,yo,bc,Op,Mp,Lp;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ro=="object"&&ro];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var d=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var R=a[m];if(!(R in d))break e;d=d[R]}a=a[a.length-1],m=d[a],h=h(m),h!=m&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var d=[],m;for(m in h)Object.prototype.hasOwnProperty.call(h,m)&&d.push([m,h[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,d){return a.call.apply(a.bind,arguments)}function l(a,h,d){return l=u,l.apply(null,arguments)}function f(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,h){function d(){}d.prototype=h.prototype,a.Z=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(m,R,P){for(var M=Array(arguments.length-2),W=2;W<arguments.length;W++)M[W-2]=arguments[W];return h.prototype[R].apply(m,M)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function E(a){const h=a.length;if(h>0){const d=Array(h);for(let m=0;m<h;m++)d[m]=a[m];return d}return[]}function C(a,h){for(let m=1;m<arguments.length;m++){const R=arguments[m];var d=typeof R;if(d=d!="object"?d:R?Array.isArray(R)?"array":d:"null",d=="array"||d=="object"&&typeof R.length=="number"){d=a.length||0;const P=R.length||0;a.length=d+P;for(let M=0;M<P;M++)a[d+M]=R[M]}else a.push(R)}}class k{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function V(a){o.setTimeout(()=>{throw a},0)}function L(){var a=T;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class B{constructor(){this.h=this.g=null}add(h,d){const m=F.get();m.set(h,d),this.h?this.h.next=m:this.g=m,this.h=m}}var F=new k(()=>new G,a=>a.reset());class G{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let H,Q=!1,T=new B,_=()=>{const a=Promise.resolve(void 0);H=()=>{a.then(I)}};function I(){for(var a;a=L();){try{a.h.call(a.g)}catch(d){V(d)}var h=F;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}Q=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,h),o.removeEventListener("test",d,h)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function qe(a,h){w.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(qe,w),qe.prototype.init=function(a,h){const d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&qe.Z.h.call(this)},qe.prototype.h=function(){qe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Sn="closure_listenable_"+(Math.random()*1e6|0),X_=0;function Z_(a,h,d,m,R){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!m,this.ha=R,this.key=++X_,this.da=this.fa=!1}function qi(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function zi(a,h,d){for(const m in a)h.call(d,a[m],m,a)}function ey(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function Cl(a){const h={};for(const d in a)h[d]=a[d];return h}const Vl="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function kl(a,h){let d,m;for(let R=1;R<arguments.length;R++){m=arguments[R];for(d in m)a[d]=m[d];for(let P=0;P<Vl.length;P++)d=Vl[P],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function ji(a){this.src=a,this.g={},this.h=0}ji.prototype.add=function(a,h,d,m,R){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const M=Va(a,h,m,R);return M>-1?(h=a[M],d||(h.fa=!1)):(h=new Z_(h,this.src,P,!!m,R),h.fa=d,a.push(h)),h};function Ca(a,h){const d=h.type;if(d in a.g){var m=a.g[d],R=Array.prototype.indexOf.call(m,h,void 0),P;(P=R>=0)&&Array.prototype.splice.call(m,R,1),P&&(qi(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Va(a,h,d,m){for(let R=0;R<a.length;++R){const P=a[R];if(!P.da&&P.listener==h&&P.capture==!!d&&P.ha==m)return R}return-1}var ka="closure_lm_"+(Math.random()*1e6|0),Da={};function Dl(a,h,d,m,R){if(Array.isArray(h)){for(let P=0;P<h.length;P++)Dl(a,h[P],d,m,R);return null}return d=Ol(d),a&&a[Sn]?a.J(h,d,c(m)?!!m.capture:!1,R):ty(a,h,d,!1,m,R)}function ty(a,h,d,m,R,P){if(!h)throw Error("Invalid event type");const M=c(R)?!!R.capture:!!R;let W=xa(a);if(W||(a[ka]=W=new ji(a)),d=W.add(h,d,m,M,P),d.proxy)return d;if(m=ny(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)S||(R=M),R===void 0&&(R=!1),a.addEventListener(h.toString(),m,R);else if(a.attachEvent)a.attachEvent(xl(h.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function ny(){function a(d){return h.call(a.src,a.listener,d)}const h=ry;return a}function Nl(a,h,d,m,R){if(Array.isArray(h))for(var P=0;P<h.length;P++)Nl(a,h[P],d,m,R);else m=c(m)?!!m.capture:!!m,d=Ol(d),a&&a[Sn]?(a=a.i,P=String(h).toString(),P in a.g&&(h=a.g[P],d=Va(h,d,m,R),d>-1&&(qi(h[d]),Array.prototype.splice.call(h,d,1),h.length==0&&(delete a.g[P],a.h--)))):a&&(a=xa(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Va(h,d,m,R)),(d=a>-1?h[a]:null)&&Na(d))}function Na(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Sn])Ca(h.i,a);else{var d=a.type,m=a.proxy;h.removeEventListener?h.removeEventListener(d,m,a.capture):h.detachEvent?h.detachEvent(xl(d),m):h.addListener&&h.removeListener&&h.removeListener(m),(d=xa(h))?(Ca(d,a),d.h==0&&(d.src=null,h[ka]=null)):qi(a)}}}function xl(a){return a in Da?Da[a]:Da[a]="on"+a}function ry(a,h){if(a.da)a=!0;else{h=new qe(h,this);const d=a.listener,m=a.ha||a.src;a.fa&&Na(a),a=d.call(m,h)}return a}function xa(a){return a=a[ka],a instanceof ji?a:null}var Oa="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ol(a){return typeof a=="function"?a:(a[Oa]||(a[Oa]=function(h){return a.handleEvent(h)}),a[Oa])}function Ne(){v.call(this),this.i=new ji(this),this.M=this,this.G=null}p(Ne,v),Ne.prototype[Sn]=!0,Ne.prototype.removeEventListener=function(a,h,d,m){Nl(this,a,h,d,m)};function Fe(a,h){var d,m=a.G;if(m)for(d=[];m;m=m.G)d.push(m);if(a=a.M,m=h.type||h,typeof h=="string")h=new w(h,a);else if(h instanceof w)h.target=h.target||a;else{var R=h;h=new w(m,a),kl(h,R)}R=!0;let P,M;if(d)for(M=d.length-1;M>=0;M--)P=h.g=d[M],R=$i(P,m,!0,h)&&R;if(P=h.g=a,R=$i(P,m,!0,h)&&R,R=$i(P,m,!1,h)&&R,d)for(M=0;M<d.length;M++)P=h.g=d[M],R=$i(P,m,!1,h)&&R}Ne.prototype.N=function(){if(Ne.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const d=a.g[h];for(let m=0;m<d.length;m++)qi(d[m]);delete a.g[h],a.h--}}this.G=null},Ne.prototype.J=function(a,h,d,m){return this.i.add(String(a),h,!1,d,m)},Ne.prototype.K=function(a,h,d,m){return this.i.add(String(a),h,!0,d,m)};function $i(a,h,d,m){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let R=!0;for(let P=0;P<h.length;++P){const M=h[P];if(M&&!M.da&&M.capture==d){const W=M.listener,ve=M.ha||M.src;M.fa&&Ca(a.i,M),R=W.call(ve,m)!==!1&&R}}return R&&!m.defaultPrevented}function sy(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Ml(a){a.g=sy(()=>{a.g=null,a.i&&(a.i=!1,Ml(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class iy extends v{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Ml(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function _s(a){v.call(this),this.h=a,this.g={}}p(_s,v);var Ll=[];function Fl(a){zi(a.g,function(h,d){this.g.hasOwnProperty(d)&&Na(h)},a),a.g={}}_s.prototype.N=function(){_s.Z.N.call(this),Fl(this)},_s.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ma=o.JSON.stringify,oy=o.JSON.parse,ay=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Ul(){}function Bl(){}var ys={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function La(){w.call(this,"d")}p(La,w);function Fa(){w.call(this,"c")}p(Fa,w);var Pn={},ql=null;function Gi(){return ql=ql||new Ne}Pn.Ia="serverreachability";function zl(a){w.call(this,Pn.Ia,a)}p(zl,w);function Is(a){const h=Gi();Fe(h,new zl(h))}Pn.STAT_EVENT="statevent";function jl(a,h){w.call(this,Pn.STAT_EVENT,a),this.stat=h}p(jl,w);function Ue(a){const h=Gi();Fe(h,new jl(h,a))}Pn.Ja="timingevent";function $l(a,h){w.call(this,Pn.Ja,a),this.size=h}p($l,w);function Ts(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Es(){this.g=!0}Es.prototype.ua=function(){this.g=!1};function cy(a,h,d,m,R,P){a.info(function(){if(a.g)if(P){var M="",W=P.split("&");for(let ae=0;ae<W.length;ae++){var ve=W[ae].split("=");if(ve.length>1){const Se=ve[0];ve=ve[1];const ht=Se.split("_");M=ht.length>=2&&ht[1]=="type"?M+(Se+"="+ve+"&"):M+(Se+"=redacted&")}}}else M=null;else M=P;return"XMLHTTP REQ ("+m+") [attempt "+R+"]: "+h+`
`+d+`
`+M})}function uy(a,h,d,m,R,P,M){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+R+"]: "+h+`
`+d+`
`+P+" "+M})}function pr(a,h,d,m){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+hy(a,d)+(m?" "+m:"")})}function ly(a,h){a.info(function(){return"TIMEOUT: "+h})}Es.prototype.info=function(){};function hy(a,h){if(!a.g)return h;if(!h)return null;try{const P=JSON.parse(h);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var d=P[a];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var R=m[0];if(R!="noop"&&R!="stop"&&R!="close")for(let M=1;M<m.length;M++)m[M]=""}}}}return Ma(P)}catch{return h}}var Ki={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Gl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Kl;function Ua(){}p(Ua,Ul),Ua.prototype.g=function(){return new XMLHttpRequest},Kl=new Ua;function ws(a){return encodeURIComponent(String(a))}function dy(a){var h=1;a=a.split(":");const d=[];for(;h>0&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function Ut(a,h,d,m){this.j=a,this.i=h,this.l=d,this.S=m||1,this.V=new _s(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Hl}function Hl(){this.i=null,this.g="",this.h=!1}var Wl={},Ba={};function qa(a,h,d){a.M=1,a.A=Wi(lt(h)),a.u=d,a.R=!0,Ql(a,null)}function Ql(a,h){a.F=Date.now(),Hi(a),a.B=lt(a.A);var d=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),ch(d.i,"t",m),a.C=0,d=a.j.L,a.h=new Hl,a.g=bh(a.j,d?h:null,!a.u),a.P>0&&(a.O=new iy(l(a.Y,a,a.g),a.P)),h=a.V,d=a.g,m=a.ba;var R="readystatechange";Array.isArray(R)||(R&&(Ll[0]=R.toString()),R=Ll);for(let P=0;P<R.length;P++){const M=Dl(d,R[P],m||h.handleEvent,!1,h.h||h);if(!M)break;h.g[M.key]=M}h=a.J?Cl(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Is(),cy(a.i,a.v,a.B,a.l,a.S,a.u)}Ut.prototype.ba=function(a){a=a.target;const h=this.O;h&&zt(a)==3?h.j():this.Y(a)},Ut.prototype.Y=function(a){try{if(a==this.g)e:{const W=zt(this.g),ve=this.g.ya(),ae=this.g.ca();if(!(W<3)&&(W!=3||this.g&&(this.h.h||this.g.la()||mh(this.g)))){this.K||W!=4||ve==7||(ve==8||ae<=0?Is(3):Is(2)),za(this);var h=this.g.ca();this.X=h;var d=fy(this);if(this.o=h==200,uy(this.i,this.v,this.B,this.l,this.S,W,h),this.o){if(this.U&&!this.L){t:{if(this.g){var m,R=this.g;if((m=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var P=m;break t}}P=null}if(a=P)pr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ja(this,a);else{this.o=!1,this.m=3,Ue(12),Cn(this),vs(this);break e}}if(this.R){a=!0;let Se;for(;!this.K&&this.C<d.length;)if(Se=py(this,d),Se==Ba){W==4&&(this.m=4,Ue(14),a=!1),pr(this.i,this.l,null,"[Incomplete Response]");break}else if(Se==Wl){this.m=4,Ue(15),pr(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else pr(this.i,this.l,Se,null),ja(this,Se);if(Jl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),W!=4||d.length!=0||this.h.h||(this.m=1,Ue(16),a=!1),this.o=this.o&&a,!a)pr(this.i,this.l,d,"[Invalid Chunked Response]"),Cn(this),vs(this);else if(d.length>0&&!this.W){this.W=!0;var M=this.j;M.g==this&&M.aa&&!M.P&&(M.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Ya(M),M.P=!0,Ue(11))}}else pr(this.i,this.l,d,null),ja(this,d);W==4&&Cn(this),this.o&&!this.K&&(W==4?wh(this.j,this):(this.o=!1,Hi(this)))}else Py(this.g),h==400&&d.indexOf("Unknown SID")>0?(this.m=3,Ue(12)):(this.m=0,Ue(13)),Cn(this),vs(this)}}}catch{}finally{}};function fy(a){if(!Jl(a))return a.g.la();const h=mh(a.g);if(h==="")return"";let d="";const m=h.length,R=zt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Cn(a),vs(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<m;P++)a.h.h=!0,d+=a.h.i.decode(h[P],{stream:!(R&&P==m-1)});return h.length=0,a.h.g+=d,a.C=0,a.h.g}function Jl(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function py(a,h){var d=a.C,m=h.indexOf(`
`,d);return m==-1?Ba:(d=Number(h.substring(d,m)),isNaN(d)?Wl:(m+=1,m+d>h.length?Ba:(h=h.slice(m,m+d),a.C=m+d,h)))}Ut.prototype.cancel=function(){this.K=!0,Cn(this)};function Hi(a){a.T=Date.now()+a.H,Yl(a,a.H)}function Yl(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Ts(l(a.aa,a),h)}function za(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Ut.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(ly(this.i,this.B),this.M!=2&&(Is(),Ue(17)),Cn(this),this.m=2,vs(this)):Yl(this,this.T-a)};function vs(a){a.j.I==0||a.K||wh(a.j,a)}function Cn(a){za(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Fl(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function ja(a,h){try{var d=a.j;if(d.I!=0&&(d.g==a||$a(d.h,a))){if(!a.L&&$a(d.h,a)&&d.I==3){try{var m=d.Ba.g.parse(h)}catch{m=null}if(Array.isArray(m)&&m.length==3){var R=m;if(R[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Zi(d),Yi(d);else break e;Ja(d),Ue(18)}}else d.xa=R[1],0<d.xa-d.K&&R[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Ts(l(d.Va,d),6e3));eh(d.h)<=1&&d.ta&&(d.ta=void 0)}else kn(d,11)}else if((a.L||d.g==a)&&Zi(d),!y(h))for(R=d.Ba.g.parse(h),h=0;h<R.length;h++){let ae=R[h];const Se=ae[0];if(!(Se<=d.K))if(d.K=Se,ae=ae[1],d.I==2)if(ae[0]=="c"){d.M=ae[1],d.ba=ae[2];const ht=ae[3];ht!=null&&(d.ka=ht,d.j.info("VER="+d.ka));const Dn=ae[4];Dn!=null&&(d.za=Dn,d.j.info("SVER="+d.za));const jt=ae[5];jt!=null&&typeof jt=="number"&&jt>0&&(m=1.5*jt,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const $t=a.g;if($t){const to=$t.g?$t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(to){var P=m.h;P.g||to.indexOf("spdy")==-1&&to.indexOf("quic")==-1&&to.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Ga(P,P.h),P.h=null))}if(m.G){const Xa=$t.g?$t.g.getResponseHeader("X-HTTP-Session-Id"):null;Xa&&(m.wa=Xa,ue(m.J,m.G,Xa))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var M=a;if(m.na=Rh(m,m.L?m.ba:null,m.W),M.L){th(m.h,M);var W=M,ve=m.O;ve&&(W.H=ve),W.D&&(za(W),Hi(W)),m.g=M}else Th(m);d.i.length>0&&Xi(d)}else ae[0]!="stop"&&ae[0]!="close"||kn(d,7);else d.I==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?kn(d,7):Qa(d):ae[0]!="noop"&&d.l&&d.l.qa(ae),d.A=0)}}Is(4)}catch{}}var my=class{constructor(a,h){this.g=a,this.map=h}};function Xl(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Zl(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function eh(a){return a.h?1:a.g?a.g.size:0}function $a(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Ga(a,h){a.g?a.g.add(h):a.h=h}function th(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Xl.prototype.cancel=function(){if(this.i=nh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function nh(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.G);return h}return E(a.i)}var rh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function gy(a,h){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const m=a[d].indexOf("=");let R,P=null;m>=0?(R=a[d].substring(0,m),P=a[d].substring(m+1)):R=a[d],h(R,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Bt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof Bt?(this.l=a.l,As(this,a.j),this.o=a.o,this.g=a.g,Rs(this,a.u),this.h=a.h,Ka(this,uh(a.i)),this.m=a.m):a&&(h=String(a).match(rh))?(this.l=!1,As(this,h[1]||"",!0),this.o=bs(h[2]||""),this.g=bs(h[3]||"",!0),Rs(this,h[4]),this.h=bs(h[5]||"",!0),Ka(this,h[6]||"",!0),this.m=bs(h[7]||"")):(this.l=!1,this.i=new Ps(null,this.l))}Bt.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Ss(h,sh,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Ss(h,sh,!0),"@"),a.push(ws(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Ss(d,d.charAt(0)=="/"?Iy:yy,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Ss(d,Ey)),a.join("")},Bt.prototype.resolve=function(a){const h=lt(this);let d=!!a.j;d?As(h,a.j):d=!!a.o,d?h.o=a.o:d=!!a.g,d?h.g=a.g:d=a.u!=null;var m=a.h;if(d)Rs(h,a.u);else if(d=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var R=h.h.lastIndexOf("/");R!=-1&&(m=h.h.slice(0,R+1)+m)}if(R=m,R==".."||R==".")m="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){m=R.lastIndexOf("/",0)==0,R=R.split("/");const P=[];for(let M=0;M<R.length;){const W=R[M++];W=="."?m&&M==R.length&&P.push(""):W==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),m&&M==R.length&&P.push("")):(P.push(W),m=!0)}m=P.join("/")}else m=R}return d?h.h=m:d=a.i.toString()!=="",d?Ka(h,uh(a.i)):d=!!a.m,d&&(h.m=a.m),h};function lt(a){return new Bt(a)}function As(a,h,d){a.j=d?bs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Rs(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Ka(a,h,d){h instanceof Ps?(a.i=h,wy(a.i,a.l)):(d||(h=Ss(h,Ty)),a.i=new Ps(h,a.l))}function ue(a,h,d){a.i.set(h,d)}function Wi(a){return ue(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function bs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ss(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,_y),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function _y(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var sh=/[#\/\?@]/g,yy=/[#\?:]/g,Iy=/[#\?]/g,Ty=/[#\?@]/g,Ey=/#/g;function Ps(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Vn(a){a.g||(a.g=new Map,a.h=0,a.i&&gy(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}n=Ps.prototype,n.add=function(a,h){Vn(this),this.i=null,a=mr(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function ih(a,h){Vn(a),h=mr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function oh(a,h){return Vn(a),h=mr(a,h),a.g.has(h)}n.forEach=function(a,h){Vn(this),this.g.forEach(function(d,m){d.forEach(function(R){a.call(h,R,m,this)},this)},this)};function ah(a,h){Vn(a);let d=[];if(typeof h=="string")oh(a,h)&&(d=d.concat(a.g.get(mr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)d=d.concat(a[h]);return d}n.set=function(a,h){return Vn(this),this.i=null,a=mr(this,a),oh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=ah(this,a),a.length>0?String(a[0]):h):h};function ch(a,h,d){ih(a,h),d.length>0&&(a.i=null,a.g.set(mr(a,h),E(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let m=0;m<h.length;m++){var d=h[m];const R=ws(d);d=ah(this,d);for(let P=0;P<d.length;P++){let M=R;d[P]!==""&&(M+="="+ws(d[P])),a.push(M)}}return this.i=a.join("&")};function uh(a){const h=new Ps;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function mr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function wy(a,h){h&&!a.j&&(Vn(a),a.i=null,a.g.forEach(function(d,m){const R=m.toLowerCase();m!=R&&(ih(this,m),ch(this,R,d))},a)),a.j=h}function vy(a,h){const d=new Es;if(o.Image){const m=new Image;m.onload=f(qt,d,"TestLoadImage: loaded",!0,h,m),m.onerror=f(qt,d,"TestLoadImage: error",!1,h,m),m.onabort=f(qt,d,"TestLoadImage: abort",!1,h,m),m.ontimeout=f(qt,d,"TestLoadImage: timeout",!1,h,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else h(!1)}function Ay(a,h){const d=new Es,m=new AbortController,R=setTimeout(()=>{m.abort(),qt(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:m.signal}).then(P=>{clearTimeout(R),P.ok?qt(d,"TestPingServer: ok",!0,h):qt(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),qt(d,"TestPingServer: error",!1,h)})}function qt(a,h,d,m,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),m(d)}catch{}}function Ry(){this.g=new ay}function Ha(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Ha,Ul),Ha.prototype.g=function(){return new Qi(this.i,this.h)};function Qi(a,h){Ne.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Qi,Ne),n=Qi.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Vs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Cs(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Vs(this)),this.g&&(this.readyState=3,Vs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;lh(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function lh(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Cs(this):Vs(this),this.readyState==3&&lh(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Cs(this))},n.Na=function(a){this.g&&(this.response=a,Cs(this))},n.ga=function(){this.g&&Cs(this)};function Cs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Vs(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Vs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Qi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function hh(a){let h="";return zi(a,function(d,m){h+=m,h+=":",h+=d,h+=`\r
`}),h}function Wa(a,h,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=hh(d),typeof a=="string"?d!=null&&ws(d):ue(a,h,d))}function ye(a){Ne.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ye,Ne);var by=/^https?$/i,Sy=["POST","PUT"];n=ye.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Kl.g(),this.g.onreadystatechange=g(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){dh(this,P);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var R in m)d.set(R,m[R]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())d.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Sy,h,void 0)>=0)||m||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,M]of d)this.g.setRequestHeader(P,M);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){dh(this,P)}};function dh(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,fh(a),Ji(a)}function fh(a){a.A||(a.A=!0,Fe(a,"complete"),Fe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Fe(this,"complete"),Fe(this,"abort"),Ji(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ji(this,!0)),ye.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?ph(this):this.Xa())},n.Xa=function(){ph(this)};function ph(a){if(a.h&&typeof i<"u"){if(a.v&&zt(a)==4)setTimeout(a.Ca.bind(a),0);else if(Fe(a,"readystatechange"),zt(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var m;if(m=P===0){let M=String(a.D).match(rh)[1]||null;!M&&o.self&&o.self.location&&(M=o.self.location.protocol.slice(0,-1)),m=!by.test(M?M.toLowerCase():"")}d=m}if(d)Fe(a,"complete"),Fe(a,"success");else{a.o=6;try{var R=zt(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",fh(a)}}finally{Ji(a)}}}}function Ji(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,h||Fe(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function zt(a){return a.g?a.g.readyState:0}n.ca=function(){try{return zt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),oy(h)}};function mh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Py(a){const h={};a=(a.g&&zt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(y(a[m]))continue;var d=dy(a[m]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=h[R]||[];h[R]=P,P.push(d)}ey(h,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ks(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function gh(a){this.za=0,this.i=[],this.j=new Es,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ks("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ks("baseRetryDelayMs",5e3,a),this.Za=ks("retryDelaySeedMs",1e4,a),this.Ta=ks("forwardChannelMaxRetries",2,a),this.va=ks("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Xl(a&&a.concurrentRequestLimit),this.Ba=new Ry,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=gh.prototype,n.ka=8,n.I=1,n.connect=function(a,h,d,m){Ue(0),this.W=a,this.H=h||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=Rh(this,null,this.W),Xi(this)};function Qa(a){if(_h(a),a.I==3){var h=a.V++,d=lt(a.J);if(ue(d,"SID",a.M),ue(d,"RID",h),ue(d,"TYPE","terminate"),Ds(a,d),h=new Ut(a,a.j,h),h.M=2,h.A=Wi(lt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=h.A,d=!0),d||(h.g=bh(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Hi(h)}Ah(a)}function Yi(a){a.g&&(Ya(a),a.g.cancel(),a.g=null)}function _h(a){Yi(a),a.v&&(o.clearTimeout(a.v),a.v=null),Zi(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Xi(a){if(!Zl(a.h)&&!a.m){a.m=!0;var h=a.Ea;H||_(),Q||(H(),Q=!0),T.add(h,a),a.D=0}}function Cy(a,h){return eh(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Ts(l(a.Ea,a,h),vh(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const R=new Ut(this,this.j,a);let P=this.o;if(this.U&&(P?(P=Cl(P),kl(P,this.U)):P=this.U),this.u!==null||this.R||(R.J=P,P=null),this.S)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(h+=m,h>4096){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=Ih(this,R,h),d=lt(this.J),ue(d,"RID",a),ue(d,"CVER",22),this.G&&ue(d,"X-HTTP-Session-Id",this.G),Ds(this,d),P&&(this.R?h="headers="+ws(hh(P))+"&"+h:this.u&&Wa(d,this.u,P)),Ga(this.h,R),this.Ra&&ue(d,"TYPE","init"),this.S?(ue(d,"$req",h),ue(d,"SID","null"),R.U=!0,qa(R,d,null)):qa(R,d,h),this.I=2}}else this.I==3&&(a?yh(this,a):this.i.length==0||Zl(this.h)||yh(this))};function yh(a,h){var d;h?d=h.l:d=a.V++;const m=lt(a.J);ue(m,"SID",a.M),ue(m,"RID",d),ue(m,"AID",a.K),Ds(a,m),a.u&&a.o&&Wa(m,a.u,a.o),d=new Ut(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Ih(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Ga(a.h,d),qa(d,m,h)}function Ds(a,h){a.H&&zi(a.H,function(d,m){ue(h,m,d)}),a.l&&zi({},function(d,m){ue(h,m,d)})}function Ih(a,h,d){d=Math.min(a.i.length,d);const m=a.l?l(a.l.Ka,a.l,a):null;e:{var R=a.i;let W=-1;for(;;){const ve=["count="+d];W==-1?d>0?(W=R[0].g,ve.push("ofs="+W)):W=0:ve.push("ofs="+W);let ae=!0;for(let Se=0;Se<d;Se++){var P=R[Se].g;const ht=R[Se].map;if(P-=W,P<0)W=Math.max(0,R[Se].g-100),ae=!1;else try{P="req"+P+"_"||"";try{var M=ht instanceof Map?ht:Object.entries(ht);for(const[Dn,jt]of M){let $t=jt;c(jt)&&($t=Ma(jt)),ve.push(P+Dn+"="+encodeURIComponent($t))}}catch(Dn){throw ve.push(P+"type="+encodeURIComponent("_badmap")),Dn}}catch{m&&m(ht)}}if(ae){M=ve.join("&");break e}}M=void 0}return a=a.i.splice(0,d),h.G=a,M}function Th(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;H||_(),Q||(H(),Q=!0),T.add(h,a),a.A=0}}function Ja(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Ts(l(a.Da,a),vh(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Eh(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Ts(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ue(10),Yi(this),Eh(this))};function Ya(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Eh(a){a.g=new Ut(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=lt(a.na);ue(h,"RID","rpc"),ue(h,"SID",a.M),ue(h,"AID",a.K),ue(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&ue(h,"TO",a.ia),ue(h,"TYPE","xmlhttp"),Ds(a,h),a.u&&a.o&&Wa(h,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Wi(lt(h)),d.u=null,d.R=!0,Ql(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Yi(this),Ja(this),Ue(19))};function Zi(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function wh(a,h){var d=null;if(a.g==h){Zi(a),Ya(a),a.g=null;var m=2}else if($a(a.h,h))d=h.G,th(a.h,h),m=1;else return;if(a.I!=0){if(h.o)if(m==1){d=h.u?h.u.length:0,h=Date.now()-h.F;var R=a.D;m=Gi(),Fe(m,new $l(m,d)),Xi(a)}else Th(a);else if(R=h.m,R==3||R==0&&h.X>0||!(m==1&&Cy(a,h)||m==2&&Ja(a)))switch(d&&d.length>0&&(h=a.h,h.i=h.i.concat(d)),R){case 1:kn(a,5);break;case 4:kn(a,10);break;case 3:kn(a,6);break;default:kn(a,2)}}}function vh(a,h){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*h}function kn(a,h){if(a.j.info("Error code "+h),h==2){var d=l(a.bb,a),m=a.Ua;const R=!m;m=new Bt(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||As(m,"https"),Wi(m),R?vy(m.toString(),d):Ay(m.toString(),d)}else Ue(2);a.I=0,a.l&&a.l.pa(h),Ah(a),_h(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Ue(2)):(this.j.info("Failed to ping google.com"),Ue(1))};function Ah(a){if(a.I=0,a.ja=[],a.l){const h=nh(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ja,h),C(a.ja,a.i),a.h.i.length=0,E(a.i),a.i.length=0),a.l.oa()}}function Rh(a,h,d){var m=d instanceof Bt?lt(d):new Bt(d);if(m.g!="")h&&(m.g=h+"."+m.g),Rs(m,m.u);else{var R=o.location;m=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;const P=new Bt(null);m&&As(P,m),h&&(P.g=h),R&&Rs(P,R),d&&(P.h=d),m=P}return d=a.G,h=a.wa,d&&h&&ue(m,d,h),ue(m,"VER",a.ka),Ds(a,m),m}function bh(a,h,d){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new ye(new Ha({ab:d})):new ye(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Sh(){}n=Sh.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function eo(){}eo.prototype.g=function(a,h){return new Ye(a,h)};function Ye(a,h){Ne.call(this),this.g=new gh(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!y(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!y(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new gr(this)}p(Ye,Ne),Ye.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ye.prototype.close=function(){Qa(this.g)},Ye.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Ma(a),a=d);h.i.push(new my(h.Ya++,a)),h.I==3&&Xi(h)},Ye.prototype.N=function(){this.g.l=null,delete this.j,Qa(this.g),delete this.g,Ye.Z.N.call(this)};function Ph(a){La.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(Ph,La);function Ch(){Fa.call(this),this.status=1}p(Ch,Fa);function gr(a){this.g=a}p(gr,Sh),gr.prototype.ra=function(){Fe(this.g,"a")},gr.prototype.qa=function(a){Fe(this.g,new Ph(a))},gr.prototype.pa=function(a){Fe(this.g,new Ch)},gr.prototype.oa=function(){Fe(this.g,"b")},eo.prototype.createWebChannel=eo.prototype.g,Ye.prototype.send=Ye.prototype.o,Ye.prototype.open=Ye.prototype.m,Ye.prototype.close=Ye.prototype.close,Lp=function(){return new eo},Mp=function(){return Gi()},Op=Pn,bc={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ki.NO_ERROR=0,Ki.TIMEOUT=8,Ki.HTTP_ERROR=6,yo=Ki,Gl.COMPLETE="complete",xp=Gl,Bl.EventType=ys,ys.OPEN="a",ys.CLOSE="b",ys.ERROR="c",ys.MESSAGE="d",Ne.prototype.listen=Ne.prototype.J,zs=Bl,ye.prototype.listenOnce=ye.prototype.K,ye.prototype.getLastError=ye.prototype.Ha,ye.prototype.getLastErrorCode=ye.prototype.ya,ye.prototype.getStatus=ye.prototype.ca,ye.prototype.getResponseJson=ye.prototype.La,ye.prototype.getResponseText=ye.prototype.la,ye.prototype.send=ye.prototype.ea,ye.prototype.setWithCredentials=ye.prototype.Fa,Np=ye}).apply(typeof ro<"u"?ro:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ce.UNAUTHENTICATED=new Ce(null),Ce.GOOGLE_CREDENTIALS=new Ce("google-credentials-uid"),Ce.FIRST_PARTY=new Ce("first-party-uid"),Ce.MOCK_USER=new Ce("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss="12.11.0";function ww(n){ss=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=new nu("@firebase/firestore");function Ar(){return un.logLevel}function vw(n){un.setLogLevel(n)}function N(n,...e){if(un.logLevel<=X.DEBUG){const t=e.map(mu);un.debug(`Firestore (${ss}): ${n}`,...t)}}function Ie(n,...e){if(un.logLevel<=X.ERROR){const t=e.map(mu);un.error(`Firestore (${ss}): ${n}`,...t)}}function Je(n,...e){if(un.logLevel<=X.WARN){const t=e.map(mu);un.warn(`Firestore (${ss}): ${n}`,...t)}}function mu(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Fp(n,r,t)}function Fp(n,e,t){let r=`FIRESTORE (${ss}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ie(r),new Error(r)}function q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Fp(e,s,r)}function Aw(n,e){n||U(57014,e)}function O(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Et{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Bp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ce.UNAUTHENTICATED)))}shutdown(){}}class Rw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class bw{constructor(e){this.t=e,this.currentUser=Ce.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new ke;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ke,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ke)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string",31837,{l:r}),new Up(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string",2055,{h:e}),new Ce(e)}}class Sw{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ce.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Pw{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Sw(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ce.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Sc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Cw{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,je(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){q(this.o===void 0,3512);const r=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Sc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Sc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class Vw{getToken(){return Promise.resolve(new Sc(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kw(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=kw(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function $(n,e){return n<e?-1:n>e?1:0}function Pc(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return oc(s)===oc(i)?$(s,i):oc(s)?1:-1}return $(n.length,e.length)}const Dw=55296,Nw=57343;function oc(n){const e=n.charCodeAt(0);return e>=Dw&&e<=Nw}function Or(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}function qp(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc="__name__";class dt{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&U(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return dt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof dt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=dt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return $(e.length,t.length)}static compareSegments(e,t){const r=dt.isNumericId(e),s=dt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?dt.extractNumericId(e).compare(dt.extractNumericId(t)):Pc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return on.fromString(e.substring(4,e.length-2))}}class J extends dt{construct(e,t,r){return new J(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new J(t)}static emptyPath(){return new J([])}}const xw=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends dt{construct(e,t,r){return new he(e,t,r)}static isValidIdentifier(e){return xw.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Cc}static keyField(){return new he([Cc])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new D(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new D(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(J.fromString(e))}static fromName(e){return new x(J.fromString(e).popFirst(5))}static empty(){return new x(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&J.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new J(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(n,e,t){if(!t)throw new D(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function zp(n,e,t,r){if(e===!0&&r===!0)throw new D(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function od(n){if(!x.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ad(n){if(x.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function jp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function sa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function Y(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=sa(n);throw new D(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function $p(n,e){if(e<=0)throw new D(b.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(n,e){const t={typeString:n};return e&&(t.value=e),t}function cr(n,e){if(!jp(n))throw new D(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new D(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd=-62135596800,ud=1e6;class ne{static now(){return ne.fromMillis(Date.now())}static fromDate(e){return ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*ud);return new ne(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<cd)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ud}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(cr(e,ne._jsonSchema))return new ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-cd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ne._jsonSchemaVersion="firestore/timestamp/1.0",ne._jsonSchema={type:we("string",ne._jsonSchemaVersion),seconds:we("number"),nanoseconds:we("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(e){return new z(e)}static min(){return new z(new ne(0,0))}static max(){return new z(new ne(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=-1;class Lr{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function Vc(n){return n.fields.find((e=>e.kind===2))}function On(n){return n.fields.filter((e=>e.kind!==2))}function Ow(n,e){let t=$(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=Mw(n.fields[r],e.fields[r]),t!==0)return t;return $(n.fields.length,e.fields.length)}Lr.UNKNOWN_ID=-1;class $n{constructor(e,t){this.fieldPath=e,this.kind=t}}function Mw(n,e){const t=he.comparator(n.fieldPath,e.fieldPath);return t!==0?t:$(n.kind,e.kind)}class Fr{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Fr(0,tt.min())}}function Gp(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=z.fromTimestamp(r===1e9?new ne(t+1,0):new ne(t,r));return new tt(s,x.empty(),e)}function Kp(n){return new tt(n.readTime,n.key,Mr)}class tt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new tt(z.min(),x.empty(),Mr)}static max(){return new tt(z.max(),x.empty(),Mr)}}function _u(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:$(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Wp{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==Hp)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,r)=>{t(e)}))}static reject(e){return new A(((t,r)=>{r(e)}))}static waitFor(e){return new A(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(u=>r(u)))})),o=!0,i===s&&t()}))}static or(e){let t=A.resolve(!1);for(const r of e)t=t.next((s=>s?A.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new A(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const l=u;t(e[l]).next((f=>{o[l]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new A(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe="SimpleDb";class ia{static open(e,t,r,s){try{return new ia(t,e.transaction(s,r))}catch(i){throw new Hs(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new ke,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Hs(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const s=yu(r.target.error);this.S.reject(new Hs(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(N(Xe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Fw(t)}}class yt{static delete(e){return N(Xe,"Removing database:",e),Ln(Uf().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!Wf())return!1;if(yt.F())return!0;const e=Ae(),t=yt.M(e),r=0<t&&t<10,s=Qp(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,yt.M(Ae())===12.2&&Ie("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(N(Xe,"Opening database:",this.name),this.db=await new Promise(((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new Hs(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new D(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new D(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Hs(e,o))},s.onupgradeneeded=i=>{N(Xe,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{N(Xe,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=ia.open(this.db,e,i?"readonly":"readwrite",r),u=s(c).next((l=>(c.C(),l))).catch((l=>(c.abort(l),A.reject(l)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(N(Xe,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Qp(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Lw{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return Ln(this.U.delete())}}class Hs extends D{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function En(n){return n.name==="IndexedDbTransactionError"}class Fw{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(N(Xe,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(N(Xe,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Ln(r)}add(e){return N(Xe,"ADD",this.store.name,e,e),Ln(this.store.add(e))}get(e){return Ln(this.store.get(e)).next((t=>(t===void 0&&(t=null),N(Xe,"GET",this.store.name,e,t),t)))}delete(e){return N(Xe,"DELETE",this.store.name,e),Ln(this.store.delete(e))}count(){return N(Xe,"COUNT",this.store.name),Ln(this.store.count())}J(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new A(((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}}))}{const i=this.cursor(r),o=[];return this.H(i,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new A(((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}}))}X(e,t){N(Xe,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.H(s,t)}te(e){const t=this.cursor({});return new A(((r,s)=>{t.onerror=i=>{const o=yu(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():r()})):r()}}))}H(e,t){const r=[];return new A(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new Lw(c),l=t(c.primaryKey,c.value,u);if(l instanceof A){const f=l.catch((p=>(u.done(),A.reject(p))));r.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>A.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Ln(n){return new A(((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=yu(r.target.error);t(s)}}))}let ld=!1;function yu(n){const e=yt.M(Ae());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return ld||(ld=!0,setTimeout((()=>{throw r}),0)),r}}return n}const Ws="IndexBackfiller";class Uw{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){N(Ws,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();N(Ws,`Documents written: ${t}`)}catch(t){En(t)?N(Ws,"Ignoring IndexedDB error during index backfill: ",t):await Tn(t)}await this.re(6e4)}))}}class Bw{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const r=new Set;let s=t,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return N(Ws,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,r.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(N(Ws,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let r=e;return t.changes.forEach(((s,i)=>{const o=Kp(i);_u(o,r)>0&&(r=o)})),new tt(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ge.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an=-1;function Ri(n){return n==null}function ai(n){return n===0&&1/n==-1/0}function Jp(n){return typeof n=="number"&&Number.isInteger(n)&&!ai(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo="";function Me(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=hd(e)),e=qw(n.get(t),e);return hd(e)}function qw(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Mo:t+="";break;default:t+=i}}return t}function hd(n){return n+Mo+""}function pt(n){const e=n.length;if(q(e>=2,64408,{path:n}),e===2)return q(n.charAt(0)===Mo&&n.charAt(1)==="",56145,{path:n}),J.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(Mo,i);switch((o<0||o>t)&&U(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:U(61167,{path:n})}i=o+2}return new J(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn="remoteDocuments",bi="owner",_r="owner",ci="mutationQueues",zw="userId",rt="mutations",dd="batchId",jn="userMutationsIndex",fd=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(n,e){return[n,Me(e)]}function Yp(n,e,t){return[n,Me(e),t]}const jw={},Ur="documentMutations",Lo="remoteDocumentsV14",$w=["prefixPath","collectionGroup","readTime","documentId"],To="documentKeyIndex",Gw=["prefixPath","collectionGroup","documentId"],Xp="collectionGroupIndex",Kw=["collectionGroup","readTime","prefixPath","documentId"],ui="remoteDocumentGlobal",kc="remoteDocumentGlobalKey",Br="targets",Zp="queryTargetsIndex",Hw=["canonicalId","targetId"],qr="targetDocuments",Ww=["targetId","path"],Iu="documentTargetsIndex",Qw=["path","targetId"],Fo="targetGlobalKey",Gn="targetGlobal",li="collectionParents",Jw=["collectionId","parent"],zr="clientMetadata",Yw="clientId",oa="bundles",Xw="bundleId",aa="namedQueries",Zw="name",Tu="indexConfiguration",ev="indexId",Dc="collectionGroupIndex",tv="collectionGroup",Qs="indexState",nv=["indexId","uid"],em="sequenceNumberIndex",rv=["uid","sequenceNumber"],Js="indexEntries",sv=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],tm="documentKeyIndex",iv=["indexId","uid","orderedDocumentKey"],ca="documentOverlays",ov=["userId","collectionPath","documentId"],Nc="collectionPathOverlayIndex",av=["userId","collectionPath","largestBatchId"],nm="collectionGroupOverlayIndex",cv=["userId","collectionGroup","largestBatchId"],Eu="globals",uv="name",rm=[ci,rt,Ur,Mn,Br,bi,Gn,qr,zr,ui,li,oa,aa],lv=[...rm,ca],sm=[ci,rt,Ur,Lo,Br,bi,Gn,qr,zr,ui,li,oa,aa,ca],im=sm,wu=[...im,Tu,Qs,Js],hv=wu,om=[...wu,Eu],dv=om;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc extends Wp{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function be(n,e){const t=O(n);return yt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function wn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function am(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function cm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||De.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,De.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,De.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new so(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new so(this.root,e,this.comparator,!1)}getReverseIterator(){return new so(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new so(this.root,e,this.comparator,!0)}}class so{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class De{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??De.RED,this.left=s??De.EMPTY,this.right=i??De.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new De(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return De.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return De.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,De.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,De.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}De.EMPTY=null,De.RED=!0,De.BLACK=!1;De.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new De(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new md(this.data.getIterator())}getIteratorFrom(e){return new md(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ie)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ie(this.comparator);return t.data=e,t}}class md{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function yr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new Ke([])}unionWith(e){let t=new ie(he.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Or(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new um("Invalid base64 string: "+i):i}})(e);return new ge(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ge.EMPTY_BYTE_STRING=new ge("");const pv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function kt(n){if(q(!!n,39018),typeof n=="string"){let e=0;const t=pv.exec(n);if(q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:fe(n.seconds),nanos:fe(n.nanos)}}function fe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Dt(n){return typeof n=="string"?ge.fromBase64String(n):ge.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm="server_timestamp",hm="__type__",dm="__previous_value__",fm="__local_write_time__";function ua(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[hm])==null?void 0:r.stringValue)===lm}function la(n){const e=n.mapValue.fields[dm];return ua(e)?la(e):e}function hi(n){const e=kt(n.mapValue.fields[fm].timestampValue);return new ne(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(e,t,r,s,i,o,c,u,l,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=f,this.apiKey=p}}const di="(default)";class ln{constructor(e,t){this.projectId=e,this.database=t||di}static empty(){return new ln("","")}get isDefaultDatabase(){return this.database===di}isEqual(e){return e instanceof ln&&e.projectId===this.projectId&&e.database===this.database}}function gv(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ln(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu="__type__",pm="__max__",tn={mapValue:{fields:{__type__:{stringValue:pm}}}},Au="__vector__",jr="value",Eo={nullValue:"NULL_VALUE"};function hn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ua(n)?4:mm(n)?9007199254740991:ha(n)?10:11:U(28295,{value:n})}function Tt(n,e){if(n===e)return!0;const t=hn(n);if(t!==hn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return hi(n).isEqual(hi(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=kt(s.timestampValue),c=kt(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Dt(s.bytesValue).isEqual(Dt(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return fe(s.geoPointValue.latitude)===fe(i.geoPointValue.latitude)&&fe(s.geoPointValue.longitude)===fe(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return fe(s.integerValue)===fe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=fe(s.doubleValue),c=fe(i.doubleValue);return o===c?ai(o)===ai(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return Or(n.arrayValue.values||[],e.arrayValue.values||[],Tt);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(pd(o)!==pd(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Tt(o[u],c[u])))return!1;return!0})(n,e);default:return U(52216,{left:n})}}function fi(n,e){return(n.values||[]).find((t=>Tt(t,e)))!==void 0}function dn(n,e){if(n===e)return 0;const t=hn(n),r=hn(e);if(t!==r)return $(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=fe(i.integerValue||i.doubleValue),u=fe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return gd(n.timestampValue,e.timestampValue);case 4:return gd(hi(n),hi(e));case 5:return Pc(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=Dt(i),u=Dt(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const f=$(c[l],u[l]);if(f!==0)return f}return $(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=$(fe(i.latitude),fe(o.latitude));return c!==0?c:$(fe(i.longitude),fe(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return _d(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var g,E,C,k;const c=i.fields||{},u=o.fields||{},l=(g=c[jr])==null?void 0:g.arrayValue,f=(E=u[jr])==null?void 0:E.arrayValue,p=$(((C=l==null?void 0:l.values)==null?void 0:C.length)||0,((k=f==null?void 0:f.values)==null?void 0:k.length)||0);return p!==0?p:_d(l,f)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===tn.mapValue&&o===tn.mapValue)return 0;if(i===tn.mapValue)return 1;if(o===tn.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),l=o.fields||{},f=Object.keys(l);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=Pc(u[p],f[p]);if(g!==0)return g;const E=dn(c[u[p]],l[f[p]]);if(E!==0)return E}return $(u.length,f.length)})(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function gd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return $(n,e);const t=kt(n),r=kt(e),s=$(t.seconds,r.seconds);return s!==0?s:$(t.nanos,r.nanos)}function _d(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=dn(t[s],r[s]);if(i)return i}return $(t.length,r.length)}function $r(n){return Oc(n)}function Oc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=kt(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Dt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return x.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Oc(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Oc(t.fields[o])}`;return s+"}"})(n.mapValue):U(61005,{value:n})}function wo(n){switch(hn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=la(n);return e?16+wo(e):16;case 5:return 2*n.stringValue.length;case 6:return Dt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+wo(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return wn(r.fields,((i,o)=>{s+=i.length+wo(o)})),s})(n.mapValue);default:throw U(13486,{value:n})}}function Yn(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Mc(n){return!!n&&"integerValue"in n}function pi(n){return!!n&&"arrayValue"in n}function yd(n){return!!n&&"nullValue"in n}function Id(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function vo(n){return!!n&&"mapValue"in n}function ha(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[vu])==null?void 0:r.stringValue)===Au}function Ys(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return wn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ys(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ys(n.arrayValue.values[t]);return e}return{...n}}function mm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===pm}const gm={mapValue:{fields:{[vu]:{stringValue:Au},[jr]:{arrayValue:{}}}}};function _v(n){return"nullValue"in n?Eo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Yn(ln.empty(),x.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ha(n)?gm:{mapValue:{}}:U(35942,{value:n})}function yv(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Yn(ln.empty(),x.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?gm:"mapValue"in n?ha(n)?{mapValue:{}}:tn:U(61959,{value:n})}function Td(n,e){const t=dn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Ed(n,e){const t=dn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.value=e}static empty(){return new Ve({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!vo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ys(t)}setAll(e){let t=he.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Ys(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());vo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Tt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];vo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){wn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Ve(Ys(this.value))}}function _m(n){const e=[];return wn(n.fields,((t,r)=>{const s=new he([t]);if(vo(r)){const i=_m(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Ke(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new le(e,0,z.min(),z.min(),z.min(),Ve.empty(),0)}static newFoundDocument(e,t,r,s){return new le(e,1,t,z.min(),r,s,0)}static newNoDocument(e,t){return new le(e,2,t,z.min(),z.min(),Ve.empty(),0)}static newUnknownDocument(e,t){return new le(e,3,t,z.min(),z.min(),Ve.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ve.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ve.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,t){this.position=e,this.inclusive=t}}function wd(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=x.comparator(x.fromName(o.referenceValue),t.key):r=dn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function vd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Tt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t="asc"){this.field=e,this.dir=t}}function Iv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{}class Z extends ym{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Tv(e,t,r):t==="array-contains"?new vv(e,r):t==="in"?new Am(e,r):t==="not-in"?new Av(e,r):t==="array-contains-any"?new Rv(e,r):new Z(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Ev(e,r):new wv(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(dn(t,this.value)):t!==null&&hn(this.value)===hn(t)&&this.matchesComparison(dn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class re extends ym{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new re(e,t)}matches(e){return Gr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Gr(n){return n.op==="and"}function Lc(n){return n.op==="or"}function Ru(n){return Im(n)&&Gr(n)}function Im(n){for(const e of n.filters)if(e instanceof re)return!1;return!0}function Fc(n){if(n instanceof Z)return n.field.canonicalString()+n.op.toString()+$r(n.value);if(Ru(n))return n.filters.map((e=>Fc(e))).join(",");{const e=n.filters.map((t=>Fc(t))).join(",");return`${n.op}(${e})`}}function Tm(n,e){return n instanceof Z?(function(r,s){return s instanceof Z&&r.op===s.op&&r.field.isEqual(s.field)&&Tt(r.value,s.value)})(n,e):n instanceof re?(function(r,s){return s instanceof re&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Tm(o,s.filters[c])),!0):!1})(n,e):void U(19439)}function Em(n,e){const t=n.filters.concat(e);return re.create(t,n.op)}function wm(n){return n instanceof Z?(function(t){return`${t.field.canonicalString()} ${t.op} ${$r(t.value)}`})(n):n instanceof re?(function(t){return t.op.toString()+" {"+t.getFilters().map(wm).join(" ,")+"}"})(n):"Filter"}class Tv extends Z{constructor(e,t,r){super(e,t,r),this.key=x.fromName(r.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ev extends Z{constructor(e,t){super(e,"in",t),this.keys=vm("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class wv extends Z{constructor(e,t){super(e,"not-in",t),this.keys=vm("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function vm(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>x.fromName(r.referenceValue)))}class vv extends Z{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return pi(t)&&fi(t.arrayValue,this.value)}}class Am extends Z{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&fi(this.value.arrayValue,t)}}class Av extends Z{constructor(e,t){super(e,"not-in",t)}matches(e){if(fi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!fi(this.value.arrayValue,t)}}class Rv extends Z{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!pi(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>fi(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Uc(n,e=null,t=[],r=[],s=null,i=null,o=null){return new bv(n,e,t,r,s,i,o)}function Xn(n){const e=O(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Fc(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Ri(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>$r(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>$r(r))).join(",")),e.Te=t}return e.Te}function Si(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Iv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Tm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!vd(n.startAt,e.startAt)&&vd(n.endAt,e.endAt)}function Uo(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Bo(n,e){return n.filters.filter((t=>t instanceof Z&&t.field.isEqual(e)))}function Ad(n,e,t){let r=Eo,s=!0;for(const i of Bo(n,e)){let o=Eo,c=!0;switch(i.op){case"<":case"<=":o=_v(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Eo}Td({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Td({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Rd(n,e,t){let r=tn,s=!0;for(const i of Bo(n,e)){let o=tn,c=!0;switch(i.op){case">=":case">":o=yv(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=tn}Ed({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Ed({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Rm(n,e,t,r,s,i,o,c){return new Ot(n,e,t,r,s,i,o,c)}function is(n){return new Ot(n)}function bd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Sv(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function bu(n){return n.collectionGroup!==null}function kr(n){const e=O(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ie(he.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((l=>{l.isInequality()&&(c=c.add(l.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new mi(i,r))})),t.has(he.keyField().canonicalString())||e.Ee.push(new mi(he.keyField(),r))}return e.Ee}function Le(n){const e=O(n);return e.Ie||(e.Ie=Sm(e,kr(n))),e.Ie}function bm(n){const e=O(n);return e.Re||(e.Re=Sm(e,n.explicitOrderBy)),e.Re}function Sm(n,e){if(n.limitType==="F")return Uc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new mi(s.field,i)}));const t=n.endAt?new fn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fn(n.startAt.position,n.startAt.inclusive):null;return Uc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Bc(n,e){const t=n.filters.concat([e]);return new Ot(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Pv(n,e){const t=n.explicitOrderBy.concat([e]);return new Ot(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function qo(n,e,t){return new Ot(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Cv(n,e){return new Ot(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function Vv(n,e){return new Ot(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function Pi(n,e){return Si(Le(n),Le(e))&&n.limitType===e.limitType}function Pm(n){return`${Xn(Le(n))}|lt:${n.limitType}`}function Rr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>wm(s))).join(", ")}]`),Ri(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>$r(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>$r(s))).join(",")),`Target(${r})`})(Le(n))}; limitType=${n.limitType})`}function Ci(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):x.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of kr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const l=wd(o,c,u);return o.inclusive?l<=0:l<0})(r.startAt,kr(r),s)||r.endAt&&!(function(o,c,u){const l=wd(o,c,u);return o.inclusive?l>=0:l>0})(r.endAt,kr(r),s))})(n,e)}function Cm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Vm(n){return(e,t)=>{let r=!1;for(const s of kr(n)){const i=kv(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function kv(n,e,t){const r=n.field.isKeyField()?x.comparator(e.key,t.key):(function(i,o,c){const u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?dn(u,l):U(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){wn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return cm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv=new ce(x.comparator);function He(){return Dv}const km=new ce(x.comparator);function js(...n){let e=km;for(const t of n)e=e.insert(t.key,t);return e}function Dm(n){let e=km;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function mt(){return Xs()}function Nm(){return Xs()}function Xs(){return new Mt((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Nv=new ce(x.comparator),xv=new ie(x.comparator);function K(...n){let e=xv;for(const t of n)e=e.add(t);return e}const Ov=new ie($);function Su(){return Ov}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ai(e)?"-0":e}}function xm(n){return{integerValue:""+n}}function Om(n,e){return Jp(e)?xm(e):Pu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(){this._=void 0}}function Mv(n,e,t){return n instanceof Kr?(function(s,i){const o={fields:{[hm]:{stringValue:lm},[fm]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ua(i)&&(i=la(i)),i&&(o.fields[dm]=i),{mapValue:o}})(t,e):n instanceof Zn?Lm(n,e):n instanceof er?Fm(n,e):(function(s,i){const o=Mm(s,i),c=Sd(o)+Sd(s.Ae);return Mc(o)&&Mc(s.Ae)?xm(c):Pu(s.serializer,c)})(n,e)}function Lv(n,e,t){return n instanceof Zn?Lm(n,e):n instanceof er?Fm(n,e):t}function Mm(n,e){return n instanceof Hr?(function(r){return Mc(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class Kr extends da{}class Zn extends da{constructor(e){super(),this.elements=e}}function Lm(n,e){const t=Um(e);for(const r of n.elements)t.some((s=>Tt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class er extends da{constructor(e){super(),this.elements=e}}function Fm(n,e){let t=Um(e);for(const r of n.elements)t=t.filter((s=>!Tt(s,r)));return{arrayValue:{values:t}}}class Hr extends da{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Sd(n){return fe(n.integerValue||n.doubleValue)}function Um(n){return pi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,t){this.field=e,this.transform=t}}function Fv(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Zn&&s instanceof Zn||r instanceof er&&s instanceof er?Or(r.elements,s.elements,Tt):r instanceof Hr&&s instanceof Hr?Tt(r.Ae,s.Ae):r instanceof Kr&&s instanceof Kr})(n.transform,e.transform)}class Uv{constructor(e,t){this.version=e,this.transformResults=t}}class pe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new pe}static exists(e){return new pe(void 0,e)}static updateTime(e){return new pe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ao(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class fa{}function Bm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new as(n.key,pe.none()):new os(n.key,n.data,pe.none());{const t=n.data,r=Ve.empty();let s=new ie(he.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Lt(n.key,r,new Ke(s.toArray()),pe.none())}}function Bv(n,e,t){n instanceof os?(function(s,i,o){const c=s.value.clone(),u=Cd(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Lt?(function(s,i,o){if(!Ao(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Cd(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(qm(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Zs(n,e,t,r){return n instanceof os?(function(i,o,c,u){if(!Ao(i.precondition,o))return c;const l=i.value.clone(),f=Vd(i.fieldTransforms,u,o);return l.setAll(f),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof Lt?(function(i,o,c,u){if(!Ao(i.precondition,o))return c;const l=Vd(i.fieldTransforms,u,o),f=o.data;return f.setAll(qm(i)),f.setAll(l),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return Ao(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function qv(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Mm(r.transform,s||null);i!=null&&(t===null&&(t=Ve.empty()),t.set(r.field,i))}return t||null}function Pd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Or(r,s,((i,o)=>Fv(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class os extends fa{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Lt extends fa{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function qm(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Cd(n,e,t){const r=new Map;q(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,Lv(o,c,t[s]))}return r}function Vd(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,Mv(i,o,e))}return r}class as extends fa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Cu extends fa{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Bv(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Zs(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Zs(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Nm();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Bm(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(z.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),K())}isEqual(e){return this.batchId===e.batchId&&Or(this.mutations,e.mutations,((t,r)=>Pd(t,r)))&&Or(this.baseMutations,e.baseMutations,((t,r)=>Pd(t,r)))}}class ku{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){q(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return Nv})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new ku(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zv{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee,te;function jm(n){switch(n){case b.OK:return U(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function $m(n){if(n===void 0)return Ie("GRPC error has no .code"),b.UNKNOWN;switch(n){case Ee.OK:return b.OK;case Ee.CANCELLED:return b.CANCELLED;case Ee.UNKNOWN:return b.UNKNOWN;case Ee.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case Ee.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case Ee.INTERNAL:return b.INTERNAL;case Ee.UNAVAILABLE:return b.UNAVAILABLE;case Ee.UNAUTHENTICATED:return b.UNAUTHENTICATED;case Ee.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case Ee.NOT_FOUND:return b.NOT_FOUND;case Ee.ALREADY_EXISTS:return b.ALREADY_EXISTS;case Ee.PERMISSION_DENIED:return b.PERMISSION_DENIED;case Ee.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case Ee.ABORTED:return b.ABORTED;case Ee.OUT_OF_RANGE:return b.OUT_OF_RANGE;case Ee.UNIMPLEMENTED:return b.UNIMPLEMENTED;case Ee.DATA_LOSS:return b.DATA_LOSS;default:return U(39323,{code:n})}}(te=Ee||(Ee={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei=null;function jv(n){if(ei)throw new Error("a TestingHooksSpi instance is already set");ei=n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $v=new on([4294967295,4294967295],0);function kd(n){const e=Gm().encode(n),t=new Dp;return t.update(e),new Uint8Array(t.digest())}function Dd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new on([t,r],0),new on([s,i],0)]}class Nu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new $s(`Invalid padding: ${t}`);if(r<0)throw new $s(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new $s(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new $s(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=on.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(on.fromNumber(r)));return s.compare($v)===1&&(s=new on([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=kd(e),[r,s]=Dd(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Nu(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=kd(e),[r,s]=Dd(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class $s extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Di.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ki(z.min(),s,new ce($),He(),K())}}class Di{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Di(r,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Km{constructor(e,t){this.targetId=e,this.Ce=t}}class Hm{constructor(e,t,r=ge.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Nd{constructor(){this.ve=0,this.Fe=xd(),this.Me=ge.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=K(),t=K(),r=K();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:U(38017,{changeType:i})}})),new Di(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=xd()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,q(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Gv{constructor(e){this.Ge=e,this.ze=new Map,this.je=He(),this.Je=io(),this.He=io(),this.Ze=new ce($)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:U(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Uo(i))if(r===0){const o=new x(i.path);this.et(t,o,le.newNoDocument(o,z.min()))}else q(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}ei==null||ei.o((function(f,p,g,E,C){var L,B,F;const k={localCacheCount:f,existenceFilterCount:p.count,databaseId:g.database,projectId:g.projectId},V=p.unchangedNames;return V&&(k.bloomFilter={applied:C===0,hashCount:(V==null?void 0:V.hashCount)??0,bitmapLength:((B=(L=V==null?void 0:V.bits)==null?void 0:L.bitmap)==null?void 0:B.length)??0,padding:((F=V==null?void 0:V.bits)==null?void 0:F.padding)??0,mightContain:G=>(E==null?void 0:E.mightContain(G))??!1}),k})(o,e.Ce,this.Ge.ht(),c,u))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Dt(r).toUint8Array()}catch(u){if(u instanceof um)return Je("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Nu(o,s,i)}catch(u){return Je(u instanceof $s?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Uo(c.target)){const u=new x(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,le.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=K();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new ki(e,t,this.Ze,this.je,r);return this.je=He(),this.Je=io(),this.He=io(),this.Ze=new ce($),s}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Nd,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ie($),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ie($),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Nd),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function io(){return new ce(x.comparator)}function xd(){return new ce(x.comparator)}const Kv={asc:"ASCENDING",desc:"DESCENDING"},Hv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Wv={and:"AND",or:"OR"};class Qv{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function qc(n,e){return n.useProto3Json||Ri(e)?e:{value:e}}function Wr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Wm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Jv(n,e){return Wr(n,e.toTimestamp())}function Te(n){return q(!!n,49232),z.fromTimestamp((function(t){const r=kt(t);return new ne(r.seconds,r.nanos)})(n))}function xu(n,e){return zc(n,e).canonicalString()}function zc(n,e){const t=(function(s){return new J(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Qm(n){const e=J.fromString(n);return q(sg(e),10190,{key:e.toString()}),e}function gi(n,e){return xu(n.databaseId,e.path)}function It(n,e){const t=Qm(e);if(t.get(1)!==n.databaseId.projectId)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(Xm(t))}function Jm(n,e){return xu(n.databaseId,e)}function Ym(n){const e=Qm(n);return e.length===4?J.emptyPath():Xm(e)}function jc(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Xm(n){return q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Od(n,e,t){return{name:gi(n,e),fields:t.value.mapValue.fields}}function pa(n,e,t){const r=It(n,e.name),s=Te(e.updateTime),i=e.createTime?Te(e.createTime):z.min(),o=new Ve({mapValue:{fields:e.fields}}),c=le.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Yv(n,e){return"found"in e?(function(r,s){q(!!s.found,43571),s.found.name,s.found.updateTime;const i=It(r,s.found.name),o=Te(s.found.updateTime),c=s.found.createTime?Te(s.found.createTime):z.min(),u=new Ve({mapValue:{fields:s.found.fields}});return le.newFoundDocument(i,o,c,u)})(n,e):"missing"in e?(function(r,s){q(!!s.missing,3894),q(!!s.readTime,22933);const i=It(r,s.missing),o=Te(s.readTime);return le.newNoDocument(i,o)})(n,e):U(7234,{result:e})}function Xv(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:U(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(l,f){return l.useProto3Json?(q(f===void 0||typeof f=="string",58123),ge.fromBase64String(f||"")):(q(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ge.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(l){const f=l.code===void 0?b.UNKNOWN:$m(l.code);return new D(f,l.message||"")})(o);t=new Hm(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=It(n,r.document.name),i=Te(r.document.updateTime),o=r.document.createTime?Te(r.document.createTime):z.min(),c=new Ve({mapValue:{fields:r.document.fields}}),u=le.newFoundDocument(s,i,o,c),l=r.targetIds||[],f=r.removedTargetIds||[];t=new Ro(l,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=It(n,r.document),i=r.readTime?Te(r.readTime):z.min(),o=le.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ro([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=It(n,r.document),i=r.removedTargetIds||[];t=new Ro([],i,s,null)}else{if(!("filter"in e))return U(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new zv(s,i),c=r.targetId;t=new Km(c,o)}}return t}function _i(n,e){let t;if(e instanceof os)t={update:Od(n,e.key,e.value)};else if(e instanceof as)t={delete:gi(n,e.key)};else if(e instanceof Lt)t={update:Od(n,e.key,e.data),updateMask:sA(e.fieldMask)};else{if(!(e instanceof Cu))return U(16599,{dt:e.type});t={verify:gi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof Kr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Zn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof er)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Hr)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw U(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Jv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:U(27497)})(n,e.precondition)),t}function $c(n,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?pe.updateTime(Te(i.updateTime)):i.exists!==void 0?pe.exists(i.exists):pe.none()})(e.currentDocument):pe.none(),r=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new Kr;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new Zn(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new er(f)}else"increment"in c?u=new Hr(o,c.increment):U(16584,{proto:c});const l=he.fromServerFormat(c.fieldPath);return new Vi(l,u)})(n,s))):[];if(e.update){e.update.name;const s=It(n,e.update.name),i=new Ve({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const l=u.fieldPaths||[];return new Ke(l.map((f=>he.fromServerFormat(f))))})(e.updateMask);return new Lt(s,i,o,t,r)}return new os(s,i,t,r)}if(e.delete){const s=It(n,e.delete);return new as(s,t)}if(e.verify){const s=It(n,e.verify);return new Cu(s,t)}return U(1463,{proto:e})}function Zv(n,e){return n&&n.length>0?(q(e!==void 0,14353),n.map((t=>(function(s,i){let o=s.updateTime?Te(s.updateTime):Te(i);return o.isEqual(z.min())&&(o=Te(i)),new Uv(o,s.transformResults||[])})(t,e)))):[]}function Zm(n,e){return{documents:[Jm(n,e.path)]}}function ma(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Jm(n,s);const i=(function(l){if(l.length!==0)return rg(re.create(l,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(l){if(l.length!==0)return l.map((f=>(function(g){return{field:Zt(g.field),direction:tA(g.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=qc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{ft:t,parent:s}}function eg(n,e,t,r){const{ft:s,parent:i}=ma(n,e),o={},c=[];let u=0;return t.forEach((l=>{const f=r?l.alias:"aggregate_"+u++;o[f]=l.alias,l.aggregateType==="count"?c.push({alias:f,count:{}}):l.aggregateType==="avg"?c.push({alias:f,avg:{field:Zt(l.fieldPath)}}):l.aggregateType==="sum"&&c.push({alias:f,sum:{field:Zt(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function tg(n){let e=Ym(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){q(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const g=ng(p);return g instanceof re&&Ru(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((g=>(function(C){return new mi(br(C.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let g;return g=typeof p=="object"?p.value:p,Ri(g)?null:g})(t.limit));let u=null;t.startAt&&(u=(function(p){const g=!!p.before,E=p.values||[];return new fn(E,g)})(t.startAt));let l=null;return t.endAt&&(l=(function(p){const g=!p.before,E=p.values||[];return new fn(E,g)})(t.endAt)),Rm(e,s,o,i,c,"F",u,l)}function eA(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ng(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=br(t.unaryFilter.field);return Z.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=br(t.unaryFilter.field);return Z.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=br(t.unaryFilter.field);return Z.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=br(t.unaryFilter.field);return Z.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Z.create(br(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return re.create(t.compositeFilter.filters.map((r=>ng(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U(1026)}})(t.compositeFilter.op))})(n):U(30097,{filter:n})}function tA(n){return Kv[n]}function nA(n){return Hv[n]}function rA(n){return Wv[n]}function Zt(n){return{fieldPath:n.canonicalString()}}function br(n){return he.fromServerFormat(n.fieldPath)}function rg(n){return n instanceof Z?(function(t){if(t.op==="=="){if(Id(t.value))return{unaryFilter:{field:Zt(t.field),op:"IS_NAN"}};if(yd(t.value))return{unaryFilter:{field:Zt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Id(t.value))return{unaryFilter:{field:Zt(t.field),op:"IS_NOT_NAN"}};if(yd(t.value))return{unaryFilter:{field:Zt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zt(t.field),op:nA(t.op),value:t.value}}})(n):n instanceof re?(function(t){const r=t.getFilters().map((s=>rg(s)));return r.length===1?r[0]:{compositeFilter:{op:rA(t.op),filters:r}}})(n):U(54877,{filter:n})}function sA(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function sg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ig(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,r,s,i=z.min(),o=z.min(),c=ge.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Rt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e){this.yt=e}}function iA(n,e){let t;if(e.document)t=pa(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=x.fromSegments(e.noDocument.path),s=nr(e.noDocument.readTime);t=le.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return U(56709);{const r=x.fromSegments(e.unknownDocument.path),s=nr(e.unknownDocument.version);t=le.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime((function(s){const i=new ne(s[0],s[1]);return z.fromTimestamp(i)})(e.readTime)),t}function Md(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:zo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(i,o){return{name:gi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Wr(i,o.version.toTimestamp()),createTime:Wr(i,o.createTime.toTimestamp())}})(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:tr(e.version)};else{if(!e.isUnknownDocument())return U(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:tr(e.version)}}return r}function zo(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function tr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function nr(n){const e=new ne(n.seconds,n.nanoseconds);return z.fromTimestamp(e)}function Fn(n,e){const t=(e.baseMutations||[]).map((i=>$c(n.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map((i=>$c(n.yt,i))),s=ne.fromMillis(e.localWriteTimeMs);return new Vu(e.batchId,s,t,r)}function Gs(n){const e=nr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?nr(n.lastLimboFreeSnapshotVersion):z.min();let r;return r=(function(i){return i.documents!==void 0})(n.query)?(function(i){const o=i.documents.length;return q(o===1,1966,{count:o}),Le(is(Ym(i.documents[0])))})(n.query):(function(i){return Le(tg(i))})(n.query),new Rt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,ge.fromBase64String(n.resumeToken))}function ag(n,e){const t=tr(e.snapshotVersion),r=tr(e.lastLimboFreeSnapshotVersion);let s;s=Uo(e.target)?Zm(n.yt,e.target):ma(n.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Xn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function ga(n){const e=tg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?qo(e,e.limit,"L"):e}function ac(n,e){return new Du(e.largestBatchId,$c(n.yt,e.overlayMutation))}function Ld(n,e){const t=e.path.lastSegment();return[n,Me(e.path.popLast()),t]}function Fd(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:tr(r.readTime),documentKey:Me(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oA{getBundleMetadata(e,t){return Ud(e).get(t).next((r=>{if(r)return(function(i){return{id:i.bundleId,createTime:nr(i.createTime),version:i.version}})(r)}))}saveBundleMetadata(e,t){return Ud(e).put((function(s){return{bundleId:s.id,createTime:tr(Te(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Bd(e).get(t).next((r=>{if(r)return(function(i){return{name:i.name,query:ga(i.bundledQuery),readTime:nr(i.readTime)}})(r)}))}saveNamedQuery(e,t){return Bd(e).put((function(s){return{name:s.name,readTime:tr(Te(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function Ud(n){return be(n,oa)}function Bd(n){return be(n,aa)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new _a(e,r)}getOverlay(e,t){return Ns(e).get(Ld(this.userId,t)).next((r=>r?ac(this.serializer,r):null))}getOverlays(e,t){const r=mt();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){const s=[];return r.forEach(((i,o)=>{const c=new Du(t,o);s.push(this.St(e,c))})),A.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach((o=>s.add(Me(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(Ns(e).X(Nc,c))})),A.waitFor(i)}getOverlaysForCollection(e,t,r){const s=mt(),i=Me(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Ns(e).J(Nc,o).next((c=>{for(const u of c){const l=ac(this.serializer,u);s.set(l.getKey(),l)}return s}))}getOverlaysForCollectionGroup(e,t,r,s){const i=mt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ns(e).ee({index:nm,range:c},((u,l,f)=>{const p=ac(this.serializer,l);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()})).next((()=>i))}St(e,t){return Ns(e).put((function(s,i,o){const[c,u,l]=Ld(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:_i(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function Ns(n){return be(n,ca)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA{bt(e){return be(e,Eu)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const r=t==null?void 0:t.value;return r?ge.fromUint8Array(r):ge.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(fe(e.integerValue));else if("doubleValue"in e){const r=fe(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),ai(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=kt(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Dt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?mm(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):ha(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):U(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const r=e.fields||{};this.Ft(t,55);for(const s of Object.keys(r))this.Ot(s,t),this.Ct(r[s],t)}kt(e,t){var o,c;const r=e.fields||{};this.Ft(t,53);const s=jr,i=((c=(o=r[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(fe(i)),this.Ot(s,t),this.Ct(r[s],t)}Kt(e,t){const r=e.values||[];this.Ft(t,50);for(const s of r)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),x.fromName(e).path.forEach((r=>{this.Ft(t,60),this.$t(r,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Un.Wt=new Un;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=255;function cA(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function qd(n){const e=64-(function(r){let s=0;for(let i=0;i<8;++i){const o=cA(255&r[i]);if(s+=o,o!==8)break}return s})(n);return Math.ceil(e/8)}class uA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Jt(r);else if(r<2048)this.Jt(960|r>>>6),this.Jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),r=qd(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),r=qd(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Ir),this.sn(255)}_n(){this.an(Ir),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Ir?(this.sn(Ir),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Ir?(this.an(Ir),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class lA{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class hA{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class xs{constructor(){this.cn=new uA,this.ascending=new lA(this.cn),this.descending=new hA(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,t,r,s){this.hn=e,this.Pn=t,this.Tn=r,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.En,0),t!==e?r.set([0],this.En.length):++r[r.length-1],new Bn(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:bo(this.Tn),directionalValue:bo(this.En),orderedDocumentKey:bo(t),documentKey:r.path.toArray()}}An(e,t,r){const s=this.Rn(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Kt(n,e){let t=n.hn-e.hn;return t!==0?t:(t=zd(n.Tn,e.Tn),t!==0?t:(t=zd(n.En,e.En),t!==0?t:x.comparator(n.Pn,e.Pn)))}function zd(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function bo(n){return Hf()?(function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r})(n):n}function jd(n){return typeof n!="string"?n:(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(n)}class $d{constructor(e){this.Vn=new ie(((t,r)=>he.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(q(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Vc(e);if(t!==void 0&&!this.pn(t))return!1;const r=On(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.pn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=r[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new ie(he.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new $n(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new $n(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new $n(r.field,r.dir==="asc"?0:1)));return new Lr(Lr.UNKNOWN_ID,this.collectionId,t,Fr.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cg(n){var t,r;if(q(n instanceof Z||n instanceof re,20012),n instanceof Z){if(n instanceof Am){const s=((r=(t=n.value.arrayValue)==null?void 0:t.values)==null?void 0:r.map((i=>Z.create(n.field,"==",i))))||[];return re.create(s,"or")}return n}const e=n.filters.map((s=>cg(s)));return re.create(e,n.op)}function dA(n){if(n.getFilters().length===0)return[];const e=Hc(cg(n));return q(ug(e),7391),Gc(e)||Kc(e)?[e]:e.getFilters()}function Gc(n){return n instanceof Z}function Kc(n){return n instanceof re&&Ru(n)}function ug(n){return Gc(n)||Kc(n)||(function(t){if(t instanceof re&&Lc(t)){for(const r of t.getFilters())if(!Gc(r)&&!Kc(r))return!1;return!0}return!1})(n)}function Hc(n){if(q(n instanceof Z||n instanceof re,34018),n instanceof Z)return n;if(n.filters.length===1)return Hc(n.filters[0]);const e=n.filters.map((r=>Hc(r)));let t=re.create(e,n.op);return t=jo(t),ug(t)?t:(q(t instanceof re,64498),q(Gr(t),40251),q(t.filters.length>1,57927),t.filters.reduce(((r,s)=>Ou(r,s))))}function Ou(n,e){let t;return q(n instanceof Z||n instanceof re,38388),q(e instanceof Z||e instanceof re,25473),t=n instanceof Z?e instanceof Z?(function(s,i){return re.create([s,i],"and")})(n,e):Gd(n,e):e instanceof Z?Gd(e,n):(function(s,i){if(q(s.filters.length>0&&i.filters.length>0,48005),Gr(s)&&Gr(i))return Em(s,i.getFilters());const o=Lc(s)?s:i,c=Lc(s)?i:s,u=o.filters.map((l=>Ou(l,c)));return re.create(u,"or")})(n,e),jo(t)}function Gd(n,e){if(Gr(e))return Em(e,n.getFilters());{const t=e.filters.map((r=>Ou(n,r)));return re.create(t,"or")}}function jo(n){if(q(n instanceof Z||n instanceof re,11850),n instanceof Z)return n;const e=n.getFilters();if(e.length===1)return jo(e[0]);if(Im(n))return n;const t=e.map((s=>jo(s))),r=[];return t.forEach((s=>{s instanceof Z?r.push(s):s instanceof re&&(s.op===n.op?r.push(...s.filters):r.push(s))})),r.length===1?r[0]:re.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(){this.bn=new Mu}addToCollectionParentIndex(e,t){return this.bn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(tt.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(tt.min())}updateCollectionGroup(e,t,r){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Mu{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ie(J.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ie(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd="IndexedDbIndexManager",oo=new Uint8Array(0);class pA{constructor(e,t){this.databaseId=t,this.Dn=new Mu,this.Cn=new Mt((r=>Xn(r)),((r,s)=>Si(r,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const i={collectionId:r,parent:Me(s)};return Hd(e).put(i)}return A.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[qp(t),""],!1,!0);return Hd(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;r.push(pt(o.parent))}return r}))}addFieldIndex(e,t){const r=Os(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Er(e);return i.next((c=>{o.put(Fd(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const r=Os(e),s=Er(e),i=Tr(e);return r.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Os(e),r=Tr(e),s=Er(e);return t.X().next((()=>r.X())).next((()=>s.X()))}createTargetIndexes(e,t){return A.forEach(this.vn(t),(r=>this.getIndexType(e,r).next((s=>{if(s===0||s===1){const i=new $d(r).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const r=Tr(e);let s=!0;const i=new Map;return A.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=K();const c=[];return A.forEach(i,((u,l)=>{N(Kd,`Using index ${(function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map((G=>`${G.fieldPath}:${G.kind}`)).join(",")}`})(u)} to execute ${Xn(t)}`);const f=(function(F,G){const H=Vc(G);if(H===void 0)return null;for(const Q of Bo(F,H.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null})(l,u),p=(function(F,G){const H=new Map;for(const Q of On(G))for(const T of Bo(F,Q.fieldPath))switch(T.op){case"==":case"in":H.set(Q.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return H.set(Q.fieldPath.canonicalString(),T.value),Array.from(H.values())}return null})(l,u),g=(function(F,G){const H=[];let Q=!0;for(const T of On(G)){const _=T.kind===0?Ad(F,T.fieldPath,F.startAt):Rd(F,T.fieldPath,F.startAt);H.push(_.value),Q&&(Q=_.inclusive)}return new fn(H,Q)})(l,u),E=(function(F,G){const H=[];let Q=!0;for(const T of On(G)){const _=T.kind===0?Rd(F,T.fieldPath,F.endAt):Ad(F,T.fieldPath,F.endAt);H.push(_.value),Q&&(Q=_.inclusive)}return new fn(H,Q)})(l,u),C=this.Mn(u,l,g),k=this.Mn(u,l,E),V=this.xn(u,l,p),L=this.On(u.indexId,f,C,g.inclusive,k,E.inclusive,V);return A.forEach(L,(B=>r.Z(B,t.limit).next((F=>{F.forEach((G=>{const H=x.fromSegments(G.documentKey);o.has(H)||(o=o.add(H),c.push(H))}))}))))})).next((()=>c))}return A.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=dA(re.create(e.filters,"and")).map((r=>Uc(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,r,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),l=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const g=t?this.Nn(t[p/l]):oo,E=this.Bn(e,g,r[p%l],s),C=this.Ln(e,g,i[p%l],o),k=c.map((V=>this.Bn(e,g,V,!0)));f.push(...this.createRange(E,C,k))}return f}Bn(e,t,r,s){const i=new Bn(e,x.empty(),t,r);return s?i:i.In()}Ln(e,t,r,s){const i=new Bn(e,x.empty(),t,r);return s?i.In():i}Fn(e,t){const r=new $d(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)r.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let r=2;const s=this.vn(t);return A.forEach(s,(i=>this.Fn(e,i).next((o=>{o?r!==0&&o.fields.length<(function(u){let l=new ie(he.comparator),f=!1;for(const p of u.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:l=l.add(g.field));for(const p of u.orderBy)p.field.isKeyField()||(l=l.add(p.field));return l.size+(f?1:0)})(i)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&r===2?1:r))}kn(e,t){const r=new xs;for(const s of On(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.ln(s.kind);Un.Wt.Dt(i,o)}return r.un()}Nn(e){const t=new xs;return Un.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const r=new xs;return Un.Wt.Dt(Yn(this.databaseId,t),r.ln((function(i){const o=On(i);return o.length===0?0:o[o.length-1].kind})(e))),r.un()}xn(e,t,r){if(r===null)return[];let s=[];s.push(new xs);let i=0;for(const o of On(e)){const c=r[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&pi(c))s=this.Un(s,o,c);else{const l=u.ln(o.kind);Un.Wt.Dt(c,l)}}return this.$n(s)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const u=new xs;u.seed(c.un()),Un.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find((r=>r instanceof Z&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Os(e),s=Er(e);return(t?r.J(Dc,IDBKeyRange.bound(t,t)):r.J()).next((i=>{const o=[];return A.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{o.push((function(f,p){const g=p?new Fr(p.sequenceNumber,new tt(nr(p.readTime),new x(pt(p.documentKey)),p.largestBatchId)):Fr.empty(),E=f.fields.map((([C,k])=>new $n(he.fromServerFormat(C),k)));return new Lr(f.indexId,f.collectionGroup,E,g)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:$(r.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const s=Os(e),i=Er(e);return this.Wn(e).next((o=>s.J(Dc,IDBKeyRange.bound(t,t)).next((c=>A.forEach(c,(u=>i.put(Fd(u.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return A.forEach(t,((s,i)=>{const o=r.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(r.set(s.collectionGroup,c),A.forEach(c,(u=>this.Qn(e,s,u).next((l=>{const f=this.Gn(i,u);return l.isEqual(f)?A.resolve():this.zn(e,i,u,l,f)})))))))}))}jn(e,t,r,s){return Tr(e).put(s.Rn(this.uid,this.qn(r,t.key),t.key))}Jn(e,t,r,s){return Tr(e).delete(s.An(this.uid,this.qn(r,t.key),t.key))}Qn(e,t,r){const s=Tr(e);let i=new ie(Kt);return s.ee({index:tm,range:IDBKeyRange.only([r.indexId,this.uid,bo(this.qn(r,t))])},((o,c)=>{i=i.add(new Bn(r.indexId,t,jd(c.arrayValue),jd(c.directionalValue)))})).next((()=>i))}Gn(e,t){let r=new ie(Kt);const s=this.kn(t,e);if(s==null)return r;const i=Vc(t);if(i!=null){const o=e.data.field(i.fieldPath);if(pi(o))for(const c of o.arrayValue.values||[])r=r.add(new Bn(t.indexId,e.key,this.Nn(c),s))}else r=r.add(new Bn(t.indexId,e.key,oo,s));return r}zn(e,t,r,s,i){N(Kd,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,l,f,p,g){const E=u.getIterator(),C=l.getIterator();let k=yr(E),V=yr(C);for(;k||V;){let L=!1,B=!1;if(k&&V){const F=f(k,V);F<0?B=!0:F>0&&(L=!0)}else k!=null?B=!0:L=!0;L?(p(V),V=yr(C)):B?(g(k),k=yr(E)):(k=yr(E),V=yr(C))}})(s,i,Kt,(c=>{o.push(this.jn(e,t,r,c))}),(c=>{o.push(this.Jn(e,t,r,c))})),A.waitFor(o)}Wn(e){let t=1;return Er(e).ee({index:em,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,c)=>Kt(o,c))).filter(((o,c,u)=>!c||Kt(o,u[c-1])!==0));const s=[];s.push(e);for(const o of r){const c=Kt(o,e),u=Kt(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,oo,x.empty()),u=s[o+1].An(this.uid,oo,x.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return Kt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Wd)}getMinOffset(e,t){return A.mapArray(this.vn(t),(r=>this.Fn(e,r).next((s=>s||U(44426))))).next(Wd)}}function Hd(n){return be(n,li)}function Tr(n){return be(n,Js)}function Os(n){return be(n,Tu)}function Er(n){return be(n,Qs)}function Wd(n){q(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;_u(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new tt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lg=41943040;class Oe{static withCacheSize(e){return new Oe(e,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hg(n,e,t){const r=n.store(rt),s=n.store(Ur),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},((f,p,g)=>(c++,g.delete())));i.push(u.next((()=>{q(c===1,47070,{batchId:t.batchId})})));const l=[];for(const f of t.mutations){const p=Yp(e,f.key.path,t.batchId);i.push(s.delete(p)),l.push(f.key)}return A.waitFor(i).next((()=>l))}function $o(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw U(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe.DEFAULT_COLLECTION_PERCENTILE=10,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Oe.DEFAULT=new Oe(lg,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Oe.DISABLED=new Oe(-1,0,0);class ya{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Zn={}}static wt(e,t,r,s){q(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new ya(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ht(e).ee({index:jn,range:r},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,s){const i=Sr(e),o=Ht(e);return o.add({}).next((c=>{q(typeof c=="number",49019);const u=new Vu(c,t,r,s),l=(function(E,C,k){const V=k.baseMutations.map((B=>_i(E.yt,B))),L=k.mutations.map((B=>_i(E.yt,B)));return{userId:C,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:V,mutations:L}})(this.serializer,this.userId,u),f=[];let p=new ie(((g,E)=>$(g.canonicalString(),E.canonicalString())));for(const g of s){const E=Yp(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),f.push(o.put(l)),f.push(i.put(E,jw))}return p.forEach((g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),A.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return Ht(e).get(t).next((r=>r?(q(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),Fn(this.serializer,r)):null))}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const s=r.keys();return this.Zn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return Ht(e).ee({index:jn,range:s},((o,c,u)=>{c.userId===this.userId&&(q(c.batchId>=r,47524,{Yn:r}),i=Fn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=an;return Ht(e).ee({index:jn,range:t,reverse:!0},((s,i,o)=>{r=i.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,an],[this.userId,Number.POSITIVE_INFINITY]);return Ht(e).J(jn,t).next((r=>r.map((s=>Fn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Io(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return Sr(e).ee({range:s},((o,c,u)=>{const[l,f,p]=o,g=pt(f);if(l===this.userId&&t.path.isEqual(g))return Ht(e).get(p).next((E=>{if(!E)throw U(61480,{er:o,batchId:p});q(E.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:E.userId,batchId:p}),i.push(Fn(this.serializer,E))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ie($);const s=[];return t.forEach((i=>{const o=Io(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Sr(e).ee({range:c},((l,f,p)=>{const[g,E,C]=l,k=pt(E);g===this.userId&&i.path.isEqual(k)?r=r.add(C):p.done()}));s.push(u)})),A.waitFor(s).next((()=>this.tr(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Io(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ie($);return Sr(e).ee({range:o},((u,l,f)=>{const[p,g,E]=u,C=pt(g);p===this.userId&&r.isPrefixOf(C)?C.length===s&&(c=c.add(E)):f.done()})).next((()=>this.tr(e,c)))}tr(e,t){const r=[],s=[];return t.forEach((i=>{s.push(Ht(e).get(i).next((o=>{if(o===null)throw U(35274,{batchId:i});q(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(Fn(this.serializer,o))})))})),A.waitFor(s).next((()=>r))}removeMutationBatch(e,t){return hg(e.le,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),A.forEach(r,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return Sr(e).ee({range:r},((i,o,c)=>{if(i[0]===this.userId){const u=pt(i[1]);s.push(u)}else c.done()})).next((()=>{q(s.length===0,56720,{rr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return dg(e,this.userId,t)}ir(e){return fg(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:an,lastStreamToken:""}))}}function dg(n,e,t){const r=Io(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Sr(n).ee({range:i,Y:!0},((c,u,l)=>{const[f,p,g]=c;f===e&&p===s&&(o=!0),l.done()})).next((()=>o))}function Ht(n){return be(n,rt)}function Sr(n){return be(n,Ur)}function fg(n){return be(n,ci)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new rr(0)}static ar(){return new rr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const r=new rr(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>z.fromTimestamp(new ne(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.ur(e).next((s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>wr(e).delete(t.targetId))).next((()=>this.ur(e))).next((r=>(q(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r))))}removeTargets(e,t,r){let s=0;const i=[];return wr(e).ee(((o,c)=>{const u=Gs(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(e,t){return wr(e).ee(((r,s)=>{const i=Gs(s);t(i)}))}ur(e){return Jd(e).get(Fo).next((t=>(q(t!==null,2888),t)))}cr(e,t){return Jd(e).put(Fo,t)}lr(e,t){return wr(e).put(ag(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const r=Xn(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return wr(e).ee({range:s,index:Zp},((o,c,u)=>{const l=Gs(c);Si(t,l.target)&&(i=l,u.done())})).next((()=>i))}addMatchingKeys(e,t,r){const s=[],i=en(e);return t.forEach((o=>{const c=Me(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))})),A.waitFor(s)}removeMatchingKeys(e,t,r){const s=en(e);return A.forEach(t,(i=>{const o=Me(i.path);return A.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])}))}removeMatchingKeysForTargetId(e,t){const r=en(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=en(e);let i=K();return s.ee({range:r,Y:!0},((o,c,u)=>{const l=pt(o[1]),f=new x(l);i=i.add(f)})).next((()=>i))}containsKey(e,t){const r=Me(t.path),s=IDBKeyRange.bound([r],[qp(r)],!1,!0);let i=0;return en(e).ee({index:Iu,Y:!0,range:s},(([o,c],u,l)=>{o!==0&&(i++,l.done())})).next((()=>i>0))}At(e,t){return wr(e).get(t).next((r=>r?Gs(r):null))}}function wr(n){return be(n,Br)}function Jd(n){return be(n,Gn)}function en(n){return be(n,qr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd="LruGarbageCollector",pg=1048576;function Xd([n,e],[t,r]){const s=$(n,t);return s===0?$(e,r):s}class gA{constructor(e){this.Pr=e,this.buffer=new ie(Xd),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Xd(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class mg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){N(Yd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){En(t)?N(Yd,"Ignoring IndexedDB error during garbage collection: ",t):await Tn(t)}await this.Ar(3e5)}))}}class _A{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Ge.ce);const r=new gA(t);return this.Vr.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Qd)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Qd):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,o,c,u,l;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(l=Date.now(),Ar()<=X.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function gg(n,e){return new _A(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{constructor(e,t){this.db=e,this.garbageCollector=gg(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((r,s)=>t(s)))}addReference(e,t,r){return ao(e,r)}removeReference(e,t,r){return ao(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return ao(e,t)}wr(e,t){return(function(s,i){let o=!1;return fg(s).te((c=>dg(s,c,i).next((u=>(u&&(o=!0),A.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((l=>{if(!l)return i++,r.getEntry(e,o).next((()=>(r.removeEntry(o,z.min()),en(e).delete((function(p){return[0,Me(p.path)]})(o)))))}));s.push(u)}})).next((()=>A.waitFor(s))).next((()=>r.apply(e))).next((()=>i))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return ao(e,t)}yr(e,t){const r=en(e);let s,i=Ge.ce;return r.ee({index:Iu},(([o,c],{path:u,sequenceNumber:l})=>{o===0?(i!==Ge.ce&&t(new x(pt(s)),i),i=l,s=u):i=Ge.ce})).next((()=>{i!==Ge.ce&&t(new x(pt(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ao(n,e){return en(n).put((function(r,s){return{targetId:0,path:Me(r.path),sequenceNumber:s}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(){this.changes=new Mt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?A.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Nn(e).put(r)}removeEntry(e,t,r){return Nn(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],zo(o),c[c.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.Sr(e,r))))}getEntry(e,t){let r=le.newInvalidDocument(t);return Nn(e).ee({index:To,range:IDBKeyRange.only(Ms(t))},((s,i)=>{r=this.br(t,i)})).next((()=>r))}Dr(e,t){let r={size:0,document:le.newInvalidDocument(t)};return Nn(e).ee({index:To,range:IDBKeyRange.only(Ms(t))},((s,i)=>{r={document:this.br(t,i),size:$o(i)}})).next((()=>r))}getEntries(e,t){let r=He();return this.Cr(e,t,((s,i)=>{const o=this.br(s,i);r=r.insert(s,o)})).next((()=>r))}vr(e,t){let r=He(),s=new ce(x.comparator);return this.Cr(e,t,((i,o)=>{const c=this.br(i,o);r=r.insert(i,c),s=s.insert(i,$o(o))})).next((()=>({documents:r,Fr:s})))}Cr(e,t,r){if(t.isEmpty())return A.resolve();let s=new ie(tf);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(Ms(s.first()),Ms(s.last())),o=s.getIterator();let c=o.getNext();return Nn(e).ee({index:To,range:i},((u,l,f)=>{const p=x.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&tf(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?f.j(Ms(c)):f.done()})).next((()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),zo(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Nn(e).J(IDBKeyRange.bound(c,u,!0)).next((l=>{i==null||i.incrementDocumentReadCount(l.length);let f=He();for(const p of l){const g=this.br(x.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(Ci(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f}))}getAllFromCollectionGroup(e,t,r,s){let i=He();const o=ef(t,r),c=ef(t,tt.max());return Nn(e).ee({index:Xp,range:IDBKeyRange.bound(o,c,!0)},((u,l,f)=>{const p=this.br(x.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);i=i.insert(p.key,p),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new TA(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Zd(e).get(kc).next((t=>(q(!!t,20021),t)))}Sr(e,t){return Zd(e).put(kc,t)}br(e,t){if(t){const r=iA(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(z.min())))return r}return le.newInvalidDocument(e)}}function yg(n){return new IA(n)}class TA extends _g{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new Mt((r=>r.toString()),((r,s)=>r.isEqual(s)))}applyChanges(e){const t=[];let r=0,s=new ie(((i,o)=>$(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Md(this.Mr.serializer,o);s=s.add(i.path.popLast());const l=$o(u);r+=l-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(r-=c.size,this.trackRemovals){const u=Md(this.Mr.serializer,o.convertToNoDocument(z.min()));t.push(this.Mr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Mr.updateMetadata(e,r)),A.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:r,Fr:s})=>(s.forEach(((i,o)=>{this.Or.set(i,{size:o,readTime:r.get(i).readTime})})),r)))}}function Zd(n){return be(n,ui)}function Nn(n){return be(n,Lo)}function Ms(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function ef(n,e){const t=e.documentKey.path.toArray();return[n,zo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function tf(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=$(t[i],r[i]),s)return s;return s=$(t.length,r.length),s||(s=$(t[t.length-2],r[r.length-2]),s||$(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Zs(r.mutation,s,Ke.empty(),ne.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,K()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=K()){const s=mt();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=js();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=mt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,K())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=He();const o=Xs(),c=(function(){return Xs()})();return t.forEach(((u,l)=>{const f=r.get(l.key);s.has(l.key)&&(f===void 0||f.mutation instanceof Lt)?i=i.insert(l.key,l):f!==void 0?(o.set(l.key,f.mutation.getFieldMask()),Zs(f.mutation,l,f.mutation.getFieldMask(),ne.now())):o.set(l.key,Ke.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((l,f)=>o.set(l,f))),t.forEach(((l,f)=>c.set(l,new EA(f,o.get(l)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Xs();let s=new ce(((o,c)=>o-c)),i=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const l=t.get(u);if(l===null)return;let f=r.get(u)||Ke.empty();f=c.applyToLocalView(l,f),r.set(u,f);const p=(s.get(c.batchId)||K()).add(u);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,f=u.value,p=Nm();f.forEach((g=>{if(!i.has(g)){const E=Bm(t.get(g),r.get(g));E!==null&&p.set(g,E),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return A.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return Sv(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):bu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):A.resolve(mt());let c=Mr,u=i;return o.next((l=>A.forEach(l,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next((g=>{u=u.insert(f,g)}))))).next((()=>this.populateOverlays(e,l,i))).next((()=>this.computeViews(e,u,l,K()))).next((f=>({batchId:c,changes:Dm(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next((r=>{let s=js();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=js();return this.indexManager.getCollectionParents(e,i).next((c=>A.forEach(c,(u=>{const l=(function(p,g){return new Ot(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next((f=>{f.forEach(((p,g)=>{o=o.insert(p,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((u,l)=>{const f=l.getKey();o.get(f)===null&&(o=o.insert(f,le.newInvalidDocument(f)))}));let c=js();return o.forEach(((u,l)=>{const f=i.get(u);f!==void 0&&Zs(f.mutation,l,Ke.empty(),ne.now()),Ci(t,l)&&(c=c.insert(u,l))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wA{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return A.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Te(s.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:ga(s.bundledQuery),readTime:Te(s.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(){this.overlays=new ce(x.comparator),this.Lr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const r=mt();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),A.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(r)),A.resolve()}getOverlaysForCollection(e,t,r){const s=mt(),i=t.length+1,o=new x(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ce(((l,f)=>l-f));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let f=i.get(l.largestBatchId);f===null&&(f=mt(),i=i.insert(l.largestBatchId,f)),f.set(l.getKey(),l)}}const c=mt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((l,f)=>c.set(l,f))),!(c.size()>=s)););return A.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Du(t,r));let i=this.Lr.get(t);i===void 0&&(i=K(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AA{constructor(){this.sessionToken=ge.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(){this.kr=new ie(Pe.qr),this.Kr=new ie(Pe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Pe(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new Pe(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new x(new J([])),r=new Pe(t,e),s=new Pe(t,e+1),i=[];return this.Kr.forEachInRange([r,s],(o=>{this.Wr(o),i.push(o.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new x(new J([])),r=new Pe(t,e),s=new Pe(t,e+1);let i=K();return this.Kr.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Pe(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Pe{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return x.comparator(e.key,t.key)||$(e.Jr,t.Jr)}static Ur(e,t){return $(e.Jr,t.Jr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ie(Pe.qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Vu(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Pe(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?an:this.Yn-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Pe(t,0),s=new Pe(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],(o=>{const c=this.Zr(o.Jr);i.push(c)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ie($);return t.forEach((s=>{const i=new Pe(s,0),o=new Pe(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],(c=>{r=r.add(c.Jr)}))})),A.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;x.isDocumentKey(i)||(i=i.child(""));const o=new Pe(new x(i),0);let c=new ie($);return this.Hr.forEachWhile((u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.Jr)),!0)}),o),A.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){q(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return A.forEach(t.mutations,(s=>{const i=new Pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new Pe(t,0),s=this.Hr.firstAfterOrEqual(r);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bA{constructor(e){this.ti=e,this.docs=(function(){return new ce(x.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return A.resolve(r?r.document.mutableCopy():le.newInvalidDocument(t))}getEntries(e,t){let r=He();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():le.newInvalidDocument(s))})),A.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=He();const o=t.path,c=new x(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:f}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||_u(Kp(f),r)<=0||(s.has(f.key)||Ci(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,r,s){U(9500)}ni(e,t){return A.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new SA(this)}getSize(e){return A.resolve(this.size)}}class SA extends _g{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)})),A.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(e){this.persistence=e,this.ri=new Mt((t=>Xn(t)),Si),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.ii=0,this.si=new Lu,this.targetCount=0,this.oi=rr._r()}forEachTarget(e,t){return this.ri.forEach(((r,s)=>t(s))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),A.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new rr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.lr(t),A.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return A.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),A.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return A.resolve(r)}containsKey(e,t){return A.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(e,t){this._i={},this.overlays={},this.ai=new Ge(0),this.ui=!1,this.ui=!0,this.ci=new AA,this.referenceDelegate=e(this),this.li=new PA(this),this.indexManager=new fA,this.remoteDocumentCache=(function(s){return new bA(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new og(t),this.Pi=new wA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new vA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new RA(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const s=new CA(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return A.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class CA extends Wp{constructor(e){super(),this.currentSequenceNumber=e}}class Ia{constructor(e){this.persistence=e,this.Ri=new Lu,this.Ai=null}static Vi(e){return new Ia(e)}get di(){if(this.Ai)return this.Ai;throw U(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),A.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,(r=>{const s=x.fromPath(r);return this.mi(e,s).next((i=>{i||t.removeEntry(s,z.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return A.or([()=>A.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Go{constructor(e,t){this.persistence=e,this.fi=new Mt((r=>Me(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=gg(this,t)}static Vi(e,t){return new Go(e,t)}Ti(){}Ei(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return A.forEach(this.fi,((r,s)=>this.wr(e,r,s).next((i=>i?A.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(r++,i.removeEntry(o,z.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=wo(e.data.value)),t}wr(e,t,r){return A.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return A.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VA{constructor(e){this.serializer=e}k(e,t,r,s){const i=new ia("createOrUpgrade",t);r<1&&s>=1&&((function(u){u.createObjectStore(bi)})(e),(function(u){u.createObjectStore(ci,{keyPath:zw}),u.createObjectStore(rt,{keyPath:dd,autoIncrement:!0}).createIndex(jn,fd,{unique:!0}),u.createObjectStore(Ur)})(e),nf(e),(function(u){u.createObjectStore(Mn)})(e));let o=A.resolve();return r<3&&s>=3&&(r!==0&&((function(u){u.deleteObjectStore(qr),u.deleteObjectStore(Br),u.deleteObjectStore(Gn)})(e),nf(e)),o=o.next((()=>(function(u){const l=u.store(Gn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return l.put(Fo,f)})(i)))),r<4&&s>=4&&(r!==0&&(o=o.next((()=>(function(u,l){return l.store(rt).J().next((p=>{u.deleteObjectStore(rt),u.createObjectStore(rt,{keyPath:dd,autoIncrement:!0}).createIndex(jn,fd,{unique:!0});const g=l.store(rt),E=p.map((C=>g.put(C)));return A.waitFor(E)}))})(e,i)))),o=o.next((()=>{(function(u){u.createObjectStore(zr,{keyPath:Yw})})(e)}))),r<5&&s>=5&&(o=o.next((()=>this.gi(i)))),r<6&&s>=6&&(o=o.next((()=>((function(u){u.createObjectStore(ui)})(e),this.pi(i))))),r<7&&s>=7&&(o=o.next((()=>this.yi(i)))),r<8&&s>=8&&(o=o.next((()=>this.wi(e,i)))),r<9&&s>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&s>=10&&(o=o.next((()=>this.Si(i)))),r<11&&s>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(oa,{keyPath:Xw})})(e),(function(u){u.createObjectStore(aa,{keyPath:Zw})})(e)}))),r<12&&s>=12&&(o=o.next((()=>{(function(u){const l=u.createObjectStore(ca,{keyPath:ov});l.createIndex(Nc,av,{unique:!1}),l.createIndex(nm,cv,{unique:!1})})(e)}))),r<13&&s>=13&&(o=o.next((()=>(function(u){const l=u.createObjectStore(Lo,{keyPath:$w});l.createIndex(To,Gw),l.createIndex(Xp,Kw)})(e))).next((()=>this.bi(e,i))).next((()=>e.deleteObjectStore(Mn)))),r<14&&s>=14&&(o=o.next((()=>this.Di(e,i)))),r<15&&s>=15&&(o=o.next((()=>(function(u){u.createObjectStore(Tu,{keyPath:ev,autoIncrement:!0}).createIndex(Dc,tv,{unique:!1}),u.createObjectStore(Qs,{keyPath:nv}).createIndex(em,rv,{unique:!1}),u.createObjectStore(Js,{keyPath:sv}).createIndex(tm,iv,{unique:!1})})(e)))),r<16&&s>=16&&(o=o.next((()=>{t.objectStore(Qs).clear()})).next((()=>{t.objectStore(Js).clear()}))),r<17&&s>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(Eu,{keyPath:uv})})(e)}))),r<18&&s>=18&&Hf()&&(o=o.next((()=>{t.objectStore(Qs).clear()})).next((()=>{t.objectStore(Js).clear()}))),o}pi(e){let t=0;return e.store(Mn).ee(((r,s)=>{t+=$o(s)})).next((()=>{const r={byteSize:t};return e.store(ui).put(kc,r)}))}gi(e){const t=e.store(ci),r=e.store(rt);return t.J().next((s=>A.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,an],[i.userId,i.lastAcknowledgedBatchId]);return r.J(jn,o).next((c=>A.forEach(c,(u=>{q(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=Fn(this.serializer,u);return hg(e,i.userId,l).next((()=>{}))}))))}))))}yi(e){const t=e.store(qr),r=e.store(Mn);return e.store(Gn).get(Fo).next((s=>{const i=[];return r.ee(((o,c)=>{const u=new J(o),l=(function(p){return[0,Me(p)]})(u);i.push(t.get(l).next((f=>f?A.resolve():(p=>t.put({targetId:0,path:Me(p),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>A.waitFor(i)))}))}wi(e,t){e.createObjectStore(li,{keyPath:Jw});const r=t.store(li),s=new Mu,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:Me(u)})}};return t.store(Mn).ee({Y:!0},((o,c)=>{const u=new J(o);return i(u.popLast())})).next((()=>t.store(Ur).ee({Y:!0},(([o,c,u],l)=>{const f=pt(c);return i(f.popLast())}))))}Si(e){const t=e.store(Br);return t.ee(((r,s)=>{const i=Gs(s),o=ag(this.serializer,i);return t.put(o)}))}bi(e,t){const r=t.store(Mn),s=[];return r.ee(((i,o)=>{const c=t.store(Lo),u=(function(p){return p.document?new x(J.fromString(p.document.name).popFirst(5)):p.noDocument?x.fromSegments(p.noDocument.path):p.unknownDocument?x.fromSegments(p.unknownDocument.path):U(36783)})(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(l))})).next((()=>A.waitFor(s)))}Di(e,t){const r=t.store(rt),s=yg(this.serializer),i=new Fu(Ia.Vi,this.serializer.yt);return r.J().next((o=>{const c=new Map;return o.forEach((u=>{let l=c.get(u.userId)??K();Fn(this.serializer,u).keys().forEach((f=>l=l.add(f))),c.set(u.userId,l)})),A.forEach(c,((u,l)=>{const f=new Ce(l),p=_a.wt(this.serializer,f),g=i.getIndexManager(f),E=ya.wt(f,this.serializer,g,i.referenceDelegate);return new Ig(s,E,p,g).recalculateAndSaveOverlaysForDocumentKeys(new xc(t,Ge.ce),u).next()}))}))}}function nf(n){n.createObjectStore(qr,{keyPath:Ww}).createIndex(Iu,Qw,{unique:!0}),n.createObjectStore(Br,{keyPath:"targetId"}).createIndex(Zp,Hw,{unique:!0}),n.createObjectStore(Gn)}const Wt="IndexedDbPersistence",cc=18e5,uc=5e3,lc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Tg="main";class Uu{constructor(e,t,r,s,i,o,c,u,l,f,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=i,this.window=o,this.document=c,this.Fi=l,this.Mi=f,this.xi=p,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=g=>Promise.resolve(),!Uu.v())throw new D(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new yA(this,s),this.qi=t+Tg,this.serializer=new og(u),this.Ki=new yt(this.qi,this.xi,new VA(this.serializer)),this.ci=new aA,this.li=new mA(this.referenceDelegate,this.serializer),this.remoteDocumentCache=yg(this.serializer),this.Pi=new oA,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&Ie(Wt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,lc);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new Ge(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.Ki&&this.Ki.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>co(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Ji(e))).next((t=>this.isPrimary&&!t?this.Hi(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(En(e))return N(Wt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return N(Wt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Ls(e).get(_r).next((t=>A.resolve(this.Xi(t))))}Yi(e){return co(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,cc)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=be(t,zr);return r.J().next((s=>{const i=this.ns(s,cc),o=s.filter((c=>i.indexOf(c)===-1));return A.forEach(o,(c=>r.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?A.resolve(!0):Ls(e).get(_r).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,uc)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,lc);return!1}}return!(!this.networkEnabled||!this.inForeground)||co(e).J().next((r=>this.ns(r,uc).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&N(Wt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[bi,zr],(e=>{const t=new xc(e,Ge.ce);return this.Hi(t).next((()=>this.Yi(t)))})),this.Ki.close(),this.ls()}ns(e,t){return e.filter((r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>co(e).J().next((t=>this.ns(t,cc).map((r=>r.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return ya.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new pA(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return _a.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){N(Wt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?dv:u===17?om:u===16?hv:u===15?wu:u===14?im:u===13?sm:u===12?lv:u===11?rm:void U(60245)})(this.xi);let o;return this.Ki.runTransaction(e,s,i,(c=>(o=new xc(c,this.ai?this.ai.next():Ge.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Ji(o))).next((u=>{if(!u)throw Ie(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new D(b.FAILED_PRECONDITION,Hp);return r(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>r(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return Ls(e).get(_r).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,uc)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(b.FAILED_PRECONDITION,lc)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ls(e).put(_r,t)}static v(){return yt.v()}Hi(e){const t=Ls(e);return t.get(_r).next((r=>this.Xi(r)?(N(Wt,"Releasing primary lease."),t.delete(_r)):A.resolve()))}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ie(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;Kf()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const r=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return N(Wt,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Ie(Wt,"Failed to get zombied client id.",r),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){Ie("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ls(n){return be(n,bi)}function co(n){return be(n,zr)}function Bu(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=s}static Is(e,t){let r=K(),s=K();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new qu(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Kf()?8:Qp(Ae())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ps(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new kA;return this.ys(e,t,o).next((c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>i.result))}ws(e,t,r,s){return r.documentReadCount<this.Vs?(Ar()<=X.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Rr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Ar()<=X.DEBUG&&N("QueryEngine","Query:",Rr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Ar()<=X.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Rr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Le(t))):A.resolve())}gs(e,t){if(bd(t))return A.resolve(null);let r=Le(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=qo(t,null,"F"),r=Le(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=K(...i);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const l=this.Ss(t,c);return this.bs(t,l,o,u.readTime)?this.gs(e,qo(t,null,"F")):this.Ds(e,l,t,u)}))))})))))}ps(e,t,r,s){return bd(t)||s.isEqual(z.min())?A.resolve(null):this.fs.getDocuments(e,r).next((i=>{const o=this.Ss(t,i);return this.bs(t,o,r,s)?A.resolve(null):(Ar()<=X.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Rr(t)),this.Ds(e,o,t,Gp(s,Mr)).next((c=>c)))}))}Ss(e,t){let r=new ie(Vm(e));return t.forEach(((s,i)=>{Ci(e,i)&&(r=r.add(i))})),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return Ar()<=X.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Rr(t)),this.fs.getDocumentsMatchingQuery(e,t,tt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="LocalStore",DA=3e8;class NA{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new ce($),this.Fs=new Mt((i=>Xn(i)),Si),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ig(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function wg(n,e,t,r){return new NA(n,e,t,r)}async function vg(n,e){const t=O(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=K();for(const l of s){o.push(l.batchId);for(const f of l.mutations)u=u.add(f.key)}for(const l of i){c.push(l.batchId);for(const f of l.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((l=>({Ns:l,removedBatchIds:o,addedBatchIds:c})))}))}))}function xA(n,e){const t=O(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,l,f){const p=l.batch,g=p.keys();let E=A.resolve();return g.forEach((C=>{E=E.next((()=>f.getEntry(u,C))).next((k=>{const V=l.docVersions.get(C);q(V!==null,48541),k.version.compareTo(V)<0&&(p.applyToRemoteDocument(k,l),k.isValidDocument()&&(k.setReadTime(l.commitVersion),f.addEntry(k)))}))})),E.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=K();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Ag(n){const e=O(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function OA(n,e){const t=O(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach(((f,p)=>{const g=s.get(p);if(!g)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.li.addMatchingKeys(i,f.addedDocuments,p))));let E=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?E=E.withResumeToken(ge.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):f.resumeToken.approximateByteSize()>0&&(E=E.withResumeToken(f.resumeToken,r)),s=s.insert(p,E),(function(k,V,L){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=DA?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0})(g,E,f)&&c.push(t.li.updateTargetData(i,E))}));let u=He(),l=K();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(Rg(i,o,e.documentUpdates).next((f=>{u=f.Bs,l=f.Ls}))),!r.isEqual(z.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next((p=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return A.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,l))).next((()=>u))})).then((i=>(t.vs=s,i)))}function Rg(n,e,t){let r=K(),s=K();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=He();return t.forEach(((c,u)=>{const l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(z.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):N(zu,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)})),{Bs:o,Ls:s}}))}function MA(n,e){const t=O(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=an),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function Qr(n,e){const t=O(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.li.getTargetData(r,e).next((i=>i?(s=i,A.resolve(s)):t.li.allocateTargetId(r).next((o=>(s=new Rt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function Jr(n,e,t){const r=O(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!En(o))throw o;N(zu,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function Ko(n,e,t){const r=O(n);let s=z.min(),i=K();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,l,f){const p=O(u),g=p.Fs.get(f);return g!==void 0?A.resolve(p.vs.get(g)):p.li.getTargetData(l,f)})(r,o,Le(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,t?s:z.min(),t?i:K()))).next((c=>(Pg(r,Cm(e),c),{documents:c,ks:i})))))}function bg(n,e){const t=O(n),r=O(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>r.At(i,e).next((o=>o?o.target:null))))}function Sg(n,e){const t=O(n),r=t.Ms.get(e)||z.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.xs.getAllFromCollectionGroup(s,e,Gp(r,Mr),Number.MAX_SAFE_INTEGER))).then((s=>(Pg(t,e,s),s)))}function Pg(n,e,t){let r=n.Ms.get(e)||z.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Ms.set(e,r)}async function LA(n,e,t,r){const s=O(n);let i=K(),o=He();for(const l of t){const f=e.qs(l.metadata.name);l.document&&(i=i.add(f));const p=e.Ks(l);p.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(f,p)}const c=s.xs.newChangeBuffer({trackRemovals:!0}),u=await Qr(s,(function(f){return Le(is(J.fromString(`__bundle__/docs/${f}`)))})(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(l=>Rg(l,c,o).next((f=>(c.apply(l),f))).next((f=>s.li.removeMatchingKeysForTargetId(l,u.targetId).next((()=>s.li.addMatchingKeys(l,i,u.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(l,f.Bs,f.Ls))).next((()=>f.Bs))))))}async function FA(n,e,t=K()){const r=await Qr(n,Le(ga(e.bundledQuery))),s=O(n);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=Te(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const c=r.withResumeToken(ge.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(c.targetId,c),s.li.updateTargetData(i,c).next((()=>s.li.removeMatchingKeysForTargetId(i,r.targetId))).next((()=>s.li.addMatchingKeys(i,t,r.targetId))).next((()=>s.Pi.saveNamedQuery(i,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cg="firestore_clients";function rf(n,e){return`${Cg}_${n}_${e}`}const Vg="firestore_mutations";function sf(n,e,t){let r=`${Vg}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const kg="firestore_targets";function hc(n,e){return`${kg}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft="SharedClientState";class Ho{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static $s(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new D(s.error.code,s.error.message))),o?new Ho(e,t,s.state,i):(Ie(ft,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ti{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new D(r.error.code,r.error.message))),i?new ti(e,r.state,s):(Ie(ft,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Wo{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=Su();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=Jp(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new Wo(e,i):(Ie(ft,`Failed to parse client data for instance '${e}': ${t}`),null)}}class ju{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new ju(t.clientId,t.onlineState):(Ie(ft,`Failed to parse online state: ${e}`),null)}}class Wc{constructor(){this.activeTargetIds=Su()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class dc{constructor(e,t,r,s,i){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new ce($),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=rf(this.persistenceKey,this.zs),this.Ys=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new Wc),this.eo=new RegExp(`^${Cg}_${o}_([^_]*)$`),this.no=new RegExp(`^${Vg}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${kg}_${o}_(\\d+)$`),this.io=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this.so=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const s=this.getItem(rf(this.persistenceKey,r));if(s){const i=Wo.$s(r,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Js(r);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach(((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(hc(this.persistenceKey,e));if(s){const i=ti.$s(e,s);i&&(r=i.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(hc(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach((s=>{this.lo(s)})),this.currentUser=e,r.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return N(ft,"READ",e,t),t}setItem(e,t){N(ft,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){N(ft,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(N(ft,"EVENT",t.key,t.newValue),t.key===this.Xs)return void Ie("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Io(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=(function(i){let o=Ge.ce;if(i!=null)try{const c=JSON.parse(i);q(typeof c=="number",30636,{yo:i}),o=c}catch(c){Ie(ft,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);r!==Ge.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map((s=>this.syncEngine.So(s))))}}}else this.Zs.push(t)}))}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const s=new Ho(this.currentUser,e,t,r),i=sf(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=sf(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const s=hc(this.persistenceKey,e),i=new ti(e,t,r);this.setItem(s,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Io(e);return Wo.$s(r,t)}Vo(e,t){const r=this.no.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return Ho.$s(new Ce(i),s,t)}fo(e,t){const r=this.ro.exec(e),s=Number(r[1]);return ti.$s(s,t)}_o(e){return ju.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);N(ft,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(r),o=[],c=[];return i.forEach((u=>{s.has(u)||o.push(u)})),s.forEach((u=>{i.has(u)||c.push(u)})),this.syncEngine.Co(o,c).then((()=>{this.Hs=r}))}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Su();return e.forEach(((r,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class Dg{constructor(){this.vo=new Wc,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Wc,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UA{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const of="ConnectivityMonitor";class af{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){N(of,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){N(of,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uo=null;function Qc(){return uo===null?uo=(function(){return 268435456+Math.round(2147483648*Math.random())})():uo++,"0x"+uo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc="RestConnection",BA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class qA{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===di?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const o=Qc(),c=this.Qo(e,t.toUriEncodedString());N(fc,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:l}=new URL(c),f=_n(l);return this.zo(e,c,u,r,f).then((p=>(N(fc,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw Je(fc,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}jo(e,t,r,s,i,o){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+ss})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const r=BA[e];let s=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zA{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe="WebChannelConnection",Fs=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Dr extends qA{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Dr.c_){const e=Mp();Fs(e,Op.STAT_EVENT,(t=>{t.stat===bc.PROXY?N(xe,"STAT_EVENT: detected buffering proxy"):t.stat===bc.NOPROXY&&N(xe,"STAT_EVENT: detected no buffering proxy")})),Dr.c_=!0}}zo(e,t,r,s,i){const o=Qc();return new Promise(((c,u)=>{const l=new Np;l.setWithCredentials(!0),l.listenOnce(xp.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case yo.NO_ERROR:const p=l.getResponseJson();N(xe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case yo.TIMEOUT:N(xe,`RPC '${e}' ${o} timed out`),u(new D(b.DEADLINE_EXCEEDED,"Request time out"));break;case yo.HTTP_ERROR:const g=l.getStatus();if(N(xe,`RPC '${e}' ${o} failed with status:`,g,"response text:",l.getResponseText()),g>0){let E=l.getResponseJson();Array.isArray(E)&&(E=E[0]);const C=E==null?void 0:E.error;if(C&&C.status&&C.message){const k=(function(L){const B=L.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(B)>=0?B:b.UNKNOWN})(C.status);u(new D(k,C.message))}else u(new D(b.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new D(b.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{N(xe,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);N(xe,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",f,r,15)}))}T_(e,t,r){const s=Qc(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=i.join("");N(xe,`Creating RPC '${e}' stream ${s}: ${l}`,c);const f=o.createWebChannel(l,c);this.E_(f);let p=!1,g=!1;const E=new zA({Jo:C=>{g?N(xe,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(p||(N(xe,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),N(xe,`RPC '${e}' stream ${s} sending:`,C),f.send(C))},Ho:()=>f.close()});return Fs(f,zs.EventType.OPEN,(()=>{g||(N(xe,`RPC '${e}' stream ${s} transport opened.`),E.i_())})),Fs(f,zs.EventType.CLOSE,(()=>{g||(g=!0,N(xe,`RPC '${e}' stream ${s} transport closed`),E.o_(),this.I_(f))})),Fs(f,zs.EventType.ERROR,(C=>{g||(g=!0,Je(xe,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),E.o_(new D(b.UNAVAILABLE,"The operation could not be completed")))})),Fs(f,zs.EventType.MESSAGE,(C=>{var k;if(!g){const V=C.data[0];q(!!V,16349);const L=V,B=(L==null?void 0:L.error)||((k=L[0])==null?void 0:k.error);if(B){N(xe,`RPC '${e}' stream ${s} received error:`,B);const F=B.status;let G=(function(T){const _=Ee[T];if(_!==void 0)return $m(_)})(F),H=B.message;F==="NOT_FOUND"&&H.includes("database")&&H.includes("does not exist")&&H.includes(this.databaseId.database)&&Je(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),G===void 0&&(G=b.INTERNAL,H="Unknown error status: "+F+" with message "+B.message),g=!0,E.o_(new D(G,H)),f.close()}else N(xe,`RPC '${e}' stream ${s} received:`,V),E.__(V)}})),Dr.u_(),setTimeout((()=>{E.s_()}),0),E}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Lp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jA(n){return new Dr(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ng(){return typeof window<"u"?window:null}function So(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(n){return new Qv(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Dr.c_=!1;class $u{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf="PersistentStream";class xg{constructor(e,t,r,s,i,o,c,u){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new $u(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(Ie(t.toString()),Ie("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new D(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return N(cf,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(N(cf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class $A extends xg{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Xv(this.serializer,e),r=(function(i){if(!("targetChange"in i))return z.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?Te(o.readTime):z.min()})(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=jc(this.serializer),t.addTarget=(function(i,o){let c;const u=o.target;if(c=Uo(u)?{documents:Zm(i,u)}:{query:ma(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Wm(i,o.resumeToken);const l=qc(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(z.min())>0){c.readTime=Wr(i,o.snapshotVersion.toTimestamp());const l=qc(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c})(this.serializer,e);const r=eA(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=jc(this.serializer),t.removeTarget=e,this.q_(t)}}class GA extends xg{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Zv(e.writeResults,e.commitTime),r=Te(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=jc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>_i(this.serializer,r)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KA{}class HA extends KA{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Wo(e,zc(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(b.UNKNOWN,i.toString())}))}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,zc(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(b.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function WA(n,e,t,r){return new HA(n,e,t,r)}class QA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ie(t),this.aa=!1):N("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr="RemoteStore";class JA{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((o=>{r.enqueueAndForget((async()=>{vn(this)&&(N(sr,"Restarting streams for network reachability change."),await(async function(u){const l=O(u);l.Ia.add(4),await cs(l),l.Va.set("Unknown"),l.Ia.delete(4),await Ni(l)})(this))}))})),this.Va=new QA(r,s)}}async function Ni(n){if(vn(n))for(const e of n.Ra)await e(!0)}async function cs(n){for(const e of n.Ra)await e(!1)}function Ta(n,e){const t=O(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Hu(t)?Ku(t):ls(t).O_()&&Gu(t,e))}function Yr(n,e){const t=O(n),r=ls(t);t.Ea.delete(e),r.O_()&&Og(t,e),t.Ea.size===0&&(r.O_()?r.L_():vn(t)&&t.Va.set("Unknown"))}function Gu(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ls(n).Z_(e)}function Og(n,e){n.da.$e(e),ls(n).X_(e)}function Ku(n){n.da=new Gv({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),ls(n).start(),n.Va.ua()}function Hu(n){return vn(n)&&!ls(n).x_()&&n.Ea.size>0}function vn(n){return O(n).Ia.size===0}function Mg(n){n.da=void 0}async function YA(n){n.Va.set("Online")}async function XA(n){n.Ea.forEach(((e,t)=>{Gu(n,e)}))}async function ZA(n,e){Mg(n),Hu(n)?(n.Va.ha(e),Ku(n)):n.Va.set("Unknown")}async function eR(n,e,t){if(n.Va.set("Online"),e instanceof Hm&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))})(n,e)}catch(r){N(sr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Qo(n,r)}else if(e instanceof Ro?n.da.Xe(e):e instanceof Km?n.da.st(e):n.da.tt(e),!t.isEqual(z.min()))try{const r=await Ag(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach(((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(l);f&&i.Ea.set(l,f.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,l)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(ge.EMPTY_BYTE_STRING,f.snapshotVersion)),Og(i,u);const p=new Rt(f.target,u,l,f.sequenceNumber);Gu(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){N(sr,"Failed to raise snapshot:",r),await Qo(n,r)}}async function Qo(n,e,t){if(!En(e))throw e;n.Ia.add(1),await cs(n),n.Va.set("Offline"),t||(t=()=>Ag(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{N(sr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Ni(n)}))}function Lg(n,e){return e().catch((t=>Qo(n,t,e)))}async function us(n){const e=O(n),t=pn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:an;for(;tR(e);)try{const s=await MA(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,nR(e,s)}catch(s){await Qo(e,s)}Fg(e)&&Ug(e)}function tR(n){return vn(n)&&n.Ta.length<10}function nR(n,e){n.Ta.push(e);const t=pn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Fg(n){return vn(n)&&!pn(n).x_()&&n.Ta.length>0}function Ug(n){pn(n).start()}async function rR(n){pn(n).ra()}async function sR(n){const e=pn(n);for(const t of n.Ta)e.ea(t.mutations)}async function iR(n,e,t){const r=n.Ta.shift(),s=ku.from(r,e,t);await Lg(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await us(n)}async function oR(n,e){e&&pn(n).Y_&&await(async function(r,s){if((function(o){return jm(o)&&o!==b.ABORTED})(s.code)){const i=r.Ta.shift();pn(r).B_(),await Lg(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await us(r)}})(n,e),Fg(n)&&Ug(n)}async function uf(n,e){const t=O(n);t.asyncQueue.verifyOperationInProgress(),N(sr,"RemoteStore received new credentials");const r=vn(t);t.Ia.add(3),await cs(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Ni(t)}async function Jc(n,e){const t=O(n);e?(t.Ia.delete(2),await Ni(t)):e||(t.Ia.add(2),await cs(t),t.Va.set("Unknown"))}function ls(n){return n.ma||(n.ma=(function(t,r,s){const i=O(t);return i.sa(),new $A(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:YA.bind(null,n),Yo:XA.bind(null,n),t_:ZA.bind(null,n),H_:eR.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),Hu(n)?Ku(n):n.Va.set("Unknown")):(await n.ma.stop(),Mg(n))}))),n.ma}function pn(n){return n.fa||(n.fa=(function(t,r,s){const i=O(t);return i.sa(),new GA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:rR.bind(null,n),t_:oR.bind(null,n),ta:sR.bind(null,n),na:iR.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await us(n)):(await n.fa.stop(),n.Ta.length>0&&(N(sr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ke,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Wu(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function hs(n,e){if(Ie("AsyncQueue",`${e}: ${n}`),En(n))return new D(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{static emptySet(e){return new Kn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||x.comparator(t.key,r.key):(t,r)=>x.comparator(t.key,r.key),this.keyedMap=js(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Kn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Kn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(){this.ga=new ce(x.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):U(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class ir{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new ir(e,t,Kn.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Pi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class cR{constructor(){this.queries=hf(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=O(t),i=s.queries;s.queries=hf(),i.forEach(((o,c)=>{for(const u of c.Sa)u.onError(r)}))})(this,new D(b.ABORTED,"Firestore shutting down"))}}function hf(){return new Mt((n=>Pm(n)),Pi)}async function Qu(n,e){const t=O(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new aR,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=hs(o,`Initialization of query '${Rr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Yu(t)}async function Ju(n,e){const t=O(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function uR(n,e){const t=O(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&Yu(t)}function lR(n,e,t){const r=O(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Yu(n){n.Ca.forEach((e=>{e.next()}))}var Yc,df;(df=Yc||(Yc={})).Ma="default",df.Cache="cache";class Xu{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ir(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=ir.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Yc.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e){this.serializer=e}qs(e){return It(this.serializer,e)}Ks(e){return e.metadata.exists?pa(this.serializer,e.document,!1):le.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return Te(e)}}class Zu{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=qg(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const r=J.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,r=new ff(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.qs(s.metadata.name);for(const o of s.metadata.queries){const c=(t.get(o)||K()).add(i);t.set(o,c)}}return t}async ja(e){const t=await LA(e,new ff(this.serializer),this.Qa,this.$a.id),r=this.za(this.documents);for(const s of this.Wa)await FA(e,s,r.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function qg(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(e){this.key=e}}class jg{constructor(e){this.key=e}}class $g{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=K(),this.mutatedKeys=K(),this.eu=Vm(e),this.tu=new Kn(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new lf,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const g=s.get(f),E=Ci(this.query,p)?p:null,C=!!g&&this.mutatedKeys.has(g.key),k=!!E&&(E.hasLocalMutations||this.mutatedKeys.has(E.key)&&E.hasCommittedMutations);let V=!1;g&&E?g.data.isEqual(E.data)?C!==k&&(r.track({type:3,doc:E}),V=!0):this.su(g,E)||(r.track({type:2,doc:E}),V=!0,(u&&this.eu(E,u)>0||l&&this.eu(E,l)<0)&&(c=!0)):!g&&E?(r.track({type:0,doc:E}),V=!0):g&&!E&&(r.track({type:1,doc:g}),V=!0,(u||l)&&(c=!0)),V&&(E?(o=o.add(E),i=k?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:o,iu:r,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,p)=>(function(E,C){const k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Vt:V})}};return k(E)-k(C)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,l=u!==this.Xa;return this.Xa=u,o.length!==0||l?{snapshot:new ir(this.query,e.tu,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new lf,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=K(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new jg(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new zg(r))})),t}cu(e){this.Za=e.ks,this.Ya=K();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return ir.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const An="SyncEngine";class hR{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class dR{constructor(e){this.key=e,this.hu=!1}}class fR{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Mt((c=>Pm(c)),Pi),this.Eu=new Map,this.Iu=new Set,this.Ru=new ce(x.comparator),this.Au=new Map,this.Vu=new Lu,this.du={},this.mu=new Map,this.fu=rr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function pR(n,e,t=!0){const r=Ea(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Gg(r,e,t,!0),s}async function mR(n,e){const t=Ea(n);await Gg(t,e,!0,!1)}async function Gg(n,e,t,r){const s=await Qr(n.localStore,Le(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await el(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Ta(n.remoteStore,s),c}async function el(n,e,t,r,s){n.pu=(p,g,E)=>(async function(k,V,L,B){let F=V.view.ru(L);F.bs&&(F=await Ko(k.localStore,V.query,!1).then((({documents:T})=>V.view.ru(T,F))));const G=B&&B.targetChanges.get(V.targetId),H=B&&B.targetMismatches.get(V.targetId)!=null,Q=V.view.applyChanges(F,k.isPrimaryClient,G,H);return Xc(k,V.targetId,Q.au),Q.snapshot})(n,p,g,E);const i=await Ko(n.localStore,e,!0),o=new $g(e,i.ks),c=o.ru(i.documents),u=Di.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);Xc(n,t,l.au);const f=new hR(e,t,o);return n.Tu.set(e,f),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),l.snapshot}async function gR(n,e,t){const r=O(n),s=r.Tu.get(e),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter((o=>!Pi(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Jr(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Yr(r.remoteStore,s.targetId),Xr(r,s.targetId)})).catch(Tn)):(Xr(r,s.targetId),await Jr(r.localStore,s.targetId,!0))}async function _R(n,e){const t=O(n),r=t.Tu.get(e),s=t.Eu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Yr(t.remoteStore,r.targetId))}async function yR(n,e,t){const r=sl(n);try{const s=await(function(o,c){const u=O(o),l=ne.now(),f=c.reduce(((E,C)=>E.add(C.key)),K());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",(E=>{let C=He(),k=K();return u.xs.getEntries(E,f).next((V=>{C=V,C.forEach(((L,B)=>{B.isValidDocument()||(k=k.add(L))}))})).next((()=>u.localDocuments.getOverlayedDocuments(E,C))).next((V=>{p=V;const L=[];for(const B of c){const F=qv(B,p.get(B.key).overlayedDocument);F!=null&&L.push(new Lt(B.key,F,_m(F.value.mapValue),pe.exists(!0)))}return u.mutationQueue.addMutationBatch(E,l,L,c)})).next((V=>{g=V;const L=V.applyToLocalDocumentSet(p,k);return u.documentOverlayCache.saveOverlays(E,V.batchId,L)}))})).then((()=>({batchId:g.batchId,changes:Dm(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let l=o.du[o.currentUser.toKey()];l||(l=new ce($)),l=l.insert(c,u),o.du[o.currentUser.toKey()]=l})(r,s.batchId,t),await Ft(r,s.changes),await us(r.remoteStore)}catch(s){const i=hs(s,"Failed to persist write");t.reject(i)}}async function Kg(n,e){const t=O(n);try{const r=await OA(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?q(o.hu,14607):s.removedDocuments.size>0&&(q(o.hu,42227),o.hu=!1))})),await Ft(t,r,e)}catch(r){await Tn(r)}}function pf(n,e,t){const r=O(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=O(o);u.onlineState=c;let l=!1;u.queries.forEach(((f,p)=>{for(const g of p.Sa)g.va(c)&&(l=!0)})),l&&Yu(u)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function IR(n,e,t){const r=O(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new ce(x.comparator);o=o.insert(i,le.newNoDocument(i,z.min()));const c=K().add(i),u=new ki(z.min(),new Map,new ce($),o,c);await Kg(r,u),r.Ru=r.Ru.remove(i),r.Au.delete(e),rl(r)}else await Jr(r.localStore,e,!1).then((()=>Xr(r,e,t))).catch(Tn)}async function TR(n,e){const t=O(n),r=e.batch.batchId;try{const s=await xA(t.localStore,e);nl(t,r,null),tl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ft(t,s)}catch(s){await Tn(s)}}async function ER(n,e,t){const r=O(n);try{const s=await(function(o,c){const u=O(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let f;return u.mutationQueue.lookupMutationBatch(l,c).next((p=>(q(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(l,p)))).next((()=>u.mutationQueue.performConsistencyCheck(l))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(l,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,f))).next((()=>u.localDocuments.getDocuments(l,f)))}))})(r.localStore,e);nl(r,e,t),tl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ft(r,s)}catch(s){await Tn(s)}}async function wR(n,e){const t=O(n);vn(t.remoteStore)||N(An,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const c=O(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u)))})(t.localStore);if(r===an)return void e.resolve();const s=t.mu.get(r)||[];s.push(e),t.mu.set(r,s)}catch(r){const s=hs(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function tl(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function nl(n,e,t){const r=O(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function Xr(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||Hg(n,r)}))}function Hg(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Yr(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),rl(n))}function Xc(n,e,t){for(const r of t)r instanceof zg?(n.Vu.addReference(r.key,e),vR(n,r)):r instanceof jg?(N(An,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Hg(n,r.key)):U(19791,{wu:r})}function vR(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(N(An,"New document in limbo: "+t),n.Iu.add(r),rl(n))}function rl(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new x(J.fromString(e)),r=n.fu.next();n.Au.set(r,new dR(t)),n.Ru=n.Ru.insert(t,r),Ta(n.remoteStore,new Rt(Le(is(t.path)),r,"TargetPurposeLimboResolution",Ge.ce))}}async function Ft(n,e,t){const r=O(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,u)=>{o.push(r.pu(u,e,t).then((l=>{var f;if((l||t)&&r.isPrimaryClient){const p=l?!l.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(l){s.push(l);const p=qu.Is(u.targetId,l);i.push(p)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(u,l){const f=O(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>A.forEach(l,(g=>A.forEach(g.Ts,(E=>f.persistence.referenceDelegate.addReference(p,g.targetId,E))).next((()=>A.forEach(g.Es,(E=>f.persistence.referenceDelegate.removeReference(p,g.targetId,E)))))))))}catch(p){if(!En(p))throw p;N(zu,"Failed to update sequence numbers: "+p)}for(const p of l){const g=p.targetId;if(!p.fromCache){const E=f.vs.get(g),C=E.snapshotVersion,k=E.withLastLimboFreeSnapshotVersion(C);f.vs=f.vs.insert(g,k)}}})(r.localStore,i))}async function AR(n,e){const t=O(n);if(!t.currentUser.isEqual(e)){N(An,"User change. New user:",e.toKey());const r=await vg(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new D(b.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ft(t,r.Ns)}}function RR(n,e){const t=O(n),r=t.Au.get(e);if(r&&r.hu)return K().add(r.key);{let s=K();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function bR(n,e){const t=O(n),r=await Ko(t.localStore,e.query,!0),s=e.view.cu(r);return t.isPrimaryClient&&Xc(t,e.targetId,s.au),s}async function SR(n,e){const t=O(n);return Sg(t.localStore,e).then((r=>Ft(t,r)))}async function PR(n,e,t,r){const s=O(n),i=await(function(c,u){const l=O(c),f=O(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(p=>f.Xn(p,u).next((g=>g?l.localDocuments.getDocuments(p,g):A.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await us(s.remoteStore):t==="acknowledged"||t==="rejected"?(nl(s,e,r||null),tl(s,e),(function(c,u){O(O(c).mutationQueue).nr(u)})(s.localStore,e)):U(6720,"Unknown batchState",{Su:t}),await Ft(s,i)):N(An,"Cannot apply mutation batch with id: "+e)}async function CR(n,e){const t=O(n);if(Ea(t),sl(t),e===!0&&t.gu!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await mf(t,r.toArray());t.gu=!0,await Jc(t.remoteStore,!0);for(const i of s)Ta(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const r=[];let s=Promise.resolve();t.Eu.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then((()=>(Xr(t,o),Jr(t.localStore,o,!0)))),Yr(t.remoteStore,o)})),await s,await mf(t,r),(function(o){const c=O(o);c.Au.forEach(((u,l)=>{Yr(c.remoteStore,l)})),c.Vu.zr(),c.Au=new Map,c.Ru=new ce(x.comparator)})(t),t.gu=!1,await Jc(t.remoteStore,!1)}}async function mf(n,e,t){const r=O(n),s=[],i=[];for(const o of e){let c;const u=r.Eu.get(o);if(u&&u.length!==0){c=await Qr(r.localStore,Le(u[0]));for(const l of u){const f=r.Tu.get(l),p=await bR(r,f);p.snapshot&&i.push(p.snapshot)}}else{const l=await bg(r.localStore,o);c=await Qr(r.localStore,l),await el(r,Wg(l),o,!1,c.resumeToken)}s.push(c)}return r.Pu.H_(i),s}function Wg(n){return Rm(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function VR(n){return(function(t){return O(O(t).persistence).hs()})(O(n).localStore)}async function kR(n,e,t,r){const s=O(n);if(s.gu)return void N(An,"Ignoring unexpected query state notification.");const i=s.Eu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await Sg(s.localStore,Cm(i[0])),c=ki.createSynthesizedRemoteEventForCurrentChange(e,t==="current",ge.EMPTY_BYTE_STRING);await Ft(s,o,c);break}case"rejected":await Jr(s.localStore,e,!0),Xr(s,e,r);break;default:U(64155,t)}}async function DR(n,e,t){const r=Ea(n);if(r.gu){for(const s of e){if(r.Eu.has(s)&&r.sharedClientState.isActiveQueryTarget(s)){N(An,"Adding an already active target "+s);continue}const i=await bg(r.localStore,s),o=await Qr(r.localStore,i);await el(r,Wg(i),o.targetId,!1,o.resumeToken),Ta(r.remoteStore,o)}for(const s of t)r.Eu.has(s)&&await Jr(r.localStore,s,!1).then((()=>{Yr(r.remoteStore,s),Xr(r,s)})).catch(Tn)}}function Ea(n){const e=O(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Kg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=RR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=IR.bind(null,e),e.Pu.H_=uR.bind(null,e.eventManager),e.Pu.yu=lR.bind(null,e.eventManager),e}function sl(n){const e=O(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=TR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ER.bind(null,e),e}function NR(n,e,t){const r=O(n);(async function(i,o,c){try{const u=await o.getMetadata();if(await(function(E,C){const k=O(E),V=Te(C.createTime);return k.persistence.runTransaction("hasNewerBundle","readonly",(L=>k.Pi.getBundleMetadata(L,C.id))).then((L=>!!L&&L.createTime.compareTo(V)>=0))})(i.localStore,u))return await o.close(),c._completeWith((function(E){return{taskState:"Success",documentsLoaded:E.totalDocuments,bytesLoaded:E.totalBytes,totalDocuments:E.totalDocuments,totalBytes:E.totalBytes}})(u)),Promise.resolve(new Set);c._updateProgress(qg(u));const l=new Zu(u,o.serializer);let f=await o.bu();for(;f;){const g=await l.Ga(f);g&&c._updateProgress(g),f=await o.bu()}const p=await l.ja(i.localStore);return await Ft(i,p.Ha,void 0),await(function(E,C){const k=O(E);return k.persistence.runTransaction("Save bundle","readwrite",(V=>k.Pi.saveBundleMetadata(V,C)))})(i.localStore,u),c._completeWith(p.progress),Promise.resolve(p.Ja)}catch(u){return Je(An,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then((s=>{r.sharedClientState.notifyBundleLoaded(s)}))}class Zr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ur(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return wg(this.persistence,new Eg,e.initialUser,this.serializer)}Cu(e){return new Fu(Ia.Vi,this.serializer)}Du(e){return new Dg}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Zr.provider={build:()=>new Zr};class il extends Zr{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){q(this.persistence.referenceDelegate instanceof Go,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new mg(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Oe.withCacheSize(this.cacheSizeBytes):Oe.DEFAULT;return new Fu((r=>Go.Vi(r,t)),this.serializer)}}class ol extends Zr{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await sl(this.xu.syncEngine),await us(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return wg(this.persistence,new Eg,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new mg(r,e.asyncQueue,t)}Mu(e,t){const r=new Bw(t,this.persistence);return new Uw(e.asyncQueue,r)}Cu(e){const t=Bu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Oe.withCacheSize(this.cacheSizeBytes):Oe.DEFAULT;return new Uu(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,Ng(),So(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Dg}}class Qg extends ol{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof dc&&(this.sharedClientState.syncEngine={bo:PR.bind(null,t),Do:kR.bind(null,t),Co:DR.bind(null,t),hs:VR.bind(null,t),So:SR.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi((async r=>{await CR(this.xu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Du(e){const t=Ng();if(!dc.v(t))throw new D(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Bu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new dc(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class mn{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>pf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=AR.bind(null,this.syncEngine),await Jc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new cR})()}createDatastore(e){const t=ur(e.databaseInfo.databaseId),r=jA(e.databaseInfo);return WA(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new JA(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>pf(this.syncEngine,t,0)),(function(){return af.v()?new af:new UA})())}createSyncEngine(e,t){return(function(s,i,o,c,u,l,f){const p=new fR(s,i,o,c,u,l);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=O(s);N(sr,"RemoteStore shutting down."),i.Ia.add(5),await cs(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}mn.provider={build:()=>new mn};function gf(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ie("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xR{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new ke,this.buffer=new Uint8Array,this.Lu=(function(){return new TextDecoder("utf-8")})(),this.ku().then((r=>{r&&r.Ua()?this.metadata.resolve(r.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.Ka)}`))}),(r=>this.metadata.reject(r)))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.Ku(`length string (${t}) is not valid number`);const s=await this.Uu(r);return new Bg(JSON.parse(s),e.length+r)}$u(){return this.buffer.findIndex((e=>e===123))}async qu(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OR{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let r=this.bu();if(!r||!r.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(r==null?void 0:r.Ka)}`);this.metadata=r;do r=this.bu(),r!==null&&this.elements.push(r);while(r!==null)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new Bg(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new D(b.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let MR=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(b.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=O(s),c={documents:i.map((p=>gi(o.serializer,p)))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,J.emptyPath(),c,i.length),l=new Map;u.forEach((p=>{const g=Yv(o.serializer,p);l.set(g.key.toString(),g)}));const f=[];return i.forEach((p=>{const g=l.get(p.toString());q(!!g,55234,{key:p}),f.push(g)})),f})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new as(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const s=x.fromPath(r);this.mutations.push(new Cu(s,this.precondition(s)))})),await(async function(r,s){const i=O(r),o={writes:s.map((c=>_i(i.serializer,c)))};await i.Wo("Commit",i.serializer.databaseId,J.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw U(50498,{Gu:e.constructor.name});t=z.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(b.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(z.min())?pe.exists(!1):pe.updateTime(t):pe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(z.min()))throw new D(b.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return pe.updateTime(t)}return pe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new $u(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_((async()=>{const e=new MR(this.datastore),t=this.Hu(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Zu(s)}))))})).catch((r=>{this.Zu(r)}))}))}Hu(e){try{const t=this.updateFunction(e);return!Ri(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Ju(),Promise.resolve())))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!jm(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn="FirestoreClient";class FR{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ce.UNAUTHENTICATED,this.clientId=ra.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{N(gn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(N(gn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ke;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=hs(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function pc(n,e){n.asyncQueue.verifyOperationInProgress(),N(gn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await vg(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function _f(n,e){n.asyncQueue.verifyOperationInProgress();const t=await al(n);N(gn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>uf(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>uf(e.remoteStore,s))),n._onlineComponents=e}async function al(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(gn,"Using user provided OfflineComponentProvider");try{await pc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Je("Error using user provided cache. Falling back to memory cache: "+t),await pc(n,new Zr)}}else N(gn,"Using default OfflineComponentProvider"),await pc(n,new il(void 0));return n._offlineComponents}async function va(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(gn,"Using user provided OnlineComponentProvider"),await _f(n,n._uninitializedComponentsProvider._online)):(N(gn,"Using default OnlineComponentProvider"),await _f(n,new mn))),n._onlineComponents}function Jg(n){return al(n).then((e=>e.persistence))}function ds(n){return al(n).then((e=>e.localStore))}function Yg(n){return va(n).then((e=>e.remoteStore))}function cl(n){return va(n).then((e=>e.syncEngine))}function Xg(n){return va(n).then((e=>e.datastore))}async function es(n){const e=await va(n),t=e.eventManager;return t.onListen=pR.bind(null,e.syncEngine),t.onUnlisten=gR.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=mR.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=_R.bind(null,e.syncEngine),t}function UR(n){return n.asyncQueue.enqueue((async()=>{const e=await Jg(n),t=await Yg(n);return e.setNetworkEnabled(!0),(function(s){const i=O(s);return i.Ia.delete(0),Ni(i)})(t)}))}function BR(n){return n.asyncQueue.enqueue((async()=>{const e=await Jg(n),t=await Yg(n);return e.setNetworkEnabled(!1),(async function(s){const i=O(s);i.Ia.add(0),await cs(i),i.Va.set("Offline")})(t)}))}function qR(n,e,t,r){const s=new wa(r),i=new Xu(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>Qu(await es(n),i))),()=>{s.Nu(),n.asyncQueue.enqueueAndForget((async()=>Ju(await es(n),i)))}}function zR(n,e){const t=new ke;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await(function(l,f){const p=O(l);return p.persistence.runTransaction("read document","readonly",(g=>p.localDocuments.getDocument(g,f)))})(s,i);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new D(b.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=hs(c,`Failed to get document '${i} from cache`);o.reject(u)}})(await ds(n),e,t))),t.promise}function Zg(n,e,t={}){const r=new ke;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const f=new wa({next:g=>{f.Nu(),o.enqueueAndForget((()=>Ju(i,p)));const E=g.docs.has(c);!E&&g.fromCache?l.reject(new D(b.UNAVAILABLE,"Failed to get document because the client is offline.")):E&&g.fromCache&&u&&u.source==="server"?l.reject(new D(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new Xu(is(c.path),f,{includeMetadataChanges:!0,qa:!0});return Qu(i,p)})(await es(n),n.asyncQueue,e,t,r))),r.promise}function jR(n,e){const t=new ke;return n.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const c=await Ko(s,i,!0),u=new $g(i,c.ks),l=u.ru(c.documents),f=u.applyChanges(l,!1);o.resolve(f.snapshot)}catch(c){const u=hs(c,`Failed to execute query '${i} against cache`);o.reject(u)}})(await ds(n),e,t))),t.promise}function e_(n,e,t={}){const r=new ke;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,l){const f=new wa({next:g=>{f.Nu(),o.enqueueAndForget((()=>Ju(i,p))),g.fromCache&&u.source==="server"?l.reject(new D(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(g)},error:g=>l.reject(g)}),p=new Xu(c,f,{includeMetadataChanges:!0,qa:!0});return Qu(i,p)})(await es(n),n.asyncQueue,e,t,r))),r.promise}function $R(n,e,t){const r=new ke;return n.asyncQueue.enqueueAndForget((async()=>{try{const s=await Xg(n);r.resolve((async function(o,c,u){var k;const l=O(o),{request:f,gt:p,parent:g}=eg(l.serializer,bm(c),u);l.connection.qo||delete f.parent;const E=(await l.jo("RunAggregationQuery",l.serializer.databaseId,g,f,1)).filter((V=>!!V.result));q(E.length===1,64727);const C=(k=E[0].result)==null?void 0:k.aggregateFields;return Object.keys(C).reduce(((V,L)=>(V[p[L]]=C[L],V)),{})})(s,e,t))}catch(s){r.reject(s)}})),r.promise}function GR(n,e){const t=new ke;return n.asyncQueue.enqueueAndForget((async()=>yR(await cl(n),e,t))),t.promise}function KR(n,e){const t=new wa(e);return n.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).Ca.add(i),i.next()})(await es(n),t))),()=>{t.Nu(),n.asyncQueue.enqueueAndForget((async()=>(function(s,i){O(s).Ca.delete(i)})(await es(n),t)))}}function HR(n,e,t){const r=new ke;return n.asyncQueue.enqueueAndForget((async()=>{const s=await Xg(n);new LR(n.asyncQueue,s,t,e,r).ju()})),r.promise}function WR(n,e,t,r){const s=(function(o,c){let u;return u=typeof o=="string"?Gm().encode(o):o,(function(f,p){return new xR(f,p)})((function(f,p){if(f instanceof Uint8Array)return gf(f,p);if(f instanceof ArrayBuffer)return gf(new Uint8Array(f),p);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(u),c)})(t,ur(e));n.asyncQueue.enqueueAndForget((async()=>{NR(await cl(n),s,r)}))}function QR(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){const i=O(r);return i.persistence.runTransaction("Get named query","readonly",(o=>i.Pi.getNamedQuery(o,s)))})(await ds(n),e)))}function t_(n,e){return(function(r,s){return new OR(r,s)})(n,e)}function JR(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,s){const i=O(r),o=i.indexManager,c=[];return i.persistence.runTransaction("Configure indexes","readwrite",(u=>o.getFieldIndexes(u).next((l=>(function(p,g,E,C,k){p=[...p],g=[...g],p.sort(E),g.sort(E);const V=p.length,L=g.length;let B=0,F=0;for(;B<L&&F<V;){const G=E(p[F],g[B]);G<0?k(p[F++]):G>0?C(g[B++]):(B++,F++)}for(;B<L;)C(g[B++]);for(;F<V;)k(p[F++])})(l,s,Ow,(f=>{c.push(o.addFieldIndex(u,f))}),(f=>{c.push(o.deleteFieldIndex(u,f))})))).next((()=>A.waitFor(c)))))})(await ds(n),e)))}function YR(n,e){return n.asyncQueue.enqueue((async()=>(function(r,s){O(r).Cs.As=s})(await ds(n),e)))}function XR(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=O(t),s=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await ds(n))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZR="ComponentProvider",yf=new Map;function eb(n,e,t,r,s){return new mv(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,n_(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_="firestore.googleapis.com",If=!0;class Tf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=r_,this.ssl=If}else this.host=e.host,this.ssl=e.ssl??If;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=lg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<pg)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=n_(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class xi{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Tf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Tf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Bp;switch(r.type){case"firstParty":return new Pw(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=yf.get(t);r&&(N(ZR,"Removing Datastore"),yf.delete(t),r.terminate())})(this),Promise.resolve()}}function s_(n,e,t,r={}){var l;n=Y(n,xi);const s=_n(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Zo(`https://${c}`),i.host!==r_&&i.host!==c&&Je("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!ut(u,o)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Ce.MOCK_USER;else{f=$f(r.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new D(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Ce(g)}n._authCredentials=new Rw(new Up(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Re(this.firestore,e,this._query)}}class se{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new at(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new se(this.firestore,e,this._key)}toJSON(){return{type:se._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(cr(t,se._jsonSchema))return new se(e,r||null,new x(J.fromString(t.referencePath)))}}se._jsonSchemaVersion="firestore/documentReference/1.0",se._jsonSchema={type:we("string",se._jsonSchemaVersion),referencePath:we("string")};class at extends Re{constructor(e,t,r){super(e,t,is(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new se(this.firestore,null,new x(e))}withConverter(e){return new at(this.firestore,e,this._path)}}function tb(n,e,...t){if(n=ee(n),gu("collection","path",e),n instanceof xi){const r=J.fromString(e,...t);return ad(r),new at(n,null,r)}{if(!(n instanceof se||n instanceof at))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return ad(r),new at(n.firestore,null,r)}}function nb(n,e){if(n=Y(n,xi),gu("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Re(n,null,(function(r){return new Ot(J.emptyPath(),r)})(e))}function i_(n,e,...t){if(n=ee(n),arguments.length===1&&(e=ra.newId()),gu("doc","path",e),n instanceof xi){const r=J.fromString(e,...t);return od(r),new se(n,null,new x(r))}{if(!(n instanceof se||n instanceof at))throw new D(b.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return od(r),new se(n.firestore,n instanceof at?n.converter:null,new x(r))}}function rb(n,e){return n=ee(n),e=ee(e),(n instanceof se||n instanceof at)&&(e instanceof se||e instanceof at)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function ul(n,e){return n=ee(n),e=ee(e),n instanceof Re&&e instanceof Re&&n.firestore===e.firestore&&Pi(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef="AsyncQueue";class wf{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new $u(this,"async_queue_retry"),this._c=()=>{const r=So();r&&N(Ef,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=So();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=So();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new ke;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!En(e))throw e;N(Ef,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,Ie("INTERNAL UNHANDLED ERROR: ",vf(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Wu.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&U(47125,{Pc:vf(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function vf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(){this._progressObserver={},this._taskCompletionResolver=new ke,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sb=-1;class oe extends xi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new wf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new wf(e),this._firestoreClient=void 0,await e}}}function ib(n,e,t){t||(t=di);const r=ns(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(ut(i,e))return s;throw new D(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<pg)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&_n(e.host)&&Zo(e.host),r.initialize({options:e,instanceIdentifier:t})}function ob(n,e){const t=typeof n=="object"?n:su(),r=typeof n=="string"?n:e||di,s=ns(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=qf("firestore");i&&s_(s,...i)}return s}function me(n){if(n._terminated)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||a_(n),n._firestoreClient}function a_(n){var r,s,i,o;const e=n._freezeSettings(),t=eb(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new FR(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}})(n._componentsProvider))}function ab(n,e){Je("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return c_(n,mn.provider,{build:r=>new ol(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function cb(n){Je("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();c_(n,mn.provider,{build:t=>new Qg(t,e.cacheSizeBytes)})}function c_(n,e,t){if((n=Y(n,oe))._firestoreClient||n._terminated)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new D(b.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},a_(n)}function ub(n){if(n._initialized&&!n._terminated)throw new D(b.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new ke;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!yt.v())return Promise.resolve();const s=r+Tg;await yt.delete(s)})(Bu(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function lb(n){return(function(t){const r=new ke;return t.asyncQueue.enqueueAndForget((async()=>wR(await cl(t),r))),r.promise})(me(n=Y(n,oe)))}function hb(n){return UR(me(n=Y(n,oe)))}function db(n){return BR(me(n=Y(n,oe)))}function fb(n){return YI(n.app,"firestore",n._databaseId.database),n._delete()}function Zc(n,e){const t=me(n=Y(n,oe)),r=new o_;return WR(t,n._databaseId,e,r),r}function u_(n,e){return QR(me(n=Y(n,oe)),e).then((t=>t?new Re(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this._byteString=e}static fromBase64String(e){try{return new $e(ge.fromBase64String(e))}catch(t){throw new D(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new $e(ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:$e._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(cr(e,$e._jsonSchema))return $e.fromBase64String(e.bytes)}}$e._jsonSchemaVersion="firestore/bytes/1.0",$e._jsonSchema={type:we("string",$e._jsonSchemaVersion),bytes:we("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function pb(){return new lr(Cc)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ct._jsonSchemaVersion}}static fromJSON(e){if(cr(e,ct._jsonSchema))return new ct(e.latitude,e.longitude)}}ct._jsonSchemaVersion="firestore/geoPoint/1.0",ct._jsonSchema={type:we("string",ct._jsonSchemaVersion),latitude:we("number"),longitude:we("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:et._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(cr(e,et._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new et(e.vectorValues);throw new D(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}et._jsonSchemaVersion="firestore/vectorValue/1.0",et._jsonSchema={type:we("string",et._jsonSchemaVersion),vectorValues:we("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb=/^__.*__$/;class gb{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Lt(e,this.data,this.fieldMask,t,this.fieldTransforms):new os(e,this.data,t,this.fieldTransforms)}}class l_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Lt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function h_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{dataSource:n})}}class Aa{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Aa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Jo(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(h_(this.dataSource)&&mb.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class _b{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ur(e)}A(e,t,r,s=!1){return new Aa({dataSource:e,methodName:t,targetDoc:r,path:he.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function hr(n){const e=n._freezeSettings(),t=ur(n._databaseId);return new _b(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ra(n,e,t,r,s,i={}){const o=n.A(i.merge||i.mergeFields?2:0,e,t,s);gl("Data must be an object, but it was:",o,r);const c=p_(r,o);let u,l;if(i.merge)u=new Ke(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Nt(e,p,t);if(!o.contains(g))throw new D(b.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);g_(f,g)||f.push(g)}u=new Ke(f),l=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,l=o.fieldTransforms;return new gb(new Ve(c),u,l)}class Oi extends Rn{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Oi}}function d_(n,e,t){return new Aa({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class ll extends Rn{_toFieldTransform(e){return new Vi(e.path,new Kr)}isEqual(e){return e instanceof ll}}class hl extends Rn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=d_(this,e,!0),r=this.Sc.map((i=>dr(i,t))),s=new Zn(r);return new Vi(e.path,s)}isEqual(e){return e instanceof hl&&ut(this.Sc,e.Sc)}}class dl extends Rn{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=d_(this,e,!0),r=this.Sc.map((i=>dr(i,t))),s=new er(r);return new Vi(e.path,s)}isEqual(e){return e instanceof dl&&ut(this.Sc,e.Sc)}}class fl extends Rn{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new Hr(e.serializer,Om(e.serializer,this.bc));return new Vi(e.path,t)}isEqual(e){return e instanceof fl&&this.bc===e.bc}}function pl(n,e,t,r){const s=n.A(1,e,t);gl("Data must be an object, but it was:",s,r);const i=[],o=Ve.empty();wn(r,((u,l)=>{const f=_l(e,u,t);l=ee(l);const p=s.fc(f);if(l instanceof Oi)i.push(f);else{const g=dr(l,p);g!=null&&(i.push(f),o.set(f,g))}}));const c=new Ke(i);return new l_(o,c,s.fieldTransforms)}function ml(n,e,t,r,s,i){const o=n.A(1,e,t),c=[Nt(e,r,t)],u=[s];if(i.length%2!=0)throw new D(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Nt(e,i[g])),u.push(i[g+1]);const l=[],f=Ve.empty();for(let g=c.length-1;g>=0;--g)if(!g_(l,c[g])){const E=c[g];let C=u[g];C=ee(C);const k=o.fc(E);if(C instanceof Oi)l.push(E);else{const V=dr(C,k);V!=null&&(l.push(E),f.set(E,V))}}const p=new Ke(l);return new l_(f,p,o.fieldTransforms)}function f_(n,e,t,r=!1){return dr(t,n.A(r?4:3,e))}function dr(n,e){if(m_(n=ee(n)))return gl("Unsupported field value:",e,n),p_(n,e);if(n instanceof Rn)return(function(r,s){if(!h_(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let u=dr(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=ee(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Om(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ne.fromDate(r);return{timestampValue:Wr(s.serializer,i)}}if(r instanceof ne){const i=new ne(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Wr(s.serializer,i)}}if(r instanceof ct)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof $e)return{bytesValue:Wm(s.serializer,r._byteString)};if(r instanceof se){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:xu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof et)return(function(o,c){const u=o instanceof et?o.toArray():o;return{mapValue:{fields:{[vu]:{stringValue:Au},[jr]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return Pu(c.serializer,f)}))}}}}}})(r,s);if(ig(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${sa(r)}`)})(n,e)}function p_(n,e){const t={};return cm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):wn(n,((r,s)=>{const i=dr(s,e.dc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function m_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ne||n instanceof ct||n instanceof $e||n instanceof se||n instanceof Rn||n instanceof et||ig(n))}function gl(n,e,t){if(!m_(t)||!jp(t)){const r=sa(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function Nt(n,e,t){if((e=ee(e))instanceof lr)return e._internalPath;if(typeof e=="string")return _l(n,e);throw Jo("Field path arguments must be of type string or ",n,!1,void 0,t)}const yb=new RegExp("[~\\*/\\[\\]]");function _l(n,e,t){if(e.search(yb)>=0)throw Jo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new lr(...e.split("."))._internalPath}catch{throw Jo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Jo(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new D(b.INVALID_ARGUMENT,c+n+u)}function g_(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{convertValue(e,t="none"){switch(hn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return fe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Dt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return wn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[jr].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>fe(o.doubleValue)));return new et(t)}convertGeoPoint(e){return new ct(fe(e.latitude),fe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=la(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(hi(e));default:return null}}convertTimestamp(e){const t=kt(e);return new ne(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=J.fromString(e);q(sg(r),9688,{name:e});const s=new ln(r.get(1),r.get(3)),i=new x(r.popFirst(5));return s.isEqual(t)||Ie(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends yl{constructor(e){super(),this.firestore=e}convertBytes(e){return new $e(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ib(){return new Oi("deleteField")}function Tb(){return new ll("serverTimestamp")}function Eb(...n){return new hl("arrayUnion",n)}function wb(...n){return new dl("arrayRemove",n)}function vb(n){return new fl("increment",n)}function Ab(n){return new et(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rb(n){var r;const e=me(Y(n.firestore,oe)),t=(r=e._onlineComponents)==null?void 0:r.datastore.serializer;return t===void 0?null:ma(t,Le(n._query)).ft}function bb(n,e){var i;const t=am(e,((o,c)=>new zm(c,o.aggregateType,o._internalFieldPath))),r=me(Y(n.firestore,oe)),s=(i=r._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:eg(s,bm(n._query),t,!0).request}const Af="@firebase/firestore",Rf="4.13.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nr(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class __{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new Ve({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Sb(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Nt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Sb extends yi{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Il{}class fs extends Il{}function Pb(n,e,...t){let r=[];e instanceof Il&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((u=>u instanceof fr)).length,c=i.filter((u=>u instanceof ps)).length;if(o>1||o>0&&c>0)throw new D(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ps extends fs{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ps(e,t,r)}_apply(e){const t=this._parse(e);return T_(e._query,t),new Re(e.firestore,e.converter,Bc(e._query,t))}_parse(e){const t=hr(e.firestore);return(function(i,o,c,u,l,f,p){let g;if(l.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Sf(p,f);const C=[];for(const k of p)C.push(bf(u,i,k));g={arrayValue:{values:C}}}else g=bf(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Sf(p,f),g=f_(c,o,p,f==="in"||f==="not-in");return Z.create(l,f,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Cb(n,e,t){const r=e,s=Nt("where",n);return ps._create(s,r,t)}class fr extends Il{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new fr(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:re.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)T_(o,u),o=Bc(o,u)})(e._query,t),new Re(e.firestore,e.converter,Bc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Vb(...n){return n.forEach((e=>E_("or",e))),fr._create("or",n)}function kb(...n){return n.forEach((e=>E_("and",e))),fr._create("and",n)}class ba extends fs{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ba(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new mi(i,o)})(e._query,this._field,this._direction);return new Re(e.firestore,e.converter,Pv(e._query,t))}}function Db(n,e="asc"){const t=e,r=Nt("orderBy",n);return ba._create(r,t)}class Mi extends fs{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Mi(e,t,r)}_apply(e){return new Re(e.firestore,e.converter,qo(e._query,this._limit,this._limitType))}}function Nb(n){return $p("limit",n),Mi._create("limit",n,"F")}function xb(n){return $p("limitToLast",n),Mi._create("limitToLast",n,"L")}class Li extends fs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Li(e,t,r)}_apply(e){const t=I_(e,this.type,this._docOrFields,this._inclusive);return new Re(e.firestore,e.converter,Cv(e._query,t))}}function Ob(...n){return Li._create("startAt",n,!0)}function Mb(...n){return Li._create("startAfter",n,!1)}class Fi extends fs{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Fi(e,t,r)}_apply(e){const t=I_(e,this.type,this._docOrFields,this._inclusive);return new Re(e.firestore,e.converter,Vv(e._query,t))}}function Lb(...n){return Fi._create("endBefore",n,!1)}function Fb(...n){return Fi._create("endAt",n,!0)}function I_(n,e,t,r){if(t[0]=ee(t[0]),t[0]instanceof yi)return(function(i,o,c,u,l){if(!u)throw new D(b.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const f=[];for(const p of kr(i))if(p.field.isKeyField())f.push(Yn(o,u.key));else{const g=u.data.field(p.field);if(ua(g))throw new D(b.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const E=p.field.canonicalString();throw new D(b.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${E}' (used as the orderBy) does not exist.`)}f.push(g)}return new fn(f,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=hr(n.firestore);return(function(o,c,u,l,f,p){const g=o.explicitOrderBy;if(f.length>g.length)throw new D(b.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const E=[];for(let C=0;C<f.length;C++){const k=f[C];if(g[C].field.isKeyField()){if(typeof k!="string")throw new D(b.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof k}`);if(!bu(o)&&k.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${k}' contains a slash.`);const V=o.path.child(J.fromString(k));if(!x.isDocumentKey(V))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${V}' is not because it contains an odd number of segments.`);const L=new x(V);E.push(Yn(c,L))}else{const V=f_(u,l,k);E.push(V)}}return new fn(E,p)})(n._query,n.firestore._databaseId,s,e,t,r)}}function bf(n,e,t){if(typeof(t=ee(t))=="string"){if(t==="")throw new D(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!bu(e)&&t.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(J.fromString(t));if(!x.isDocumentKey(r))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Yn(n,new x(r))}if(t instanceof se)return Yn(n,t._key);throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${sa(t)}.`)}function Sf(n,e){if(!Array.isArray(n)||n.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function T_(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function E_(n,e){if(!(e instanceof ps||e instanceof fr))throw new D(b.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Sa(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Tl extends yl{constructor(e){super(),this.firestore=e}convertBytes(e){return new $e(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new se(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ub(n){return new ts("sum",Nt("sum",n))}function Bb(n){return new ts("avg",Nt("average",n))}function w_(){return new ts("count")}function qb(n,e){var t,r;return n instanceof ts&&e instanceof ts&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)==null?void 0:t.canonicalString())===((r=e._internalFieldPath)==null?void 0:r.canonicalString())}function zb(n,e){return ul(n.query,e.query)&&ut(n.data(),e.data())}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jb(n){return v_(n,{count:w_()})}function v_(n,e){const t=Y(n.firestore,oe),r=me(t),s=am(e,((i,o)=>new zm(o,i.aggregateType,i._internalFieldPath)));return $R(r,n._query,s).then((i=>(function(c,u,l){const f=new bn(c);return new __(u,f,l)})(t,n,i)))}class $b{constructor(e){this.kind="memory",this._onlineComponentProvider=mn.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new il(void 0)}}toJSON(){return{kind:this.kind}}}class Gb{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=A_(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class Kb{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Zr.provider}toJSON(){return{kind:this.kind}}}class Hb{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new il(e)}}toJSON(){return{kind:this.kind}}}function Wb(){return new Kb}function Qb(n){return new Hb(n==null?void 0:n.cacheSizeBytes)}function Jb(n){return new $b(n)}function Yb(n){return new Gb(n)}class Xb{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=mn.provider,this._offlineComponentProvider={build:t=>new ol(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class Zb{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=mn.provider,this._offlineComponentProvider={build:t=>new Qg(t,e==null?void 0:e.cacheSizeBytes)}}}function A_(n){return new Xb(n==null?void 0:n.forceOwnership)}function eS(){return new Zb}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R_="NOT SUPPORTED";class bt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class We extends yi{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ni(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Nt("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=We._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function tS(n,e,t){if(cr(e,We._jsonSchema)){if(e.bundle===R_)throw new D(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=ur(n._databaseId),s=t_(e.bundle,r),i=s.Qu(),o=new Zu(s.getMetadata(),r);for(const f of i)o.Ga(f);const c=o.documents;if(c.length!==1)throw new D(b.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${c.length} documents.`);const u=pa(r,c[0].document),l=new x(J.fromString(e.bundleName));return new We(n,new Tl(n),l,u,new bt(!1,!1),t||null)}}We._jsonSchemaVersion="firestore/documentSnapshot/1.0",We._jsonSchema={type:we("string",We._jsonSchemaVersion),bundleSource:we("string","DocumentSnapshot"),bundleName:we("string"),bundle:we("string")};class ni extends We{data(e={}){return super.data(e)}}class Qe{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new bt(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ni(this._firestore,this._userDataWriter,r.key,r,new bt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new bt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new ni(s._firestore,s._userDataWriter,c.doc.key,c.doc,new bt(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,f=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:rS(c.type),doc:u,oldIndex:l,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Qe._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ra.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function nS(n,e,t){if(cr(e,Qe._jsonSchema)){if(e.bundle===R_)throw new D(b.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=ur(n._databaseId),s=t_(e.bundle,r),i=s.Qu(),o=new Zu(s.getMetadata(),r);for(const g of i)o.Ga(g);if(o.queries.length!==1)throw new D(b.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const c=ga(o.queries[0].bundledQuery),u=o.documents;let l=new Kn;u.map((g=>{const E=pa(r,g.document);l=l.add(E)}));const f=ir.fromInitialDocuments(c,l,K(),!1,!1),p=new Re(n,t||null,c);return new Qe(n,new Tl(n),p,f)}}function rS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}function sS(n,e){return n instanceof We&&e instanceof We?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof Qe&&e instanceof Qe&&n._firestore===e._firestore&&ul(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qe._jsonSchemaVersion="firestore/querySnapshot/1.0",Qe._jsonSchema={type:we("string",Qe._jsonSchemaVersion),bundleSource:we("string","QuerySnapshot"),bundleName:we("string"),bundle:we("string")};const iS={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=hr(e)}set(e,t,r){this._verifyNotCommitted();const s=nn(e,this._firestore),i=Sa(s.converter,t,r),o=Ra(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,pe.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=nn(e,this._firestore);let o;return o=typeof(t=ee(t))=="string"||t instanceof lr?ml(this._dataReader,"WriteBatch.update",i._key,t,r,s):pl(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,pe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=nn(e,this._firestore);return this._mutations=this._mutations.concat(new as(t._key,pe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(b.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function nn(n,e){if((n=ee(n)).firestore!==e)throw new D(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=hr(e)}get(e){const t=nn(e,this._firestore),r=new Tl(this._firestore);return this._transaction.lookup([t._key]).then((s=>{if(!s||s.length!==1)return U(24041);const i=s[0];if(i.isFoundDocument())return new yi(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new yi(this._firestore,r,t._key,null,t.converter);throw U(18433,{doc:i})}))}set(e,t,r){const s=nn(e,this._firestore),i=Sa(s.converter,t,r),o=Ra(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=nn(e,this._firestore);let o;return o=typeof(t=ee(t))=="string"||t instanceof lr?ml(this._dataReader,"Transaction.update",i._key,t,r,s):pl(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=nn(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_ extends oS{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=nn(e,this._firestore),r=new bn(this._firestore);return super.get(e).then((s=>new We(this._firestore,r,t._key,s._document,new bt(!1,!1),t.converter)))}}function aS(n,e,t){n=Y(n,oe);const r={...iS,...t};(function(o){if(o.maxAttempts<1)throw new D(b.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=me(n);return HR(s,(i=>e(new S_(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cS(n){n=Y(n,se);const e=Y(n.firestore,oe),t=me(e);return Zg(t,n._key).then((r=>El(e,n,r)))}function uS(n){n=Y(n,se);const e=Y(n.firestore,oe),t=me(e),r=new bn(e);return zR(t,n._key).then((s=>new We(e,r,n._key,s,new bt(s!==null&&s.hasLocalMutations,!0),n.converter)))}function lS(n){n=Y(n,se);const e=Y(n.firestore,oe),t=me(e);return Zg(t,n._key,{source:"server"}).then((r=>El(e,n,r)))}function hS(n){n=Y(n,Re);const e=Y(n.firestore,oe),t=me(e),r=new bn(e);return y_(n._query),e_(t,n._query).then((s=>new Qe(e,r,n,s)))}function dS(n){n=Y(n,Re);const e=Y(n.firestore,oe),t=me(e),r=new bn(e);return jR(t,n._query).then((s=>new Qe(e,r,n,s)))}function fS(n){n=Y(n,Re);const e=Y(n.firestore,oe),t=me(e),r=new bn(e);return e_(t,n._query,{source:"server"}).then((s=>new Qe(e,r,n,s)))}function pS(n,e,t){n=Y(n,se);const r=Y(n.firestore,oe),s=Sa(n.converter,e,t),i=hr(r);return ms(r,[Ra(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,pe.none())])}function mS(n,e,t,...r){n=Y(n,se);const s=Y(n.firestore,oe),i=hr(s);let o;return o=typeof(e=ee(e))=="string"||e instanceof lr?ml(i,"updateDoc",n._key,e,t,r):pl(i,"updateDoc",n._key,e),ms(s,[o.toMutation(n._key,pe.exists(!0))])}function gS(n){return ms(Y(n.firestore,oe),[new as(n._key,pe.none())])}function _S(n,e){const t=Y(n.firestore,oe),r=i_(n),s=Sa(n.converter,e),i=hr(n.firestore);return ms(t,[Ra(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,pe.exists(!1))]).then((()=>r))}function eu(n,...e){var l,f,p;n=ee(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Nr(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Nr(e[r])){const g=e[r];e[r]=(l=g.next)==null?void 0:l.bind(g),e[r+1]=(f=g.error)==null?void 0:f.bind(g),e[r+2]=(p=g.complete)==null?void 0:p.bind(g)}let i,o,c;if(n instanceof se)o=Y(n.firestore,oe),c=is(n._key.path),i={next:g=>{e[r]&&e[r](El(o,n,g))},error:e[r+1],complete:e[r+2]};else{const g=Y(n,Re);o=Y(g.firestore,oe),c=g._query;const E=new bn(o);i={next:C=>{e[r]&&e[r](new Qe(o,E,g,C))},error:e[r+1],complete:e[r+2]},y_(n._query)}const u=me(o);return qR(u,c,s,i)}function yS(n,e,...t){const r=ee(n),s=(function(u){const l={bundle:"",bundleName:"",bundleSource:""},f=["bundle","bundleName","bundleSource"];for(const p of f){if(!(p in u)){l.error=`snapshotJson missing required field: ${p}`;break}const g=u[p];if(typeof g!="string"){l.error=`snapshotJson field '${p}' must be a string.`;break}if(g.length===0){l.error=`snapshotJson field '${p}' cannot be an empty string.`;break}p==="bundle"?l.bundle=g:p==="bundleName"?l.bundleName=g:p==="bundleSource"&&(l.bundleSource=g)}return l})(e);if(s.error)throw new D(b.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||Nr(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let c=null;if(typeof t[o]=="object"&&Nr(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,f,p,g,E){let C,k=!1;return Zc(l,f.bundle).then((()=>u_(l,f.bundleName))).then((L=>{L&&!k&&(E&&L.withConverter(E),C=eu(L,p||{},g))})).catch((L=>(g.error&&g.error(L),()=>{}))),()=>{k||(k=!0,C&&C())}})(r,s,i,c,t[o])}if(s.bundleSource==="DocumentSnapshot"){let c=null;if(typeof t[o]=="object"&&Nr(t[o])){const u=t[o++];c={next:u.next,error:u.error,complete:u.complete}}else c={next:t[o++],error:t[o++],complete:t[o++]};return(function(l,f,p,g,E){let C,k=!1;return Zc(l,f.bundle).then((()=>{if(!k){const L=new se(l,E||null,x.fromPath(f.bundleName));C=eu(L,p||{},g)}})).catch((L=>(g.error&&g.error(L),()=>{}))),()=>{k||(k=!0,C&&C())}})(r,s,i,c,t[o])}throw new D(b.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function IS(n,e){n=Y(n,oe);const t=me(n),r=Nr(e)?e:{next:e};return KR(t,r)}function ms(n,e){const t=me(n);return GR(t,e)}function El(n,e,t){const r=t.docs.get(e._key),s=new bn(n);return new We(n,s,e._key,r,new bt(t.hasPendingWrites,t.fromCache),e.converter)}function TS(n){return n=Y(n,oe),me(n),new b_(n,(e=>ms(n,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ES(n,e){n=Y(n,oe);const t=me(n);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return Je("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(i){const o=typeof i=="string"?(function(l){try{return JSON.parse(l)}catch(f){throw new D(b.INVALID_ARGUMENT,"Failed to parse JSON: "+(f==null?void 0:f.message))}})(i):i,c=[];if(Array.isArray(o.indexes))for(const u of o.indexes){const l=Pf(u,"collectionGroup"),f=[];if(Array.isArray(u.fields))for(const p of u.fields){const g=Pf(p,"fieldPath"),E=_l("setIndexConfiguration",g);p.arrayConfig==="CONTAINS"?f.push(new $n(E,2)):p.order==="ASCENDING"?f.push(new $n(E,0)):p.order==="DESCENDING"&&f.push(new $n(E,1))}c.push(new Lr(Lr.UNKNOWN_ID,l,f,Fr.empty()))}return c})(e);return JR(t,r)}function Pf(n,e){if(typeof n[e]!="string")throw new D(b.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function wS(n){var s;n=Y(n,oe);const e=Cf.get(n);if(e)return e;if(((s=me(n)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const r=new P_(n);return Cf.set(n,r),r}function vS(n){C_(n,!0)}function AS(n){C_(n,!1)}function RS(n){const e=me(n._firestore);XR(e).then((t=>N("deleting all persistent cache indexes succeeded"))).catch((t=>Je("deleting all persistent cache indexes failed",t)))}function C_(n,e){const t=me(n._firestore);YR(t,e).then((r=>N(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((r=>Je(`setting persistent cache index auto creation isEnabled=${e} failed`,r)))}const Cf=new WeakMap;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return wl.instance.onExistenceFilterMismatch(e)}}class wl{constructor(){this.t=new Map}static get instance(){return lo||(lo=new wl,jv(lo)),lo}o(e){this.t.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.t;return r.set(t,e),()=>r.delete(t)}}let lo=null;(function(e,t=!0){ww(ar),Wn(new cn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new oe(new bw(r.getProvider("auth-internal")),new Cw(o,r.getProvider("app-check-internal")),gv(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),gt(Af,Rf,e),gt(Af,Rf,"esm2020")})();const YP=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:yl,AggregateField:ts,AggregateQuerySnapshot:__,Bytes:$e,CACHE_SIZE_UNLIMITED:sb,CollectionReference:at,DocumentReference:se,DocumentSnapshot:We,FieldPath:lr,FieldValue:Rn,Firestore:oe,FirestoreError:D,GeoPoint:ct,LoadBundleTask:o_,PersistentCacheIndexManager:P_,Query:Re,QueryCompositeFilterConstraint:fr,QueryConstraint:fs,QueryDocumentSnapshot:ni,QueryEndAtConstraint:Fi,QueryFieldFilterConstraint:ps,QueryLimitConstraint:Mi,QueryOrderByConstraint:ba,QuerySnapshot:Qe,QueryStartAtConstraint:Li,SnapshotMetadata:bt,Timestamp:ne,Transaction:S_,VectorValue:et,WriteBatch:b_,_AutoId:ra,_ByteString:ge,_DatabaseId:ln,_DocumentKey:x,_EmptyAppCheckTokenProvider:Vw,_EmptyAuthCredentialsProvider:Bp,_FieldPath:he,_TestingHooks:bS,_cast:Y,_debugAssert:Aw,_internalAggregationQueryToProtoRunAggregationQueryRequest:bb,_internalQueryToProtoQueryTarget:Rb,_isBase64Available:fv,_logWarn:Je,_validateIsNotUsedTogether:zp,addDoc:_S,aggregateFieldEqual:qb,aggregateQuerySnapshotEqual:zb,and:kb,arrayRemove:wb,arrayUnion:Eb,average:Bb,clearIndexedDbPersistence:ub,collection:tb,collectionGroup:nb,connectFirestoreEmulator:s_,count:w_,deleteAllPersistentCacheIndexes:RS,deleteDoc:gS,deleteField:Ib,disableNetwork:db,disablePersistentCacheIndexAutoCreation:AS,doc:i_,documentId:pb,documentSnapshotFromJSON:tS,enableIndexedDbPersistence:ab,enableMultiTabIndexedDbPersistence:cb,enableNetwork:hb,enablePersistentCacheIndexAutoCreation:vS,endAt:Fb,endBefore:Lb,ensureFirestoreConfigured:me,executeWrite:ms,getAggregateFromServer:v_,getCountFromServer:jb,getDoc:cS,getDocFromCache:uS,getDocFromServer:lS,getDocs:hS,getDocsFromCache:dS,getDocsFromServer:fS,getFirestore:ob,getPersistentCacheIndexManager:wS,increment:vb,initializeFirestore:ib,limit:Nb,limitToLast:xb,loadBundle:Zc,memoryEagerGarbageCollector:Wb,memoryLocalCache:Jb,memoryLruGarbageCollector:Qb,namedQuery:u_,onSnapshot:eu,onSnapshotResume:yS,onSnapshotsInSync:IS,or:Vb,orderBy:Db,persistentLocalCache:Yb,persistentMultipleTabManager:eS,persistentSingleTabManager:A_,query:Pb,queryEqual:ul,querySnapshotFromJSON:nS,refEqual:rb,runTransaction:aS,serverTimestamp:Tb,setDoc:pS,setIndexConfiguration:ES,setLogLevel:vw,snapshotEqual:sS,startAfter:Mb,startAt:Ob,sum:Ub,terminate:fb,updateDoc:mS,vector:Ab,waitForPendingWrites:lb,where:Cb,writeBatch:TS},Symbol.toStringTag,{value:"Module"}));var SS="firebase",PS="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gt(SS,PS,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_="firebasestorage.googleapis.com",k_="storageBucket",CS=120*1e3,VS=600*1e3,kS=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e extends Et{constructor(e,t,r=0){super(mc(e),`Firebase Storage: ${t} (${mc(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,_e.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return mc(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var de;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(de||(de={}));function mc(n){return"storage/"+n}function vl(){const n="An unknown error occurred, please check the error payload for server response.";return new _e(de.UNKNOWN,n)}function DS(n){return new _e(de.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function NS(n){return new _e(de.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function xS(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new _e(de.UNAUTHENTICATED,n)}function OS(){return new _e(de.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function MS(n){return new _e(de.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function D_(){return new _e(de.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function N_(){return new _e(de.CANCELED,"User canceled the upload/download.")}function LS(n){return new _e(de.INVALID_URL,"Invalid URL '"+n+"'.")}function FS(n){return new _e(de.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function US(){return new _e(de.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+k_+"' property when initializing the app?")}function x_(){return new _e(de.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function BS(){return new _e(de.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function qS(){return new _e(de.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function zS(n){return new _e(de.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function tu(n){return new _e(de.INVALID_ARGUMENT,n)}function O_(){return new _e(de.APP_DELETED,"The Firebase app was deleted.")}function jS(n){return new _e(de.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function ri(n,e){return new _e(de.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Us(n){throw new _e(de.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Ze.makeFromUrl(e,t)}catch{return new Ze(e,"")}if(r.path==="")return r;throw FS(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(G){G.path.charAt(G.path.length-1)==="/"&&(G.path_=G.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function l(G){G.path_=decodeURIComponent(G.path)}const f="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",E=new RegExp(`^https?://${p}/${f}/b/${s}/o${g}`,"i"),C={bucket:1,path:3},k=t===V_?"(?:storage.googleapis.com|storage.cloud.google.com)":t,V="([^?#]*)",L=new RegExp(`^https?://${k}/${s}/${V}`,"i"),F=[{regex:c,indices:u,postModify:i},{regex:E,indices:C,postModify:l},{regex:L,indices:{bucket:1,path:2},postModify:l}];for(let G=0;G<F.length;G++){const H=F[G],Q=H.regex.exec(e);if(Q){const T=Q[H.indices.bucket];let _=Q[H.indices.path];_||(_=""),r=new Ze(T,_),H.postModify(r);break}}if(r==null)throw LS(e);return r}}class $S{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GS(n,e,t){let r=1,s=null,i=null,o=!1,c=0;function u(){return c===2}let l=!1;function f(...V){l||(l=!0,e.apply(null,V))}function p(V){s=setTimeout(()=>{s=null,n(E,u())},V)}function g(){i&&clearTimeout(i)}function E(V,...L){if(l){g();return}if(V){g(),f.call(null,V,...L);return}if(u()||o){g(),f.call(null,V,...L);return}r<64&&(r*=2);let F;c===1?(c=2,F=0):F=(r+Math.random())*1e3,p(F)}let C=!1;function k(V){C||(C=!0,g(),!l&&(s!==null?(V||(c=2),clearTimeout(s),p(0)):V||(c=1)))}return p(0),i=setTimeout(()=>{o=!0,k(!0)},t),k}function KS(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HS(n){return n!==void 0}function WS(n){return typeof n=="function"}function QS(n){return typeof n=="object"&&!Array.isArray(n)}function Pa(n){return typeof n=="string"||n instanceof String}function Vf(n){return Al()&&n instanceof Blob}function Al(){return typeof Blob<"u"}function kf(n,e,t,r){if(r<e)throw tu(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw tu(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ui(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function M_(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var Hn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Hn||(Hn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JS{constructor(e,t,r,s,i,o,c,u,l,f,p,g=!0,E=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=f,this.connectionFactory_=p,this.retry=g,this.isUsingEmulator=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,k)=>{this.resolve_=C,this.reject_=k,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new ho(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const c=i.getErrorCode()===Hn.NO_ERROR,u=i.getStatus();if(!c||L_(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===Hn.ABORT;r(!1,new ho(!1,null,f));return}const l=this.successCodes_.indexOf(u)!==-1;r(!0,new ho(l,i))})},t=(r,s)=>{const i=this.resolve_,o=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());HS(u)?i(u):i()}catch(u){o(u)}else if(c!==null){const u=vl();u.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,u)):o(u)}else if(s.canceled){const u=this.appDelete_?O_():N_();o(u)}else{const u=D_();o(u)}};this.canceled_?t(!1,new ho(!1,null,!0)):this.backoffId_=GS(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&KS(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ho{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function YS(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function XS(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function ZS(n,e){e&&(n["X-Firebase-GMPID"]=e)}function eP(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function tP(n,e,t,r,s,i,o=!0,c=!1){const u=M_(n.urlParams),l=n.url+u,f=Object.assign({},n.headers);return ZS(f,e),YS(f,t),XS(f,i),eP(f,r),new JS(l,n.method,f,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nP(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function rP(...n){const e=nP();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Al())return new Blob(n);throw new _e(de.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function sP(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iP(n){if(typeof atob>"u")throw zS("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class gc{constructor(e,t){this.data=e,this.contentType=t||null}}function F_(n,e){switch(n){case it.RAW:return new gc(U_(e));case it.BASE64:case it.BASE64URL:return new gc(B_(n,e));case it.DATA_URL:return new gc(aP(e),cP(e))}throw vl()}function U_(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,o=n.charCodeAt(++t);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function oP(n){let e;try{e=decodeURIComponent(n)}catch{throw ri(it.DATA_URL,"Malformed data URL.")}return U_(e)}function B_(n,e){switch(n){case it.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw ri(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case it.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw ri(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=iP(e)}catch(s){throw s.message.includes("polyfill")?s:ri(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class q_{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw ri(it.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=uP(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function aP(n){const e=new q_(n);return e.base64?B_(it.BASE64,e.rest):oP(e.rest)}function cP(n){return new q_(n).contentType}function uP(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t){let r=0,s="";Vf(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Vf(this.data_)){const r=this.data_,s=sP(r,e,t);return s===null?null:new wt(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new wt(r,!0)}}static getBlob(...e){if(Al()){const t=e.map(r=>r instanceof wt?r.data_:r);return new wt(rP.apply(null,t))}else{const t=e.map(o=>Pa(o)?F_(it.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)s[i++]=o[c]}),new wt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z_(n){let e;try{e=JSON.parse(n)}catch{return null}return QS(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lP(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function hP(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function j_(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dP(n,e){return e}class Be{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||dP}}let fo=null;function fP(n){return!Pa(n)||n.length<2?n:j_(n)}function Rl(){if(fo)return fo;const n=[];n.push(new Be("bucket")),n.push(new Be("generation")),n.push(new Be("metageneration")),n.push(new Be("name","fullPath",!0));function e(i,o){return fP(o)}const t=new Be("name");t.xform=e,n.push(t);function r(i,o){return o!==void 0?Number(o):o}const s=new Be("size");return s.xform=r,n.push(s),n.push(new Be("timeCreated")),n.push(new Be("updated")),n.push(new Be("md5Hash",null,!0)),n.push(new Be("cacheControl",null,!0)),n.push(new Be("contentDisposition",null,!0)),n.push(new Be("contentEncoding",null,!0)),n.push(new Be("contentLanguage",null,!0)),n.push(new Be("contentType",null,!0)),n.push(new Be("metadata","customMetadata",!0)),fo=n,fo}function pP(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Ze(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function mP(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];r[o.local]=o.xform(r,e[o.server])}return pP(r,n),r}function $_(n,e,t){const r=z_(e);return r===null?null:mP(n,r,t)}function gP(n,e,t,r){const s=z_(e);if(s===null||!Pa(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(l=>{const f=n.bucket,p=n.fullPath,g="/b/"+o(f)+"/o/"+o(p),E=Ui(g,t,r),C=M_({alt:"media",token:l});return E+C})[0]}function G_(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class gs{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n){if(!n)throw vl()}function bl(n,e){function t(r,s){const i=$_(n,s,e);return Pt(i!==null),i}return t}function _P(n,e){function t(r,s){const i=$_(n,s,e);return Pt(i!==null),gP(i,s,n.host,n._protocol)}return t}function Bi(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=OS():s=xS():t.getStatus()===402?s=NS(n.bucket):t.getStatus()===403?s=MS(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function K_(n){const e=Bi(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=DS(n.path)),i.serverResponse=s.serverResponse,i}return t}function yP(n,e,t){const r=e.fullServerUrl(),s=Ui(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new gs(s,i,bl(n,t),o);return c.errorHandler=K_(e),c}function IP(n,e,t){const r=e.fullServerUrl(),s=Ui(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,c=new gs(s,i,_P(n,t),o);return c.errorHandler=K_(e),c}function TP(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function H_(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=TP(null,e)),r}function W_(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let F="";for(let G=0;G<2;G++)F=F+Math.random().toString().slice(2);return F}const u=c();o["Content-Type"]="multipart/related; boundary="+u;const l=H_(e,r,s),f=G_(l,t),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+l.contentType+`\r
\r
`,g=`\r
--`+u+"--",E=wt.getBlob(p,r,g);if(E===null)throw x_();const C={name:l.fullPath},k=Ui(i,n.host,n._protocol),V="POST",L=n.maxUploadRetryTime,B=new gs(k,V,bl(n,t),L);return B.urlParams=C,B.headers=o,B.body=E.uploadData(),B.errorHandler=Bi(e),B}class Yo{constructor(e,t,r,s){this.current=e,this.total=t,this.finalized=!!r,this.metadata=s||null}}function Sl(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch{Pt(!1)}return Pt(!!t&&(e||["active"]).indexOf(t)!==-1),t}function EP(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),o=H_(e,r,s),c={name:o.fullPath},u=Ui(i,n.host,n._protocol),l="POST",f={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},p=G_(o,t),g=n.maxUploadRetryTime;function E(k){Sl(k);let V;try{V=k.getResponseHeader("X-Goog-Upload-URL")}catch{Pt(!1)}return Pt(Pa(V)),V}const C=new gs(u,l,E,g);return C.urlParams=c,C.headers=f,C.body=p,C.errorHandler=Bi(e),C}function wP(n,e,t,r){const s={"X-Goog-Upload-Command":"query"};function i(l){const f=Sl(l,["active","final"]);let p=null;try{p=l.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Pt(!1)}p||Pt(!1);const g=Number(p);return Pt(!isNaN(g)),new Yo(g,r.size(),f==="final")}const o="POST",c=n.maxUploadRetryTime,u=new gs(t,o,i,c);return u.headers=s,u.errorHandler=Bi(e),u}const Df=256*1024;function vP(n,e,t,r,s,i,o,c){const u=new Yo(0,0);if(o?(u.current=o.current,u.total=o.total):(u.current=0,u.total=r.size()),r.size()!==u.total)throw BS();const l=u.total-u.current;let f=l;s>0&&(f=Math.min(f,s));const p=u.current,g=p+f;let E="";f===0?E="finalize":l===f?E="upload, finalize":E="upload";const C={"X-Goog-Upload-Command":E,"X-Goog-Upload-Offset":`${u.current}`},k=r.slice(p,g);if(k===null)throw x_();function V(G,H){const Q=Sl(G,["active","final"]),T=u.current+f,_=r.size();let I;return Q==="final"?I=bl(e,i)(G,H):I=null,new Yo(T,_,Q==="final",I)}const L="POST",B=e.maxUploadRetryTime,F=new gs(t,L,V,B);return F.headers=C,F.body=k.uploadData(),F.progressCallback=c||null,F.errorHandler=Bi(n),F}const ze={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function _c(n){switch(n){case"running":case"pausing":case"canceling":return ze.RUNNING;case"paused":return ze.PAUSED;case"success":return ze.SUCCESS;case"canceled":return ze.CANCELED;case"error":return ze.ERROR;default:return ze.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AP{constructor(e,t,r){if(WS(e)||t!=null||r!=null)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const i=e;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vr(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}class RP{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Hn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Hn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Hn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw Us("cannot .send() more than once");if(_n(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Us("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Us("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Us("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Us("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class bP extends RP{initXhr(){this.xhr_.responseType="text"}}function qn(){return new bP}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SP{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=Rl(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(de.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(L_(s.status,[]))if(i)s=D_();else{this.sleepTime=Math.max(this.sleepTime*2,kS),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(de.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const r=EP(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,qn,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const s=wP(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(s,qn,t,r);this._request=i,i.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=Df*this._chunkMultiplier,t=new Yo(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((s,i)=>{let o;try{o=vP(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(u){this._error=u,this._transition("error");return}const c=this._ref.storage._makeRequest(o,qn,s,i,!1);this._request=c,c.getPromise().then(u=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(u.current),u.finalized?(this._metadata=u.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Df*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=yP(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(r,qn,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=W_(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,qn,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=N_(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=_c(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,s){const i=new AP(t||void 0,r||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(_c(this._state)){case ze.SUCCESS:vr(this._resolve.bind(null,this.snapshot))();break;case ze.CANCELED:case ze.ERROR:const t=this._reject;vr(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(_c(this._state)){case ze.RUNNING:case ze.PAUSED:e.next&&vr(e.next.bind(e,this.snapshot))();break;case ze.SUCCESS:e.complete&&vr(e.complete.bind(e))();break;case ze.CANCELED:case ze.ERROR:e.error&&vr(e.error.bind(e,this._error))();break;default:e.error&&vr(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e,t){this._service=e,t instanceof Ze?this._location=t:this._location=Ze.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new or(e,t)}get root(){const e=new Ze(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return j_(this._location.path)}get storage(){return this._service}get parent(){const e=lP(this._location.path);if(e===null)return null;const t=new Ze(this._location.bucket,e);return new or(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw jS(e)}}function Q_(n,e,t){n._throwIfRoot("uploadBytes");const r=W_(n.storage,n._location,Rl(),new wt(e,!0),t);return n.storage.makeRequestWithTokens(r,qn).then(s=>({metadata:s,ref:n}))}function PP(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new SP(n,new wt(e),t)}function CP(n,e,t=it.RAW,r){n._throwIfRoot("uploadString");const s=F_(t,e),i={...r};return i.contentType==null&&s.contentType!=null&&(i.contentType=s.contentType),Q_(n,s.data,i)}function VP(n){n._throwIfRoot("getDownloadURL");const e=IP(n.storage,n._location,Rl());return n.storage.makeRequestWithTokens(e,qn).then(t=>{if(t===null)throw qS();return t})}function kP(n,e){const t=hP(n._location.path,e),r=new Ze(n._location.bucket,t);return new or(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DP(n){return/^[A-Za-z]+:\/\//.test(n)}function NP(n,e){return new or(n,e)}function J_(n,e){if(n instanceof Pl){const t=n;if(t._bucket==null)throw US();const r=new or(t,t._bucket);return e!=null?J_(r,e):r}else return e!==void 0?kP(n,e):n}function xP(n,e){if(e&&DP(e)){if(n instanceof Pl)return NP(n,e);throw tu("To use ref(service, url), the first argument must be a Storage instance.")}else return J_(n,e)}function Nf(n,e){const t=e==null?void 0:e[k_];return t==null?null:Ze.makeFromBucketSpec(t,n)}function OP(n,e,t,r={}){n.host=`${e}:${t}`;const s=_n(e);s&&Zo(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:$f(i,n.app.options.projectId))}class Pl{constructor(e,t,r,s,i,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=V_,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=CS,this._maxUploadRetryTime=VS,this._requests=new Set,s!=null?this._bucket=Ze.makeFromBucketSpec(s,this._host):this._bucket=Nf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ze.makeFromBucketSpec(this._url,e):this._bucket=Nf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){kf("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){kf("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new or(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new $S(O_());{const o=tP(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const xf="@firebase/storage",Of="0.14.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_="storage";function XP(n,e,t){return n=ee(n),Q_(n,e,t)}function ZP(n,e,t,r){return n=ee(n),CP(n,e,t,r)}function eC(n,e,t){return n=ee(n),PP(n,e,t)}function tC(n){return n=ee(n),VP(n)}function nC(n,e){return n=ee(n),xP(n,e)}function rC(n=su(),e){n=ee(n);const r=ns(n,Y_).getImmediate({identifier:e}),s=qf("storage");return s&&MP(r,...s),r}function MP(n,e,t,r={}){OP(n,e,t,r)}function LP(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Pl(t,r,s,e,ar)}function FP(){Wn(new cn(Y_,LP,"PUBLIC").setMultipleInstances(!0)),gt(xf,Of,""),gt(xf,Of,"esm2020")}FP();export{YP as $,mS as A,gS as B,cn as C,Nb as D,Cb as E,Et as F,Jt as G,hS as H,Tb as I,nC as J,eC as K,tC as L,ZP as M,XP as N,$P as O,zP as P,jP as Q,Ii as R,_I as S,ut as T,By as U,UP as V,Wf as W,jy as X,nu as Y,BP as Z,ns as _,ib as a,WP as b,rC as c,cS as d,ab as e,i_ as f,qP as g,HP as h,eT as i,KP as j,pS as k,ee as l,qf as m,su as n,GP as o,_n as p,Zo as q,Wn as r,sb as s,gt as t,je as u,Pb as v,Db as w,tb as x,eu as y,_S as z};
