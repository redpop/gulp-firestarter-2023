import { parallel, series } from "gulp";

import clean from "./clean";
import copy from "./copy";
import javascript from "./javascript";
import templates from "./templates";
import server from "./server";
import styles from "./styles";
import watch from "./watch";

export { default as stylelint } from "./stylelint";
export { default as clean } from "./clean";
export { default as copy } from "./copy";
export { default as javascript } from "./javascript";
export { default as server } from "./server";
export { default as styles } from "./styles";
export { default as templates } from "./templates";
export { default as watch } from "./watch";

export function build(done) {
    series(clean, parallel(templates, javascript, copy), styles)(done);
}

export default series(build, server, watch);
