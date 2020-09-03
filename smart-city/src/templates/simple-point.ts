import { MarkPoint } from '@/types/interfaces';
import { mapIcons } from '@/config/markers';

export default class SimplePoint {

  private readonly content: string;
  private readonly color: string;
  private readonly type: string;

  constructor({ content, color, type }: MarkPoint) {
    this.content = content as string;
    this.color = color as string;
    this.type = type as string;
  }

  public toString() {
    const icon = (mapIcons as any)[this.type || ''];
    const textStyles = `font-weight: bold; text-shadow: 1px 1px 0 #000; margin-right: -6px; color: ${this.color};`;
    return `<div style="width: 40px; height: 60px; margin: -13px 0 0 -11px;">
              <div style="${textStyles}">${this.content}</div>
              <div style="width: 1px; height: 14px; margin: 0 auto; background: white;"></div>
              <div style="margin-top: -8px;"><img class="shining-point" src="${icon}" alt=""></div>
            </div>`;

  }
}

