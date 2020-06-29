import { parameters, views, pt2Codebase, pt3Codebase } from './configGeo';
import './intervals'
import * as ggb from './ggb'
import '../styles.css'
import { elements, getInputValue, updateFeedbackSection, resetDOM } from './UI';
import Interval from './intervals';

let ggbApp = new GGBApplet(parameters, '5.0', views);

class State {
    constructor() {
        this.domains = [];
        this.ranges = [];
        this.feedback = [];
        this.codebases = [];
        this.currentIndex = 0;
        this.counter = 0;
    } 

    addInputInterval(interval, axis) {
        if (axis = 'x') {
            this.domains.push(interval);
        } else if (axis === 'y') {
            this.ranges.push(interval)
        }
        this.currentIndex = this.domains.length - 1;
        this.counter = this.domains.length -1;
    }

}

let ggbAppState = new State();


function update() {
    const string = getInputValue('input1');
    const domain = new Interval(string, 'x');
    ggbAppState.addInputInterval(domain, 'x');
    let index = ggbAppState.currentIndex;
    const range = ggb.calcRange(domain);
    ggbAppState.ranges[index] = range;
    ggb.updateDomain(domain);
    ggb.updateRange(range);
    ggbAppState.codebases[index] = ggb.getCodebase();
    ggbAppState.feedback[index] = updateFeedbackSection(domain, range, ggbAppState.domains.length);
}

function newDomain() {
    ggbAppState.counter = ggbAppState.currentIndex;
    ggb.newConstruction();
    ggb.loadCodebase(parameters.ggbBase64);
    resetDOM();
}

function prevDomain() {
    ggbAppState.counter -= 1;
    let index = ggbAppState.counter;
    if (index >= 0) {
        ggb.loadCodebase(ggbAppState.codebases[index]);
        elements.p_feedback.innerHTML = ggbAppState.feedback[index];
        MathJax.typeset();
        elements.nextBtn.style.visibility = 'visible';
    } else {
        ggb.loadCodebase(ggbAppState.initCodebase);
        elements.prevBtn.style.visibility = 'hidden';
        elements.p_feedback.innerHTML = 'Reached original state.  Click "New Domain" to enter a new domain, or click "Next Interval" to see the first entry.';
    }
}

function nextDomain() {
    ggbAppState.counter += 1;
    let index = ggbAppState.counter;
    elements.prevBtn.style.visibility = 'visible';
    elements.nextBtn.style.visibility = 'visible';
    ggb.loadCodebase(ggbAppState.codebases[index]);
    elements.p_feedback.innerHTML = ggbAppState.feedback[index];
    MathJax.typeset();
    if (index === ggbAppState.currentIndex) {
        elements.nextBtn.style.visibility = 'hidden';
    }
}

function handleKeyPress(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        elements.submit1.click();
    }
}

window.onload = function() {
    ggbApp.inject('ggbApplet', 'preferHTML5');
    elements.input1.focus();
    elements.submit1.addEventListener('click', update);
    elements.newBtn1.addEventListener('click', newDomain);
    elements.prevBtn.addEventListener('click', prevDomain);
    elements.nextBtn.addEventListener('click', nextDomain);
    elements.input1.onkeypress = handleKeyPress;
}
