import { OrgOpsList, OrgOpsListItem, RefinedOpsList } from '../types/DiscoveryFormTypes';
import { Button, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { FORM_STATUS } from '../enums';
import { MeceOpsResponse } from '../api/api-types';

interface OpsRefineSectionProps {
  orgOpsList: OrgOpsList | null;
  orgScope: string;
  disabledKeyChange: (keys: string[]) => void;
  openKeyChange: (keys: string[]) => void;
  refinedOpsListChange: (refinedOpsList: RefinedOpsList) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  scroll: {
    handler: (element: React.RefObject<HTMLDivElement>) => void;
    target: React.RefObject<HTMLDivElement>;
  };
}

export default function OpsRefineSection({
  orgOpsList,
  orgScope,
  disabledKeyChange,
  openKeyChange,
  refinedOpsListChange,
  scrollRef,
  scroll
}: OpsRefineSectionProps) {
  const [displayForm, setDisplayForm] = useState(false);
  const [formStatus, setFormStatus] = useState(FORM_STATUS.SUBMITTABLE);

  const handleRefineSubmit = () => {};

  const handleProceedSubmit = async () => {
    setFormStatus(FORM_STATUS.PENDING);
    let meceOpsList: MeceOpsResponse[] = [];
    let cleanedOpsList: RefinedOpsList = [];
    try {
      const fetchPromises =
        orgOpsList?.groups.map((item) => {
          const queryParams = new URLSearchParams({
            majorOperation: item.group,
            orgScope: orgScope
          });

          return fetch(`api/mece-ops?${queryParams}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          });
        }) ?? [];

      meceOpsList = await Promise.all(fetchPromises);
      cleanedOpsList = meceOpsList.map((item) => {
        let opsList = JSON.parse(item.data[0].content[0].text.value);
        return { majorOperation: opsList.operation, operations: opsList.activities.join(', ') };
      });
    } catch (error) {
      setFormStatus(FORM_STATUS.ERROR);
    }

    try {
      const fetchPromises = cleanedOpsList.map((item: RefinedOpsList) => {
        const queryParams = new URLSearchParams({
          operations: item.operations,
          orgScope: orgScope
        });

        return fetch(`api/rss-filtering?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json().then((data) => ({ ...item, ...data }));
        });
      });

      const results = await Promise.all(fetchPromises);
      console.log(results);
      refinedOpsListChange(results);
      setFormStatus(FORM_STATUS.SUCCESS);
      disabledKeyChange(['4']);
      openKeyChange(['3']);
      scroll.handler(scroll.target);
    } catch (error) {
      setFormStatus(FORM_STATUS.ERROR);
    }
  };

  return (
    <div ref={scrollRef} className='flex flex-wrap flex-col gap-2 w-full'>
      <div className='text-small font-light text-gray-400 pt-2 pb-6'>
        The following is a high level operation map we generated based on the scope you provided in
        the previous section. Each category of operations includes a bullet list of example
        activities that would hypothetically belong to it:
      </div>
      <div className='pl-4 mb-8'>
        {orgOpsList &&
          orgOpsList.groups.map((item: OrgOpsListItem, index: number) => (
            <div key={item.group} className='text-lg font-normal my-4 text-gray-300'>
              {item.group}
              <ul className='list-disc pl-6'>
                {item.activities.map((activity: string, index: number) => (
                  <li key={activity} className='text-xs font-normal mb-1 text-gray-400 '>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <div className='text-small font-light text-gray-400 pt-2 pb-6'>
        Is this operations map accurate? Note a few things:
        <ul className={'list-disc my-2 pl-6'}>
          <li className='my-1'>
            Major operations (e.g. &quot;{orgOpsList?.groups[0].group},&quot; &quot;
            {orgOpsList?.groups[1].group}&quot;) should be distinct and should collectively cover
            your activities
          </li>
          <li className='my-1'>
            The bullet list of activities (e.g. &quot;{orgOpsList?.groups[0].activities[0]}) are
            examples -- not all of them need to be part of your operation
          </li>
          <li className='my-1'>
            Again, it&apos;s most important the major operations be a comprehensive map of your
            overall work
          </li>
        </ul>
      </div>
      {displayForm ? (
        <Textarea
          className='-mt-6 w-full'
          label={'Refine Operation Map'}
          placeholder='Tell us how to refine the operations map'
        />
      ) : (
        <div className='text-small font-light text-gray-400 -mt-6 pb-2'>
          If it looks correct, proceed to the next step. Otherwise, tell us how we should refine it.
        </div>
      )}

      <div className='self-end flex flex-row gap-6'>
        <Button
          onClick={() => setDisplayForm((prevState) => !prevState)}
          className='self-end mt-6'
          color={!displayForm ? 'warning' : 'danger'}
          variant='flat'
        >
          {displayForm ? 'Cancel' : 'Refine'}
        </Button>
        <Button
          color='primary'
          variant='flat'
          className='self-end mt-6'
          isLoading={formStatus === FORM_STATUS.PENDING}
          onClick={() => (displayForm ? handleRefineSubmit() : handleProceedSubmit())}
        >
          {displayForm ? 'Refine' : 'Proceed'}
        </Button>
      </div>
    </div>
  );
}
