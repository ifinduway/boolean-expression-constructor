const debugLogFormatOrigin = (apiName, path, actionMark) => [
    `%c${apiName}%c ${actionMark} %c${path.join(':')}`,
    'color: limegreen;',
    'color: lightseagreen;',
    'color: gray;',
];

const enabled = false;

export default {
    fire: ({ apiName, path, payload }) => enabled && console.log(...debugLogFormatOrigin(apiName, path, '>>>'), payload),
    response: ({ apiName, path, response }) => enabled && console.log(...debugLogFormatOrigin(apiName, path, '<<<'), response),
    error: ({ apiName, path, error }) => enabled && console.error(...debugLogFormatOrigin(apiName, path, 'XXX'), error),
};
