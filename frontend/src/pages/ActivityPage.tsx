// src/pages/ActivityPage.tsx

import React, { useState } from 'react';
import ProcessTree from '../components/ProcessTree';
import ProcessFormPopup from '../components/ProcessFormPopup';
import { Process } from '../types';

// Моковые данные
const mockProcesses = [
  {
    id: 'P1',
    code: 'VA-001',
    name: 'Процесс приема заявок',
    description: 'Обработка входящих обращений клиентов',
    notation: 'VAD',
    deadline: '7 дней',
  },
  {
    id: 'P2',
    code: 'PR-002',
    name: 'Обработка заказов',
    description: 'Закрытие заказов после оплаты',
    notation: 'BPMN',
    deadline: '3 дня',
  },
];

const ActivityPage = () => {
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);

  const handleOpenProperties = (data: any) => {
    const process = data.props?.process;
    if (process) setSelectedProcess(process);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Деятельность</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Дерево процессов */}
        <div className="md:col-span-1 bg-white border rounded-lg shadow-sm p-4 max-h-[80vh] overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Дерево процессов</h2>
          <ProcessTree
            processes={mockProcesses}
            onSelect={setSelectedProcess}
            onOpenProperties={handleOpenProperties}
          />
        </div>

        {/* Карточка процесса */}
        <div className="md:col-span-2 bg-white border rounded-lg shadow-sm p-6">
          {selectedProcess ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{selectedProcess.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Код процесса</label>
                  <p className="mt-1 p-2 bg-gray-100 rounded">{selectedProcess.code}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Нотация</label>
                  <p
                    className={`mt-1 inline-block px-3 py-1 text-sm rounded-full ${
                      selectedProcess.notation === 'VAD'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {selectedProcess.notation}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Описание</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">
                    {selectedProcess.description || '-'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Требования к срокам
                  </label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">
                    {selectedProcess.deadline || '-'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert('Редактировать')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Редактировать
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Выберите процесс из дерева</p>
          )}
        </div>
      </div>

      {/* Попап свойств */}
      {selectedProcess && (
        <ProcessFormPopup
          process={selectedProcess}
          onClose={() => setSelectedProcess(null)}
          onSave={(updated) => console.log('Сохранено:', updated)}
        />
      )}
    </div>
  );
};

export default ActivityPage;