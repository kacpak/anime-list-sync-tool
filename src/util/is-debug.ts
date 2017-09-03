declare const v8debug;
export default typeof v8debug === 'object' || /--debug|--inspect/.test(process.execArgv.join(' '));