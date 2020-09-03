<template>
  <el-dialog :visible.sync="visible" width="80%" :title="translate('exportFile')" @opened="toggleAllSelection">
    <div class="dialog-content">
      <el-table ref="table" :data="columns" height="auto" size="small"
                :cell-style="{ padding: '2px 0' }"
                @row-click="toggleChecked"
                @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="label" :label="translate('columnName')"></el-table-column>
        <el-table-column :label="$tc('common.action', 2)" width="100">
          <template slot-scope="scope">
            <el-button class="move-button" size="mini" icon="el-icon-arrow-up"
                       @click.stop="moveRow(scope, -1)" :title="$t('common.moveUp')">
            </el-button>
            <el-button class="move-button" size="mini" icon="el-icon-arrow-down"
                       @click.stop="moveRow(scope, 1)" :title="$t('common.moveDown')">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form label-width="80px">
        <el-form-item :label="$t('common.filename')" size="small">
          <el-input v-model="fileName" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="translate('exportType')" size="small">
          <el-select v-model="fileType" size="small" style="width: 100%">
            <el-option v-for="item in typeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <template v-if="!isAll">
          <el-form-item :label="translate('exportRange')" size="small">
            <el-radio-group v-model="exportRange.type" size="small">
              <el-radio border :label="0">{{ translate('allData') }}</el-radio>
              <el-radio border :label="1">{{ translate('selectRange') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="translate('startPosition')" size="small" class="inline-item">
            <el-input v-model="exportRange.start" size="small" :disabled="rangeDisabled"></el-input>
          </el-form-item>
          <el-form-item :label="translate('exportCount')" size="small" class="inline-item">
            <el-input v-model="exportRange.count" size="small" :disabled="rangeDisabled"></el-input>
          </el-form-item>
          <div class="range-tip">{{ translate('exportLimit') }}</div>
        </template>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="exportRecords" size="small">{{ $t('common.export') }}</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import LaBase from '@/components/base/LaBase';
import { createFormData, downloadBlob } from '@/utils/request';
import { AnyObject } from '@/types';
import { ElTable } from 'element-ui/types/table';
import { translate } from '@/lang/i18n';

interface ColumnItem {
  name: string;
  label: string;
  textField?: string;
}

interface OpeningArgs {
  title: string;
  url: string;
  columns: Array<ColumnItem>;
  params: Function | AnyObject;
}

export default Vue.extend({
  name: 'LaExportDialog',
  mixins: [LaBase],
  props: {
    i18n: {
      default: 'app.exportDialog',
    },
    isAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      url: '',
      searchParams: {},
      columns: [] as ColumnItem[],
      checkedColumns: [] as ColumnItem[],
      fileName: '',
      fileType: 'xls',
      exportRange: {
        type: 0,
        start: 1,
        count: 40000,
      },
    };
  },
  computed: {
    rangeDisabled(): boolean {
      return !this.exportRange.type;
    },
    typeOptions(): Array<AnyObject> {
      return [
        { label: `Microsoft Excel 97-2003 ${translate('common.file')}(*.xls)`, value: 'xls' },
        { label: `Microsoft Excel ${translate('common.file')}(*.xlsx)`, value: 'xlsx' },
        { label: `CSV (${translate('common.commaSeparated')})(*.csv)`, value: 'csv' },
      ];
    },
  },
  methods: {
    open({ title, url, columns, params }: OpeningArgs) {
      const time = dayjs().format('YYYYMMDDHHmmss');
      this.fileName = title ? `[${title}] ${time}` : time;
      this.url = url;
      this.searchParams = (typeof params === 'function' ? params() : params) || {};
      this.columns = columns.slice();
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    toggleAllSelection() {
      (this.$refs.table as ElTable).toggleAllSelection();
    },
    moveRow(scope: AnyObject, dir: number) {
      const idx = dir < 0 ? scope.$index - 1 : scope.$index;
      if (idx > -1 && idx < this.columns.length - 1) {
        this.columns.splice(idx, 2, ...this.columns.slice(idx, idx + 2).reduce((r, n) => [n, ...r], [] as ColumnItem[]));
      }
    },
    exportRecords() {
      const checkedMap = Object.assign({}, ...this.checkedColumns.map(col => ({ [col.name]: true })));
      const postData = {
        fileName: this.fileName,
        fileType: this.fileType,
        datatype: 'on',
        StartRows: this.exportRange.start,
        EndRows: this.exportRange.count,
        columns: this.columns.filter(col => checkedMap[col.name]).map(col => {
          return {
            field: col.textField || col.name,
            title: col.label,
          };
        }),
        ...this.searchParams,
      };
      axios.post(this.url, createFormData(postData), { responseType: 'blob' })
          .then((data) => downloadBlob(data.data as unknown as Blob, [this.fileName, this.fileType].join('.')))
          .then(() => this.close());
    },
    toggleChecked(row: ColumnItem) {
      (this.$refs.table as ElTable).toggleRowSelection(row);
    },
    handleSelectionChange(val: ColumnItem[]) {
      this.checkedColumns = val;
    },
  },
});
</script>

<style scoped lang="scss">
::v-deep {

  .el-dialog__body {
    min-height: 60vh;
  }

  .el-table .el-table-column--selection .cell {
    padding-left: 14px;
  }

  .el-dialog__body {
    padding-top: 0;
  }

  .el-form-item--small.el-form-item {
    margin: 12px 0;
  }

  .el-form-item--small.el-form-item.inline-item {
    width: 50%;
    display: inline-block;
    margin-top: 0;
  }

  .el-radio-group {
    display: flex;

    label {
      width: 50%;
    }
  }

  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }
}

.dialog-content {
  display: flex;
  flex-wrap: wrap;
}

.el-table, .el-form {
  flex: 1 0 360px;
  max-height: 60vh;
  min-height: 200px;
}

.range-tip {
  text-align: right;
  font-size: 12px;
  color: gray;
}

.move-button {
  width: 30px;
  padding: 5px;
}
</style>
