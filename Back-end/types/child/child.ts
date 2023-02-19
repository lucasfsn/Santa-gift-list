import { GiftEntity } from '../gift';
import { ChildEntity } from './child.entity';

export type CreateChildReq = Omit<ChildEntity, 'id'>;

export interface ListChildrenRes {
  childrenList: ChildEntity[];
  giftsList: GiftEntity[];
}

export interface SetGiftForChildReq {
  giftId: string;
}
