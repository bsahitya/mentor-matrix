import matrixData from './assets/matrix-data.json';
import ReactDOMServer from 'react-dom/server';

import './App.css';
import { Tooltip } from 'react-tooltip';

function App() {
  const { columns, newData: data } = matrixData;

  return (
    <>
      <h1 className='text-3xl text-gray-500 font-sans pb-4 pt-5'>
        Mentor Matrix
      </h1>
      <table className='min-w-full table-fixed border rounded text-left text-sm font-light'>
        <thead className='border-b sticky top-0 z-20 font-medium dark:border-neutral-500'>
          <tr className='bg-blue-50'>
            {columns.map((col, ind) => (
              <th
                scope='col'
                className={`border-r px-3 py-4 dark:border-neutral-500 sticky top-0 bg-blue-50 ${
                  ind === 0 ? 'left-0 z-20' : ''
                }`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className='border-b dark:border-neutral-500 align-top'>
              {row.map((action, ind) => (
                <td
                  data-tooltip-id='td-tooltip'
                  data-tooltip-hidden={!action}
                  data-tooltip-delay-show={700}
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <ul className='pl-3 py-1 list-disc'>
                      {typeof action !== 'string' ? (
                        action.map((item) => <li>{item}</li>)
                      ) : (
                        <li>{action}</li>
                      )}
                    </ul>
                  )}
                  className={`max-w-72 px-3 py-4 border-r dark:border-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap ${
                    ind === 0
                      ? 'font-medium bg-blue-50 sticky left-0 z-10'
                      : 'z-0'
                  } ${!action ? 'bg-zinc-100' : ''}`}>
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
        style={{ maxWidth: '60%' }}
      />
    </>
  );
}

export default App;
