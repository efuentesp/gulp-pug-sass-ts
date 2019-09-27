declare class JQuerySplitterOptions {}

interface JQuery {
  splitter(args?: JQuerySplitterOptions): JQuery;

  splitterSetWidth(width: number): JQuery;
  splitterSetOption(option: any, value: any): JQuery;
}
