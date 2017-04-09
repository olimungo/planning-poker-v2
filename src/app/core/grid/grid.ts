export interface ICoreGrid {
  model: ICoreGridModel;
  data: ICoreGridData;
}

export interface ICoreGridModel {
  headers: any[];
}

export interface ICoreGridData {
  columns: any[];
}
