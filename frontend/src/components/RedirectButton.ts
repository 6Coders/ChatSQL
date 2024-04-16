import { Router } from 'vue-router';
import { Button } from '@/interfaces/Button';

class RedirectButton implements Button {
  private path: string;
  label: string; 
  private router: Router;

  constructor(label: string, path: string, router: Router) {
    this.label = label;
    this.path = path;
    this.router = router;
  }

  onClick = () => {
    // Verifica se il percorso è uno dei percorsi definiti
    if (this.isValidPath(this.path)) {
      this.router.push(this.path);
    } else {
      throw new Error("Invalid path");
    }
  };

  // Funzione per verificare se il percorso è uno dei percorsi definiti
  private isValidPath(path: string): boolean {
    const definedPaths = ['/', '/request', '/manager']; // I tuoi percorsi definiti

    return definedPaths.includes(path);
  }
}

export default RedirectButton;