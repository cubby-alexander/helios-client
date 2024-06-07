import { OrgOpsList } from '../types/DiscoveryFormTypes';

export const mockOrgOpsList: OrgOpsList = {
  groups: [
    {
      group: 'Fire Fighting',
      activities: [
        'Extinguish fires',
        'Rescuing individuals from burning buildings',
        'Conducting fire suppression operations'
      ]
    },
    {
      group: 'Fire Prevention',
      activities: [
        'Inspecting buildings for fire code compliance',
        'Educating the public about fire safety',
        'Installing fire alarms and smoke detectors'
      ]
    },
    {
      group: 'Emergency Medical Services',
      activities: [
        'Providing first aid and medical response',
        'Transporting patients to hospitals',
        'Conducting emergency medical training'
      ]
    },
    {
      group: 'Hazardous Material Response',
      activities: [
        'Responding to chemical spills',
        'Mitigating hazardous material incidents',
        'Decontaminating affected areas'
      ]
    },
    {
      group: 'Disaster Response',
      activities: [
        'Coordinating disaster relief efforts',
        'Conducting search and rescue operations',
        'Providing shelter and support services during disasters'
      ]
    },
    {
      group: 'Administration and Support',
      activities: [
        'Managing department resources and personnel',
        'Training and professional development',
        'Maintaining firefighting equipment and vehicles'
      ]
    },
    {
      group: 'Community Engagement',
      activities: [
        'Participating in community events',
        'Providing fire station tours',
        'Collaborating with other emergency services'
      ]
    }
  ]
};
