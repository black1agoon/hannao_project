import { Module } from 'vuex';
import { AnyObject } from '@/types';
import { api } from '@/api';
import { Style, StyleAtt, StyleColor, StyleProcess } from '@/app/basic/style/Style';
import { groupByProperty } from '@/utils/object-list';

const styleStore: Module<AnyObject, AnyObject> = {
  namespaced: true,

  state: {
    formData: {} as Style,
    styleAttList: [] as Array<StyleAtt>,
    styleColors: [] as Array<StyleColor>,
    styleProcess: [] as Array<StyleProcess>,
    styleTableCount: 0,
  },

  getters: {
    styleImages(state) {
      return state.styleAttList.map((att: StyleAtt) => {
        return {
          id: att.id,
          uid: att.uid,
          styleId: att.styleId,
          name: att.fileName,
          url: att.fileUrl,
        };
      });
    },
    styleColorTree({ styleColors }) {
      return groupByProperty(styleColors, 'colorName').map(([colorName, colors]) => {
        return {
          type: colors[0].type,
          sizeId: colorName,
          size: colors.map((color: StyleColor) => color.size).join('/'),
          colorName,
          children: colors,
        };
      });
    },
  },

  mutations: {
    updateStyleTableCount(state) {
      state.styleTableCount += 1;
    },
    updateStyle(state, { style, styleAtts, styleColors, styleProcess }) {
      state.formData = style || {};
      state.styleAttList = styleAtts || [];
      state.styleColors = styleColors || [];
      state.styleProcess = styleProcess || [];
    },
    updateAttList(state, attList = []) {
      state.styleAttList = attList;
    },
    addStyleColors(state, styleColors) {
      state.styleColors.splice(state.styleColors.length, 0, ...styleColors);
    },
    removeStyleColors(state, colors: AnyObject[]) {
      state.styleColors = state.styleColors.filter((color: AnyObject) => !colors.includes(color));
    },
    addStyleProcess(state, process) {
      if (Array.isArray(process)) {
        state.styleProcess.splice(state.styleProcess.length, 0, ...process);
      } else {
        state.styleProcess.push(process);
      }
    },
    updateStyleProcess(state, process) {
      const idx = state.styleProcess.findIndex((p: StyleProcess) => p.id === process.id);
      if (idx >= 0) {
        state.styleProcess.splice(idx, 1, process);
      }
    },
    removeStyleProcess(state, processList: StyleProcess[]) {
      state.styleProcess = state.styleProcess.filter((process: StyleProcess) => !processList.includes(process));
    },
  },

  actions: {
    resetState({ commit }) {
      commit('updateStyle', {});
    },

    saveStyle({ state }, styleStatus) {
      const postData = {
        style: { ...state.formData, styleStatus },
        styleAtts: state.styleAttList,
        styleColors: state.styleColors,
        styleProcess: state.styleProcess.map((process: StyleProcess) => process.id?.startsWith('process_') ? ({
          ...process,
          id: null,
        }) : process),
      };
      const action = state.formData.id ? 'update' : 'add';
      return api.style[action](postData);
    },
  },
};

export default styleStore;
