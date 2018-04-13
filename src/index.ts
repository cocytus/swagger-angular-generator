#!/usr/bin/env node
import * as commander from 'commander';

import * as conf from './conf';
import {generate} from './generate';

commander
  .option('-s, --src <source>', `Source directory, default: ${conf.apiFile}`)
  .option('-d, --dest <destination>', `Destination directory, default: ${conf.outDir}`)
  .option('-w, --swaggerURLPath <swagger URL path>', `swagger URL prefix, default: ${conf.swaggerURLPath}`)
  .parse(process.argv);

generate(commander.src, commander.dest, commander.swaggerURLPath);
