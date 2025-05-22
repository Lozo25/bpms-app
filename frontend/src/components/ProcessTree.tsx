// src/components/ProcessTree.tsx

import React from 'react';
import { Process } from '../types';
import { Menu, Item, contextMenu } from 'react-contexify';

interface ProcessTreeProps {
  processes: Process[];
  onSelect: (process: Process) => void;
  onOpenProperties: (process: Process) => void;
}

const ProcessTree = ({ processes, onSelect, onOpenProperties }: ProcessTreeProps) => {
  const handleRightClick = (event: React.MouseEvent, process: Process) => {
    event.preventDefault();
    contextMenu.show({
      id: 'PROCESS_CONTEXT_MENU',
      event,
      props: {
        process,
      },
    });
  };

  return (
    <ul className="space-y-2">
      {processes.map((process) => (
        <li
          key={process.id}
          onClick={() => onSelect(process)}
          onContextMenu={(e) => handleRightClick(e, process)}
          className="cursor-pointer p-2 rounded hover:bg-gray-100 flex items-center"
        >
          <span className="font-mono text-blue-600 mr-2">{process.code}</span>
          <span className="flex-grow">{process.name}</span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              process.notation === 'VAD'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {process.notation}
          </span>
        </li>
      ))}

      {/* Контекстное меню */}
      <Menu id="PROCESS_CONTEXT_MENU">
        <Item onClick={({ props }) => props.process && onOpenProperties(props.process)}>
          Свойства
        </Item>
      </Menu>
    </ul>
  );
};

export default ProcessTree;