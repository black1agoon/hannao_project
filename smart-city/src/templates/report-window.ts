import { MarkPoint } from '@/types/interfaces';
import { borderImages, mapIcons } from '@/config/markers';

function stylesToString(styles: object) {
  return Object.entries(styles).map(([name, value]) => {
    return name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase() + ': ' + value;
  }).join(';');
}

interface InfoItem {
  name: string;
  content: string;
  color?: string;
  list?: boolean;
}

export default class ReportWindow {
  private readonly content: InfoItem[];
  private readonly color: string;
  private readonly type: string;

  constructor({ content, color, type }: MarkPoint) {
    this.content = content as InfoItem[];
    this.color = color as string;
    this.type = type as string;
  }

  public toString() {
    return `<div style="${this.boxStyles}">
              ${this.contentList}
              <div class="border-arrows" style="${this.arrowStyles.left}"></div>
              <div class="border-arrows" style="${this.arrowStyles.right}"></div>
              <div style="position: absolute; ${this.markerPosition}">
                <div style="${this.tailStyles}"></div>
                <div style="margin: -8px 18px 0 0;"><img class="wave-point" src="${this.icon}" alt=""></div>
              </div>
            </div>`;
  }

  private get contentList() {
    return this.content
      .filter((line) => line.list !== false)
      .map((line) => {
        return `<div class="status-line" style="display: flex;">
                  <div class="status-name highlight-color" style="white-space: nowrap;">${line.name}：</div>
                  <div class="status-content" style="color: ${line.color}"> ${line.content} </div>
                </div>`;
      }).join('');
  }

  private get arrowStyles() {
    const arrowStyles = `width: 10px; height: 30px; position: absolute;`;
    const leftColor = borderImages.left[this.color];
    const rightColor = borderImages.right[this.color];
    return {
      left: arrowStyles + `background: url(${leftColor}) no-repeat center; top: 4px; left: -6px;`,
      right: arrowStyles + `background: url(${rightColor}) no-repeat center; bottom: 4px; right: -6px;`,
    };
  }

  private get markerPosition() {
    return this.type === 'report' ? `top: 50%; left: -38px;` : `left: calc(50% - 21px); bottom: -58px`;
  }

  private get icon() {
    return (mapIcons as any)[this.type || ''];
  }

  private get boxStyles() {
    const boxPos = this.type === 'report' ? ['27px', 'calc(-50% - 23px)'] : ['calc(-50% + 9px)', 'calc(-100% - 13px)'];
    return stylesToString({
      background: '#000a',
      color: 'white',
      border: `2px solid ${this.color}bb`,
      padding: '8px',
      fontSize: '14px',
      textAlign: 'left',
      width: '250px',
      transform: `translate(${boxPos[0]}, ${boxPos[1]})`,
    });
  }

  private get tailStyles() {
    return stylesToString({
      width: '20px',
      height: '26px',
      margin: '0 auto',
      border: `1px solid ${this.color}`,
      borderRight: 'none',
      borderBottom: 'none',
      ...(
        this.type !== 'report' ? {
          borderTop: 'none',
          height: '40px',
        } : {}
      ),
    });
  }
}
