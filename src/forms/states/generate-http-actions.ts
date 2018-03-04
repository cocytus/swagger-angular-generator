import * as _ from 'lodash';
import * as path from 'path';
import {Config} from '../../generate';
import {ResponseDef} from '../../requests/requests.models';
import {Parameter} from '../../types';
import {indent, writeFile} from '../../utils';

export function GenerateHttpActions(config: Config, name: string, responseDef: ResponseDef,
                                    actionClassNameBase: string, simpleName: string,
                                    formSubDirName: string, paramGroups: Parameter[]) {
  let content = '';
  content += getActionImports(name, simpleName, paramGroups);
  content += getActionTypes(simpleName);
  content += getActionStartDefinition(simpleName);
  content += getActionSuccessDefinition(responseDef);
  content += getActionErrorDefinition();
  content += getActionOverviewType(actionClassNameBase);

  const actionsFileName = path.join(formSubDirName, `states`, `actions.ts`);
  writeFile(actionsFileName, content, config.header, 'ts', ['max-classes-per-file']);
}

function getActionImports(name: string, simpleName: string, paramGroups: Parameter[]) {
  let res = `import {Action} from '@ngrx/store';\n`;

  if (paramGroups.length) {
    res += `import {${_.upperFirst(simpleName)}Params} from '../../../../controllers/${name}';\n`;
  }
  res += `import * as model from '../../../../model';\n`;
  res += `\n`;

  return res;
}

function getActionTypes(name: string) {
  let res = `export enum Actions {\n`;
  res += indent([
    `START = '[${name}] Start',`,
    `SUCCESS = '[${name}] Success',`,
    `ERROR = '[${name}] Error',`,
  ]);
  res += `\n}\n\n`;

  return res;
}

function getActionStartDefinition(name: string) {
  let res = `export class Start implements Action {\n`;
  res += indent(`readonly type = Actions.START;\n`);
  res += indent(`constructor(public payload: ${_.upperFirst(name)}Params) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionSuccessDefinition(response: ResponseDef) {
  let res = `export class Success implements Action {\n`;
  res += indent(`readonly type = Actions.SUCCESS;\n`);
  res += indent(`constructor(public payload: ${response.type}) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionErrorDefinition() {
  let res = `export class Error implements Action {\n`;
  res += indent(`readonly type = Actions.ERROR;\n`);
  res += indent(`constructor(public payload: string) {}\n`);
  res += `}\n`;
  res += `\n`;

  return res;
}

function getActionOverviewType(actionClassNameBase: string) {
  return `export type ${actionClassNameBase}Action = Start | Success | Error;\n`;
}

export function getActionClassNameBase(name: string) {
  return getClassName(name);
}

export function getClassName(name: string) {
  return _.upperFirst(name);
}
