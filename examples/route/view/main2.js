import Woowahan from '../../../index';
import Template from './main2.hbs';

export default Woowahan.View.create('MainView2', {
  template: Template,

  viewWillMount(renderData) {
    renderData.links = this.getLinks(this.getRouteTables());

    return renderData;
  },

  getLinks(routeTables) {
    return Object.keys(routeTables).reduce((a, b) => (a[`${b}Link`] = `#${routeTables[b]()}`, a), {});
  }
});