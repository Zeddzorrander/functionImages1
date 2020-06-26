export default class Interval {
    constructor(string, axis) {
        this.strg = string;
        this.axis = axis;
        this.parseInterval(axis);
    }
    parseInterval() {
    //get input from textbox
    const interval = this.strg;
    // regular expressions to grab a, b, and endpoints of interval
    const regExInt = /[\[\(]([^,]*),([^\)\]]*)[\)\]]/;
    const leftEndPtRegEx = /^[\[\(]/;
    const rightEndPtRegEx = /[\]\)]$/;
    const testA = /[\[\(]([^,]*),/;
    const testB = /,([^\]]*)[\)\]]$/;

    //check to see it is an interval
    if (regExInt.test(interval)) {

        //Grab a and b from the interval
        let [entire, a] = testA.exec(interval);
        let [entire2, b] = testB.exec(interval);

        //trim leading space on b, if there
        const index = b.split('').indexOf(' ');
        if (index > -1) b = b.split('').slice(index + 1).join(''); 

        // Add a and b to geogebra, if it can't parse a and b, then alert an error
        if (ggbApplet.evalCommand(`temp1=${a}`) && ggbApplet.evalCommand(`temp2=${b}`)){
            a = Math.round(100000 * ggbApplet.getValue('temp1')) / 100000;
            b = Math.round(100000 * ggbApplet.getValue('temp2')) / 100000;
            ggbApplet.deleteObject('temp1');
            ggbApplet.deleteObject('temp2');
        
        } else alert('Enter a valid interval');
        // test endpoint inclusion
        const [left] = interval.match(leftEndPtRegEx);
        const [right] = interval.match(rightEndPtRegEx);
        
        if (parseFloat(a) < parseFloat(b)) {
            this.leftIneq = left === '[' ? '<=' : '<';
            this.rightIneq = right === ']' ? '<=' : '<';
            this.rightEndpt = b;
            this.leftEndpt = a;
        } else if (a === b && left === '[' && right === ']') {
            this.leftIneq = left === '[' ? '<=' : '<'; 
            this.rightIneq = right === ']' ? '<=' : '<';
            this.rightEndpt = b;
            this.leftEndpt =  a;
        } else alert('The left endpoint must be less than the right endpoint of the interval');
    } else alert(`Enter a valid interval, remember to use * between numbers and "pi" or numbers and "e"`);
    
    return this;
    }
}