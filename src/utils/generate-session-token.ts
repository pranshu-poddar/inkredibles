import { v4 as uuidv4 } from 'uuid';
export const generateSessionToken = (): string => {
    return uuidv4();
  };