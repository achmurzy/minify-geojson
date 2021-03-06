# minify-geojson

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/786f95aba4434d0bb464d820f096d63d)](https://www.codacy.com/app/erikvullings/minify-geojson?utm_source=github.com&utm_medium=referral&utm_content=TNOCS/minify-geojson&utm_campaign=badger)

A small tool to minify (compress) a GeoJSON file by:
- Removing non-significant whitespace
- Reducing the number of decimals used for coordinates: option `-c 5` to keep 5 decimals
- Minify the length of the keys by mapping each key name to a single of double letter combination: option `-k` converts long property keys such as `my_long_property_name` to `a` or `ab`. **Warning:** If you already have property keys like `a` or `b`, it may map them to the wrong name.
- Blacklist keys, i.e. remove these keys from the output
- Whitelist keys, i.e. only keep these keys in the output
- Filter features, i.e. only keep those features whose properties satisfy certain conditions.

The tool works in two modes: for files that require reprojection or topojson output, it will read in all data at once. In case your GeoJSON file is too large for node.js to handle, this may fail. That's why it normally uses a streaming mode, so also large files can be processed easily (after which you can try reprojecting it again).

# Installation

To run it standalone:
```shell
npm i -g minify-geojson
```
After which the `minify-geojson` command should be available.

Alternatively, you can fork/download/clone the repository, and execute:
```shell
npm install
npm link
npm run watch
```
Any changes in the Typescript code will be compiled, and since you've linked the project, you can use the `minify-geojson` command from the commandline too.

# Manual

```shell
Minify GeoJSON

  Minify (compress) each input GeoJSON or ESRI shapefile by replacing the
  attribute keys with a shorter representation (typically, its first letter).
  You can also reduce the number of decimals for coordinates and properties,
  whitelist and blacklist or filter certain properties. Output can be GeoJSON
  or TopoJSON. If you wish to reproject to WGS84, you can supply the EPSG code
  (which will be resolved via
  http://www.spatialreference.org/ref/epsg/YOURCODE/proj4/).

Options

  -k, --keys Boolean                  Minify property keys, e.g. id remains id, telephone
                                      becomes t, address a etc.
  -i, --includeKeyMap Boolean         Add the key map to the GeoJSON file. Requires the -k
                                      flag too.
  -t, --topo Boolean                  Output format is TopoJSON instead of GeoJSON.
  -r, --reproject String              Reproject to WGS84 by supplying the input EPSG
                                      coordinate system, e.g. -r EPSG:28992.
  -f, --filter String                 Comma separted list of property filters, which will
                                      KEEP those features when the property filter returns
                                      true, e.g. filter "WATER = NO" will filter out
                                      feature's where { "WATER": "NO" }.
  -b, --blacklist String              Comma separated list of properties that should be
                                      removed (others will be kept). Note that keys will not
                                      be minified unless the -k flag is used too.
  -w, --whitelist String              Comma separated list of properties that should be kept
                                      (others will be removed). Note that keys will not be
                                      minified unless the -k flag is used too.
  -c, --coordinates Positive number   Only keep the first n digits of each coordinate.
  -d, --decimals Positive number      Only keep the first n digits of each decimal property.
  -s, --src File names                Source files to process: you do not need to supply the
                                      -s flag.
  -v, --verbose Boolean               Output is verbose.

Examples

  01. Shrink property keys and output to        $ minify-geojson -k original.geojson
  original.min.geojson
  02. A verbose version                         $ minify-geojson -kv original.geojson
  03. Prune the blacklisted properties          $ minify-geojson -b "property1, property2"
                                                original.geojson
  04. Keep the whitelisted properties           $ minify-geojson -w "property1, property2"
                                                original.geojson
  05. Removes superfluous decimals (keep        $ minify-geojson -c 5 original.geojson
  first 5)
  06. Add the key mapping to the output         $ minify-geojson -ki original.geojson
  07. Convert output to topojson (-i and -c     $ minify-geojson -kt original.geojson
  are not used)
  08. Reproject shape file in RD (EPSG:28992)   $ minify-geojson -ktv -r 28992 original.shp
  to TopoJSON
  09. Filter based on properties                $ minify-geojson -ktv -r 28992 -f "WATER =
                                                NO, CITY=Amsterdam" -b "WATER, CITY"
                                                original.shp
  10. Full example                              $ minify-geojson -ktiv -w "property1,
                                                property2" -c 5 original.geojson
```
