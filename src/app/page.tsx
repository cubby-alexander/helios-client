'use client';
import LandingContent from './interfaces/LandingContent';
import DiscoveryFlow from './interfaces/DiscoveryFlow';
import { useState } from 'react';
import { CONTENT } from './enums';

export default function Home() {
  const [content, setContent] = useState(CONTENT.LANDING);

  return (
    <div>
      {content === CONTENT.LANDING && <LandingContent changeContent={setContent} />}
      {content === CONTENT.DISCOVERY_FLOW && <DiscoveryFlow />}
    </div>
  );
}
