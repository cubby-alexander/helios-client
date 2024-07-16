import { Button, Input } from '@nextui-org/react';
import { FORM_STATUS } from '../../enums';
import { MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
import { OrgOpsList } from '../../types/DiscoveryFormTypes';

interface OrgScopeSectionProps {
  textRef: React.RefObject<HTMLTextAreaElement>;
  projectGoalChange: (scope: string) => void;
  orgOpsChange: (OrgOpsList: OrgOpsList) => void;
  disabledKeyChange: (keys: string[]) => void;
  openKeyChange: (keys: string[]) => void;
  scroll: {
    handler: (element: React.RefObject<HTMLDivElement>) => void;
    target: React.RefObject<HTMLDivElement>;
  };
}

export function ProjectGoalSection({
  textRef,
  projectGoalChange,
  orgOpsChange,
  disabledKeyChange,
  openKeyChange,
  scroll
}: OrgScopeSectionProps) {
  const [goalValue, setGoalValue] = useState<string>('');
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [formStatus, setFormStatus] = useState<string>(FORM_STATUS.INCOMPLETE);
  const textAreaRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined> =
    useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (textAreaRef.current) {
      (textAreaRef.current as HTMLTextAreaElement).focus();
    }
  }, []);

  const handleFormValueChange = (field: string, value: string) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [field]: value
      };
    });
    if (value.length > 0) setFormStatus(FORM_STATUS.SUBMITTABLE);
    else setFormStatus(FORM_STATUS.INCOMPLETE);
  };

  const handleFormSubmission = () => {
    setFormStatus(FORM_STATUS.PENDING);
    const queryParams = new URLSearchParams({
      userMessage: values.goals
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
        projectGoalChange(values.goals);
        orgOpsChange(JSON.parse(data[0].content[0].text.value));
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
        Briefly describe the nature of your project. Be as short and specific as possible.
        <span className='font-medium text-gray-300'> 3-8 words is ideal</span> and
        <span className='font-medium text-gray-300'> more detail is better</span> (e.g.
        &quot;analyze seasonal shipping trends in ports of a certain size&quot; is better than
        &quot;analyze shipping trends&quot;).
      </div>
      {/*@ts-ignore*/}
      <Input
        ref={textAreaRef as unknown as Ref<HTMLInputElement>}
        variant='flat'
        label='What are the goals or objectives of the project?'
        color='default'
        isDisabled={formStatus === FORM_STATUS.PENDING}
        isRequired
        isInvalid={false}
        value={goalValue}
        onValueChange={setGoalValue}
        onKeyDown={(e) => {}}
      />

      <Input
        variant='flat'
        label="What sort of team is handling the project (e.g. 'finance,' 'marketing,' etc.)?"
        color='default'
        className='mt-4'
        isDisabled={formStatus === FORM_STATUS.PENDING}
        isRequired
        isInvalid={false}
        value={values['team']}
        onValueChange={(newValue) => handleFormValueChange('team', newValue)}
        onKeyDown={(e) => {}}
      />

      <Input
        variant='flat'
        label="What sort of team is handling the project (e.g. 'finance,' 'marketing,' etc.)?"
        color='default'
        className='mt-4'
        isDisabled={formStatus === FORM_STATUS.PENDING}
        isInvalid={false}
        onKeyDown={(e) => {}}
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
