export const MASK = {
  regions: {
    north: {},
    middle: {
      center: {}
    }
  },
  search_options: {
    width: 500,
    fieldSearch: {
      maskName: {
        placeholder: '口罩机名称',
        sm: 8
      },
    },
    conditionSearch: {
      dataType: {
        placeholder: '数据类型',
        type: 'select',
        options: [
          {
            label: '合格数',
            value: '1'
          }, {
            label: '生产总数',
            value: '2'
          }
        ],
        sm: 8
      },
      startDate: {
        placeholder: '开始日期',
        type: 'date',
        sm: 8
      },
      startHour: {
        placeholder: '开始小时',
        type: 'select',
        sm: 8,
        options: Array.from({length: 24}, (x, index) => ({
          label: index,
          value: index
        }))
      },
      equipmentId: {
        placeholder: '流水线',
        type: 'select',
        options: [],
        sm: 8
      },
      endDate: {
        placeholder: '结束日期',
        type: 'date',
        sm: 8
      },
      endHour: {
        placeholder: '结束小时',
        type: 'select',
        sm: 8,
        options: Array.from({length: 24}, (x, index) => ({
          label: index,
          value: index
        }))
      }
    }
  }
}