'use strict'

const got = require('got')
const moment = require('moment-timezone')

const createWagon = (w, group) => ({
	group,
	type: w.kategorie,
	id: w.fahrzeugnummer,
	wagonNumber: +w.wagenordnungsnummer || null,
	status: w.status
	// todo: other attributes
})

// todo: validate params

const wagenreihung = async (trainNumber, lastDeparture) => {
	const date = moment.tz(+lastDeparture, 'Europe/Berlin').format('YYYYMMDDHHmm')
	const data = await (got.get(`https://www.apps-bahn.de/wr/wagenreihung/1.0/${trainNumber}/${date}`, { json: true }).then(res => res.body))

	const d = data.data.istformation

	const wagons = []
	for (let i in d.allFahrzeuggruppe) {
		for (let w of d.allFahrzeuggruppe[i].allFahrzeug) {
			wagons.push(createWagon(w, +i))
		}
	}

	return ({
		initializationDate: data.meta.created,
		product: d.zuggattung,
		trainNumber: d.zugnummer,
		serviceId: d.serviceid,
		wagons
	})
}

module.exports = wagenreihung
