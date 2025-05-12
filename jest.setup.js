import "@testing-library/jest-dom/extend-expect";

/**
 * Must include these else any Jest file that tests
 * a component from uploadThing won't work
 */
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
