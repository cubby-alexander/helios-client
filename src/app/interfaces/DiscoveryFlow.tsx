import styles from '../page.module.css';
import interfaces from './interfaces.module.css';
import { Accordion, AccordionItem, Button, Textarea } from '@nextui-org/react';
import { GlobeAmericasIcon, ListBulletIcon, WrenchIcon } from '@heroicons/react/16/solid';
import { useRef, useState } from 'react';
import { OrgOpsList, OrgOpsListItem } from '../types/DiscoveryFormTypes';
import OrgScopeSection from './OrgScopeSection';

export default function DiscoveryFlow() {
  const [openKeys, setOpenKeys] = useState<string[]>(['1', '2']);
  const [disabledKeys, setDisabledKeys] = useState<string[]>(['3', '4']);
  const [orgOpsList, setOrgOpsList] = useState<OrgOpsList | null>(null);

  const itemClasses = {
    base: 'w-full',
    title: 'font-normal text-slate-200 pl-4',
    subtitle: 'pl-4 text-small',
    content: 'text-small px-2 text-xs'
  };

  return (
    <div className={interfaces.form}>
      <div className={`text-gray-400 ${interfaces.heading}`}>Discover Satellite Services</div>
      <div className={styles.center}>
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
          <OrgScopeSection
            orgOpsChange={(ops: OrgOpsList) => setOrgOpsList(ops)}
            disabledKeyChange={setDisabledKeys}
            openKeyChange={setOpenKeys}
          />
          <AccordionItem
            key='2'
            classNames={{ content: 'flex flex-wrap flex-col gap-2 w-full' }}
            aria-label='Confirm Major Operations'
            startContent={<WrenchIcon className='text-slate-400 h-7 w-7' />}
            title={<p className='font-medium'>Confirm Major Operations</p>}
            subtitle='How do you run?'
          >
            <div className='text-small font-thin text-gray-300 pt-2 pb-6'>
              We&apos;ve mapped the high level operations involved in your work. Each area of
              operation includes examples of activities that would belong to it:
            </div>
            <div className='pl-4 mb-8'>
              {orgOpsList &&
                orgOpsList.groups.map((item: OrgOpsListItem, index: number) => (
                  <div key={item.group} className='text-lg font-normal my-4 text-gray-300'>
                    {item.group}
                    <ul className='list-disc pl-6'>
                      {item.activities.map((activity: string, index: number) => (
                        <li key={activity} className='text-xs font-normal my-.5 text-gray-300 '>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
            <div className='text-small font-thin text-gray-300 pt-2 pb-6'>
              How does this look? Do the high level operations comprehensively map your
              organization? Are the examples accurate? Is there anything missing or incorrect?
            </div>
            <div className='text-small font-thin text-gray-300 pt-2 pb-6'>
              If it looks correct, proceed to the next step. Otherwise, tell us how we should refine
              it.
            </div>
            <div className='self-end flex flex-row gap-6'>
              <Button color='warning' variant='flat' className='self-end mt-6'>
                Refine
              </Button>
              <Button color='primary' variant='flat' className='self-end mt-6'>
                Proceed
              </Button>
            </div>
          </AccordionItem>
          <AccordionItem
            key='3'
            aria-label='Select Key Operations'
            startContent={<ListBulletIcon className='text-slate-400 h-7 w-7' />}
            title={<p className='font-medium'>Select Key Operations</p>}
            subtitle='What do you need?'
          >
            Hey there! I&apos;m a content block. I&apos;m here to help you add content to your
            website. Click the Edit button to get started.
          </AccordionItem>
          <AccordionItem
            key='4'
            aria-label='Card expired'
            startContent={<GlobeAmericasIcon className='text-slate-400 h-7 w-7' />}
            subtitle='What unlocks value?'
            title={<p className='font-medium'>Generate Satellite Solutions</p>}
          >
            Hey there! I&apos;m a content block. I&apos;m here to help you add content to your
            website. Click the Edit button to get started.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
