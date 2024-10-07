export interface Currency {
    name: string;
    symbol: string;
  }
  
  export interface Language {
    name: string;
  }
  
  export interface Country {
    name: {
      common: string;
      official: string;
    };
    capital: string[];
    population: number;
    region: string;
    flags: {
      png: string;
    };
    currencies: Record<string, Currency>;
    languages: Record<string, Language>;
    timezones: string[];
  }
  