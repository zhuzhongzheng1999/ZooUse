/*
 * @Description: 
 * @Author: zhuzhongzheng
 * @Date: 2022-06-20 15:56:18
 * @LastEditors: zhuzhongzheng
 * @LastEditTime: 2022-06-20 16:18:14
 */
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";





export default {
    input: ["./packages/zuse-sql/src/index.js"],
    output: {
        file: "./packages/zuse-sql/dist/index.js",
        format: "umd",
        name: "sql",
    },
    plugins: [resolve({preferBuiltins: true}),commonjs(),babel()],
    // 外部库
    // external: ["axios"],
};

