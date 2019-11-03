'use strict'

const tapeWithoutPromise = require('tape')
const addPromiseSupport = require('tape-promise').default
const tape = addPromiseSupport(tapeWithoutPromise)
const hafas = require('db-hafas')('db-wagenreihung-tests')
const wagenreihung = require('.')

tape('db-wagenreihung', async t => {
	// find currently running train from db-hafas
	const [berlinHbf] = await hafas.locations('Berlin Hbf', { results: 1, stations: true, addresses: false, poi: false })
	t.ok(berlinHbf.type && !!berlinHbf.id, 'precondition')
	const duration = 2 * 60
	const departures = await hafas.departures(berlinHbf.id, {
		when: new Date(Date.now() - duration * 60 * 1000),
		duration
	})
	const iceDeparture = departures.find(d => d.line && d.line.product === 'nationalExp' && d.line.fahrtNr && d.line.name)
	t.ok(iceDeparture, 'precondition')

	const ice = await hafas.trip(iceDeparture.tripId, iceDeparture.line.name)
	t.ok(ice, 'precondition')

	const trainNumber = ice.line.fahrtNr
	t.ok(trainNumber, 'precondition')

	const lastStopovers = ice.stopovers.filter(s => s.departure && (+new Date(s.departure) < +new Date()))
	const lastStopover = lastStopovers[lastStopovers.length - 1]
	t.ok(lastStopover && lastStopover.departure, 'precondition')
	const lastDeparture = new Date(lastStopover.departure)

	// actual testing
	const result = await wagenreihung(trainNumber, lastDeparture)
	t.ok(result.product === 'ICE', 'product')
	t.ok(result.trainNumber === trainNumber + '', 'trainNumber')
	t.ok(result.serviceId.length > 5, 'serviceId')
	t.ok(+lastDeparture - +new Date(result.initializationDate) <= 24 * 60 * 60 * 1000, 'initializationDate')
	t.ok(Array.isArray(result.wagons), 'wagons type')
	t.ok(result.wagons.length > 0, 'wagons length')
	for (const wagon of result.wagons) {
		t.ok(Number.isInteger(wagon.group), 'group')
		t.ok(wagon.type.length > 4, 'type')
		t.ok(wagon.id.length > 4, 'id')
		t.ok(wagon.status.length > 3, 'status')
		t.ok(Number.isInteger(wagon.wagonNumber) || wagon.wagonNumber === null, 'wagonNumber')
	}
	t.ok(result.wagons.filter(x => Number.isInteger(x.wagonNumber)).length >= 3, 'wagonNumber')

	t.end()
})
