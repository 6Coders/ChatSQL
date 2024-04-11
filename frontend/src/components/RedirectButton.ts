import { Button } from '../interface/Button';

class RedirectButton implements Button {
  private path: string;
  label: string; 

  constructor(label: string, path: string) {
    this.label = label;
    this.path = path;
  }

  onClick = () => {
    // Verifica se il percorso è uno dei percorsi definiti
    if (this.isValidPath(this.path)) {
      window.location.href = this.path;
    } else {
      throw new Error("Invalid path");
    }
  };

  // Funzione per verificare se il percorso è uno dei percorsi definiti
  private isValidPath(path: string): boolean {
    const definedPaths = ['/home', '/request', '/manager']; // I tuoi percorsi definiti

    return definedPaths.includes(path);
  }
}

export default RedirectButton;