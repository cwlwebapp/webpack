import _ from 'lodash';
import './style.css';

import Icon from './asset/icon.png';
import Data from './asset/data.xml';
import Notes from './asset/data.csv';
import toml from './asset/data.toml';
import yaml from './asset/data.yaml';
import json from './asset/data.json5';

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`

console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`

console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`

 function component() {
   const element = document.createElement('div');
 
  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  // lodash，现在通过一个 script 引入
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

  // 将图像添加到我们已经存在的 div 中。
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  
  Notes[2]=['a','b','c']
  console.log(Data,'=============Data')
  console.log(Notes,'=============Data')

   return element;
 }
 
 document.body.appendChild(component());