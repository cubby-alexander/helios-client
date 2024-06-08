import { Accordion, AccordionItem, ScrollShadow } from '@nextui-org/react';
import {
  CubeTransparentIcon,
  FunnelIcon,
  GlobeAmericasIcon,
  WrenchIcon
} from '@heroicons/react/16/solid';
import { useRef, useState } from 'react';
import { OrgOpsList, RefinedOpsList } from '../types/DiscoveryFormTypes';
import OrgScopeSection from './OrgScopeSection';
import OpsRefineSection from './OpsRefineSection';
import { SelectKeyOpsSection } from './SelectKeyOpsSection';

export default function DiscoveryFlow() {
  const [openKeys, setOpenKeys] = useState<string[]>(['1']);
  const [disabledKeys, setDisabledKeys] = useState<string[]>(['2', '3', '4']);
  const [orgScope, setOrgScope] = useState<string>('');
  const [orgOpsList, setOrgOpsList] = useState<OrgOpsList | []>([]);
  const [refinedOpsList, setRefinedOpsList] = useState<RefinedOpsList | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const sectionRef = useRef(null);

  const itemClasses = {
    base: 'w-full',
    title: 'font-normal text-slate-200 pl-4',
    subtitle: 'pl-4 text-small',
    content: 'text-small px-2 text-xs'
  };

  const handleScopeAccordionFocus = (expanded: boolean) => {
    if (expanded && textareaRef.current && 'focus' in textareaRef.current) {
      (textareaRef.current as HTMLTextAreaElement).focus();
    }
  };

  const handleScroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollShadow
      className='relative w-screen h-[70vh] flex flex-col justify-start items-center text-left my-2 z-20'
      hideScrollBar={true}
    >
      <div className={`text-gray-400 font-extralight text-3xl mb-4`} onClick={handleScroll}>
        Discover Satellite Services
      </div>
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
          />
        </AccordionItem>
        <AccordionItem
          key='3'
          aria-label='Select Key Operations'
          startContent={<FunnelIcon className='text-slate-400 h-7 w-7' />}
          title={<p className='font-medium'>Select Key Operations</p>}
          subtitle='What do you need?'
        >
          <SelectKeyOpsSection refinedOpsList={refinedOpsList} />
        </AccordionItem>
        <AccordionItem
          key='4'
          aria-label='Card expired'
          startContent={<GlobeAmericasIcon className='text-slate-400 h-7 w-7' />}
          subtitle='What unlocks value?'
          title={
            <p ref={sectionRef} className='font-medium'>
              Generate Satellite Solutions
            </p>
          }
        >
          Hey there! I&apos;m a content block. I&apos;m here to help you add content to your
          website. Click the Edit button to get started.
        </AccordionItem>
      </Accordion>
    </ScrollShadow>
  );
}
