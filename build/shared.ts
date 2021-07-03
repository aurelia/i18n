import * as rollup from 'rollup';
import type { RollupOptions, OutputOptions } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import rimraf from 'rimraf';
import { IRollupWatchOptions } from './interfaces';
import * as fs from 'fs';

const CACHE_DIR = '.rollupcache';
export type IBuildTargetFormat = 'es5' | 'es2015' | 'es2017' | 'amd' | 'system' | 'commonjs' | 'native-modules';

export async function build(
  target: IBuildTargetFormat,
  options: RollupOptions,
  outputs: OutputOptions[]
): Promise<void> {
  return rollup
    .rollup({
      ...options,
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              target: target
            }
          },
          cacheRoot: CACHE_DIR
        }) as rollup.Plugin,
        ...(options.plugins || [])
      ]
    })
    .then(bundle => Promise.all(outputs.map(output => bundle.write(output))))
    .then(() => {
      console.log(`Built [${target}] successfully.`);
    });
}

export async function watchAndReBuild(
  options: Record<string, IRollupWatchOptions>,
  onBundleChanged: (e: any) => any
) {
  const watcher = rollup
    .watch(Object.keys(options).map(target => {
      const { plugins = [], tsConfig, ...opts } = options[target];
      return {
        ...opts,
        plugins: [
          typescript({
            tsconfigOverride: {
              compilerOptions: {
                target: tsConfig ? tsConfig.target : target
              }
            },
            cacheRoot: CACHE_DIR
          }) as rollup.Plugin,
          ...plugins
        ]
      };
    }));

  watcher.on('event', (e) => {
    if (e.code === 'ERROR') {
      console.log('Error:', e);
      return;
    }
    // if (e.code === 'FATAL') {
    //   console.log('===============');
    //   console.error('FATAL:', e);
    //   console.log('===============');
    //   // rollup will exit
    //   return;
    // }
    if (e.code === 'END') {
      onBundleChanged(e);
      return;
    }
  });
}

export async function clean(folder: string): Promise<void> {
  console.log(`\n==============\nCleaning ${folder} folder...\n==============`);
  return new Promise<void>(resolve => {
    rimraf(folder, (error) => {
      if (error) {
        throw error;
      }
      resolve();
    });
  });
}


export async function copy(basePath: string, targetPath: string) {
  try {
    fs.createReadStream(basePath)
      .pipe(fs.createWriteStream(targetPath));
  } catch (ex) {
    console.log(`Error trying to copy file from "${basePath}" to "${targetPath}"`);
    console.log(ex);
  }
}
