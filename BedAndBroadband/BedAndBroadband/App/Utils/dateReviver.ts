/// <reference path="../references.ts" />
module Utils {
    var JSON_START = /^\s*(\[|\{[^\{])/,
        JSON_END = /[\}\]]\s*$/,
        PROTECTION_PREFIX = /^\)\]\}',?\n/;
    function dateReviver(key, value) {
        var a: RegExpExecArray;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)\+00:00$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                                +a[5], +a[6]));
            }
        }
        return value;
    };

    export function transformResponse(data) {
        if (angular.isString(data)) {
            data = data.replace(PROTECTION_PREFIX, '');
            if (JSON_START.test(data) && JSON_END.test(data))
                data = JSON.parse(data, dateReviver);
        }
        return data;
    };
}