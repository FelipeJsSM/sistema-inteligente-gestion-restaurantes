describe('Flujo de Reservas SIGR', () => {
    it('Debería crear una reserva exitosamente', async () => {
        // 1. Iniciar sesión 
        await browser.url('http://localhost:5173/');
        await $('input[type="email"]').setValue('admin@restaurante.com');
        await $('input[type="password"]').setValue('123456');
        await $('button[type="submit"]').click();

        // 2. Navegar a Reservas
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/dashboard'),
            { timeout: 5000 }
        );
        await browser.url('http://localhost:5173/reservas');

        // 3. Llenar el formulario de reservas
        const inputsTexto = await $$('input[type="text"]');
        const inputFecha = await $('input[type="date"]');
        const inputHora = await $('input[type="time"]');
        const inputsNumero = await $$('input[type="number"]');
        const btnGuardar = await $('button[type="submit"]');

        await inputsTexto[0].setValue('Cliente Bot WebdriverIO'); 
        await inputsTexto[1].setValue('809-555-0000'); 
        
        // TRUCO QA SENIOR: Inyección compatible con el Virtual DOM de React
        await browser.execute((fecha, hora) => {
            const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            
            // Inyectar fecha y notificar a React
            nativeSetter.call(fecha, '2026-12-31');
            fecha.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Inyectar hora y notificar a React
            nativeSetter.call(hora, '20:00');
            hora.dispatchEvent(new Event('input', { bubbles: true }));
        }, inputFecha, inputHora);
        
        await inputsNumero[0].setValue('4'); 
        await inputsNumero[1].setValue('7'); 
        
        await btnGuardar.click();

        // 4. Validar resultado 
        await browser.pause(2000); 
        const cuerpoTabla = await $('tbody');
        const textoTabla = await cuerpoTabla.getText();

        if (!textoTabla.includes('Cliente Bot WebdriverIO')) {
            throw new Error('Fallo crítico: La reserva automatizada no aparece en los registros.');
        }
    });
});