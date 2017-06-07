import * as ts from 'typescript';

const userAppFile = './user-app.ts';
const apiFile = './api.d.ts';

const program = ts.createProgram([userAppFile, apiFile], ts.getDefaultCompilerOptions());
const checker = program.getTypeChecker();
const sourceFile = program.getSourceFile(userAppFile);

function printApi(node) {
  const symbol = checker.getSymbolAtLocation(node);

  if (symbol) {
    const type = Object.keys(ts.SymbolFlags).find(k => Number(ts.SymbolFlags[k]) === Number(symbol.flags));
    console.log(`${symbol.name} is ${type}`);
  }

  ts.forEachChild(node, printApi);
}

printApi(sourceFile);
