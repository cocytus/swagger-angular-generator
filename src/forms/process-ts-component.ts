import * as _ from 'lodash';
import * as nodePath from 'path';
import {nativeTypes} from '../conf';
import {ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {parameterToSchema} from '../requests/process-params';
import {NativeNames, Parameter, Schema} from '../types';
import {indent, writeFile} from '../utils';

export interface FieldDefinition {
  content: string;
  params: string[];
}

export function createComponentTs(config: Config, name: string, params: Parameter[],
                                  definitions: ProcessedDefinition[], simpleName: string,
                                  formSubDirName: string, className: string) {
  let content = '';
  content += getImports(name);
  content += getComponent(simpleName);
  content += `export class ${className}Component {\n`;
  content += indent(`${name}Form: FormGroup;\n`);

  content += getConstructor(name, definitions, params);
  content += getFormSubmitFunction(name, simpleName, params);
  content += '}\n';

  const componentHTMLFileName = nodePath.join(formSubDirName, `${simpleName}.component.ts`);
  writeFile(componentHTMLFileName, content, config.header);
}

function getImports(name: string) {
  let res = 'import {Component} from \'@angular/core\';\n';
  res += 'import {FormArray, FormControl, FormGroup, Validators} from \'@angular/forms\';\n';
  res += `import {${name}Service} from '../../../controllers/${name}';\n`;
  res += '\n';

  return res;
}

function getComponent(simpleName: string) {
  let res = '@Component({\n';
  res += indent(`selector: '${simpleName}',\n`);
  res += indent(`templateUrl: './${simpleName}.component.html',\n`);
  res += '})\n';
  res += '\n';

  return res;
}

function getConstructor(name: string, definitions: ProcessedDefinition[], params: Parameter[]) {
  let res = indent('constructor(\n');
  res += indent(`private ${name.toLowerCase()}Service: ${name}Service,\n`, 2);
  res += indent(') {\n');

  // TODO! check if originalName necessary
  const definitionsMap = _.groupBy(definitions, 'originalName');
  const formDefinition = walkParamOrProp(params, undefined, definitionsMap);
  res += indent(`this.${name}Form = new FormGroup({\n${formDefinition}\n});\n`, 2);
  res += indent('}\n');
  res += '\n';

  return res;
}

function walkParamOrProp(definition: Parameter[] | ProcessedDefinition, path: string[] = [],
                         definitions: _.Dictionary<ProcessedDefinition[]>): string {
  const res: string[] = [];
  let schema: Record<string, Schema>;
  let required: string[];

  // create unified inputs for
  // 1. parameters
  if (Array.isArray(definition)) {
    schema = {};
    required = [];
    definition.forEach(param => {
      if (param.required) required.push(param.name);
      schema[param.name] = parameterToSchema(param);
    });
  // 2. object definition
  } else {
    required = definition.def.required;
    schema = definition.def.properties;
  }

  // walk the list and build recursive form model
  Object.entries(schema).forEach(([paramName, param]) => {
    const name = paramName;
    const newPath = [...path, name];
    const ref = param.$ref;
    const isRequired = required && required.includes(name);
    const fieldDefinition = makeField(param, ref, name, newPath, isRequired, definitions);

    res.push(fieldDefinition);
  });

  return indent(res);
}

function makeField(param: Schema, ref: string,
                   name: string, path: string[], required: boolean,
                   definitions: _.Dictionary<ProcessedDefinition[]>): string {

  let definition: ProcessedDefinition;
  let type = param.type;
  let control: string;
  let initializer: string;

  if (type) {
    if (type in nativeTypes) {
      const typedType = type as NativeNames;
      type = nativeTypes[typedType];
    }

    // TODO implement arrays
    // use helper method and store type definition to add new array items
    if (type === 'array') {
      control = 'FormArray';
      initializer = '[]';
    } else {
      control = 'FormControl';
      initializer = typeof param.default === 'string' ? `'${param.default}'` : param.default;
    }
  } else {
    const refType = ref.replace(/^#\/definitions\//, '');
    definition = definitions[refType][0];

    control = 'FormGroup';
    const fields = walkParamOrProp(definition, path, definitions);
    initializer = `{\n${fields}\n}`;
  }

  const validators = getValidators(param);
  if (required) validators.push('Validators.required');

  return `${name}: new ${control}(${initializer}, [${validators.join(', ')}]),`;
}

function getValidators(param: Parameter | Schema) {
  const validators: string[] = [];

  if (param.format && param.format === 'email') validators.push('Validators.email');

  if (param.maximum) validators.push(`Validators.max(${param.maxLength})`);
  if (param.minimum) validators.push(`Validators.min(${param.minLength})`);

  if (param.maxLength) validators.push(`Validators.maxLength(${param.maxLength})`);
  if (param.minLength) validators.push(`Validators.minLength(${param.minLength})`);

  if (param.pattern) validators.push(`Validators.pattern('${param.pattern})`);

  return validators;
}

function getFormSubmitFunction(name: string, simpleName: string, paramGroups: Parameter[]) {
  let res = indent(`${name.toLowerCase()}() {\n`);
  res += indent(
    `this.${name.toLowerCase()}Service.${simpleName}(${getSubmitFnParameters(name, paramGroups)});\n`, 2);
  res += indent('}\n');

  return res;
}

function getSubmitFnParameters(name: string, paramGroups: Parameter[]) {
  if (paramGroups.length) return `this.${name}Form.value`;
  return '';
}
