export interface Book {
    bookID: number;
    title: string;
    author: string;
    price: number;
    category: string;
  }
  
  export interface CartItem {
    book: Book;
    quantity: number;
  }
  