import rollup from 'rollup';
import { build, IBuildTargetFormat, watchAndReBuild, copy } from './shared';
import { args } from './args';
import packageJson from '../package.json';
import { IRollupWatchOptions } from './interfaces';
import * as path from 'path';
import ChildProcess from 'child_process';
import * as fs from 'fs';

const BASE_DIR = process.cwd();
const DIST_DIR = path.join(BASE_DIR, 'dist');
const NODE_MODULES = 'node_modules';
const LIB_NAME = 'aurelia-i18n';
const DIST_FILE_NAME = `${LIB_NAME}.js`;
const TYPE_DIST_FILE_NAME = `${LIB_NAME}.d.ts`;
const ENTRY_PATH = `src/${LIB_NAME}.ts`;
const EXTERNAL_LIBS = [
  'aurelia-framework',
  'i18next',
  ...Object
    .keys({ ...packageJson.dependencies, ...packageJson.devDependencies })
    .filter(dev => /^(?:aurelia)/.test(dev) && dev !== LIB_NAME)
];
const configs: Record<IBuildTargetFormat, { input: string; outputs: rollup.OutputOptions[]; tsConfig?: { target: string } }> = {
  es2017: {
    input: ENTRY_PATH,
    outputs: [
      { file: `dist/es2017/${DIST_FILE_NAME}`, format: 'esm' }
    ]
  },
  es2015: {
    input: ENTRY_PATH,
    outputs: [
      { file: `dist/es2015/${DIST_FILE_NAME}`, format: 'esm' },
      {
        file: `dist/umd-es2015/${DIST_FILE_NAME}`,
        format: 'umd',
        name: 'au.i18n',
        globals: {
          'aurelia-framework': 'au',
          'aurelia-binding': 'au',
          'aurelia-metadata': 'au',
          'aurelia-templating': 'au',
          'aurelia-loader': 'au',
          'aurelia-event-aggregator': 'au',
          'aurelia-pal': 'au',
          'aurelia-templating-resources': 'au',
          'aurelia-logging': 'au.LogManager',
          'aurelia-dependency-injection': 'au',
          'i18next': 'i18next'
        }
      }
    ]
  },
  es5: {
    input: ENTRY_PATH,
    outputs: [
      { file: `dist/commonjs/${DIST_FILE_NAME}`, format: 'cjs' },
      { file: `dist/amd/${DIST_FILE_NAME}`, format: 'amd', amd: { id: LIB_NAME } },
      { file: `dist/native-modules/${DIST_FILE_NAME}`, format: 'esm' },
      {
        file: `dist/umd/${DIST_FILE_NAME}`,
        format: 'umd',
        name: 'au.i18n',
        globals: {
          'aurelia-framework': 'au',
          'aurelia-binding': 'au',
          'aurelia-metadata': 'au',
          'aurelia-templating': 'au',
          'aurelia-loader': 'au',
          'aurelia-event-aggregator': 'au',
          'aurelia-pal': 'au',
          'aurelia-templating-resources': 'au',
          'aurelia-logging': 'au.LogManager',
          'aurelia-dependency-injection': 'au',
          'i18next': 'i18next'
        }
      },
      { file: `dist/system/${DIST_FILE_NAME}`, format: 'system' }
    ]
  },
  amd: {
    input: ENTRY_PATH,
    outputs: [
      { file: `dist/amd/${DIST_FILE_NAME}`, format: 'amd', amd: { id: LIB_NAME } }
    ],
    tsConfig: {
      target: 'es5'
    }
  },
  system: {
    input: ENTRY_PATH,
    outputs: [
      { file: `dist/system/${DIST_FILE_NAME}`, format: 'system' }
    ],
    tsConfig: {
      target: 'es5'
    }
  },
  commonjs: {
    input: ENTRY_PATH,
    outputs: [
      { file: `dist/commonjs/${DIST_FILE_NAME}`, format: 'cjs' }
    ],
    tsConfig: {
      target: 'es5'
    }
  },
  'native-modules': {
    input: ENTRY_PATH,
    outputs: [
      { file: `dist/native-modules/${DIST_FILE_NAME}`, format: 'esm' }
    ],
    tsConfig: {
      target: 'es5'
    }
  }
};

if (args.dev) {
  // watch mode
  let generateDtsTO: any;
  const targetFormats: IBuildTargetFormat[] = args.format || ['commonjs'];
  const options = targetFormats.reduce((formats, targetFormat) => {
    const { outputs, tsConfig } = configs[targetFormat];
    formats[targetFormat] = {
      input: ENTRY_PATH,
      external: EXTERNAL_LIBS,
      output: outputs,
      tsConfig
    };
    return formats;
  }, {} as Record<IBuildTargetFormat, IRollupWatchOptions>);
  console.log('=============\nBuilding Started\n=============');
  watchAndReBuild(
    options,
    () => {
      console.log('=============\nFinished building\n=============');
      clearTimeout(generateDtsTO);
      generateDtsTO = setTimeout(() => {
        generateDts().then(() => {
          if (args.target) {
            copyToTargetProject(targetFormats, args.target);
          }
        });
      }, 1000);
    }
  );
} else {
  // Single build
  const targetFormats: IBuildTargetFormat[] = args.format || ['es5', 'es2015', 'es2017'];
  Promise
    .all(targetFormats.map(target => {
      const { outputs, tsConfig, ...options } = configs[target];
      return build(target, { ...options, external: EXTERNAL_LIBS }, outputs);
    }))
    .then(() => generateDts())
    .then(() => {
      if (args.target) {
        copyToTargetProject(targetFormats, args.target);
      }
    })
    .catch(ex => {
      console.log(ex);
    });
}

async function generateDts(): Promise<void> {
  console.log('\n==============\nGenerating dts bundle...\n==============');
  return new Promise<void>((resolve, reject) => {
    ChildProcess.exec(`npm run build:dts`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.log('Generating dts error:');
        console.log(stderr);
      } else {
        console.log('Generated dts bundle successfully');
        console.log(stdout);
      }
      try {
        fixI18nDefaultImport(path.resolve(DIST_DIR, TYPE_DIST_FILE_NAME));
      } catch (ex) {
        console.log('Failure fixing default import.');
        reject(ex);
      }
      resolve();
    });
  });
}

async function fixI18nDefaultImport(typeDefFileName: string) {
  const importDeclaration = `import i18next from 'i18next';`;
  const data = fs.readFileSync(typeDefFileName, 'utf-8')
    .replace("import { i18next } from 'i18next';", importDeclaration);
  const fd = fs.openSync(typeDefFileName, 'w+');

  fs.writeSync(fd, Buffer.from(data, 'utf8'));
}
function copyToTargetProject(targetFormats: string[], targetProject: string) {
  console.log('=============\nCopying to target\n=============');
  targetFormats.forEach((targetFormat) => {
    copy(
      path.join(DIST_DIR, targetFormat, DIST_FILE_NAME),
      path.join(BASE_DIR, targetProject, NODE_MODULES, LIB_NAME, 'dist', targetFormat, DIST_FILE_NAME)
    );
  });
  copy(
    path.join(DIST_DIR, TYPE_DIST_FILE_NAME),
    path.join(BASE_DIR, targetProject, NODE_MODULES, LIB_NAME, 'dist', TYPE_DIST_FILE_NAME)
  );
  console.log('=============\nCopied to target\n=============');
}
