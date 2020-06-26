import { parameters, views, pt2Codebase, pt3Codebase } from './configGeo';
import './intervals'
import * as ggb from './ggb'
import '../styles.css'
import { elements, getInputValue, updateInputSec, updateFeedbackSection, resetDOM } from './UI';
import Interval from './intervals';

let ggbApp = new GGBApplet(parameters, '5.0', views);

class State {
    constructor() {
        this.domains = [];
        this.ranges = [];
        this.feedback = [];
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

function initGGB(event) {
    ggbAppState.part = event.target.id;
    const part = ggbAppState.part;
    let codebase;
    ggb.newConstruction();
    if (part === 'part1') {
        codebase = parameters.ggbBase64;
    } else if (part === 'part2') {
        codebase = pt2Codebase;
    } else {
        codebase = pt3Codebase;
    }
    ggb.loadCodebase(codebase);
    updateInputSec(part);
}

function update1() {
    const string = getInputValue('input1');
    const part = ggbAppState.part;
    const domain = new Interval(string, 'x');
    ggbAppState.addInputInterval(domain, 'x');
    let index = ggbAppState.currentIndex;
    const range = ggb.calcRange(domain);
    ggbAppState.ranges[index] = range;
    ggb.updateDomain(domain);
    ggb.updateRange(range);
    ggbAppState.feedback[index] = updateFeedbackSection(part, domain, range, ggbAppState.domains.length);
}

function newDomain() {
    ggbAppState.counter = ggbAppState.currentIndex;
    ggb.newConstruction();
    ggb.loadCodebase(parameters.ggbBase64);
    resetDOM(ggbAppState.part);
}

function prevDomain() {
    statePt1.counter -= 1;
    let index = statePt1.counter;
    if (index >= 0) {
        f.loadGGBCodebase(statePt1.codebases[index]);
        elements.p_feedback.innerHTML = statePt1.feedback[index];
        MathJax.typeset();
        elements.nextBtnD.style.visibility = 'visible';
    } else {
        f.loadGGBCodebase(statePt1.initCodebase);
        elements.prevBtnD.style.visibility = 'hidden';
        elements.p_feedback.innerHTML = 'Reached original state.  Click "New Domain" to enter a new domain, or click "Next Interval" to see the first entry.';
    }
}

function nextDomain() {
    statePt1.counter += 1;
    let index = statePt1.counter;
    elements.prevBtnD.style.visibility = 'visible';
    elements.nextBtnD.style.visibility = 'visible';
    f.loadGGBCodebase(statePt1.codebases[index]);
    elements.p_feedback.innerHTML = statePt1.feedback[index];
    MathJax.typeset();
    if (index === statePt1.currentIndex) {
        elements.nextBtnD.style.visibility = 'hidden';
    }
}

window.onload = function() {
    ggbApp.inject('ggbApplet', 'preferHTML5');
    elements.input1.focus();
    elements.part1.addEventListener('click', () => {
        initGGB(event);
    });
    elements.part2.addEventListener('click', () => {
        initGGB(event);
    });
    elements.part3.addEventListener('click', () => {
        initGGB(event);
    });
    elements.submit1.addEventListener('click', update1);
    elements.newBtn1.addEventListener('click', newDomain);
    elements.prevBtn.addEventListener('click', prevDomain);
    elements.nextBtn.addEventListener('click', nextDomain);
    ggbAppState.part = 'part1';
}
