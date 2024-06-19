import { OpsQuestionList } from '../types/DiscoveryFormTypes';

export const mockOpsQuestionList: OpsQuestionList = [
  {
    operation: 'Extinguish fires',
    questions: [
      'Can you describe the challenges you encounter in detecting and monitoring wildfires or urban fires in real-time?',
      'How crucial is the ability to predict fire spread and understand the surrounding environment (e.g., vegetation type, weather conditions) in your operations?',
      'What types of information or data are you currently lacking that would assist in pre-incident planning or during active fire suppression efforts?',
      'How frequently do you need updates or changes in fire conditions to make informed decisions during firefighting operations?',
      'Are there specific geographic areas or types of terrain where enhanced monitoring would significantly improve your response efforts?'
    ]
  },
  {
    operation: 'Conducting fire suppression operations',
    questions: [
      'Can you describe the typical geographic area (urban, rural, forested, etc.) where you conduct fire suppression operations?',
      'How important is real-time information to your team during firefighting efforts?',
      'What specific types of information (e.g., heat maps, vegetation types, infrastructure details) would be most useful for your operations?',
      'How do weather conditions impact your operations, and would real-time or predictive weather data benefit your efforts?',
      'Are there particular times of the year or specific conditions when fire suppression operations are most challenging and more frequent?'
    ]
  },
  {
    operation: 'Conducting search and rescue missions',
    questions: [
      'Can you describe the typical environments and conditions where search and rescue missions are conducted?',
      'What kind of information or data is most critical for the success of a search and rescue mission?',
      'How often do search and rescue missions occur and how quickly do you need to respond?',
      'What challenges do you currently face in locating and rescuing individuals during these missions?',
      'Are there specific signs, markers, or patterns that you look for when searching for individuals in distress?'
    ]
  }
];
