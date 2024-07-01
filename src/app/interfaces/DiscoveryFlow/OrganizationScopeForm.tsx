import { Accordion, AccordionItem, ScrollShadow } from '@nextui-org/react';
import {
  CubeTransparentIcon,
  FunnelIcon,
  GlobeAmericasIcon,
  WrenchIcon
} from '@heroicons/react/16/solid';
import styles from '../../discover/page.module.css';
import { RefObject, useRef, useState } from 'react';
import { OpsQuestionList, OrgOpsList, RefinedOpsList } from '../../types/DiscoveryFormTypes';
import OrgScopeSection from './OrgScopeSection';
import OpsRefineSection from './OpsRefineSection';
import { SelectKeyOpsSection } from './SelectKeyOpsSection';
import { DiscoverySection } from './DiscoverySection';
import { mockOpsQuestionList } from '../../mocks/ops-question-list';
import { DISCOVERY_CONTENT } from '../../enums';

interface OrganizationScopeFormProps {
  setDiscovery: (content: DISCOVERY_CONTENT) => void;
}

export default function OrganizationScopeForm({ setDiscovery }: OrganizationScopeFormProps) {
  const [openKeys, setOpenKeys] = useState<string[]>(['1']);
  const [disabledKeys, setDisabledKeys] = useState<string[]>(['2', '3', '4']);
  const [orgScope, setOrgScope] = useState<string>('');
  const [orgOpsList, setOrgOpsList] = useState<OrgOpsList | null>(null);
  const [refinedOpsList, setRefinedOpsList] = useState<RefinedOpsList | null>(null);
  const [opsQuestionList, setOpsQuestionList] = useState<OpsQuestionList | null>(
    mockOpsQuestionList
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const refineRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const analyzeRef = useRef<HTMLDivElement | null>(null);

  const itemClasses = {
    base: 'w-full',
    title: 'font-normal text-slate-200 pl-4',
    subtitle: 'pl-4 text-small',
    content: 'text-small px-2 text-xs'
  };

  // @ts-ignore
  const handleScopeAccordionFocus = (event: FocusEvent<Element, Element>) => {
    if (event && textareaRef.current && 'focus' in textareaRef.current) {
      (textareaRef.current as HTMLTextAreaElement).focus();
    }
  };

  const handleScroll = (element: RefObject<HTMLDivElement>) => {
    if (element.current) {
      element.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='relative w-screen h-[70vh] flex flex-col justify-start items-center text-left z-20'>
      <div className={`text-gray-400 font-extralight text-3xl mb-4`}>
        Satellite Services For An Organization
      </div>

      <ScrollShadow className='relative w-screen h-[70vh] flex flex-col justify-start items-center text-left my-2 z-20'>
        <Accordion
          className='p-2 flex flex-col gap-1 w-[80vw] max-w-[800px]'
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
            aria-label='Organization or Mission Scope'
            startContent={<CubeTransparentIcon className='text-slate-400 h-7 w-7' />}
            title={<p className='text-lg font-light font-medium'>Organization or Mission Scope</p>}
            subtitle='Tell us what you do'
            onFocus={handleScopeAccordionFocus}
          >
            <OrgScopeSection
              textRef={textareaRef}
              orgScopeChange={(scope: string) => setOrgScope(scope)}
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
            aria-label='Major Operations Map'
            startContent={<WrenchIcon className='text-slate-400 h-7 w-7' />}
            title={<p className='text-lg font-medium'>Major Operations Map</p>}
            subtitle='Confirm how you work'
          >
            <OpsRefineSection
              orgOpsList={orgOpsList}
              orgScope={orgScope}
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
            startContent={<FunnelIcon className='text-slate-400 h-7 w-7' />}
            title={<p className='font-medium'>Select Key Operations</p>}
            subtitle='What do you need?'
          >
            <SelectKeyOpsSection
              refinedOpsList={refinedOpsList}
              orgScope={orgScope}
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
            startContent={<GlobeAmericasIcon className='text-slate-400 h-7 w-7' />}
            subtitle='What unlocks value?'
            title={<p className='font-medium'>Generate Satellite Solutions</p>}
          >
            <DiscoverySection
              orgScope={orgScope}
              opsQuestionList={opsQuestionList}
              scrollRef={analyzeRef}
            />
          </AccordionItem>
        </Accordion>
      </ScrollShadow>
      <p
        onClick={() => setDiscovery(DISCOVERY_CONTENT.SELECTION)}
        className={`${styles.backnav} text-gray-300 font-light w-[80vw] max-w-[800px] cursor-pointer`}
      >
        <span>&lt;-</span> Return to discovery selection (progress not saved)
      </p>
    </div>
  );
}
