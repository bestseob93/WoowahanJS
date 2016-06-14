import { ActionCreator } from '../../core';
import { FETCH_USERS } from '../../action';
import { ListView } from '../../component';
import Template from './index.hbs';
import User from './user';

export default ListView.extend({
  namespace: 'View:Users',
  tagName: 'div',
  template: Template,
  rowContainer: '.list > tbody',
  rowView: User,

  events: {
    'click [data-action=refresh]': 'onRefresh'
  },

  initialize() {
    ListView.prototype.initialize.apply(this, arguments);

    this.setModel({
      prevPage: 0,
      currentPage: 1,
      nextPage: 2,
      numOfRows: 0
    });

    this.render();
    this.onRefresh();
  },

  render() {
    this.$el.html(Template(this.model.toJSON()));
  },

  fetchUsers(data) {
    this.reload(data);
    this.setModel({
      numOfRows: data.length
    });
  },

  onSelectedRow(row) {
    this.logStamp(row);
  },

  onRefresh() {
    this.dispatch(ActionCreator(FETCH_USERS), this.fetchUsers);
  }
});