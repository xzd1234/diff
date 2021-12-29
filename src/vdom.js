import { createTextNode, createElement } from './htmldomapi';
class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase();//标签
        this.data = data;//属性
        this.type = type;//类型
        this.value = value;//值
        this.children = [];//子级

    }
    appendChild(value) {
        this.children.push(value);
    }
}
export function getVNode(node) {
    let nodeType = node.nodeType
    let _vnode = null
    if (nodeType === 1) {
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _attrsObj = {}
        for (let i = 0; i < attrs.length; i++) {
            _attrsObj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        _vnode = new VNode(nodeName, _attrsObj, undefined, nodeType);
        let childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            _vnode.appendChild(getVNode(childNodes[i]))
        }
    } else if (nodeType === 3) {
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
    }
    return _vnode;
}

/* let vdom = getVNode(dom)
console.log(vdom) */


export function parseNode(vnode) {
    let type = vnode.type;//元素类型
    let _node = null;
    if (type === 3) {
        return createTextNode(vnode.value)
    } else if (type === 1) {
        _node = createElement(vnode.tag)
        let data = vnode.data;
        Object.keys(data).forEach(key => {
            let attrName = key
            let attrValue = data[key]
            _node.setAttribute(attrName, attrValue)
        })
        let children = vnode.children;
        children.forEach(subVnode => {
            _node.appendChild(parseNode(subVnode))
        })
        return _node

    }
}
/* let pasDom = parseNode(vdom)
console.log(pasDom) */
