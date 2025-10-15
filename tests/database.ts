import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

import { trace } from './testhub.ts';

interface Task {
  id?: number;
  title: string;
  description: string;
}

/**
 * Need to be rewritten every method btw O_o.
 */
class TaskRepository {
  private db: Database | undefined;

  async init(dbPath: string): Promise<void> {
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT
      );
    `);
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    if (!this.db) { 
      throw new Error('Database not initialized.');
    }

    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    const result = await this.db.run(sql, [task.title, task.description]);

    if (result.lastID) {
      return { id: result.lastID, ...task };
    }

    throw new Error('Failed to create task.');
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    if (!this.db) {
      throw new Error('Database not initialized.');
    }

    const query = 'SELECT * FROM tasks WHERE id = ?';
    return await this.db.get<Task>(query, [id]);
  }

  async getAllTasks(): Promise<Task[]> {
    if (!this.db) {
      throw new Error('Database not initialized.');
    }

    const query = 'SELECT * FROM tasks';
    return await this.db.all<Task[]>(query);
  }

  async updateTask(id: number, updatedTask: Partial<Task>): Promise<boolean> {
    if (!this.db) {
      throw new Error('Database not initialized.');
    }

    const fields = [];
    const values = [];

    if (updatedTask.title !== undefined) {
      fields.push('title = ?');
      values.push(updatedTask.title);
    }

    if (updatedTask.description !== undefined) {
      fields.push('description = ?');
      values.push(updatedTask.description);
    }

    if (fields.length === 0) {
      return false; // No fields to update
    }

    values.push(id);

    const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
    const result = await this.db.run(sql, values);

    return result.changes === 1;
  }

  async deleteTask(id: number): Promise<boolean> {
    if (!this.db) {
      throw new Error('Database not initialized.');
    }

    const sql = 'DELETE FROM tasks WHERE id = ?';
    const result = await this.db.run(sql, [id]);

    return result.changes === 1;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = undefined;
    }
  }
}

export async function databaseChecks(): Promise<void> {
  const taskRepository = new TaskRepository();
  const dbFile = './testdatabase.db';

  await taskRepository.init(dbFile);

  trace('database', 118, 'Database steps:\n');

  console.log('Creating tasks...');
  const task1 = await taskRepository.createTask({ 
    title: 'Learn TypeScript', 
    description: 'Study advanced TypeScript features.' 
  });
  const task2 = await taskRepository.createTask({ 
    title: 'Build SQLite App', 
    description: 'Develop a simple application using SQLite.' 
  });
  console.log('Created tasks:', task1, task2);

  console.log('\nGetting all tasks...');
  const allTasks = await taskRepository.getAllTasks();
  console.log('All tasks:', allTasks);

  if (task1.id) {
    console.log(`\nGetting task by ID: ${task1.id}...`);
    const retrievedTask = await taskRepository.getTaskById(task1.id);
    console.log('Retrieved task:', retrievedTask);

    console.log(`\nUpdating task ${task1.id}...`);
    const updated = await taskRepository.updateTask(task1.id, { 
      description: 'Master TypeScript and its ecosystem.' 
    });
    console.log('Task updated:', updated);

    console.log('\nGetting updated task...');
    const updatedTask = await taskRepository.getTaskById(task1.id);
    console.log('Updated task:', updatedTask);

    console.log(`\nDeleting task ${task2.id}...`);
    const deleted = await taskRepository.deleteTask(task2.id!);
    console.log('Task deleted:', deleted);

    console.log('\nGetting all tasks after deletion...');
    const remainingTasks = await taskRepository.getAllTasks();
    console.log('Remaining tasks:', remainingTasks);
  }

  await taskRepository.close();
  console.log('\nDatabase connection closed.\n');

  trace('database', 162, 'Database steps ended.\n');
}

export function runTest(): void {
  databaseChecks().catch(console.error);
}
