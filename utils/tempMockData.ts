// TODO: Make a cron job to ping the iRacing data api to get this info

// In the iRacing api, 'package_id' is unique per purchase, and is shared across layouts on tracks
// So you can go through the full track result, and use 'package_id' to get all the layouts together
// We only need one instance of it though for setting the owned content
export const tempMockCars: ownedInfo = {
  15: {
    name: 'Skip Barber Formula 2000',
    owned: false,
  },
  16: {
    name: 'Modified - SK',
    owned: false,
  },
  20: {
    name: 'Pontiac Solstice',
    owned: true,
    free: true,
  },
  21: {
    name: '[Legacy] Pro Mazda',
    owned: false,
  },
  22: {
    name: 'Legends Ford \'34 Coupe',
    owned: true,
    free: true,
  },
  30: {
    name: '[Retired] - Chevrolet Monte Carlo SS',
    owned: false,
  },
  37: {
    name: 'Radical SR8',
    owned: true,
    free: true,
  },
  39: {
    name: 'Silver Crown',
    owned: false,
  },
  42: {
    name: '[Legacy] NASCAR Truck Chevrolet Silverado - 2008',
    owned: true,
    free: true,
  },
  57: {
    name: '[Legacy] Riley MkXX Daytona Prototype - 2008',
    owned: false,
  },
  62: {
    name: '[Legacy] NASCAR Cup Chevrolet Impala COT - 2009',
    owned: false,
  },
  69: {
    name: 'SCCA Spec Racer Ford',
    owned: true,
    free: true,
  },
  71: {
    name: 'ARCA Menards Chevrolet Impala',
    owned: false,
  },
  77: {
    name: 'Lotus 79',
    owned: false,
  },
  81: {
    name: 'Chevrolet Corvette C6.R GT1',
    owned: false,
  },
  83: {
    name: 'VW Jetta TDI Cup',
    owned: true,
    free: true,
  },
  85: {
    name: '[Legacy] V8 Supercar Ford Falcon - 2009',
    owned: false,
  },
  89: {
    name: '[Legacy] Dallara IR-05',
    owned: false,
  },
  95: {
    name: 'Ford Mustang FR500S',
    owned: false,
  },
  99: {
    name: 'Williams-Toyota FW31',
    owned: false,
  },
  102: {
    name: '[Legacy] Mazda MX-5 Cup - 2010',
    owned: false,
  },
  105: {
    name: 'Street Stock',
    owned: true,
    free: true,
  },
  107: {
    name: 'Sprint Car',
    owned: false,
  },
  111: {
    name: 'HPD ARX-01c',
    owned: false,
  },
  113: {
    name: 'Ford GT GT2',
    owned: false,
  },
  122: {
    name: 'Cadillac CTS-V Racecar',
    owned: true,
    free: true,
  },
  128: {
    name: '[Legacy] NASCAR Nationwide Chevrolet Impala - 2012',
    owned: false,
  },
  131: {
    name: 'Lotus 49',
    owned: false,
  },
  133: {
    name: 'McLaren MP4-12C GT3',
    owned: false,
  },
  136: {
    name: 'Kia Optima',
    owned: true,
    free: true,
  },
  139: {
    name: '[Legacy] NASCAR Cup Chevrolet SS - 2013',
    owned: false,
  },
  141: {
    name: '[Legacy] NASCAR Cup Ford Fusion - 2016',
    owned: false,
  },
  144: {
    name: 'Ruf RT 12R AWD',
    owned: false,
  },
  149: {
    name: '[Legacy] NASCAR Xfinity Ford Mustang - 2016',
    owned: false,
  },
  153: {
    name: 'Super Late Model',
    owned: false,
  },
  156: {
    name: '[Legacy] BMW Z4 GT3',
    owned: false,
  },
  158: {
    name: 'NASCAR Cup Series Toyota Camry',
    owned: false,
  },
  161: {
    name: '[Legacy] Dallara DW12',
    owned: true,
    free: true,
  },
  165: {
    name: '[Legacy] NASCAR Xfinity Chevrolet Camaro - 2014',
    owned: false,
  },
  168: {
    name: '[Legacy] V8 Supercar Holden VF Commodore - 2014',
    owned: false,
  },
  171: {
    name: '[Legacy] V8 Supercar Ford FG Falcon - 2014',
    owned: false,
  },
  175: {
    name: '[Retired] NASCAR Gander Outdoors Toyota Tundra',
    owned: false,
  },
  177: {
    name: '[Retired] NASCAR Trucks Series Chevrolet Silverado - 2018',
    owned: false,
  },
  179: {
    name: 'Aston Martin DBR9 GT1',
    owned: false,
  },
  182: {
    name: 'Global Mazda MX-5 Cup',
    owned: true,
    free: true,
  },
  190: {
    name: '[Legacy] NASCAR Xfinity Toyota Camry - 2015',
    owned: false,
  },
  193: {
    name: 'Chevrolet Corvette C7 Daytona Prototype',
    owned: false,
  },
  196: {
    name: 'McLaren MP4-30',
    owned: false,
  },
  199: {
    name: '[Legacy] Mercedes-AMG GT3',
    owned: false,
  },
  201: {
    name: 'Audi R8 LMS GT3',
    owned: false,
  },
  203: {
    name: 'Formula Renault 2.0',
    owned: false,
  },
  206: {
    name: 'Audi 90 GTO',
    owned: false,
  },
  208: {
    name: 'Nissan GTP ZX-T',
    owned: false,
  },
  210: {
    name: 'Dirt Late Model - Limited',
    owned: false,
  },
  216: {
    name: 'Dirt Street Stock',
    owned: true,
    free: true,
  },
  221: {
    name: 'Ford Fiesta RS WRC',
    owned: false,
  },
  229: {
    name: '[Legacy] Porsche 911 GT3 Cup (991)',
    owned: false,
  },
  230: {
    name: 'Dirt Sprint Car - 305',
    owned: false,
  },
  231: {
    name: 'Dirt Sprint Car - 360 Non-Winged',
    owned: false,
  },
  235: {
    name: 'VW Beetle',
    owned: true,
    free: true,
  },
  237: {
    name: 'Ford GTE',
    owned: false,
  },
  242: {
    name: 'Ferrari 488 GTE',
    owned: false,
  },
  244: {
    name: '[Legacy] Ferrari 488 GT3',
    owned: false,
  },
  245: {
    name: 'Dirt UMP Modified',
    owned: true,
    free: true,
  },
  250: {
    name: 'Dirt Midget',
    owned: false,
  },
  253: {
    name: 'Audi R18',
    owned: false,
  },
  255: {
    name: 'Dallara IR18',
    owned: false,
  },
  258: {
    name: 'Porsche 919',
    owned: false,
  },
  261: {
    name: 'Subaru WRX STI',
    owned: false,
  },
  263: {
    name: 'Porsche 911 RSR',
    owned: false,
  },
  266: {
    name: 'NASCAR Cup Series Chevrolet Camaro ZL1',
    owned: false,
  },
  272: {
    name: 'Formula Renault 3.5',
    owned: false,
  },
  274: {
    name: 'Dallara F3',
    owned: false,
  },
  281: {
    name: 'BMW M8 GTE',
    owned: false,
  },
  284: {
    name: 'Lucas Oil Off Road Pro 2 Truck',
    owned: false,
  },
  286: {
    name: 'NASCAR Cup Series Ford Mustang',
    owned: false,
  },
  288: {
    name: 'NASCAR Truck Chevrolet Silverado',
    owned: false,
  },
  291: {
    name: 'Audi RS 3 LMS',
    owned: false,
  },
  294: {
    name: 'Lucas Oil Off Road Pro 2 Lite',
    owned: true,
    free: true,
  },
  296: {
    name: 'NASCAR XFINITY Chevrolet Camaro',
    owned: false,
  },
  298: {
    name: 'NASCAR XFINITY Ford Mustang',
    owned: false,
  },
  300: {
    name: 'NASCAR XFINITY Toyota Supra',
    owned: false,
  },
  302: {
    name: 'Supercars Holden ZB Commodore',
    owned: false,
  },
  307: {
    name: 'Supercars Ford Mustang GT',
    owned: false,
  },
  309: {
    name: 'Porsche 718 Cayman GT4 Clubsport MR',
    owned: false,
  },
  314: {
    name: 'Indy Pro 2000 PM-18',
    owned: false,
  },
  316: {
    name: 'USF 2000',
    owned: false,
  },
  318: {
    name: 'BMW M4 GT4',
    owned: false,
  },
  321: {
    name: 'NASCAR Truck Ford F150',
    owned: false,
  },
  323: {
    name: 'NASCAR Chevrolet Monte Carlo - 1987',
    owned: false,
  },
  325: {
    name: 'NASCAR Ford Thunderbird - 1987',
    owned: false,
  },
  329: {
    name: 'Chevrolet Corvette C8.R GTE',
    owned: false,
  },
  333: {
    name: 'Dallara P217',
    owned: false,
  },
  335: {
    name: 'Dallara iR-01',
    owned: false,
  },
  340: {
    name: 'Dirt Big Block Modified',
    owned: false,
  },
  343: {
    name: 'BMW M4 GT3',
    owned: false,
  },
  345: {
    name: 'Lamborghini Huracán GT3 EVO',
    owned: false,
  },
  349: {
    name: 'McLaren 570S GT4',
    owned: false,
  },
  355: {
    name: '[Legacy] Porsche 911 GT3 R',
    owned: false,
  },
  357: {
    name: 'NASCAR Cup Series Next Gen Chevrolet Camaro ZL1',
    owned: false,
  },
  359: {
    name: 'NASCAR Cup Series Next Gen Ford Mustang',
    owned: false,
  },
  361: {
    name: 'NASCAR Cup Series Next Gen Toyota Camry',
    owned: false,
  },
  364: {
    name: 'Formula Vee',
    owned: true,
    free: true,
  },
  367: {
    name: 'Porsche 911 GT3 Cup (992)',
    owned: false,
  },
  369: {
    name: 'Ferrari 488 GT3 Evo 2020',
    owned: false,
  },
  373: {
    name: 'Mercedes-AMG W12 E Performance',
    owned: false,
  },
  375: {
    name: 'Hyundai Elantra N TC',
    owned: false,
  },
  377: {
    name: 'Honda Civic Type R',
    owned: false,
  },
  379: {
    name: 'FIA F4',
    owned: false,
  },
  384: {
    name: 'Radical SR10',
    owned: false,
  },
  386: {
    name: 'Aston Martin Vantage GT4',
    owned: false,
  },
  388: {
    name: 'Stock Car Brasil Chevrolet Cruze',
    owned: false,
  },
  390: {
    name: 'Stock Car Brasil Toyota Corolla',
    owned: false,
  },
  392: {
    name: 'Hyundai Veloster N TC',
    owned: false,
  },
  395: {
    name: 'NASCAR Buick LeSabre - 1987',
    owned: false,
  },
  399: {
    name: 'NASCAR Truck Toyota Tundra TRD Pro',
    owned: false,
  },
  401: {
    name: 'Mercedes-AMG GT3 2020',
    owned: false,
  },
  403: {
    name: 'Mercedes-AMG GT4',
    owned: false,
  },
  409: {
    name: 'Porsche Mission R',
    owned: false,
  },
  414: {
    name: 'BMW M Hybrid V8',
    owned: false,
  },
  416: {
    name: 'Toyota GR86',
    owned: true,
    free: true,
  },
  418: {
    name: 'Mercedes-AMG W13 E Performance',
    owned: false,
  },
  422: {
    name: 'Renault Clio',
    owned: false,
  },
  424: {
    name: 'Ray FF1600',
    owned: true,
    free: true,
  },
  426: {
    name: 'Late Model Stock',
    owned: false,
  },
  430: {
    name: 'Ligier JS P320',
    owned: false,
  },
  436: {
    name: 'Cadillac V-Series.R GTP',
    owned: false,
  },
  438: {
    name: 'Porsche 911 GT3 R (992)',
    owned: false,
  },
}

