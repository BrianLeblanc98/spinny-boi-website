interface ownedInfo {
  [package_id: string]: {
    name: string
    owned: boolean
    free?: boolean
  }
}

// For whatever reason eslint thinks this isn't used. Nuxt auto imports might not be recognized by eslint
// eslint-disable-next-line unused-imports/no-unused-vars
interface modalReturn {
  modalType: MODAL_TYPE
  ownedInfo: ownedInfo
}

type MODAL_TYPE = '' | 'tracks' | 'cars'
