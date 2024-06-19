import { OpsQuestionList, RefinedOpsList } from '../../types/DiscoveryFormTypes';
import { useState } from 'react';
import { OperationsListbox } from './OperationsListbox';
import { Button } from '@nextui-org/react';
import { FORM_STATUS } from '../../enums';

interface SelectKeyOpsSectionProps {
  refinedOpsList: RefinedOpsList | null;
  orgScope: string;
  opsQuestionListChange: (opsQuestionList: OpsQuestionList) => void;
  disabledKeyChange: (keys: string[]) => void;
  openKeyChange: (keys: string[]) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  scroll: {
    handler: (element: React.RefObject<HTMLDivElement>) => void;
    target: React.RefObject<HTMLDivElement>;
  };
}

export function SelectKeyOpsSection({
  refinedOpsList,
  orgScope,
  opsQuestionListChange,
  disabledKeyChange,
  openKeyChange,
  scroll,
  scrollRef
}: SelectKeyOpsSectionProps) {
  const [selectedOps, setSelectedOps] = useState<{ [key: string]: string[] }>({});
  const [formStatus, setFormStatus] = useState(FORM_STATUS.SUBMITTABLE);

  const handleOpsSelection = (operationKey: string, selectedKeys: Set<string> | undefined) => {
    if (selectedKeys) {
      setSelectedOps((prevSelectedOps) => ({
        ...prevSelectedOps,
        [operationKey]: Array.from(selectedKeys)
      }));
    }
  };

  const handleProceedSubmit = async () => {
    setFormStatus(FORM_STATUS.PENDING);
    try {
      const opsQuestions =
        Object.values(selectedOps).map((operations: string[], index) => {
          return operations.map((operation) => {
            const queryParams = new URLSearchParams({
              operation: operation,
              orgScope: orgScope
            });
            return fetch(`api/satellite-applications?${queryParams}`, {
              method: 'GET',
              headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
            }).then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json().then((data) => {
                return { ...data, operation: operation };
              });
            });
          });
        }) ?? [];
      const questions = await Promise.all(opsQuestions.flat());
      console.log(questions);
      // opsQuestionListChange(questions);
      setFormStatus(FORM_STATUS.SUBMITTABLE);
      disabledKeyChange([]);
      openKeyChange(['3', '4']);
      scroll.handler(scroll.target);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div ref={scrollRef} className='flex flex-wrap flex-col gap-6 w-full'>
      <div className='text-small font-light text-gray-400 pt-2 pb-6'>
        The following is a list of the activities in your operation we&apos;ve identified that may
        be observed by satellite. These activities are grouped by the major operation they fall
        under and divided into categories based on difficulty to observe.
        <br />
        <br />
        Select 3 activities to deep analyze in the final section.
      </div>
      <div className='flex flex-wrap flex-row gap-6'>
        {refinedOpsList &&
          refinedOpsList.map((item: any, index: number) => {
            if (
              item.rssFilter.definitelyObservable.length === 0 &&
              item.rssFilter.maybeObservable.length === 0
            ) {
              return;
            }
            return (
              <div key={`${item}-${index}`}>
                <div className='w-56 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                  <OperationsListbox
                    operation={item}
                    opsSelection={(selectedKeys: Set<string>) =>
                      handleOpsSelection(item.majorOperation, selectedKeys)
                    }
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className='self-end flex-row gap-6'>
        <Button
          color='primary'
          variant='flat'
          className='self-end mt-6'
          isLoading={formStatus === FORM_STATUS.PENDING}
          onClick={handleProceedSubmit}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
}
