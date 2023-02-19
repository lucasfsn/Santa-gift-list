import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { GiftEntity } from '../types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';

type GiftRecordResults = [GiftRecord[], FieldPacket[]];

export class GiftRecord implements GiftEntity {
  public id?: string;
  public name: string;
  public quantity: number;

  constructor(obj: GiftEntity) {
    if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
      throw new ValidationError(
        'Gift name must be between 3 and 55 characters.'
      );
    }
    if (!obj.quantity || obj.quantity < 1 || obj.quantity > 999999) {
      throw new ValidationError('Gift quantity must be between 1 and 999999.');
    }

    this.id = obj.id;
    this.name = obj.name;
    this.quantity = obj.quantity;
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute('INSERT INTO `gifts` VALUES(:id, :name, :quantity)', {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
    });

    return this.id;
  }

  static async listAll(): Promise<GiftRecord[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `gifts`'
    )) as GiftRecordResults;
    return results.map(obj => new GiftRecord(obj));
  }

  static async getOne(id: string): Promise<GiftRecord> | null {
    const [results] = (await pool.execute(
      'SELECT * FROM `gifts` WHERE `id` = :id',
      {
        id,
      }
    )) as GiftRecordResults;
    return results.length === 0 ? null : new GiftRecord(results[0]);
  }

  async delete(): Promise<void> {
    await pool.execute('DELETE FROM `gifts` WHERE `id` = :id', {
      id: this.id,
    });
  }

  async countGivenGifts(): Promise<number> {
    const [[{ quantity }]] = (await pool.execute(
      'SELECT COUNT(*) AS `quantity` FROM `children` WHERE `giftId` = :id',
      {
        id: this.id,
      }
    )) as GiftRecordResults;
    return quantity;
  }
}
