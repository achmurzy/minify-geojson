"use strict";
var minify_geojson_1 = require('./minify-geojson');
var commandLineArgs = require('command-line-args');
var CommandLineInterface = (function () {
    function CommandLineInterface() {
    }
    CommandLineInterface.optionDefinitions = [
        { name: 'keys', alias: 'k', type: Boolean, typeLabel: '[underline]{Boolean}', description: 'Minify property keys, e.g. id remains id, telephone becomes t, address a etc.' },
        { name: 'includeKeyMap', alias: 'i', type: Boolean, typeLabel: '[underline]{Boolean}', description: 'Add the key map to the GeoJSON file. Requires the -k flag too.' },
        { name: 'topo', alias: 't', type: Boolean, typeLabel: '[underline]{Boolean}', description: 'Output format is TopoJSON instead of GeoJSON.' },
        { name: 'from', alias: 'f', type: String, typeLabel: '[underline]{String}', description: 'Reproject to WGS84 by supplying the input EPSG coordinate system, e.g. -f EPSG:4326' },
        { name: 'blacklist', alias: 'b', type: String, typeLabel: '[underline]{String}', description: 'Comma separated list of properties that should be removed (others will be kept). Note that keys will not be minified unless the -k flag is used too.' },
        { name: 'whitelist', alias: 'w', type: String, typeLabel: '[underline]{String}', description: 'Comma separated list of properties that should be kept (others will be removed). Note that keys will not be minified unless the -k flag is used too.' },
        { name: 'coordinates', alias: 'c', type: Number, defaultOption: false, typeLabel: '[underline]{Positive number}', description: 'Only keep the first [italic]{n} digits of each coordinate.' },
        { name: 'src', alias: 's', type: String, multiple: true, defaultOption: true, typeLabel: '[underline]{File names}', description: 'Source files to process: you do not need to supply the -s flag.' },
        { name: 'verbose', alias: 'v', type: Boolean, typeLabel: '[underline]{Boolean}', description: 'Output is verbose.' }
    ];
    CommandLineInterface.sections = [{
            header: 'Minify GeoJSON',
            content: 'Minify (compress) each input GeoJSON or ESRI shape file by replacing the attribute keys with a shorter representation (typically, its first letter). You can also reduce the number of decimals for coordinates, and whitelist and blacklist certain properties..'
        }, {
            header: 'Options',
            optionList: CommandLineInterface.optionDefinitions
        }, {
            header: 'Examples',
            content: [{
                    desc: '1. Shrink property keys and output to original.min.geojson',
                    example: '$ minify-geojson -k original.geojson'
                }, {
                    desc: '2. A verbose version',
                    example: '$ minify-geojson -kv original.geojson'
                }, {
                    desc: '3. Prune the blacklisted properties',
                    example: '$ minify-geojson -b "property1, property2" original.geojson'
                }, {
                    desc: '4. Keep the whitelisted properties',
                    example: '$ minify-geojson -w "property1, property2" original.geojson'
                }, {
                    desc: '5. Removes superfluous decimals (keep first 5)',
                    example: '$ minify-geojson -c 5 original.geojson'
                }, {
                    desc: '6. Add the key mapping to the output',
                    example: '$ minify-geojson -ki original.geojson'
                }, {
                    desc: '7. Convert output to topojson (-i and -c are not used)',
                    example: '$ minify-geojson -kt original.geojson'
                }, {
                    desc: '8. Reproject shape file in RD (EPSG:28992) to TopoJSON',
                    example: '$ minify-geojson -ktv -f 28992 original.shp'
                }, {
                    desc: '9. Full example',
                    example: '$ minify-geojson -ktiv -w "property1, property2" -c 5 original.geojson'
                }]
        }
    ];
    return CommandLineInterface;
}());
exports.CommandLineInterface = CommandLineInterface;
var options = commandLineArgs(CommandLineInterface.optionDefinitions);
var minifyGeoJSON = new minify_geojson_1.MinifyGeoJSON(options);
//# sourceMappingURL=minify-geojson-cli.js.map