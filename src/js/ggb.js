export function loadCodebase(codeBase) {
    ggbApplet.setBase64(codeBase);
}

export function getCodebase() {
    return ggbApplet.getBase64();
}

export function newConstruction() {
    ggbApplet.newConstruction();
}

export function updateDomain(domain) {
    ggbApplet.setVisible('domain', true);
    ggbApplet.setValue('a', domain.leftEndpt);
    ggbApplet.setValue('b', domain.rightEndpt);
    ggbApplet.evalCommand(`domain: a ${domain.leftIneq} x ${domain.rightIneq} b`);
}

export function updateRange(range) {
    ggbApplet.setValue('min', range.leftEndpt);
    ggbApplet.setValue('max', range.rightEndpt);
    ggbApplet.evalCommand(`range: min ${range.leftIneq} y ${range.rightIneq} max`);
    ggbApplet.setVisible('range', true);
}

export function calcRange(domain) {
    let leftIneq, rightIneq;

    // handle case that the domain is a single point
    if (domain.leftEndpt === domain.rightEndpt) {
        ggbApplet.evalCommand(`temp=f(${domain.leftEndpt})`);
        const temp = Math.round(100000 * ggbApplet.getValue('temp')) / 100000;
        return { leftIneq: '<=', 
                rightIneq: '<=', 
                leftEndpt: temp, 
                rightEndpt: temp, 
                strg: `[${temp}, ${temp}]` 
            }
    }

    // otherwise, do all this stuff.
    // Get upper bound on range
    ggbApplet.evalCommand(`relMax = Max(f,${domain.leftEndpt},${domain.rightEndpt})`);
    ggbApplet.setVisible('relMax', false);
    const relMax = Math.round(100000 * parseFloat(ggbApplet.getYcoord('relMax'))) / 100000;
    ggbApplet.evalCommand(`rangeMax = Max({f(${domain.leftEndpt}), f(${domain.rightEndpt}), ${relMax}})`);
    
    // Get lower bound on range 
    ggbApplet.evalCommand(`relMin = Min(f,${domain.leftEndpt},${domain.rightEndpt})`);
    ggbApplet.setVisible('relMin', false);
    const relMin = Math.round(100000 * parseFloat(ggbApplet.getYcoord('relMin'))) / 100000;
    ggbApplet.evalCommand(`rangeMin = Min({f(${domain.leftEndpt}), f(${domain.rightEndpt}), ${relMin}})`);
    
    // convert strings to numbers and account for rounding error
    const min =getRoundedValue('rangeMin');
    const max = getRoundedValue('rangeMax');
    const f_a = getRoundedValue(`f(${domain.leftEndpt})`);
    const f_b = getRoundedValue(`f(${domain.rightEndpt})`);
    
    //test lower endpoint for inclusion
    if (min === relMin && min === f_a && f_a !== f_b) {
        leftIneq = domain.leftIneq;
    } else if (min === relMin && min === f_b && f_a !== f_b) {
        leftIneq = domain.rightIneq;
    } else if (min === relMin && min === f_a && f_a === f_b) {
        if(domain.leftIneq === domain.rightIneq) {
            leftIneq = domain.leftIneq;
        } else {
            if (domain.leftIneq > domain.rightIneq) {
                leftIneq = domain.leftIneq;
            } else {
                leftIneq = domain.rightIneq;
            }
        }
    } else if (min === f_b) {
        leftIneq = domain.rightIneq;
    } else if (min === f_a) {
        leftIneq = domain.leftIneq;
    } else {
        leftIneq = '<=';
    }
    
    // test upper endpoint for inclusion
    if (max === relMax && max === f_a && f_a !== f_b) {
        rightIneq = domain.leftIneq;
    } else if (max === relMax && max === f_b && f_a !== f_b) {
        rightIneq = domain.rightIneq;
    } else if (max === relMax && max === f_a && f_a === f_b) {
        if(domain.leftIneq === domain.rightIneq) {
            rightIneq = domain.leftIneq;
        } else {
            if (domain.leftIneq > domain.rightIneq) {
                rightIneq = domain.leftIneq;
            } else {
                rightIneq = domain.rightIneq;
            }
        }
    } else if (max === f_b) {
        rightIneq = domain.rightIneq;
    } else if (max === f_a) {
        rightIneq = domain.leftIneq;
    } else {
        rightIneq = '<=';
    }

    const strg = `${leftIneq === '<=' ? '[' : '('}${min}, ${max}${rightIneq === '<=' ? ']' : ')'}`;
    let leftEndpt = min;
    let rightEndpt = max;
    return { leftIneq, rightIneq, leftEndpt, rightEndpt, strg, f_a, f_b };
}

function getRoundedValue(obj) {
    return Math.round(100000 * parseFloat(ggbApplet.getValue(obj))) / 100000
}