interface ownedInfo {
  [id: string]: {
    name: string,
    owned: boolean
  }
}

interface modalReturn {
  modalType: MODAL_TYPE,
  ownedInfo: ownedInfo
}

type MODAL_TYPE = '' | 'tracks' | 'cars'