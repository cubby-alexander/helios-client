import { OrgOpsList, OrgOpsListItem } from '../types/DiscoveryFormTypes';
import { Button, Textarea } from '@nextui-org/react';
import { useState } from 'react';

interface OpsRefineSectionProps {
  orgOpsList: OrgOpsList | null;
  disabledKeyChange: (keys: string[]) => void;
  openKeyChange: (keys: string[]) => void;
}

export default function OpsRefineSection({
  orgOpsList,
  disabledKeyChange,
  openKeyChange
}: OpsRefineSectionProps) {
  const [displayForm, setDisplayForm] = useState(false);

  const handleRefineSubmit = () => {};

  const handleProceedSubmit = () => {
    openKeyChange(['3']);
    disabledKeyChange(['4']);
  };

  return (
    <div className='flex flex-wrap flex-col gap-2 w-full'>
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
            Major operations (e.g. &quot;{orgOpsList?.groups[0].group}) shouldn&apos;t have
            significant overlap, but should collectively cover your activities
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
          onClick={displayForm ? handleRefineSubmit : handleProceedSubmit}
        >
          {displayForm ? 'Refine' : 'Proceed'}
        </Button>
      </div>
    </div>
  );
}
