//export can be done in two ways:
// named export:
// export function ...
//export {add, subtract, ...}
//These are the ways by which named entities can be exported.
//But this named export dictates that the function name used here must be same even after export.

export function addition(x: number, y: number): number{
    return x + y;
}

export function subtraction(x: number, y: number): number{
    return x - y;
}

// export {addition, subtraction};  Either this can be done or the upper one can be done.

//Default export
//The name can be kept whatever at the import side and the default export is always kept at bottom and there can be only one default export

function divide(x: number, y: number): number{
    return x/y;
}

export default divide;