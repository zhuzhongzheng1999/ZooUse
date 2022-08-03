/*
 * @Description: 
 * @Author: zhuzhongzheng
 * @Date: 2022-08-02 19:33:33
 * @LastEditors: zhuzhongzheng
 * @LastEditTime: 2022-08-03 11:13:19
 */
import typescript from "rollup-plugin-typescript";
import { uglify } from 'rollup-plugin-uglify';
import dts from 'rollup-plugin-dts';



export default [
    {
        input: ["./packages/zoouse-request/index.ts"],
        output: {
            file: "./packages/zoouse-request/dist/index.js",
            format: "umd",
            name: "zrequest",
        },
        plugins: [
            // resolve({ preferBuiltins: true }),
            // commonjs(),
            // babel(),
            typescript({
                exclude: "node_modules/**",
                typescript: require("typescript"),
            }),
            uglify()
        ],
        // 外部库
        external: ["axios"],
    },
    {
        input: ["./packages/zoouse-request/index.ts"],
        plugins: [dts()],
        output: {
            format: 'umd',
            file: './packages/zoouse-request/dist/types/index.d.ts',
        },
        // 外部库
        external: ["axios"],
    },
]

