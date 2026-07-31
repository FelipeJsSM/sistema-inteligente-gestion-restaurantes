describe('Flujo de Autenticación SIGR', () => {
    it('Debería permitir iniciar sesión con credenciales válidas y redirigir al Dashboard', async () => {
        // 1. Navegar a la aplicación
        await browser.url('http://localhost:5173/');

        // 2. Localizar los elementos
        const inputCorreo = await $('input[type="email"]');
        const inputClave = await $('input[type="password"]');
        const btnEntrar = await $('button[type="submit"]');

        // 3. Interactuar con la interfaz
        await inputCorreo.setValue('admin@restaurante.com');
        await inputClave.setValue('123456');
        await btnEntrar.click();

        // 4. Validar redirección
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/dashboard'),
            {
                timeout: 5000,
                timeoutMsg: 'La redirección al dashboard falló o tardó demasiado'
            }
        );

        // 5. Validación a prueba de fallos (Sin depender de librerías externas)
        const tituloDashboard = await $('h1');
        const textoDelTitulo = await tituloDashboard.getText();
        
        if (!textoDelTitulo.includes('Bienvenido')) {
            throw new Error(`Prueba fallida: Se esperaba "Bienvenido", pero el título dice "${textoDelTitulo}"`);
        }
    });
});