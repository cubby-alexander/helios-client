import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { useMemo, useState } from 'react';

interface OperationsListboxProps {
  operation: any;
  opsSelection: (selectedKeys: Set<string>) => void;
}

export function OperationsListbox({ operation, opsSelection }: OperationsListboxProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const selectedValue = useMemo(() => Array.from(selectedKeys).join(', '), [selectedKeys]);

  const keySelectStyles = {
    listBox: {
      topSection: 'px-4 pb-4 min-h-30 text-center text-base text-slate-300'
    },
    listBoxSection: {
      heading: 'pl-2 text-sm text-slate-500'
    }
  };

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
    opsSelection(keys);
  };

  const topContent = (
    <div className={keySelectStyles.listBox.topSection}>{operation.majorOperation}</div>
  );

  return (
    <Listbox
      key={operation.index}
      topContent={topContent}
      aria-label='Multiple selection example'
      classNames={{
        base: 'h-80',
        list: 'overflow-scroll'
      }}
      variant='flat'
      selectionMode='multiple'
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
    >
      {operation.rssFilter.definitelyObservable.length > 0 && (
        <ListboxSection
          classNames={{
            heading: keySelectStyles.listBoxSection.heading,
            divider: 'my-4'
          }}
          title='Easy to observe'
          showDivider
        >
          {operation.rssFilter.definitelyObservable.map((op) => {
            return <ListboxItem key={`${op}`} description={op} textValue={op} />;
          })}
        </ListboxSection>
      )}
      <ListboxSection
        classNames={{ heading: keySelectStyles.listBoxSection.heading }}
        title='Difficult to observe'
      >
        {operation.rssFilter.maybeObservable.map((op) => {
          return <ListboxItem key={`${op}`} description={op} textValue={op} />;
        })}
      </ListboxSection>
    </Listbox>
  );
}
