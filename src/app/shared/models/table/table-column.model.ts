export interface TableColumn {
    [key: string]: string;
  }
    
  export interface InputActionColumn {
    color?:     string;
    action?:    string | ((data: any)=> void);
    icon:       string;
    tooltip?:   string;
  }