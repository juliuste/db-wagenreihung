# db-wagenreihung

Fetch train carriage numbers and ordering for given [DB](https://www.bahn.de) trains.

[![npm version](https://img.shields.io/npm/v/db-wagenreihung.svg)](https://www.npmjs.com/package/db-wagenreihung)
[![Build Status](https://travis-ci.org/juliuste/db-wagenreihung.svg?branch=master)](https://travis-ci.org/juliuste/db-wagenreihung)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/db-wagenreihung.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/db-wagenreihung.svg)](https://david-dm.org/juliuste/db-wagenreihung)
[![license](https://img.shields.io/github/license/juliuste/db-wagenreihung.svg?style=flat)](license)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install --save db-wagenreihung
```

## Usage

```js
const wagenreihung = require('db-wagenreihung')

const trainNumber = '372' // train number without the trailing type ('372' instead of 'ICE 372')
const lastDeparture = new Date('2018-06-19T11:08:00') // this train's last departure time (use db-train-numbers or db-hafas to get this information)

wagenreihung(trainNumber, lastDeparture)
.then(console.log)
.catch(console.error)
```

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an object that looks as follows:

```js
{
    initializationDate: "2018-06-19T08:13:04.29+02:00",
    product: "ICE",
    trainNumber: "372",
    serviceId: "1529131014",
    wagons: [
        {
            group: 0, // changes for ICE trains which consist of two joined train units
            type: "TRIEBKOPF",
            id: "938054015830",
            wagonNumber: null,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENERSTEKLASSE",
            id: "938058018129",
            wagonNumber: 14,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENERSTEKLASSE",
            id: "938058014128",
            wagonNumber: 12,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENERSTEKLASSE",
            id: "938058010902",
            wagonNumber: 11,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENERSTEKLASSE",
            id: "938058031528",
            wagonNumber: 9,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "SPEISEWAGEN",
            id: "938058040040",
            wagonNumber: 8,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENZWEITEKLASSE",
            id: "938058028433",
            wagonNumber: 7,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENZWEITEKLASSE",
            id: "938058027021",
            wagonNumber: 6,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENZWEITEKLASSE",
            id: "938058020901",
            wagonNumber: 5,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENZWEITEKLASSE",
            id: "938058023186",
            wagonNumber: 4,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENZWEITEKLASSE",
            id: "938058024531",
            wagonNumber: 3,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENZWEITEKLASSE",
            id: "938058026510",
            wagonNumber: 2,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "REISEZUGWAGENZWEITEKLASSE",
            id: "938058028532",
            wagonNumber: 1,
            status: "OFFEN"
        },
        {
            group: 0,
            type: "TRIEBKOPF",
            id: "938054010831",
            wagonNumber: null,
            status: "OFFEN"
        }
    ]
}
```

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/db-wagenreihung/issues).