export const tempMockTracks: ownedInfo = {
  3: {
    name: 'Concord Speedway',
    owned: true,
    free: true,
  },
  4: {
    name: 'Daytona Rallycross and Dirt Road',
    owned: true,
    free: true,
  },
  5: {
    name: 'Homestead Miami Speedway',
    owned: false,
  },
  6: {
    name: 'Irwindale Speedway',
    owned: false,
  },
  7: {
    name: 'USA International Speedway',
    owned: true,
    free: true,
  },
  8: {
    name: 'Lanier National Speedway',
    owned: true,
    free: true,
  },
  9: {
    name: '[Legacy] Lime Rock Park - 2008',
    owned: true,
    free: true,
  },
  10: {
    name: 'Oxford Plains Speedway',
    owned: true,
    free: true,
  },
  11: {
    name: 'Road America',
    owned: false,
  },
  12: {
    name: 'Stafford Motor Speedway',
    owned: false,
  },
  13: {
    name: 'Summit Point Raceway',
    owned: true,
    free: true,
  },
  14: {
    name: 'Virginia International Raceway',
    owned: true,
    free: true,
  },
  19: {
    name: 'South Boston Speedway',
    owned: true,
    free: true,
  },
  23: {
    name: 'Richmond Raceway',
    owned: false,
  },
  26: {
    name: 'Martinsville Speedway',
    owned: false,
  },
  31: {
    name: '[Legacy] Charlotte Motor Speedway - 2008',
    owned: true,
    free: true,
  },
  32: {
    name: '[Legacy] Silverstone Circuit - 2008',
    owned: false,
  },
  33: {
    name: 'Barber Motorsports Park',
    owned: false,
  },
  34: {
    name: 'WeatherTech Raceway at Laguna Seca',
    owned: true,
    free: true,
  },
  35: {
    name: 'Sonoma Raceway',
    owned: false,
  },
  36: {
    name: 'Atlanta Motor Speedway',
    owned: false,
  },
  40: {
    name: 'Sebring International Raceway',
    owned: false,
  },
  41: {
    name: 'The Milwaukee Mile',
    owned: false,
  },
  43: {
    name: 'Bristol Motor Speedway',
    owned: false,
  },
  54: {
    name: 'Las Vegas Motor Speedway',
    owned: false,
  },
  55: {
    name: '[Legacy] Phoenix Raceway - 2008',
    owned: true,
    free: true,
  },
  56: {
    name: 'Watkins Glen International',
    owned: false,
  },
  59: {
    name: 'Darlington Raceway',
    owned: false,
  },
  60: {
    name: 'Talladega Superspeedway',
    owned: false,
  },
  61: {
    name: '[Legacy] Texas Motor Speedway - 2009',
    owned: false,
  },
  65: {
    name: 'Chicagoland Speedway',
    owned: false,
  },
  66: {
    name: '[Legacy] Michigan International Speedway - 2009',
    owned: false,
  },
  67: {
    name: 'Road Atlanta',
    owned: false,
  },
  72: {
    name: 'New Hampshire Motor Speedway',
    owned: false,
  },
  73: {
    name: 'Indianapolis Motor Speedway',
    owned: false,
  },
  74: {
    name: '[Legacy] Pocono Raceway - 2009',
    owned: false,
  },
  79: {
    name: 'Centripetal Circuit',
    owned: true,
    free: true,
  },
  90: {
    name: 'Canadian Tire Motorsports Park',
    owned: false,
  },
  91: {
    name: 'Brands Hatch Circuit',
    owned: false,
  },
  92: {
    name: 'Circuit Park Zandvoort',
    owned: false,
  },
  93: {
    name: 'Phillip Island Circuit',
    owned: false,
  },
  96: {
    name: 'Mid-Ohio Sports Car Course',
    owned: false,
  },
  97: {
    name: 'Thompson Speedway Motorsports Park',
    owned: true,
    free: true,
  },
  100: {
    name: 'Dover Motor Speedway',
    owned: false,
  },
  103: {
    name: 'Circuit de Spa-Francorchamps',
    owned: false,
  },
  109: {
    name: 'Okayama International Circuit',
    owned: true,
    free: true,
  },
  114: {
    name: 'Suzuka International Racing Course',
    owned: false,
  },
  115: {
    name: 'Iowa Speedway',
    owned: false,
  },
  116: {
    name: 'Long Beach Street Circuit',
    owned: false,
  },
  117: {
    name: 'Oulton Park Circuit',
    owned: true,
    free: true,
  },
  118: {
    name: '[Legacy] Kentucky Speedway - 2011',
    owned: false,
  },
  119: {
    name: 'New Smyrna Speedway',
    owned: false,
  },
  120: {
    name: 'Daytona International Speedway',
    owned: false,
  },
  123: {
    name: 'Twin Ring Motegi',
    owned: false,
  },
  124: {
    name: 'Circuit Zolder',
    owned: false,
  },
  125: {
    name: 'Langley Speedway',
    owned: true,
    free: true,
  },
  126: {
    name: 'Oran Park Raceway',
    owned: true,
    free: true,
  },
  129: {
    name: 'Rockingham Speedway',
    owned: false,
  },
  134: {
    name: 'Autódromo José Carlos Pace',
    owned: false,
  },
  142: {
    name: 'Kansas Speedway',
    owned: false,
  },
  145: {
    name: 'Circuit Gilles Villeneuve',
    owned: false,
  },
  146: {
    name: 'Mount Panorama Circuit',
    owned: false,
  },
  147: {
    name: 'New Jersey Motorsports Park',
    owned: false,
  },
  151: {
    name: 'Auto Club Speedway',
    owned: false,
  },
  154: {
    name: 'Circuit of the Americas',
    owned: false,
  },
  159: {
    name: 'Lucas Oil Raceway (IRP)',
    owned: false,
  },
  162: {
    name: 'Donington Park Racing Circuit',
    owned: false,
  },
  169: {
    name: 'World Wide Technology Raceway (Gateway)',
    owned: false,
  },
  172: {
    name: 'Autodromo Nazionale Monza',
    owned: false,
  },
  180: {
    name: 'Five Flags Speedway',
    owned: false,
  },
  184: {
    name: 'Nürburgring Nordschleife',
    owned: false,
  },
  185: {
    name: 'Nürburgring Grand-Prix-Strecke',
    owned: false,
  },
  186: {
    name: 'Nürburgring Combined',
    owned: false,
  },
  194: {
    name: 'Southern National Motorsports Park',
    owned: true,
    free: true,
  },
  197: {
    name: 'Autodromo Internazionale Enzo e Dino Ferrari',
    owned: false,
  },
  204: {
    name: 'Circuit des 24 Heures du Mans',
    owned: false,
  },
  211: {
    name: 'The Bullring',
    owned: false,
  },
  213: {
    name: 'Eldora Speedway',
    owned: false,
  },
  214: {
    name: 'Williams Grove Speedway',
    owned: false,
  },
  224: {
    name: 'Michigan International Speedway',
    owned: false,
  },
  225: {
    name: 'Pocono Raceway',
    owned: false,
  },
  233: {
    name: 'Volusia Speedway Park',
    owned: false,
  },
  240: {
    name: 'Myrtle Beach Speedway',
    owned: false,
  },
  247: {
    name: 'Snetterton Circuit',
    owned: false,
  },
  248: {
    name: 'Limaland Motorsports Park',
    owned: true,
    free: true,
  },
  251: {
    name: 'Knoxville Raceway',
    owned: false,
  },
  256: {
    name: 'The Dirt Track at Charlotte',
    owned: false,
  },
  259: {
    name: 'Detroit Grand Prix at Belle Isle',
    owned: false,
  },
  264: {
    name: 'Kokomo Speedway',
    owned: false,
  },
  267: {
    name: 'Tsukuba Circuit',
    owned: true,
    free: true,
  },
  268: {
    name: 'Charlotte Motor Speedway',
    owned: true,
    free: true,
  },
  275: {
    name: 'Chili Bowl',
    owned: false,
  },
  276: {
    name: 'Wild West Motorsports Park',
    owned: true,
    free: true,
  },
  279: {
    name: 'Wild Horse Pass Motorsports Park',
    owned: false,
  },
  282: {
    name: 'Silverstone Circuit',
    owned: false,
  },
  289: {
    name: 'Fairbury Speedway',
    owned: false,
  },
  292: {
    name: 'Circuit de Barcelona Catalunya',
    owned: false,
  },
  303: {
    name: 'Lernerville Speedway',
    owned: false,
  },
  304: {
    name: 'Lime Rock Park',
    owned: true,
    free: true,
  },
  310: {
    name: 'Texas Motor Speedway',
    owned: false,
  },
  311: {
    name: 'Lånkebanen (Hell RX)',
    owned: false,
  },
  312: {
    name: 'North Wilkesboro Speedway',
    owned: false,
  },
  319: {
    name: 'Kentucky Speedway',
    owned: false,
  },
  330: {
    name: 'Weedsport Speedway',
    owned: false,
  },
  331: {
    name: 'Nashville Fairgrounds Speedway',
    owned: false,
  },
  338: {
    name: 'Crandon International Raceway',
    owned: false,
  },
  341: {
    name: 'iRacing Superspeedway',
    owned: false,
  },
  346: {
    name: 'Cedar Lake Speedway',
    owned: false,
  },
  350: {
    name: 'Hockenheimring Baden-Württemberg',
    owned: false,
  },
  351: {
    name: 'Bark River International Raceway',
    owned: false,
  },
  352: {
    name: 'Mt. Washington Auto Road',
    owned: false,
  },
  353: {
    name: 'Nashville Superspeedway',
    owned: false,
  },
  362: {
    name: 'Red Bull Ring',
    owned: false,
  },
  365: {
    name: 'Chicago Street Course',
    owned: false,
  },
  370: {
    name: 'Hungaroring',
    owned: false,
  },
  371: {
    name: 'Hickory Motor Speedway',
    owned: false,
  },
  380: {
    name: 'Phoenix Raceway',
    owned: false,
  },
  381: {
    name: 'Knockhill Racing Circuit',
    owned: false,
  },
  382: {
    name: 'LA Coliseum Raceway',
    owned: false,
  },
  396: {
    name: 'Federated Auto Parts Raceway at I-55',
    owned: false,
  },
  397: {
    name: 'Winton Motor Raceway',
    owned: false,
  },
  405: {
    name: 'Sandown International Motor Raceway',
    owned: false,
  },
  406: {
    name: 'Fuji International Speedway',
    owned: false,
  },
  407: {
    name: 'Port Royal Speedway',
    owned: false,
  },
  410: {
    name: 'Motorsport Arena Oschersleben',
    owned: false,
  },
  411: {
    name: 'Rudskogen Motorsenter',
    owned: true,
    free: true,
  },
  412: {
    name: 'Lucas Oil Speedway',
    owned: false,
  },
  419: {
    name: 'Lincoln Speedway',
    owned: false,
  },
  420: {
    name: 'Circuit de Nevers Magny-Cours',
    owned: false,
  },
  428: {
    name: 'Circuito de Jerez - Ángel Nieto',
    owned: false,
  },
  439: {
    name: 'MotorLand Aragón',
    owned: false,
  },
  440: {
    name: 'Willow Springs International Raceway',
    owned: false,
  },
}
