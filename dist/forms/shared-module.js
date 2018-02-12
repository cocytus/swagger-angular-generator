"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const conf = require("../conf");
const utils_1 = require("../utils");
function createSharedModule(config) {
    let content = '';
    content += `import {NgModule} from '@angular/core';\n`;
    content += `import {CommonModule} from '@angular/common';\n`;
    content += `import {FlexLayoutModule} from '@angular/flex-layout';\n`;
    content += `import {ReactiveFormsModule} from '@angular/forms';\n`;
    content += 'import {\n';
    content += utils_1.indent('MatButtonModule,\n');
    content += utils_1.indent('MatButtonToggleModule,\n');
    content += utils_1.indent('MatCardModule,\n');
    content += utils_1.indent('MatCheckboxModule,\n');
    content += utils_1.indent('MatChipsModule,\n');
    content += utils_1.indent('MatDatepickerModule,\n');
    content += utils_1.indent('MatGridListModule,\n');
    content += utils_1.indent('MatIconModule,\n');
    content += utils_1.indent('MatInputModule,\n');
    content += utils_1.indent('MatListModule,\n');
    content += utils_1.indent('MatMenuModule,\n');
    content += utils_1.indent('MatNativeDateModule,\n');
    content += utils_1.indent('MatProgressBarModule,\n');
    content += utils_1.indent('MatProgressSpinnerModule,\n');
    content += utils_1.indent('MatRadioModule,\n');
    content += utils_1.indent('MatSelectModule,\n');
    content += `} from '@angular/material';\n`;
    content += '\n';
    content += '@NgModule({\n';
    content += utils_1.indent('imports: [\n');
    content += utils_1.indent('CommonModule,\n', 2);
    content += utils_1.indent('ReactiveFormsModule,\n', 2);
    content += utils_1.indent('FlexLayoutModule,\n', 2);
    content += utils_1.indent('MatButtonModule,\n', 2);
    content += utils_1.indent('MatButtonToggleModule,\n', 2);
    content += utils_1.indent('MatCardModule,\n', 2);
    content += utils_1.indent('MatCheckboxModule,\n', 2);
    content += utils_1.indent('MatChipsModule,\n', 2);
    content += utils_1.indent('MatDatepickerModule,\n', 2);
    content += utils_1.indent('MatGridListModule,\n', 2);
    content += utils_1.indent('MatIconModule,\n', 2);
    content += utils_1.indent('MatInputModule,\n', 2);
    content += utils_1.indent('MatListModule,\n', 2);
    content += utils_1.indent('MatMenuModule,\n', 2);
    content += utils_1.indent('MatNativeDateModule,\n', 2);
    content += utils_1.indent('MatProgressBarModule,\n', 2);
    content += utils_1.indent('MatProgressSpinnerModule,\n', 2);
    content += utils_1.indent('MatRadioModule,\n', 2);
    content += utils_1.indent('MatSelectModule,\n', 2);
    content += utils_1.indent('],\n');
    content += utils_1.indent('exports: [\n');
    content += utils_1.indent('CommonModule,\n', 2);
    content += utils_1.indent('ReactiveFormsModule,\n', 2);
    content += utils_1.indent('FlexLayoutModule,\n', 2);
    content += utils_1.indent('MatButtonModule,\n', 2);
    content += utils_1.indent('MatButtonToggleModule,\n', 2);
    content += utils_1.indent('MatCardModule,\n', 2);
    content += utils_1.indent('MatCheckboxModule,\n', 2);
    content += utils_1.indent('MatChipsModule,\n', 2);
    content += utils_1.indent('MatDatepickerModule,\n', 2);
    content += utils_1.indent('MatGridListModule,\n', 2);
    content += utils_1.indent('MatIconModule,\n', 2);
    content += utils_1.indent('MatInputModule,\n', 2);
    content += utils_1.indent('MatListModule,\n', 2);
    content += utils_1.indent('MatMenuModule,\n', 2);
    content += utils_1.indent('MatNativeDateModule,\n', 2);
    content += utils_1.indent('MatProgressBarModule,\n', 2);
    content += utils_1.indent('MatProgressSpinnerModule,\n', 2);
    content += utils_1.indent('MatRadioModule,\n', 2);
    content += utils_1.indent('MatSelectModule,\n', 2);
    content += utils_1.indent('],\n');
    content += '})\n';
    content += `export class FormsSharedModule {}\n`;
    const moduleFileName = path.join(config.dest, conf.formDir, `forms-shared.module.ts`);
    utils_1.writeFile(moduleFileName, content, config.header);
}
exports.createSharedModule = createSharedModule;
//# sourceMappingURL=shared-module.js.map