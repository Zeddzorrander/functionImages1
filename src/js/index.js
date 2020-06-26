import { parameters, views, pt2Codebase, pt3Codebase } from './configGeo';
import './intervals'
import * as ggb from './ggb'
import '../styles.css'
import { elements, getInputValue, updateInputSec } from './UI';
import Interval from './intervals';

let ggbApp = new GGBApplet(parameters, '5.0', views);

function initGGB(event) {
    const part = event.target.id
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
    console.log(string);
    const domain = new Interval(string, 'x');
    const range = ggb.calcRange(domain);
    ggb.updateDomain(domain);
    ggb.updateRange(range);
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
    elements.submit1.addEventListener('click', update1)
}
