import { RefObject, useState } from 'react';
import { OpsQuestionSet, OpsQuestionList } from '../../types/DiscoveryFormTypes';
import { Button, Divider, Textarea } from '@nextui-org/react';
import { FORM_STATUS } from '../../enums';

interface DiscoverySectionProps {
  orgScope: string;
  opsQuestionList: OpsQuestionList | null;
  scrollRef: RefObject<HTMLDivElement>;
}

interface FormValues {
  [key: string]: {
    [key: number]: string;
  };
}

const buildFormObject = (opsListAndQ: OpsQuestionList | null) => {
  const formValues: FormValues = {};
  opsListAndQ?.forEach((opsList: OpsQuestionSet) => {
    formValues[opsList.operation] = {};
    opsList.questions.forEach((question, index) => {
      formValues[opsList.operation][index] = '';
    });
  });
  return formValues;
};

export function DiscoverySection({ orgScope, opsQuestionList, scrollRef }: DiscoverySectionProps) {
  const [formStatus, setFormStatus] = useState(FORM_STATUS.INCOMPLETE);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [formValues, setFormValues] = useState<any>(buildFormObject(opsQuestionList));

  const handleGenerateSubmit = async () => {
    setFormStatus(FORM_STATUS.PENDING);
    let formInputs: any[] = [];
    if (opsQuestionList) {
      opsQuestionList[selectedTab].questions.forEach((question, index) => {
        formInputs.push({
          question: question,
          answer: formValues[opsQuestionList[selectedTab].operation][index]
        });
      });
    }
    try {
      const queryParams = new URLSearchParams({
        orgScope: orgScope,
        activity: opsQuestionList ? opsQuestionList[selectedTab].operation : '',
        userProvidedInfo: JSON.stringify(formInputs)
      });
      const satelliteUseCase = fetch(`api/satellite-application?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json().then((data) => {
          return data;
        });
      });
    } catch (error) {
      setFormStatus(FORM_STATUS.ERROR);
      console.log(error);
    }
  };

  const generateActivityTabs = () => {
    const activityTabs: JSX.Element[] = [];
    if (opsQuestionList) {
      opsQuestionList.forEach((set, index) => {
        activityTabs.push(
          <div
            key={set.operation}
            className={`cursor-pointer w-48 text-gray-${selectedTab === index ? 200 : 400}`}
            onClick={() => setSelectedTab(index)}
          >
            {set.operation}
          </div>
        );
        activityTabs.push(<Divider key={`divider-${index}`} orientation={'vertical'} />);
      });
    }
    return activityTabs;
  };

  const generateActivityQuestions = () => {
    if (opsQuestionList) {
      const questionSets = opsQuestionList.map((set, setIndex) => {
        return (
          <div key={set.operation} className={`${selectedTab !== setIndex && 'hidden'}`}>
            {set.questions.map((question, questionIndex) => {
              return (
                <Textarea
                  key={`${set.operation}-${questionIndex}`}
                  label={question}
                  labelPlacement={'outside'}
                  className='w-full py-6'
                  value={formValues[set.operation][questionIndex]}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {}}
                  onChange={(e: { target: { value: any } }) => {
                    setFormValues((prevFormValues: any) => ({
                      ...prevFormValues,
                      [set.operation]: {
                        ...prevFormValues[set.operation],
                        [questionIndex]: e.target.value
                      }
                    }));
                  }}
                />
              );
            })}
          </div>
        );
      });
      return questionSets;
    }
  };

  return (
    <div ref={scrollRef} className='flex flex-wrap flex-col gap-2 w-full'>
      <div className='text-sm font-light text-gray-400 pt-2 pb-6'>
        Lastly, provide specific details about the activities in each tab below. We&apos;ve
        generated some questions about each activity that will help us understand how they are
        conducted in your organization. Please answer as many questions as you can.
        <br />
        <br />
        When finished, click the &quot;Generate&quot; button to run the use case generator.
      </div>
      <Divider orientation={'horizontal'} />
      <div className='flex flex-row justify-center items-center text-center text-base font-md gap-8 flex-nowrap w-full pt-8 pb-6'>
        {generateActivityTabs()}
      </div>
      <div>{generateActivityQuestions()}</div>
      <div className='self-end flex-row gap-6'>
        <Button
          color='primary'
          variant='flat'
          className='self-end mt-6'
          isLoading={formStatus === FORM_STATUS.PENDING}
          onClick={handleGenerateSubmit}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
