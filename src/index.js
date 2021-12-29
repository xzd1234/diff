import { h } from './h'
import { getVNode } from './vdom'

let dom = document.querySelector('#app')
const vnode = getVNode(dom)
const vnod = h('div', {}, ['1'])
console.log(vnod)