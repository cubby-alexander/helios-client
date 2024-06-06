import { AccordionItem, Button, Textarea } from '@nextui-org/react';
import { BuildingOfficeIcon } from '@heroicons/react/16/solid';
import { FORM_STATUS } from '../enums';
import { useRef, useState } from 'react';

interface OrgScopeSectionProps {
  orgOpsChange: (OrgOpsList) => void;
  disabledKeyChange: (keys: string[]) => void;
  openKeyChange: (keys: string[]) => void;
}

export default function OrgScopeSection({
  orgOpsChange,
  disabledKeyChange,
  openKeyChange
}: OrgScopeSectionProps) {
  const [value, setValue] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>(FORM_STATUS.INCOMPLETE);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAccordionChange = (expanded: boolean) => {
    if (expanded && textareaRef.current && 'focus' in textareaRef.current) {
      (textareaRef.current as HTMLTextAreaElement).focus();
    }
  };

  const handleFormValueChange = (value) => {
    setValue(value);
    if (value.length > 0) setFormStatus(FORM_STATUS.SUBMITTABLE);
    else setFormStatus(FORM_STATUS.INCOMPLETE);
  };

  const handleFormSubmission = () => {
    setFormStatus(FORM_STATUS.PENDING);
    const queryParams = new URLSearchParams({
      userMessage: value
    });
    fetch(`api/mece-org?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setFormStatus(FORM_STATUS.SUCCESS);
        orgOpsChange(JSON.parse(data[0].content[0].text.value));
        disabledKeyChange(['3', '4']);
        openKeyChange(['2']);
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormStatus(FORM_STATUS.ERROR);
      });
  };

  return (
    <AccordionItem
      key='1'
      aria-label='Your Organization or Mission'
      classNames={{ content: 'flex flex-wrap flex-col gap-2 w-full' }}
      startContent={<BuildingOfficeIcon className='text-slate-400 h-7 w-7' />}
      title={<p className='text-lg font-light font-medium'>Your Organization or Mission</p>}
      subtitle='What do you do?'
      onFocus={handleAccordionChange}
    >
      <div className='text-small font-thin text-gray-300 pt-2 pb-6'>
        Provide a brief description of your operation. The shorter the better (3-8 words is ideal),
        but the more specific the better (e.g. &quot;a city fire department&quot; is better than
        &quot;a fire department&quot;).
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
        onValueChange={handleFormValueChange}
      />
      <Button
        color='primary'
        variant='flat'
        className='self-end mt-6'
        isDisabled={formStatus === FORM_STATUS.INCOMPLETE}
        isLoading={formStatus === FORM_STATUS.PENDING}
        onClick={handleFormSubmission}
      >
        {formStatus === FORM_STATUS.PENDING ? 'Generating Operation Map' : 'Submit'}
      </Button>
    </AccordionItem>
  );
}
