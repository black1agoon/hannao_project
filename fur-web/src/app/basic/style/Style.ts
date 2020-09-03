import { AnyObject } from '@/types';

export interface StyleSort {
  id: string;
  pid: string;
  seq: number;
  name: string;
  memo: string;
  createUser: string;
  styleSortSon?: Array<StyleSort>;
}

export interface Style {
  id: string;
  styleCode: string;
  styleName: string;
  styleSortId: string;
  styleStatus: 1;
  marketYear: 0;
  memo: string;
  createUser: string;
}

export interface StyleAtt {
  id: string;
  uid?: string;
  styleId: string;
  fileName: string;
  fileUrl: string;
}

export interface StyleColor {
  id: string;
  styleId: string;
  colorName: string;
  sizeId: string;
  size: string;
  type: string;
  children?: Array<StyleColor>;
}

export interface StyleColorAddForm {
  colorName: string;
  sizeId: Array<{
    id: string;
    size: string;
    type: string;
  }>;
}

export interface StyleProcess {
  id: string;
  styleId: string;
  stepId: string;
  stepName: string;
  seq: number;
  stylePrice: number;
  process: string;
  processImgs: string[];
  processImgList?: AnyObject[];
}
