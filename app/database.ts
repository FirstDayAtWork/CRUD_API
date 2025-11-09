export type DB_User = {
  id: ReturnType<typeof crypto.randomUUID>;
  username: string;
  age: number;
  hobbies: string[];
};

export const testData: DB_User = {
  id: crypto.randomUUID(),
  username: 'Billy',
  age: 69,
  hobbies: ['suck dick', 'fuck slaves'],
};

export const db: DB_User[] = [testData];
