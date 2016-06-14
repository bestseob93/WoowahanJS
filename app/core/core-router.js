import Debug from 'debug';
import { format } from 'util';
import Backbone from 'backbone';

export default Backbone.Router.extend({
  views: [],

  initialize() {
    if (typeof this['namespace'] !== 'undefined') {
      this.debug = Debug(this['namespace']);
    }
  },

  addView(view) {
    $(this.container).html(view.$el);
    this.views.push(view);
  },

  clearView() {
    this.views.forEach(view => view.close());
  },

  execute(cb, args) {
    if (typeof this['before'] === 'function') {
      this['before'].call(this, cb && cb.name);
    }

    if (typeof cb === 'function') cb.apply(this, args);

    if (typeof this['after'] === 'function') {
      this['after'].call(this, cb && cb.name);
    }
  },

  logStamp() {
    this.debug(format.apply(this, arguments));
  }
});