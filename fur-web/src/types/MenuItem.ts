import { AnyObject } from '@/types/CommonTypes';

export default interface MenuItem extends AnyObject {
  id: string;
  name: string;
  type: string;
  url?: string;
  icon?: string;
  seq?: number;
  subMenus?: Array<MenuItem>;
}
