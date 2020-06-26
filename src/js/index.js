import { parameters, views, pt2Codebase, pt3Codebase } from './configGeo';
import './intervals'
import * as ggb from './ggb'
import '../styles.css'
import { elements } from './UI';
import Interval from './intervals';

let ggbApp = new GGBApplet(parameters, '5.0', views);

function initPart1() {
    ggb.newConstruction();
    ggb.loadCodebase(parameters.ggbBase64);
    elements.secInput1.style.display = 'block';
    elements.secInput2.style.display = 'none';
    elements.secInput3.style.display = 'none';
}

function initPart2() {
    ggb.newConstruction();
    ggb.loadCodebase(pt2Codebase);
    elements.secInput1.style.display = 'none';
    elements.secInput2.style.display = 'block';
    elements.secInput3.style.display = 'none';
}

function initPart3() {
    ggb.newConstruction();
    ggb.loadCodebase(pt3Codebase);
    elements.secInput1.style.display = 'none';
    elements.secInput2.style.display = 'none';
    elements.secInput3.style.display = 'block';
}

function update1() {
    const string = elements.input1.value;
    const domain = new Interval(string, 'x');
    const range = ggb.calcRange(domain);
    ggb.updateDomain(domain);
    ggb.updateRange(range);
    
}

window.onload = function() {
    ggbApp.inject('ggbApplet', 'preferHTML5');
    document.getElementById('part1').addEventListener('click', initPart1);
    document.getElementById('part2').addEventListener('click', initPart2);
    document.getElementById('part3').addEventListener('click', initPart3);
    document.getElementById('submit1').addEventListener('click', update1)
}
