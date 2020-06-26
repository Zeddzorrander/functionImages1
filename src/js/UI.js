

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
    center: document.getElementById('center'),
    radius:document.getElementById('radius'),
    part1: document.getElementById('part1'),
    part2: document.getElementById('part2'),
    part3: document.getElementById('part3'),
    feedback: document.getElementById('feedback'),
    p_feedback: document.getElementById('p_feedback'),
    p_feedbackBtn1: document.getElementById('p_feedbackBtns1'),
    p_feedbackBtn2: document.getElementById('p_feedbackBtns2'),
    p_feedbackBtn3: document.getElementById('p_feedbackBtns3'),
    newBtn1: document.getElementById('newDom_button'),
    newBtn2: document.getElementById('newRange_button'),
    newBtn3: document.getElementById('newRange2_button'),
    prevBtn: document.getElementById('prevDom_button'),
    nextBtn: document.getElementById('nextDom_button'),
}


export function updateInputSec(part) {
    elements.feedback.style.display = 'none';
    if (part === 'part1') {
        elements.secInput1.style.display = 'block';
        elements.secInput2.style.display = 'none';
        elements.secInput3.style.display = 'none';
        elements.input1.focus()
    } else if (part === 'part2') {
        elements.secInput1.style.display = 'none';
        elements.secInput2.style.display = 'block';
        elements.secInput3.style.display = 'none';
        elements.input2.focus()
    } else {
        elements.secInput1.style.display = 'none';
        elements.secInput2.style.display = 'none';
        elements.secInput3.style.display = 'block';
        elements.center.focus()
    }
}

export function updateFeedbackSection(part, domain, range, length) {
    let feedback;
    if (part === 'part1') {
        elements.secInput1.style.display = 'none';
        elements.feedback.style.display = 'block';
        elements.p_feedbackBtn1.style.display = 'block';
        elements.p_feedbackBtn2.style.display = 'none';
        elements.p_feedbackBtn3.style.display = 'none';
        feedback = updateFeedback_p(part, domain, range);
        if (length !== 0) {
            elements.input1.value='';
        }

    } else if (part === 'part2') {
        elements.secInput2.style.display = 'none';
        elements.feedback.style.display = 'block';
        elements.p_feedbackBtn1.style.display = 'none';
        elements.p_feedbackBtn2.style.display = 'block';
        elements.p_feedbackBtn3.style.display = 'none';
    } else if (part === 'part3') {
        elements.secInput3.style.display = 'none';
        elements.feedback.style.display = 'block';
        elements.p_feedbackBtn1.style.display = 'none';
        elements.p_feedbackBtn2.style.display = 'none';
        elements.p_feedbackBtn3.style.display = 'block';
    }
    return feedback
}

function updateFeedback_p(part, domain, range) {
    if (part === 'part1') {
        let feedback = `<p>The function \\(f\\) maps the interval \\(${domain.strg}\\) to the interval \\(${range.strg}\\).</p> 
        <p>\\(f(${domain.leftEndpt}) = ${range.f_a}\\) and \\(f(${domain.rightEndpt}) = ${range.f_b}\\).</p>`;
        elements.p_feedback.innerHTML = feedback;
        MathJax.typeset();
        return feedback;
    }
}

export function getInputValue(id) {
    return document.getElementById(id).value
}

export function resetDOM(part) {
    if (part === 'part1') {
        elements.feedback.style.display = 'none';
        elements.secInput1.style.display = 'block';
    }
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