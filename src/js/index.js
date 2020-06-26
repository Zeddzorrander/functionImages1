import { parameters, views, pt2Codebase, pt3Codebase } from './configGeo';
import * as ggb from './ggb'
import '../styles.css'

let ggbApp = new GGBApplet(parameters, '5.0', views);

function initPart1() {
    ggb.newConstruction();
    ggb.loadCodebase(parameters.ggbBase64);
    document.getElementById('user_inputPart1').style.display = 'block';
    document.getElementById('user_inputPart2').style.display = 'none';
    document.getElementById('user_inputPart3').style.display = 'none';
}

function initPart2() {
    ggb.newConstruction();
    ggb.loadCodebase(pt2Codebase);
    document.getElementById('user_inputPart1').style.display = 'none';
    document.getElementById('user_inputPart2').style.display = 'block';
    document.getElementById('user_inputPart3').style.display = 'none';
}

function initPart3() {
    ggb.newConstruction();
    ggb.loadCodebase(pt3Codebase);
    document.getElementById('user_inputPart1').style.display = 'none';
    document.getElementById('user_inputPart2').style.display = 'none';
    document.getElementById('user_inputPart3').style.display = 'block';
}

window.onload = function() {
    ggbApp.inject('ggbApplet', 'preferHTML5');
    document.getElementById('part1').addEventListener('click', initPart1);
    document.getElementById('part2').addEventListener('click', initPart2);
    document.getElementById('part3').addEventListener('click', initPart3);
}
