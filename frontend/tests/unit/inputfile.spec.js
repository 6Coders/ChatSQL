import { mount } from '@vue/test-utils';
import InputFile from '@/components/InputFile.vue';

describe('InputFile', () => {
  it('verifies that the file field contains the selected file when a file is uploaded', async () => {
    const wrapper = mount(InputFile);
    
    // Simuliamo l'upload di un file
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
    await wrapper.vm.handleFileUpload({ target: { files: [file] } });
  
    // Attendi un breve periodo di tempo per consentire l'aggiornamento del valore di 'file'
    await wrapper.vm.$nextTick();
  
    // Verifichiamo che il campo file contenga effettivamente il file caricato
    expect(wrapper.vm.file).toBe(file);
  });

  it('does not emit file when no file is selected', async () => {
    const wrapper = mount(InputFile);
    
    // Simuliamo il click sul pulsante di upload senza selezionare un file
    await wrapper.findComponent({ ref: 'uploadbtn' }).trigger('upload-click');
  
    // Verifichiamo che non sia stato emesso l'evento "file-selected"
    expect(wrapper.emitted('file-selected')).toBeFalsy();
  
    // Verifichiamo che isUploading rimanga false
    expect(wrapper.vm.isUploading).toBe(false);
  });

  it('emits the selected file when upload button is clicked', async () => {
    const wrapper = mount(InputFile);

    // Simuliamo l'upload di un file
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
    await wrapper.vm.handleFileUpload({ target: { files: [file] } });

    // Simuliamo il click sul pulsante di upload
    await wrapper.findComponent({ ref: 'uploadbtn' }).trigger('upload-click');

    // Verifichiamo che sia stato emesso l'evento "file-selected" con il file selezionato
    expect(wrapper.emitted('file-selected')).toBeTruthy();
    expect(wrapper.emitted('file-selected')[0][0]).toBe(file);
  });

  it('assigns the passed boolean true to isUploading when setIsUploading is called', async () => {
    const wrapper = mount(InputFile);
    
    // Chiamiamo la funzione setIsUploading con un valore booleano
    await wrapper.vm.setIsUploading(true);
  
    // Attendi un breve periodo di tempo per consentire l'aggiornamento del valore di 'isUploading'
    await wrapper.vm.$nextTick();
  
    // Verifichiamo che il valore booleano sia stato assegnato correttamente a isUploading
    expect(wrapper.vm.isUploading).toBe(true);
  });

  it('assigns the passed boolean false to isUploading when setIsUploading is called', async () => {
    const wrapper = mount(InputFile);
    
    // Chiamiamo la funzione setIsUploading con un valore booleano
    await wrapper.vm.setIsUploading(false);
  
    // Attendi un breve periodo di tempo per consentire l'aggiornamento del valore di 'isUploading'
    await wrapper.vm.$nextTick();
  
    // Verifichiamo che il valore booleano sia stato assegnato correttamente a isUploading
    expect(wrapper.vm.isUploading).toBe(false);
  });


  it('correctly assigns the provided props', async () => {
    const wrapper = mount(InputFile, {
      props: {
        uploadButtonClass: 'custom-class'
      }
    });
    
    // Verifichiamo che il valore di uploadButtonClass sia stato assegnato correttamente
    expect(wrapper.vm.uploadButtonClass).toBe('custom-class');
  });
});