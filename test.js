'use strict'

const tapeWithoutPromise = require('tape')
const addPromiseSupport = require('tape-promise').default
const tape = addPromiseSupport(tapeWithoutPromise)
const wagenreihung = require('.')
const trainNumbers = require('db-train-numbers')

tape('db-wagenreihung', async (t) => {
	const numbers = await(trainNumbers(new Date(), new Date()))
	const ice = numbers.find(x => x.train.length <= 7 && x.train.toLowerCase().indexOf('ice') === 0)
	t.ok(ice, 'precondition')
	const array = ice.train.split(' ')
	const number = array[array.length - 1]
	t.ok(+number, 'precondition')
	t.ok(ice.lastDeparture, 'precondition')

	const result = await wagenreihung(number, ice.lastDeparture)
	t.ok(result.product === 'ICE', 'product')
	t.ok(result.trainNumber === number+'', 'trainNumber')
	t.ok(result.serviceId.length > 5, 'serviceId')
	t.ok(+ice.lastDeparture - +new Date(result.initializationDate) <= 12*60*60*1000, 'initializationDate')
	t.ok(Array.isArray(result.wagons), 'wagons type')
	t.ok(result.wagons.length > 0, 'wagons length')
	for (let wagon of result.wagons) {
		t.ok(Number.isInteger(wagon.group), 'group')
		t.ok(wagon.type.length > 4, 'type')
		t.ok(wagon.id.length > 4, 'id')
		t.ok(wagon.status.length > 3, 'status')
		t.ok(Number.isInteger(wagon.wagonNumber) || wagon.wagonNumber === null, 'wagonNumber')
	}
	t.ok(result.wagons.filter(x => Number.isInteger(x.wagonNumber)).length >= 3, 'wagonNumber')

	t.end()
})
