// TODO: Make a cron job to ping the iRacing data api to get this info

// In the iRacing api, 'package_id' is unique per purchase, and is shared across layouts on tracks
// So you can go through the full track result, and use 'package_id' to get all the layouts together
// We only need one instance of it though for setting the owned content
export const tempMockCars: ownedInfo = {
  '1': {
    name: 'Skip Barber Formula 2000',
    owned: false
  },
  '94': {
    name: '[Legacy] Ferrari 488 GT3',
    owned: false
  },
  '117': {
    name: 'Supercars Holden ZB Commodore',
    owned: false
  }
}

export const tempMockTracks: ownedInfo = {
  '9': {
    name: '[Legacy] Lime Rock Park - 2008',
    owned: false
  },
  '33': {
    name: 'Barber Motorsports Park',
    owned: false
  },
  '114': {
    name: 'Suzuka International Racing Course',
    owned: false
  },
  '123': {
    name: 'Twin Ring Motegi',
    owned: false
  },
  '124': {
    name: 'Circuit Zolder',
    owned: false
  }
}