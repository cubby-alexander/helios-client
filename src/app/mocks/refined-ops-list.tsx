import { RefinedOpsList } from '../types/DiscoveryFormTypes';

export const mockRefinedOpsList: RefinedOpsList[] = [
  {
    majorOperation: 'Fire Suppression',
    rssFilter: {
      definitelyObservable: ['Firefighter', 'Fire Truck', 'Fire Hose'],
      maybeObservable: ['Fire Hydrant', 'Fire Alarm']
    }
  },
  {
    majorOperation: 'Emergency Medical Services',
    rssFilter: {
      definitelyObservable: ['Paramedic', 'Ambulance', 'Paramedic', 'Ambulance', 'Defibrillator'],
      maybeObservable: ['First Aid Kit', 'Oxygen Mask']
    }
  },
  {
    majorOperation: 'Fire Prevention',
    rssFilter: {
      definitelyObservable: [
        'Fire Marshal',
        'Fire Code',
        'Fire Inspection',
        'Fire Code',
        'Fire Inspection',
        'Fire Code',
        'Fire Inspection'
      ],
      maybeObservable: ['Fire Extinguisher', 'Smoke Detector']
    }
  },
  {
    majorOperation: 'Fire Suppression',
    rssFilter: {
      definitelyObservable: [],
      maybeObservable: []
    }
  },
  {
    majorOperation: 'Emergency Medical Services Medical Services',
    rssFilter: {
      definitelyObservable: [
        'Paramedic Paramedic Paramedic Paramedic Paramedic ',
        'Ambulance',
        'Defibrillator'
      ],
      maybeObservable: ['First Aid Kit', 'Oxygen Mask']
    }
  },
  {
    majorOperation: 'Fire Prevention',
    rssFilter: {
      definitelyObservable: [],
      maybeObservable: ['Fire Extinguisher', 'Smoke Detector']
    }
  },
  {
    majorOperation: 'Emergency Medical Services',
    rssFilter: {
      definitelyObservable: ['Paramedic', 'Ambulance', 'Defibrillator'],
      maybeObservable: ['First Aid Kit', 'Oxygen Mask']
    }
  },
  {
    majorOperation: 'Fire Prevention',
    rssFilter: {
      definitelyObservable: [],
      maybeObservable: ['Fire Extinguisher', 'Smoke Detector']
    }
  }
];
