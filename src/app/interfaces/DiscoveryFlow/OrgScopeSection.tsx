import { Button, Textarea } from '@nextui-org/react';
import { FORM_STATUS } from '../../enums';
import { useState } from 'react';
import { OrgOpsList } from '../../types/DiscoveryFormTypes';

interface OrgScopeSectionProps {
  textRef: React.RefObject<HTMLTextAreaElement>;
  orgScopeChange: (scope: string) => void;
  orgOpsChange: (OrgOpsList: OrgOpsList) => void;
  disabledKeyChange: (keys: string[]) => void;
  openKeyChange: (keys: string[]) => void;
  scroll: {
    handler: (element: React.RefObject<HTMLDivElement>) => void;
    target: React.RefObject<HTMLDivElement>;
  };
}

export default function OrgScopeSection({
  textRef,
  orgScopeChange,
  orgOpsChange,
  disabledKeyChange,
  openKeyChange,
  scroll
}: OrgScopeSectionProps) {
  const [value, setValue] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>(FORM_STATUS.INCOMPLETE);

  const handleFormValueChange = (value: string) => {
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
        console.log('data', data);
        setFormStatus(FORM_STATUS.SUCCESS);
        orgScopeChange(value);
        orgOpsChange(data.content);
        disabledKeyChange(['3', '4']);
        openKeyChange(['2']);
        scroll.handler(scroll.target);
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormStatus(FORM_STATUS.ERROR);
      });
  };

  return (
    <div className='flex flex-wrap flex-col gap-2 w-full'>
      <div className='text-small font-light text-gray-400 pt-2 pb-6'>
        Briefly describe the scope of your operations. Be as short (3-8 words is ideal) and specific
        (e.g. &quot;a city fire department&quot; is better than &quot;a fire department&quot;) as
        possible.
      </div>
      <Textarea
        ref={textRef}
        variant='flat'
        label='Brief Description of Scope'
        placeholder={'Enter operational scope of your organization or mission'}
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
    </div>
  );
}
