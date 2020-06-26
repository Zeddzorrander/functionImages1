export const elements = {
    secInput1: document.getElementById('user_inputPart1'),
    secInput2: document.getElementById('user_inputPart2'),
    secInput3: document.getElementById('user_inputPart3'),
    pInput1: document.getElementById('p_input1'),
    pInput2: document.getElementById('p_input2'),
    pInput3: document.getElementById('p_input3'),
    h3Input1: document.getElementById('h3_input1'),
    h3Input2: document.getElementById('h3_input2'),
    h3Input3: document.getElementById('h3_input3'),
    input1: document.getElementById('input1'),
    input2: document.getElementById('input2'),
    input3: document.getElementById('input3'),
    submit1: document.getElementById('submit1'),
    submit2: document.getElementById('submit2'),
    submit3: document.getElementById('submit3'),
}




export class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt('section', {class: "input", id: "user_input"}, elt('h3', {id: "h3_input"}), elt())
    }
}

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}


export function changeInputHTML(id, html) {
    document.getElementById(id).innerHTML = html;
}