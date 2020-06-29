

export const elements = {
    secInput1: document.getElementById('user_inputPart1'),
    pInput1: document.getElementById('p_input1'),
    h3Input1: document.getElementById('h3_input1'),
    input1: document.getElementById('input1'),
    submit1: document.getElementById('submit1'),
    feedback: document.getElementById('feedback'),
    p_feedback: document.getElementById('p_feedback'),
    p_feedbackBtn1: document.getElementById('p_feedbackBtns1'),
    newBtn1: document.getElementById('newDom_button'),
    prevBtn: document.getElementById('prevDom_button'),
    nextBtn: document.getElementById('nextDom_button'),
}

export function updateFeedbackSection(domain, range) {
    elements.secInput1.style.display = 'none';
    elements.feedback.style.display = 'block';
    elements.p_feedbackBtn1.style.display = 'block';
    let feedback = `<p>The function \\(f\\) maps the interval \\(${domain.strg}\\) to the interval \\(${range.strg}\\).</p> 
    <p>\\(f(${domain.leftEndpt}) = ${range.f_a}\\) and \\(f(${domain.rightEndpt}) = ${range.f_b}\\).</p>`;
    elements.p_feedback.innerHTML = feedback;
    MathJax.typeset();
    elements.nextBtn.style.visibility = 'hidden';
    elements.prevBtn.style.visibility = 'visible';
    return feedback
}

export function getInputValue(id) {
    return document.getElementById(id).value
}

export function resetDOM() {
    elements.feedback.style.display = 'none';
    elements.secInput1.style.display = 'block';
    elements.input1.value = '';
    elements.input1.focus();
}
