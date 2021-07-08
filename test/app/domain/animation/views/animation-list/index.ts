import { createTableView } from 'handie-vue';

import context from '../../context';

import TitleField from './TitleField.vue';
import EpisodesField from './EpisodesField.vue';

export default createTableView(context, {
  name: 'AnimationListView',
  config: { operationColumnWidth: 250 },
  fields: [
    { name: 'title', label: '标题', render: TitleField, config: { width: '300' } },
    { name: 'description', label: '简介' },
    {
      name: 'episodes',
      label: '集数',
      render: EpisodesField,
      config: { width: '60', align: 'center' },
    },
  ],
  actions: [
    { name: 'gotoCreateFormView', authority: 'animation:edit', primary: true },
    { name: 'deleteList', authority: 'animation:edit' },
    'gotoDetailView',
    { name: 'gotoEditFormView', authority: 'animation:edit' },
    { name: 'deleteOne', authority: 'animation:edit' },
  ],
  search: {
    filters: [
      { name: 'title', label: '标题' },
      { name: 'description', label: '简介' },
    ],
  },
});
