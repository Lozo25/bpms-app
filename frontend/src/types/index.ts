// src/types/index.ts

export type Process = {
  id: string;
  code: string;
  name: string;
  description: string;
  notation: 'VAD' | 'BPMN';
  deadline: string;
};