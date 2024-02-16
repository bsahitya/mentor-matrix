import matrixData from './assets/matrix-data.json';
import ReactDOMServer from 'react-dom/server';
import Modal from 'react-modal';

import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

import './App.css';

Modal.setAppElement('#root');

interface ModalData {
  content: string | string[];
  objective: string;
  action: string;
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    content: '' as string | string[],
    objective: '',
    action: '',
  });
  const { columns, data } = matrixData;

  const openModal = (content: ModalData) => {
    if (content.content) {
      setModalContent(content);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalContent({
      content: '' as string | string[],
      objective: '',
      action: '',
    });
    setIsOpen(false);
  };

  return (
    <>
      <table className='table-auto border border-separate border-spacing-1 rounded text-left text-xs md:text-sm bg-gray-300'>
        <thead className='border-b sticky top-0 z-20 font-semibold dark:border-neutral-500'>
          <tr className='bgc-blue'>
            {columns.map((col, ind) => (
              <th
                scope='col'
                className={`border rounded p-1.5 md:p-2 dark:border-neutral-500 sticky top-0 bgc-blue font-semibold  ${
                  ind === 0
                    ? 'left-0 z-20 md:text-2xl text-base font-sans font-bold c-red'
                    : 'md:text-base text-white'
                }`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className='border-b dark:border-neutral-500 align-top bg-neutral-100'>
              {row.map((action, ind) => (
                <td
                  onClick={() =>
                    openModal({
                      content: action as string | string[],
                      action: row[0] as string,
                      objective: columns[ind],
                    })
                  }
                  data-tooltip-id='td-tooltip'
                  data-tooltip-hidden={!action || ind === 0 || isMobile}
                  data-tooltip-delay-show={700}
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <>
                      <div className='flex flex-wrap pb-1'>
                        <div className='pb-1 pr-4'>
                          <span className='font-semibold text-base'>
                            Objective:{' '}
                          </span>
                          {columns[ind]}
                        </div>
                        <div>
                          <span className='font-semibold text-base'>
                            Action:{' '}
                          </span>
                          {row[0]}
                        </div>
                      </div>
                      <ul className='pl-3 py-1 list-disc'>
                        {typeof action !== 'string' ? (
                          action.map((item) => <li>{item}</li>)
                        ) : (
                          <li>{action}</li>
                        )}
                      </ul>
                    </>
                  )}
                  className={`max-w-60 md:max-w-80 p-1.5 md:p-2 border rounded dark:border-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap ${
                    ind === 0
                      ? 'md:text-base font-semibold bgc-blue sticky left-0 z-10 text-white'
                      : 'z-0 c-gray'
                  } ${!action ? 'bg-zinc-200' : 'cursor-pointer'}`}>
                  {action && typeof action !== 'string' ? action[0] : action}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Tooltip
        id='td-tooltip'
        className='z-40 text-left'
        style={{ maxWidth: '40%' }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            zIndex: 20,
          },
          content: {
            width: `${isMobile ? '85vw' : '60vw'}`,
            margin: '0 auto',
          },
        }}>
        <>
          <div className='flex flex-nowrap items-start pb-3 justify-between'>
            <div>
              <div className='pb-1.5'>
                <span className='font-semibold text-xl'>Objective: </span>
                {modalContent.objective}
              </div>
              <div>
                <span className='font-semibold text-xl'>Action: </span>
                {modalContent.action}
              </div>
            </div>

            <RxCross1 onClick={closeModal} className='cursor-pointer mt-1' />
          </div>

          <ul className='pt-1 pl-3 py-1 list-disc'>
            {typeof modalContent.content !== 'string' ? (
              modalContent.content.map((item) => <li>{item}</li>)
            ) : (
              <li>{modalContent.content}</li>
            )}
          </ul>
        </>
      </Modal>
    </>
  );
}

export default App;
