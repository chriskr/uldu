/*
    Copyright 2017 Christian Krebs

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

const TEXT_NODE_NAME = '#text';
const NAMESPACES = {
  svg: 'http://www.w3.org/2000/svg',
};
const OBJECT_TYPE_NAME = '[object Object]';
const STRING_TYPE_NAME = 'string';
const toString = Function.prototype.call.bind(Object.prototype.toString);
const isDictionary = obj => toString(obj) === OBJECT_TYPE_NAME;
const isString = str => typeof str === STRING_TYPE_NAME;
const isTextNodeName = str => str === TEXT_NODE_NAME;

const createDom = (tmpl, namespace = '') => {
  const ELE_NAME = 0;
  const ATTRS = 1;
  const elementName = tmpl[ELE_NAME];
  let ele = null;
  let i = 0;
  if (isString(elementName) && !isTextNodeName(elementName)) {
    i++;
    if (elementName.includes(':')) {
      const pos = elementName.indexOf(':');
      namespace = NAMESPACES[elementName.slice(0, pos)];
      ele = document.createElementNS(namespace, elementName.slice(pos + 1));
    } else {
      ele = document.createElement(elementName);
    }
    const attrs = tmpl[ATTRS];
    if (isDictionary(attrs)) {
      i++;
      for (const prop in attrs) {
        const value = attrs[prop];
        if (isString(value)) {
          ele.setAttribute(prop, value);
        }
      }
    }
  } else {
    if (isTextNodeName(elementName)) {
      i++;
    }
    ele = document.createDocumentFragment();
  }
  for (; i < tmpl.length; i++) {
    const item = tmpl[i];
    if (isString(item)) {
      ele.appendChild(document.createTextNode(item));
    } else if (item) {
      ele.appendChild(createDom(item), namespace);
    }
  }
  return ele;
};

const render = (templ, ele) => ele.appendChild(createDom(templ));
const renderClean = (templ, ele) => {
  ele.textContent = '';
  return render(templ, ele);
};

export {
  NAMESPACES,
  TEXT_NODE_NAME,
  createDom,
  render,
  renderClean,
};
