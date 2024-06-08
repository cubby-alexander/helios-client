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
      definitelyObservable: ['Paramedic', 'Ambulance', 'Defibrillator'],
      maybeObservable: ['First Aid Kit', 'Oxygen Mask']
    }
  },
  {
    majorOperation: 'Fire Prevention',
    rssFilter: {
      definitelyObservable: ['Fire Marshal', 'Fire Code', 'Fire Inspection'],
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
    majorOperation: 'Emergency Medical Services Advanced',
    rssFilter: {
      definitelyObservable: ['Advanced Paramedic', 'Advanced Ambulance', 'Advanced Defibrillator'],
      maybeObservable: ['Advanced First Aid Kit', 'Advanced Oxygen Mask']
    }
  },
  {
    majorOperation: 'Fire Prevention Advanced',
    rssFilter: {
      definitelyObservable: [
        'Advanced Fire Marshal',
        'Advanced Fire Code',
        'Advanced Fire Inspection'
      ],
      maybeObservable: ['Advanced Fire Extinguisher', 'Advanced Smoke Detector']
    }
  },
  {
    majorOperation: 'Emergency Medical Services Basic',
    rssFilter: {
      definitelyObservable: ['Basic Paramedic', 'Basic Ambulance', 'Basic Defibrillator'],
      maybeObservable: ['Basic First Aid Kit', 'Basic Oxygen Mask']
    }
  },
  {
    majorOperation: 'Fire Prevention Basic',
    rssFilter: {
      definitelyObservable: ['Basic Fire Marshal', 'Basic Fire Code', 'Basic Fire Inspection'],
      maybeObservable: ['Basic Fire Extinguisher', 'Basic Smoke Detector']
    }
  }
];
