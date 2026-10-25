import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("out", { recursive: true });
copyFileSync("deploy/CNAME", "out/CNAME");
