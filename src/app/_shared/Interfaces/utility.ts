export interface ListItem {
    text ?: string;
    value: number;
}

export interface Checkbox extends ListItem {
    isChecked: boolean;
}

export interface CascadeListItem extends ListItem {
    description: string;
    childItems: CascadeListItem[];
}
export  interface CascadeCheckbox extends Checkbox {
    description: string;
    isSingleSelect: boolean;
    childItems: CascadeCheckbox[] | null;
}




