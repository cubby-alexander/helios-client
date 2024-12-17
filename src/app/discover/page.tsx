'use client';
import { ScrollShadow } from '@nextui-org/react';
import { useState } from 'react';
import { DISCOVERY_CONTENT } from '../enums';
import ScopeSelection from '../interfaces/DiscoveryFlow/ScopeSelection';
import ProjectScopeForm from '../interfaces/DiscoveryFlow/ProjectScopeForm';
import OrganizationScopeForm from '../interfaces/DiscoveryFlow/OrganizationScopeForm';

export default function Discover() {
  const [content, setContent] = useState(DISCOVERY_CONTENT.SELECTION);

  const contentDisplayed = () => {
    switch (content) {
      case DISCOVERY_CONTENT.SELECTION:
        return <ScopeSelection setSelection={setContent} />;
      case DISCOVERY_CONTENT.PROJECT_SCOPE:
        return <ProjectScopeForm setDiscovery={setContent} />;
      case DISCOVERY_CONTENT.ORGANIZATION_SCOPE:
        return <OrganizationScopeForm setDiscovery={setContent} />;
    }
  };

  return (
    <ScrollShadow
      className='relative h-full flex flex-col justify-start text-left z-20'
      hideScrollBar={true}
    >
      {contentDisplayed()}
    </ScrollShadow>
  );
}
