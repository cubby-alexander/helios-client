import { Accordion, AccordionItem, ScrollShadow } from '@nextui-org/react';
import { FunnelIcon, GlobeAmericasIcon, WrenchIcon } from '@heroicons/react/16/solid';
import { RefObject, useRef, useState } from 'react';
import { OpsQuestionList, OrgOpsList, RefinedOpsList } from '../../types/DiscoveryFormTypes';
import OpsRefineSection from './OpsRefineSection';
import { SelectKeyOpsSection } from './SelectKeyOpsSection';
import { DiscoverySection } from './DiscoverySection';
import { mockOpsQuestionList } from '../../mocks/ops-question-list';
import { DISCOVERY_CONTENT } from '../../enums';
import { ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { ProjectGoalSection } from './ProjectGoalSection';
import {
  formBox,
  formScrollShadow,
  formAccordion,
  formTitle,
  itemIcon,
  itemTitle,
  itemClasses,
  formBackNav
} from './commonStyles';

interface ProjectScopeFormProps {
  setDiscovery: (content: DISCOVERY_CONTENT) => void;
}

export default function ProjectScopeForm({ setDiscovery }: ProjectScopeFormProps) {
  const [openKeys, setOpenKeys] = useState<string[]>(['1']);
  const [disabledKeys, setDisabledKeys] = useState<string[]>(['2', '3', '4']);
  const [projectGoal, setProjectGoal] = useState<string>('');
  const [orgOpsList, setOrgOpsList] = useState<OrgOpsList | null>(null);
  const [refinedOpsList, setRefinedOpsList] = useState<RefinedOpsList | null>(null);
  const [opsQuestionList, setOpsQuestionList] = useState<OpsQuestionList | null>(
    mockOpsQuestionList
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const refineRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const analyzeRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (element: RefObject<HTMLDivElement>) => {
    if (element.current) {
      element.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={formBox}>
      <ScrollShadow className={formScrollShadow} size={80}>
        <div className={formTitle}>Satellite Services For A Project</div>
        <Accordion
          className={formAccordion}
          itemClasses={itemClasses}
          showDivider={false}
          disableAnimation={false}
          disableIndicatorAnimation={false}
          hideIndicator={true}
          isCompact={false}
          isDisabled={false}
          defaultExpandedKeys={['1']}
          disabledKeys={disabledKeys}
          selectedKeys={openKeys}
        >
          <AccordionItem
            key='1'
            aria-label='Project Goals and Context'
            startContent={<ArrowsPointingInIcon className={itemIcon} />}
            title={<p className={itemTitle}>Project Goals and Context</p>}
            subtitle="Tell us what you're trying to do"
          >
            <ProjectGoalSection
              textRef={textareaRef}
              projectGoalChange={(scope: string) => setProjectGoal(scope)}
              orgOpsChange={(ops: OrgOpsList) => setOrgOpsList(ops)}
              disabledKeyChange={setDisabledKeys}
              openKeyChange={setOpenKeys}
              scroll={{
                handler: handleScroll,
                target: refineRef
              }}
            />
          </AccordionItem>
          <AccordionItem
            key='2'
            aria-label='Project Team'
            startContent={<WrenchIcon className={itemIcon} />}
            title={<p className={itemTitle}>Project Team</p>}
            subtitle='Confirm how you work'
          >
            <OpsRefineSection
              orgOpsList={orgOpsList}
              orgScope={projectGoal}
              disabledKeyChange={setDisabledKeys}
              openKeyChange={setOpenKeys}
              refinedOpsListChange={setRefinedOpsList}
              scrollRef={refineRef}
              scroll={{
                handler: handleScroll,
                target: filterRef
              }}
            />
          </AccordionItem>
          <AccordionItem
            key='3'
            aria-label='Select Key Operations'
            startContent={<FunnelIcon className={itemIcon} />}
            title={<p className={itemTitle}>Select Key Operations</p>}
            subtitle='What do you need?'
          >
            <SelectKeyOpsSection
              refinedOpsList={refinedOpsList}
              orgScope={projectGoal}
              opsQuestionListChange={setOpsQuestionList}
              disabledKeyChange={setDisabledKeys}
              openKeyChange={setOpenKeys}
              scrollRef={filterRef}
              scroll={{
                handler: handleScroll,
                target: analyzeRef
              }}
            />
          </AccordionItem>
          <AccordionItem
            key='4'
            aria-label='Card expired'
            startContent={<GlobeAmericasIcon className={itemIcon} />}
            subtitle='What unlocks value?'
            title={<p className={itemTitle}>Generate Satellite Solutions</p>}
          >
            <DiscoverySection
              orgScope={projectGoal}
              opsQuestionList={opsQuestionList}
              scrollRef={analyzeRef}
            />
          </AccordionItem>
        </Accordion>
      </ScrollShadow>
      <p onClick={() => setDiscovery(DISCOVERY_CONTENT.SELECTION)} className={formBackNav}>
        <span>&lt;-</span> Return to discovery selection (progress not saved)
      </p>
    </div>
  );
}
