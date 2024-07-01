import { DISCOVERY_CONTENT } from '../../enums';
import styles from '../../page.module.css';

interface ScopeSelectionProps {
  setSelection: (selection: DISCOVERY_CONTENT) => void;
}

export default function ScopeSelection({ setSelection }: ScopeSelectionProps) {
  return (
    <div className='flex flex-col w-full h-[70vh] gap-20 justify-start items-center mt-20'>
      <div className={`text-gray-400 font-extralight text-3xl mb-4`}>
        Discover Valuable Satellite Services
      </div>
      <div className='text-gray-400 font-light text-xl w-[80vw] text-center max-w-[700px]'>
        Choose whether to discover potential satellite applications for{' '}
        <span className='text-gray-300 font-medium'>a specific project</span> or throughout your{' '}
        <span className='text-gray-300 font-medium'>entire organization</span>
      </div>
      <div className={styles.grid}>
        <div
          className={`${styles.card} cursor-pointer`}
          onClick={() => setSelection(DISCOVERY_CONTENT.PROJECT_SCOPE)}
        >
          <div>
            <h2>
              In My Project <span>-&gt;</span>
            </h2>
          </div>
          <p>
            Describe a specific task, work-stream, or project to see which satellite missions can
            deliver value within that limited context
          </p>
        </div>

        <div
          className={`${styles.card} cursor-pointer`}
          onClick={() => setSelection(DISCOVERY_CONTENT.ORGANIZATION_SCOPE)}
        >
          <div>
            <h2>
              In My Organization <span>-&gt;</span>
            </h2>
          </div>
          <p>
            Describe the overall nature of your organization to get a top-down map of all operations
            that could be assisted by satellite missions
          </p>
        </div>
      </div>
    </div>
  );
}
