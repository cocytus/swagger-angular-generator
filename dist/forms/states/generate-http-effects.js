"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils_1 = require("../../utils");
function GenerateHttpEffects(config, name, simpleName, actionClassNameBase, formSubDirName, paramGroups) {
    let content = '';
    content += getEffectsImports(name);
    content += getEffectsStartDefinition(actionClassNameBase);
    content += getEffectDefinition(actionClassNameBase, name, simpleName, paramGroups);
    content += getConstructorDefinition(name);
    content += `}\n`;
    const effectsFileName = path.join(formSubDirName, `states`, `effects.ts`);
    utils_1.writeFile(effectsFileName, content, config.header);
}
exports.GenerateHttpEffects = GenerateHttpEffects;
function getEffectsImports(name) {
    let res = `import {Injectable} from '@angular/core';\n`;
    res += `import {Actions, Effect} from '@ngrx/effects';\n`;
    res += `import {of} from 'rxjs/observable/of';\n`;
    res += `import {catchError, map, switchMap} from 'rxjs/operators';\n`;
    res += `import {${name}Service} from '../../../../controllers/${name}';\n`;
    res += `import * as actions from './actions';\n`;
    res += `\n`;
    return res;
}
function getEffectsStartDefinition(actionClassNameBase) {
    let res = `@Injectable()\n`;
    res += `export class ${actionClassNameBase}Effects {\n`;
    return res;
}
function getConstructorDefinition(name) {
    let res = `constructor(\n`;
    res += utils_1.indent(`private storeActions: Actions,\n`);
    res += utils_1.indent(`private ${name.toLowerCase()}Service: ${name}Service,\n`);
    res += `) {}\n\n`;
    return utils_1.indent(res);
}
function getEffectDefinition(actionClassNameBase, name, simpleName, paramGroups) {
    const startActionPayloadDefinition = getStartActionPayloadDefinition(paramGroups);
    let res = utils_1.indent(`@Effect()\n`);
    res += utils_1.indent(`${actionClassNameBase} = this.storeActions.ofType<actions.Start>(actions.Actions.START).pipe(\n`);
    res += utils_1.indent(`switchMap((action: actions.Start) => ` +
        `this.${name.toLowerCase()}Service.${simpleName}(${startActionPayloadDefinition}).pipe(\n`, 2);
    res += utils_1.indent(`map(result => new actions.Success(result)),\n`, 3);
    res += utils_1.indent(`catchError((error: Error) => of(new actions.Error(error.message))),\n`, 3);
    res += utils_1.indent(`)));\n`);
    res += '\n';
    return res;
}
function getStartActionPayloadDefinition(paramGroups) {
    if (paramGroups.length)
        return 'action.payload';
    return '';
}
//# sourceMappingURL=generate-http-effects.js.map