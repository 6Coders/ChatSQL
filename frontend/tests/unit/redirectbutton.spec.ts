import router from '@/router';
import RedirectButton from '@/components/RedirectButton';

describe('RedirectButton', () => {
  it('should redirect to the specified path when clicked', () => {
    // Simula il comportamento del window.location.href
    const mockWindow = { location: { href: '' } };
    Object.defineProperty(window, 'location', { value: mockWindow });

    // Crea un'istanza della classe RedirectButton
    const redirectButton = new RedirectButton("Go to Homepage", "/home", router);

    // Simula il clic sul pulsante
    redirectButton.onClick();

    // Verifica se l'URL è stato aggiornato correttamente
    expect(window.location.href).toBe("/home");
  });
});
