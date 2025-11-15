export interface Book {
  id: number;
  title: string;
  authors: Author[];
}

export interface Author {
  name: string;
  birth_year: number;
  death_year: number;
}
