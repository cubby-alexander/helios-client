import { RefinedOpsList } from '../types/DiscoveryFormTypes';
import { useState } from 'react';
import { OperationsListbox } from './OperationsListbox';

interface SelectKeyOpsSectionProps {
  refinedOpsList: RefinedOpsList | null;
  scrollRef: React.RefObject<HTMLDivElement>;
  scroll: {
    handler: (element: React.RefObject<HTMLDivElement>) => void;
    target: React.RefObject<HTMLDivElement>;
  };
}

export function SelectKeyOpsSection({
  refinedOpsList,
  scroll,
  scrollRef
}: SelectKeyOpsSectionProps) {
  const [selectedOps, setSelectedOps] = useState<{ [key: string]: string[] }>({});

  const handleOpsSelection = (operationKey: string, selectedKeys: Set<string> | undefined) => {
    if (selectedKeys) {
      setSelectedOps((prevSelectedOps) => ({
        ...prevSelectedOps,
        [operationKey]: Array.from(selectedKeys)
      }));
    }
  };

  return (
    <div ref={scrollRef} className='flex flex-wrap flex-row gap-6 w-full'>
      <div className='text-small font-light text-gray-400 pt-2 pb-6'>
        The following is a list of the activities in your operation we&apos;ve identified that may
        be observed by satellite. These activities are grouped by the major operation they fall
        under and divided into categories based on difficulty to observe.
        <br />
        <br />
        Select 3 activities to deep analyze in the final section.
      </div>
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
  );
}
