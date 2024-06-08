import { RefinedOpsList } from '../types/DiscoveryFormTypes';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { useEffect, useState } from 'react';
import { mockRefinedOpsList } from '../mocks/refined-ops-list';

interface SelectKeyOpsSectionProps {
  refinedOpsList: RefinedOpsList | null;
}

export function SelectKeyOpsSection({ refinedOpsList }: SelectKeyOpsSectionProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    console.log('refinedOpsList:', refinedOpsList);
  }, [refinedOpsList]);

  const keySelectStyles = {
    listBox: {
      topSection: 'px-4 pb-4 min-h-30 text-center text-base text-slate-300'
    },
    listBoxSection: {
      heading: 'pl-2 text-sm text-slate-500'
    }
  };

  return (
    <div className='flex flex-wrap flex-row gap-6 w-full'>
      <div className='text-small font-light text-gray-400 pt-2 pb-6'>
        The following is a list of the activities in your operation we&apos;ve identified that may
        be observed by satellite. These activities are grouped by the major operation they fall
        under and divided into categories based on difficulty to observe.
        <br />
        <br />
        Select 3 activities to deep analyze in the final section.
      </div>
      {!refinedOpsList &&
        mockRefinedOpsList.map((item, index) => {
          if (
            item.rssFilter.definitelyObservable.length === 0 &&
            item.rssFilter.maybeObservable.length === 0
          ) {
            return;
          }
          const topContent = (
            <div className={keySelectStyles.listBox.topSection}>{item.majorOperation}</div>
          );
          return (
            <div key={item.index}>
              <div className='w-56 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
                <Listbox
                  key={item.index}
                  topContent={topContent}
                  aria-label='Multiple selection example'
                  classNames={{
                    base: 'h-80',
                    list: 'overflow-scroll'
                  }}
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='multiple'
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  {item.rssFilter.definitelyObservable.length > 0 && (
                    <ListboxSection
                      classNames={{
                        heading: keySelectStyles.listBoxSection.heading,
                        divider: 'my-4'
                      }}
                      title='Easy to observe'
                      showDivider
                    >
                      {item.rssFilter.definitelyObservable.map((op) => {
                        return <ListboxItem key={op} description={op} />;
                      })}
                    </ListboxSection>
                  )}
                  <ListboxSection
                    classNames={{ heading: keySelectStyles.listBoxSection.heading }}
                    title='Difficult to observe'
                  >
                    {item.rssFilter.maybeObservable.map((op) => {
                      return <ListboxItem key={op} description={op} />;
                    })}
                  </ListboxSection>
                </Listbox>
              </div>
            </div>
          );
        })}
    </div>
  );
}
