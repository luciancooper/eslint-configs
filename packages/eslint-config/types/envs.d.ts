import type { Linter } from 'eslint';
import type Globals from 'globals';

export declare const node: { cjs: Linter.Config, esm: Linter.Config };

export declare const browser: Linter.Config;

export declare const globals: typeof Globals;