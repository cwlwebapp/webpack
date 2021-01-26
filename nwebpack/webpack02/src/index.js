// import _ from 'lodash';
// import printMe from './print.js';

//  function component() {
//    const element = document.createElement('div');
//    const btn = document.createElement('button');

//   // lodash（目前通过一个 script 引入）对于执行这一行是必需的
//   // lodash，现在通过一个 script 引入
//    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//    btn.innerHTML = 'Click me and check the console!';
//    btn.onclick = printMe;

//    element.appendChild(btn);

//    return element;
//  }

// //  document.body.appendChild(component());


// //  if (module.hot) {
// //   module.hot.accept('./print.js', function() {
// //     console.log('Accepting the updated printMe module!');
// //     printMe();
// //   })
// // }





// let element = component(); // 存储 element，以在 print.js 修改时重新渲染
// document.body.appendChild(element);

//  if (module.hot) {
//    module.hot.accept('./print.js', function() {
//      console.log('Accepting the updated printMe module!');

//     document.body.removeChild(element);
//     element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
//     document.body.appendChild(element);
//    })
//  }

//-----------------------------------------------------动态引入
// function getComponent() {

//   return import('lodash').then(({ default: _ }) => {
//       const element = document.createElement('div');
//       element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//       return element;
//     }).catch((error) => 'An error occurred while loading the component');
// }

// getComponent().then((component) => {
//   document.body.appendChild(component);
// });

//============================================================
// async function getComponent() {
//   const { default: _ } = await import('lodash');
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   return element;
// }
// getComponent().then((component) => {
//   document.body.appendChild(component);
// });

//==========================================
import _ from 'lodash';
import Print from './print';

 function component() {
   const element = document.createElement('div');

   // lodash 是由当前 script 脚本 import 进来的
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.onclick = Print.bind(null, 'Hello webpack!');

   return element;
 }

 document.body.appendChild(component());