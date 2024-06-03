import styles from '../page.module.css';
import interfaces from './interfaces.module.css';
import { Accordion, AccordionItem, Button, Textarea } from '@nextui-org/react';
import {
  BuildingOfficeIcon,
  GlobeAmericasIcon,
  LinkIcon,
  ListBulletIcon
} from '@heroicons/react/16/solid';
import { useRef, useState } from 'react';
import { FORM_STATUS } from '../enums';

export default function DiscoveryFlow() {
  const [openKeys, setOpenKeys] = useState<string[]>(['1']);
  const [disabledKeys, setDisabledKeys] = useState<string[]>(['2', '3', '4']);
  const [formStatus, setFormStatus] = useState<string>(FORM_STATUS.INCOMPLETE);
  const [value, setValue] = useState<string>('');
  const textareaRef = useRef(null);

  const itemClasses = {
    base: 'py-2 w-full',
    title: 'font-normal text-slate-200 pl-4',
    subtitle: 'pl-4 text-small',
    content: 'text-small px-2 text-xs'
  };

  const handleAccordionChange = (expanded) => {
    if (expanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className={interfaces.form}>
      <div className={`text-gray-300 ${interfaces.heading}`}>Discover Satellite Services</div>
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
          <AccordionItem
            key='1'
            aria-label='Your Organization or Mission'
            classNames={{ content: 'flex flex-wrap flex-col gap-2 w-full' }}
            startContent={<BuildingOfficeIcon className='text-slate-200 h-7 w-7' />}
            title={<p className='text-lg font-medium'>Your Organization or Mission</p>}
            subtitle='What do you do?'
            onFocus={() => handleAccordionChange(true)}
          >
            <div className='text-small font-thin text-gray-300 pt-2 pb-6'>
              Provide a brief description of your operation. The shorter the better (3-8 words is
              ideal), but the more specific the better (e.g. &quot;a city fire department&quot; is
              better than &quot;a fire department&quot;).
            </div>
            <Textarea
              ref={textareaRef}
              variant='flat'
              label='Brief Description'
              placeholder={'Enter your description'}
              color='default'
              className={''}
              isDisabled={formStatus === FORM_STATUS.PENDING}
              isInvalid={false}
              errorMessage={''}
              value={value}
              onValueChange={(value) => {
                setValue(value);
                if (value.length > 0) setFormStatus(FORM_STATUS.SUBMITTABLE);
                else setFormStatus(FORM_STATUS.INCOMPLETE);
              }}
            />
            <Button
              color='primary'
              variant='flat'
              className='self-end mt-6'
              isDisabled={formStatus === FORM_STATUS.INCOMPLETE}
              isLoading={formStatus === FORM_STATUS.PENDING}
              onClick={() => {
                setFormStatus(FORM_STATUS.PENDING);
                setDisabledKeys(['3', '4']);
                setOpenKeys(['2']);
              }}
            >
              {formStatus === FORM_STATUS.PENDING ? 'Generating Operation Map' : 'Submit'}
            </Button>
          </AccordionItem>
          <AccordionItem
            key='2'
            aria-label='Confirm Major Operations'
            startContent={<LinkIcon className='text-slate-200 h-7 w-7' />}
            title={<p className='font-medium'>Confirm Major Operations</p>}
            subtitle='How do you run?'
          >
            <div className='text-small font-thin text-gray-300 pt-2 pb-6'>
              Provide a brief description of your operation. The shorter the better (3-8 words is
              ideal), but the more specific the better (e.g. &quot;a city fire department&quot; is
              better than &quot;a fire department&quot;).
            </div>
          </AccordionItem>
          <AccordionItem
            key='3'
            aria-label='Select Key Operations'
            startContent={<ListBulletIcon className='text-slate-200 h-7 w-7' />}
            title={<p className='font-medium'>Select Key Operations</p>}
            subtitle='What do you need?'
          >
            Hey there! I&apos;m a content block. I&apos;m here to help you add content to your
            website. Click the Edit button to get started.
          </AccordionItem>
          <AccordionItem
            key='4'
            aria-label='Card expired'
            startContent={<GlobeAmericasIcon className='text-slate-200 h-7 w-7' />}
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
