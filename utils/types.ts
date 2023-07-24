interface ownedPackages {
  [package_id: string]: {
    name: string
    owned: boolean
    free?: boolean
  }
}

// For whatever reason eslint thinks this isn't used. It might not notice the usage in .vue files
// eslint-disable-next-line unused-imports/no-unused-vars
interface modalReturn {
  modalType: MODAL_TYPE
  ownedPackages: ownedPackages
}

type MODAL_TYPE = '' | 'tracks' | 'cars'
